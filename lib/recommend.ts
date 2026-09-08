import type { CurtainNeed, QuoteInquiry, Recommendation, Room } from './types';

export function selectedNeeds(room: Room): CurtainNeed[] {
  return room.needs ?? (room.goal === 'unsure' ? [] : [room.goal]);
}

export function recommend(room: Room): Recommendation {
  if (room.needs === undefined) return recommendLegacy(room);

  const needs = selectedNeeds(room);
  if (needs.length === 0)
    return {
      ...recommendLegacy({ ...room, goal: 'unsure', mood: 'unsure' }),
      id: 'consultation',
      title: '상담으로 구성을 정해보세요',
      subtitle: '필요한 기능부터 함께 비교해요',
      reason: '아직 필요한 기능을 정하지 않았어요. 밝기와 시선 보호 정도를 상담하며 비교해보세요.',
      alternative: '쉬폰·암막·이중커튼의 빛 투과와 시선 차단 정도를 비교해보세요.',
    };
  const blackout = needs.includes('blackout');
  const daylight = needs.includes('daylight');
  const privacy = needs.includes('privacy');
  const balanced = needs.includes('balanced');
  if (privacy || balanced || (blackout && daylight)) {
    const recommendation = recommendLegacy({ ...room, goal: 'balanced', mood: 'unsure' });
    return {
      ...recommendation,
      reason:
        blackout && daylight
          ? '낮에는 자연광을 들이고 쉴 때는 빛을 줄이도록 쉬폰과 암막을 함께 제안해요.'
          : blackout && privacy
            ? '빛 차단과 시선 보호를 함께 고려해 쉬폰과 암막의 이중 구성을 제안해요.'
            : blackout
              ? '빛 차단과 상황별 빛 조절을 함께 고려해 쉬폰과 암막의 이중 구성을 제안해요.'
              : privacy
                ? '낮과 밤의 시선 차단을 조절하도록 쉬폰과 암막의 이중 구성을 제안해요.'
                : '상황에 따라 자연광과 빛 차단을 조절할 수 있는 이중 구성을 제안해요.',
    };
  }
  return recommendLegacy({
    ...room,
    goal: blackout ? 'blackout' : daylight ? 'daylight' : 'unsure',
    mood: 'unsure',
  });
}

export function recommendForInquiry(room: Room, inquiry?: QuoteInquiry): Recommendation {
  if (!inquiry) return recommend(room);

  const hasCurtains = Number(inquiry.curtainCount) > 0;
  const hasBlinds = Number(inquiry.blindCount) > 0;
  if (!hasCurtains && !hasBlinds) return recommendLegacy(room);
  if (!hasCurtains) return recommendLegacy({ ...room, mood: 'minimal' });

  const curtain = recommendLegacy({
    ...room,
    mood: room.mood === 'minimal' ? 'natural' : room.mood,
  });
  if (!hasBlinds) return curtain;

  return {
    ...curtain,
    id: `${curtain.id}-and-blind`,
    title: `${curtain.title} + 빛 조절 블라인드`,
    subtitle: '커튼의 부드러움과 블라인드의 빛 조절',
    reason:
      '커튼과 블라인드를 모두 준비하도록, 선택한 목적에 맞는 커튼에 빛 조절 블라인드를 함께 제안해요.',
    alternative: '같은 창에 함께 설치할지는 설치 공간과 사용 목적을 확인한 뒤 결정해보세요.',
    checklist: [
      ...curtain.checklist,
      '커튼과 블라인드를 설치할 창을 각각 구분해 확인',
      '블라인드의 빛 조절 방식과 창별 분할 가능 여부 확인',
    ],
  };
}

function recommendLegacy(room: Room): Recommendation {
  const base = {
    image: '/images/curtain-natural.webp',
    checklist: [
      '원단 샘플로 색상과 비침 정도 확인',
      '커튼박스·레일·창문 열림 방향 확인',
      '입력한 치수와 현장 설치 치수 비교',
    ],
  };
  if (room.mood === 'minimal') {
    if (room.goal === 'blackout')
      return {
        ...base,
        id: 'blackout-blind',
        title: '암막 롤 블라인드',
        subtitle: '빛을 덜어내고, 공간은 간결하게',
        reason: '숙면을 원하고 깔끔한 분위기를 선호해 암막 블라인드를 제안해요.',
        alternative: '부드러운 분위기가 더 좋다면 암막커튼도 비교해보세요.',
        checklist: [...base.checklist, '블라인드 가장자리 빛샘과 창별 분할 가능 여부 확인'],
      };
    return {
      ...base,
      id: 'combi-blind',
      title: '빛 조절 블라인드',
      subtitle: '시간에 따라, 필요한 만큼의 빛',
      reason: '모던한 취향에 맞춰 선이 간결하고 빛 조절이 가능한 구성을 제안해요.',
      alternative: '패브릭의 부드러움이 좋다면 쉬폰커튼을 비교해보세요.',
    };
  }
  if (room.goal === 'blackout')
    return {
      ...base,
      id: 'blackout',
      title: '포근한 암막커튼',
      subtitle: '하루의 끝, 편안한 쉼을 위해',
      reason: '잠들기 편한 공간을 위해 빛을 줄이는 암막 구성을 제안해요.',
      alternative: '낮에는 자연광을 즐기고 싶다면 쉬폰과 암막을 함께 구성해보세요.',
      checklist: [...base.checklist, '암막 원단의 차광 정도와 가장자리 빛샘 확인'],
    };
  if (room.goal === 'balanced' || room.goal === 'privacy' || room.mood === 'hotel')
    return {
      ...base,
      id: 'layered',
      title: '쉬폰 + 암막 이중커튼',
      subtitle: '낮에는 은은하게, 밤에는 아늑하게',
      reason:
        room.goal === 'privacy'
          ? '낮과 밤의 시선 차단을 다르게 조절할 수 있는 이중 구성을 제안해요.'
          : '자연광과 아늑함을 모두 즐길 수 있는 두 겹 구성을 제안해요.',
      alternative: '한 겹으로 간결하게 꾸미고 싶다면 반투명 커튼을 비교해보세요.',
      checklist: [...base.checklist, '두 줄 레일 설치 공간과 커튼을 모아둘 여유 확인'],
    };
  return {
    ...base,
    id: 'sheer',
    title: '내추럴 쉬폰커튼',
    subtitle: '우리 집에, 부드러운 햇살 한 겹',
    reason:
      room.goal === 'daylight'
        ? '밝은 자연광을 좋아하는 공간에 부드럽게 빛을 거르는 쉬폰을 제안해요.'
        : '처음 고르는 커튼이라면 밝고 가벼운 쉬폰 구성부터 비교해보세요.',
    alternative: '밤의 시선 차단이나 숙면이 중요하다면 암막을 함께 고려해보세요.',
    checklist: [...base.checklist, '쉬폰만으로 야간 시선 차단이 충분한지 확인'],
  };
}
