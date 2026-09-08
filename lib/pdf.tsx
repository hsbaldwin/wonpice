import React from 'react';
import { Document, Font, Link, Page, StyleSheet, Text, View, pdf } from '@react-pdf/renderer';
import {
  goalLabels,
  moodLabels,
  roomLabels,
  type QuoteDocument,
  type Recommendation,
  type Room,
} from './types';
import { site } from './site';
import { validateInquiry } from './quote';
import { selectedNeeds } from './recommend';

const fontFamily = 'MastersNotoSansKR';
let configuredFontPath = '';

/** A local font is loaded only when this PDF module is requested. */
export function configurePdfFont(fontPath = '/fonts/NotoSansKR-Regular.ttf') {
  if (configuredFontPath === fontPath) return;
  Font.register({ family: fontFamily, src: fontPath, fontWeight: 400 });
  // Korean syllables may wrap between characters; no dictionary hyphens are needed.
  Font.registerHyphenationCallback((word) => Array.from(word));
  configuredFontPath = fontPath;
}

const styles = StyleSheet.create({
  // Keep lineHeight on individual static text styles. An inherited numeric value
  // is re-resolved on React PDF's dynamic page-number passes and can push it off page.
  page: {
    fontFamily,
    fontSize: 9,
    color: '#253241',
    paddingTop: 34,
    paddingHorizontal: 40,
    paddingBottom: 55,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dfe6ee',
    paddingBottom: 10,
    marginBottom: 18,
  },
  brand: { fontSize: 10, color: '#31577c', letterSpacing: 0.3 },
  eyebrow: { fontSize: 8, color: '#728095' },
  title: { fontSize: 23, lineHeight: 1.4, color: '#183650', marginBottom: 6 },
  subtitle: { fontSize: 9, color: '#6a7685', marginBottom: 14 },
  summary: { padding: 11, backgroundColor: '#eff5fb', borderRadius: 7, marginBottom: 17 },
  summaryName: { fontSize: 11, lineHeight: 1.4, color: '#254b72', marginBottom: 4 },
  summaryMeta: { fontSize: 9, color: '#68798b' },
  sectionTitle: { fontSize: 13, lineHeight: 1.4, color: '#203e5a', marginBottom: 8, marginTop: 3 },
  room: { marginBottom: 15 },
  roomHeading: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  roomIndex: { fontSize: 9, color: '#577897', width: 25 },
  roomTitle: { fontSize: 12, lineHeight: 1.4, flexGrow: 1, flexShrink: 1 },
  preference: { fontSize: 9, color: '#627386', marginBottom: 10 },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f4f6f8',
    paddingVertical: 7,
    paddingHorizontal: 9,
    fontSize: 8,
    color: '#657487',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5eaf0',
    fontSize: 9,
  },
  cellWindow: { width: '12%' },
  cellSize: { width: '32%' },
  cellBasis: { width: '32%' },
  cellAccuracy: { width: '24%' },
  recommendation: {
    marginTop: 8,
    padding: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#7c9ab8',
    backgroundColor: '#f7f9fc',
  },
  recommendationLabel: { color: '#6c7e90', fontSize: 8, marginBottom: 3 },
  recommendationTitle: { color: '#254b72', fontSize: 11, lineHeight: 1.4, marginBottom: 4 },
  reason: { fontSize: 9 },
  alternative: { fontSize: 8, color: '#718094', marginTop: 6 },
  checklistTitle: { fontSize: 10, marginTop: 10, marginBottom: 4, color: '#3a5067' },
  checklist: { flexDirection: 'row', fontSize: 9, marginBottom: 4 },
  bullet: { width: 13, color: '#7991aa' },
  checklistText: { flex: 1 },
  notice: { fontSize: 8, color: '#67778a', marginBottom: 9, lineHeight: 1.5 },
  applyBox: { marginTop: 6, padding: 12, backgroundColor: '#eff5fb', borderRadius: 7 },
  applyTitle: { fontSize: 11, lineHeight: 1.4, color: '#254b72', marginBottom: 4 },
  applyText: { fontSize: 9, color: '#5d7085', marginBottom: 10 },
  link: { fontSize: 10, lineHeight: 1.4, color: '#245888', textDecoration: 'underline' },
  disclosure: { fontSize: 8, color: '#7a8898', marginTop: 9 },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 40,
    right: 40,
    fontSize: 8,
    lineHeight: 1.4,
    color: '#7b8999',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 25,
    left: 40,
    right: 40,
    fontFamily,
    fontSize: 8,
    color: '#7b8999',
    textAlign: 'right',
  },
});

function formattedDate(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? '작성일 확인 필요'
    : new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Seoul',
      }).format(date);
}

function Checklist({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item, index) => (
        <View key={`${index}-${item}`} style={styles.checklist} wrap={false}>
          <Text style={styles.bullet}>-</Text>
          <Text style={styles.checklistText}>{item}</Text>
        </View>
      ))}
    </>
  );
}

