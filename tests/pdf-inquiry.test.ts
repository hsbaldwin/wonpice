import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, rm } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { build } from 'esbuild';

test('PDFs preserve measurement needs and legacy counts without mixing the two input modes', async () => {
  // React PDF is ESM; run the actual document and renderer in an ESM fixture.
  const root = process.cwd();
  await mkdir(path.join(root, 'tmp'), { recursive: true });
  const directory = await mkdtemp(path.join(root, 'tmp', 'pdf-inquiry-'));
  const output = path.join(directory, 'fixture.mjs');
  try {
    await build({
      stdin: {
        resolveDir: root,
        loader: 'tsx',
        contents: String.raw`
          import React from 'react';
          import { Text, renderToBuffer } from '@react-pdf/renderer';
          import { QuotePdfDocument, configurePdfFont } from './lib/pdf';
          import { newQuote, newRoom, parseDraft } from './lib/quote';
          function textValue(node) {
            if (node == null || typeof node === 'boolean') return '';
            if (Array.isArray(node)) return node.map(textValue).join('');
            if (typeof node !== 'object') return String(node);
            return textValue(node.props?.children);
          }
          function documentText(node) {
            if (node == null || typeof node === 'boolean') return [];
            if (Array.isArray(node)) return node.flatMap(documentText);
            if (typeof node !== 'object') return [];
            if (typeof node.type === 'function') return documentText(node.type(node.props));
            if (node.type === Text) return [textValue(node.props.children)];
            return documentText(node.props?.children);
          }
          const recommendation = {
            id: 'qa-reference', title: '참고용 커튼 구성', subtitle: '',
            reason: '기존 선택 내용을 반영합니다.', alternative: '다른 원단과 비교',
            checklist: ['설치 여건 확인'], image: '',
          };
          const counts = newQuote();
          delete counts.inputMode;
          delete counts.rooms[0].needs;
          counts.inquiry = { curtainCount: '02', blindCount: '1' };
          counts.recommendations = [recommendation];
          const countText = documentText(QuotePdfDocument({ document: counts })).join('\n');
          const legacy = newQuote('bedroom');
          delete legacy.inquiry;
          delete legacy.inputMode;
          delete legacy.rooms[0].needs;
          legacy.rooms[0].windows[0].width = '375.5';
          legacy.rooms[0].windows[0].height = '240';
          legacy.recommendations = [recommendation];
          const legacyText = documentText(QuotePdfDocument({ document: legacy })).join('\n');
          const mixed = structuredClone(counts);
          mixed.rooms.push(newRoom('bedroom'));
          mixed.rooms[1].name = '실측한 안방';
          mixed.rooms[1].windows[0].width = '375.5';
          mixed.rooms[1].windows[0].height = '240';
          mixed.rooms[1].windows.push({
            ...mixed.rooms[1].windows[0], id: 'partial-real-measurement', width: '', height: '210',
          });
          mixed.rooms[0].windows[0].width = 'abc';
          const mixedText = documentText(QuotePdfDocument({ document: mixed })).join('\n');
          let invalidRejected = false;
          try {
            QuotePdfDocument({ document: { ...counts, inquiry: { curtainCount: '0', blindCount: '' } } });
          } catch {
            invalidRejected = true;
          }
          const measured = newQuote();
          measured.inputMode = 'measurements';
          measured.step = 3;
          measured.inquiry = { curtainCount: '0', blindCount: '' };
          measured.rooms[0].windows[0].width = '375.5';
          measured.rooms[0].windows[0].height = '240';
          measured.rooms[0].needs = ['daylight', 'privacy', 'blackout'];
          measured.rooms[0].mood = 'minimal';
          measured.rooms[0].windows.push({
            ...measured.rooms[0].windows[0], id: 'second-measured-window', width: '180', height: '210',
          });
          measured.rooms.push(newRoom('bedroom'));
          measured.rooms[1].name = '아직 요구를 고르지 않은 방';
          measured.rooms[1].windows[0].width = '150';
          measured.rooms[1].windows[0].height = '220';
          measured.rooms[1].needs = [];
          measured.rooms[1].goal = 'blackout';
          measured.rooms[1].mood = 'hotel';
          measured.recommendations = [recommendation];
          const measuredJson = JSON.stringify(measured);
          const parsedMeasurements = parseDraft(measuredJson);
          const measurementText = documentText(QuotePdfDocument({ document: parsedMeasurements })).join('\n');
          configurePdfFont(${JSON.stringify(path.join(root, 'public/fonts/NotoSansKR-Regular.ttf'))});
          const buffer = await renderToBuffer(<QuotePdfDocument document={counts} />);
          const measurementBuffer = await renderToBuffer(<QuotePdfDocument document={parsedMeasurements} />);
          console.log(JSON.stringify({
            countText, legacyText, mixedText, measurementText, invalidRejected,
            pdfHeader: buffer.subarray(0, 5).toString(), pdfBytes: buffer.length,
            measurementPdfHeader: measurementBuffer.subarray(0, 5).toString(),
            measurementPdfBytes: measurementBuffer.length,
            unchangedMeasurementJson: JSON.stringify(parsedMeasurements) === measuredJson,
            unchangedCount: counts.inquiry.curtainCount,
            unchangedWidth: counts.rooms[0].windows[0].width,
          }));
        `,
      },
      platform: 'node',
      format: 'esm',
      bundle: true,
      packages: 'external',
      outfile: output,
    });
    const { stdout } = await promisify(execFile)(process.execPath, [output], {
      cwd: root,
      maxBuffer: 1024 * 1024,
    });
    const result = JSON.parse(stdout) as {
      countText: string;
      legacyText: string;
      mixedText: string;
      measurementText: string;
      invalidRejected: boolean;
      pdfHeader: string;
      pdfBytes: number;
      measurementPdfHeader: string;
      measurementPdfBytes: number;
      unchangedMeasurementJson: boolean;
      unchangedCount: string;
      unchangedWidth: string;
    };
    assert.match(result.countText, /커튼 2개 창 · 블라인드 1개 창/);
    assert.match(result.countText, /총 3개 창/);
    assert.match(result.countText, /참고용 커튼 구성/);
    assert.doesNotMatch(result.countText, /개 공간|미입력|기존 입력 치수|가로|세로|cm/);
    assert.match(result.legacyText, /1개 공간 · 1개 창/);
    assert.match(result.legacyText, /375\.5 × 240/);
    assert.match(result.legacyText, /공간별 치수와 추천/);
    assert.match(result.legacyText, /참고용 커튼 구성/);
    assert.match(result.legacyText, /목적 상담에서 결정 \/ 분위기 아직 잘 모르겠어요/);
    assert.match(result.mixedText, /기존 입력 치수/);
    assert.match(result.mixedText, /실측한 안방/);
    assert.match(result.mixedText, /가로 375\.5cm \/ 세로 240cm/);
    assert.match(result.mixedText, /세로 210cm/);
    assert.doesNotMatch(result.mixedText, /abc|미입력|2개 공간/);
    assert.equal(result.invalidRejected, true);
    assert.equal(result.pdfHeader, '%PDF-');
    assert.ok(result.pdfBytes > 5000, 'The count-only request renders with the local Korean font');
    assert.match(result.measurementText, /2개 공간 · 3개 창/);
    assert.match(result.measurementText, /375\.5 × 240/);
    assert.match(result.measurementText, /180 × 210/);
    assert.match(result.measurementText, /150 × 220/);
    assert.match(result.measurementText, /핵심 요구 자연광 살리기 · 시선 보호 · 암막·빛 차단/);
    assert.match(result.measurementText, /핵심 요구 상담에서 결정/);
    assert.doesNotMatch(
      result.measurementText,
      /분위기|모던 & 심플|호텔처럼 아늑하게|총 0개|커튼 0개 창/,
    );
    assert.equal(result.measurementPdfHeader, '%PDF-');
    assert.ok(result.measurementPdfBytes > 5000, 'Measurements and multiple needs render to PDF');
    assert.equal(result.unchangedMeasurementJson, true);
    assert.equal(result.unchangedCount, '02');
    assert.equal(result.unchangedWidth, '');
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
