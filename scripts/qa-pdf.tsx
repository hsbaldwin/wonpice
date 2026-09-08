import React from 'react';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { renderToBuffer } from '@react-pdf/renderer';
import { configurePdfFont, QuotePdfDocument } from '../lib/pdf';
import type { QuoteDocument, Recommendation } from '../lib/types';

const outputDirectory = path.resolve('tmp/pdfs');
const recommendation: Recommendation = {
  id: 'double',
  title: '쉬폰 + 암막 이중 커튼',
  subtitle: '낮에는 부드럽게, 밤에는 아늑하게',
  reason: '자연광과 빛 차단을 상황에 맞게 조절할 수 있는 구성입니다.',
  alternative: '채광 조절 블라인드와 비교해 보세요.',
  checklist: [
    '이중 레일을 설치할 공간이 충분한지 확인하세요.',
    '암막은 원단뿐 아니라 측면·상부의 빛샘도 확인하세요.',
  ],
  image: '/images/curtain-natural.webp',
};
const fixture: QuoteDocument = {
  version: 1,
  id: 'pdf-qa-fixture',
  name: '우리 집 거실과 침실 - 한글 PDF 확인',
  createdAt: '2026-09-05T01:00:00.000Z',
  updatedAt: '2026-09-05T02:00:00.000Z',
  step: 3,
  rooms: Array.from({ length: 6 }, (_, index) => ({
    id: `room-${index}`,
    name: index === 0 ? '햇살이 드는 우리 집 거실' : `편안한 ${index}번째 침실`,
    type: index === 0 ? 'living' : 'bedroom',
    goal: index === 0 ? 'balanced' : 'blackout',
    mood: 'natural',
    windows: Array.from({ length: index === 0 ? 4 : 2 }, (_, windowIndex) => ({
      id: `window-${index}-${windowIndex}`,
      width: String(320 + index + windowIndex * 5.5),
      height: '240.5',
      basis: windowIndex % 2 ? 'installation' : 'window',
      accuracy: index % 2 ? 'approximate' : 'measured',
    })),
  })),
  recommendations: Array.from({ length: 6 }, () => recommendation),
};

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  configurePdfFont(path.resolve('public/fonts/NotoSansKR-Regular.ttf'));
  const multiPage = await renderToBuffer(<QuotePdfDocument document={fixture} />);
  await writeFile(path.join(outputDirectory, 'quote-multipage.pdf'), multiPage);
  const singleFixture = {
    ...fixture,
    rooms: [{ ...fixture.rooms[0], windows: fixture.rooms[0].windows.slice(0, 1) }],
    recommendations: [recommendation],
  };
  const singlePage = await renderToBuffer(<QuotePdfDocument document={singleFixture} />);
  await writeFile(path.join(outputDirectory, 'quote-single.pdf'), singlePage);
  const manyWindows = {
    ...singleFixture,
    rooms: [
      {
        ...singleFixture.rooms[0],
        windows: Array.from({ length: 20 }, (_, index) => ({
          ...singleFixture.rooms[0].windows[0],
          id: `many-${index}`,
          width: String(300 + index),
        })),
      },
    ],
  };
  await writeFile(
    path.join(outputDirectory, 'quote-20-windows.pdf'),
    await renderToBuffer(<QuotePdfDocument document={manyWindows} />),
  );
  console.log(
    `PDF QA fixtures generated in ${outputDirectory} (${singlePage.length} / ${multiPage.length} bytes).`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