function actualDimension(raw: string) {
  const value = raw.trim();
  return /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(value) && Number(value) > 0 && Number(value) <= 2000
    ? value
    : null;
}

function RecommendationSection({ recommendation }: { recommendation: Recommendation }) {
  return (
    <>
      <View style={styles.recommendation} wrap={false}>
        <Text style={styles.recommendationLabel}>참고할 구성</Text>
        <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
        <Text style={styles.reason}>{recommendation.reason}</Text>
        <Text style={styles.alternative}>함께 비교할 대안: {recommendation.alternative}</Text>
      </View>
      <View minPresenceAhead={35}>
        <Text style={styles.checklistTitle}>상담할 때 확인해 주세요</Text>
      </View>
      <Checklist items={recommendation.checklist} />
    </>
  );
}

function RoomSection({
  room,
  index,
  recommendation,
  actualMeasurementsOnly = false,
}: {
  room: Room;
  index: number;
  recommendation?: Recommendation;
  actualMeasurementsOnly?: boolean;
}) {
  const measurements = room.windows
    .map((window, windowIndex) => ({ window, windowIndex }))
    .filter(
      ({ window }) =>
        !actualMeasurementsOnly || actualDimension(window.width) || actualDimension(window.height),
    );
  const chunks = Array.from({ length: Math.ceil(measurements.length / 8) }, (_, chunkIndex) =>
    measurements.slice(chunkIndex * 8, chunkIndex * 8 + 8),
  );
  return (
    <>
      {chunks.map((windows, chunkIndex) => (
        <View key={chunkIndex} style={styles.room} wrap={false}>
          <View>
            <View style={styles.roomHeading}>
              <Text style={styles.roomIndex}>{String(index + 1).padStart(2, '0')}</Text>
              <Text style={styles.roomTitle}>
                {room.name || roomLabels[room.type]}
                {chunkIndex > 0 ? ' (계속)' : ''}
              </Text>
            </View>
            <Text style={styles.preference}>
              {room.needs !== undefined ? (
                <>
                  공간 {roomLabels[room.type]} / 핵심 요구{' '}
                  {selectedNeeds(room)
                    .map((need) => goalLabels[need])
                    .join(' · ') || '상담에서 결정'}
                </>
              ) : (
                <>
                  공간 {roomLabels[room.type]} / 목적 {goalLabels[room.goal]} / 분위기{' '}
                  {moodLabels[room.mood]}
                </>
              )}
            </Text>
            <View style={styles.tableHeader}>
              <Text style={styles.cellWindow}>창</Text>
              <Text style={styles.cellSize}>
                {actualMeasurementsOnly ? '입력한 치수' : '가로 × 세로 (cm)'}
              </Text>
              <Text style={styles.cellBasis}>측정 기준</Text>
              <Text style={styles.cellAccuracy}>측정 상태</Text>
            </View>
          </View>
          {windows.map(({ window, windowIndex }) => (
            <View key={window.id} style={styles.tableRow} wrap={false}>
              <Text style={styles.cellWindow}>{windowIndex + 1}</Text>
              <Text style={styles.cellSize}>
                {actualMeasurementsOnly
                  ? [
                      actualDimension(window.width) && `가로 ${actualDimension(window.width)}cm`,
                      actualDimension(window.height) && `세로 ${actualDimension(window.height)}cm`,
                    ]
                      .filter(Boolean)
                      .join(' / ')
                  : `${window.width || '미입력'} × ${window.height || '미입력'}`}
              </Text>
              <Text style={styles.cellBasis}>
                {window.basis === 'window' ? '창문 자체 치수' : '설치하려는 범위'}
              </Text>
              <Text style={styles.cellAccuracy}>
                {window.accuracy === 'measured' ? '직접 실측' : '대략적인 값'}
              </Text>
            </View>
          ))}
          {recommendation && chunkIndex === chunks.length - 1 && (
            <RecommendationSection recommendation={recommendation} />
          )}
        </View>
      ))}
    </>
  );
}

/** Shared by the browser download and the rendering QA script. No customer data is sent to a server. */
export function QuotePdfDocument({ document }: { document: QuoteDocument }) {
  const inquiry = document.inputMode === 'measurements' ? undefined : document.inquiry;
  if (inquiry && Object.keys(validateInquiry(inquiry)).length)
    throw Error('문의할 창문 개수를 확인해주세요.');
  const curtainCount = Number(inquiry?.curtainCount.trim() || 0);
  const blindCount = Number(inquiry?.blindCount.trim() || 0);
  const windowCount = inquiry
    ? curtainCount + blindCount
    : document.rooms.reduce((count, room) => count + room.windows.length, 0);
  const rooms = document.rooms
    .map((room, index) => ({ room, index }))
    .filter(
      ({ room }) =>
        !inquiry || room.windows.some((w) => actualDimension(w.width) || actualDimension(w.height)),
    );
  const inquiryRecommendations = inquiry
    ? document.recommendations?.filter(
        (recommendation, index, list) =>
          list.findIndex((item) => item.id === recommendation.id) === index,
      )
    : [];
  return (
    <Document
      title={`${document.name || '우리 집'} - 커튼 견적 요청서`}
      author={site.name}
      subject={
        inquiry
          ? '커튼과 블라인드별 창문 개수를 정리한 상담 준비 문서'
          : '치수와 선호를 정리한 커튼·블라인드 상담 준비 문서'
      }
      language="ko-KR"
    >
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header} fixed>
          <Text style={styles.brand}>{site.name}</Text>
          <Text style={styles.eyebrow}>MY SPACE, MY CURTAIN</Text>
        </View>
        <Text style={styles.title}>커튼·블라인드 견적 요청서</Text>
        <Text style={styles.subtitle}>
          {inquiry
            ? '커튼과 블라인드가 필요한 창문 수를 정리한 상담 준비 문서입니다.'
            : '우리 공간의 크기와 취향을 한 장에. 상담 전에 확인하고 함께 준비하세요.'}
        </Text>
        <View style={styles.summary} wrap={false}>
          <Text style={styles.summaryName}>{document.name || '우리 집 커튼 계획'}</Text>
          {inquiry && (
            <Text style={styles.summaryMeta}>
              커튼 {curtainCount}개 창 · 블라인드 {blindCount}개 창
            </Text>
          )}
          <Text style={styles.summaryMeta}>
            {inquiry ? '총 ' : `${document.rooms.length}개 공간 · `}
            {windowCount}개 창 / 작성 {formattedDate(document.createdAt)}
          </Text>
          <Text style={styles.summaryMeta}>마지막 수정 {formattedDate(document.updatedAt)}</Text>
        </View>
        {inquiryRecommendations?.map((recommendation) => (
          <View key={recommendation.id} style={styles.room}>
            <RecommendationSection recommendation={recommendation} />
          </View>
        ))}
        {rooms.length > 0 && (
          <Text style={styles.sectionTitle}>
            {inquiry ? '기존 입력 치수' : '공간별 치수와 추천'}
          </Text>
        )}
        {rooms.map(({ room, index }) => (
          <RoomSection
            key={room.id}
            room={room}
            index={index}
            recommendation={inquiry ? undefined : document.recommendations?.[index]}
            actualMeasurementsOnly={!!inquiry}
          />
        ))}
        <View wrap={false}>
          <Text style={styles.sectionTitle}>견적 상담 준비</Text>
          <Text style={styles.notice}>
            {inquiry
              ? '입력한 창문 개수는 문의 준비용입니다. 정확한 치수와 제품별 설치 수량은 상담에서 확인해 주세요. '
              : '입력한 치수는 상담을 위한 참고값입니다. '}
            원단, 주름, 레일, 설치 여건에 따라 제작 치수가 달라질 수 있습니다. 최종 제작 치수와
            금액은 제휴업체의 실측·상담을 통해 확인해 주세요.
          </Text>
          <Checklist
            items={[
              '창 전체와 천장·커튼박스가 보이는 사진을 준비하세요.',
              '레일 유무, 설치면 재질, 원하는 설치 일정을 확인하세요.',
              '원단·레일·시공비·추가 비용과 사후관리 범위를 함께 물어보세요.',
            ]}
          />
          <View style={styles.applyBox}>
            <Text style={styles.applyTitle}>준비한 내용으로 바로 상담하기</Text>
            <Text style={styles.applyText}>
              아래 링크를 누르면 제휴업체의 신청 페이지로 이동합니다. 이 요청서의 내용은 자동
              전송되지 않으므로 상담 시 참고하거나 공유해 주세요.
            </Text>
            <Link src={site.affiliateUrl} style={styles.link}>
              맞춤커튼 견적 문의로 이동 →
            </Link>
            <Text style={styles.disclosure}>
              제휴 링크를 통한 신청으로 운영자에게 수수료가 발생할 수 있습니다.
            </Text>
          </View>
        </View>
        <Text style={styles.footer} fixed>
          {site.name} · 상담 준비용 / 금액 미포함
        </Text>
        <Text
          style={styles.pageNumber}
          fixed
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        />
      </Page>
    </Document>
  );
}

export async function generateQuoteBlob(document: QuoteDocument): Promise<Blob> {
  configurePdfFont();
  return pdf(<QuotePdfDocument document={document} />).toBlob();
}

export async function downloadQuotePdf(document: QuoteDocument): Promise<void> {
  const blob = await generateQuoteBlob(document);
  const url = URL.createObjectURL(blob);
  const anchor = window.document.createElement('a');
  const safeName =
    (document.name || '우리집-커튼')
      .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '')
      .trim()
      .slice(0, 60) || '커튼';
  anchor.href = url;
  anchor.download = `${safeName}-견적요청서.pdf`;
  window.document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  // Allow the browser to start reading the blob, including Safari's download flow.
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
