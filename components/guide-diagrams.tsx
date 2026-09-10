function DiagramNumber({ x, y, value }: { x: number; y: number; value: number }) {
  return (
    <g aria-hidden="true">
      <circle cx={x} cy={y} r="17" fill="#355e79" stroke="#fff" strokeWidth="3" />
      <text x={x} y={y + 8} textAnchor="middle" fontSize="24" fontWeight="700" fill="#fff">
        {value}
      </text>
    </g>
  );
}

function MeasurementDiagram() {
  return (
    <figure className="guide-diagram" aria-labelledby="measurement-diagram-caption">
      <figcaption id="measurement-diagram-caption">
        <strong>커튼 사이즈 재는 법: 시작점과 끝점</strong>
        <span>창틀 크기와 덮고 싶은 범위를 따로 기록하는 개념도입니다.</span>
      </figcaption>
      <svg
        className="guide-diagram-svg"
        viewBox="0 0 400 285"
        role="img"
        aria-labelledby="measurement-diagram-title measurement-diagram-desc"
      >
        <title id="measurement-diagram-title">창틀과 원하는 커튼 범위를 구분한 실측 그림</title>
        <desc id="measurement-diagram-desc">
          파란 실선은 창틀, 점선은 커튼으로 덮고 싶은 범위입니다. 1번 가로는 덮을 범위의 왼쪽에서
          오른쪽까지, 2번 세로는 커튼이 걸리는 지점에서 원하는 하단까지 잽니다. 3번은 커튼 하단과
          바닥 사이 간격입니다.
        </desc>
        <rect x="16" y="12" width="368" height="255" rx="12" fill="#f0f4f6" />
        <path d="M31 251h338" stroke="#8b9da8" strokeWidth="2" />
        <rect
          x="109"
          y="91"
          width="166"
          height="120"
          fill="#dcebf0"
          stroke="#6c8da0"
          strokeWidth="4"
        />
        <path d="M192 94v115M112 151h160" stroke="#91acbb" strokeWidth="3" />
        <rect
          x="72"
          y="60"
          width="242"
          height="173"
          fill="#fff"
          fillOpacity=".28"
          stroke="#355e79"
          strokeWidth="2"
          strokeDasharray="7 5"
        />
        <path d="M66 52h254" stroke="#748994" strokeWidth="5" strokeLinecap="round" />
        <path
          d="M72 34h242M72 26v16M314 26v16M72 60V45M314 60V45"
          stroke="#355e79"
          strokeWidth="2"
        />
        <path d="m82 29-10 5 10 5m222-10 10 5-10 5" stroke="#355e79" strokeWidth="2" fill="none" />
        <path
          d="M346 60v173M338 60h16M338 233h16M320 60h14M320 233h14"
          stroke="#355e79"
          strokeWidth="2"
        />
        <path
          d="m341 70 5-10 5 10m-10 153 5 10 5-10"
          stroke="#355e79"
          strokeWidth="2"
          fill="none"
        />
        <path d="M73 242h240" stroke="#dec38b" strokeWidth="15" />
        <DiagramNumber x={193} y={34} value={1} />
        <DiagramNumber x={346} y={146} value={2} />
        <DiagramNumber x={193} y={244} value={3} />
      </svg>
      <div className="guide-diagram-key" aria-label="그림의 선 구분">
        <span>
          <i className="guide-diagram-key-window" aria-hidden="true" />
          창틀 바깥 치수
        </span>
        <span>
          <i className="guide-diagram-key-cover" aria-hidden="true" />
          덮고 싶은 범위
        </span>
      </div>
      <ol className="guide-diagram-notes">
        <li>
          <strong>가로: 왼쪽 끝 → 오른쪽 끝</strong>
          <span>창틀 폭과 덮고 싶은 폭을 구분해 적으세요.</span>
        </li>
        <li>
          <strong>세로: 걸리는 지점 → 원하는 하단</strong>
          <span>레일·봉·고리 방식에 따라 시작점이 달라집니다.</span>
        </li>
        <li>
          <strong>하단 간격: 커튼 끝 ↔ 바닥</strong>
          <span>바닥과 가구, 원단을 보고 정하며 공통 수치를 적용하지 않습니다.</span>
        </li>
      </ol>
      <p className="guide-diagram-note">
        측정 기준을 설명하는 그림입니다. 원단·주름·설치 방식에 따른 최종 제작 치수는 실측 상담에서
        확정하세요.
      </p>
    </figure>
  );
}

function BlackoutDiagram() {
  return (
    <figure className="guide-diagram" aria-labelledby="blackout-diagram-caption">
      <figcaption id="blackout-diagram-caption">
        <strong>암막커튼 빛샘: 원단 가장자리도 확인하세요</strong>
        <span>노란 부분은 빛이 들어올 수 있는 틈의 위치를 표시한 개념도입니다.</span>
      </figcaption>
      <svg
        className="guide-diagram-svg"
        viewBox="0 0 400 250"
        role="img"
        aria-labelledby="blackout-diagram-title blackout-diagram-desc"
      >
        <title id="blackout-diagram-title">암막커튼 상단, 양옆, 하단과 가운데의 빛샘 위치</title>
        <desc id="blackout-diagram-desc">
          1번은 레일 위쪽, 2번은 커튼과 벽 사이의 양옆, 3번은 커튼 하단과 바닥 사이, 4번은 좌우
          커튼이 만나는 가운데입니다. 색의 밝기나 틈의 폭은 실제 차광 성능을 나타내지 않습니다.
        </desc>
        <rect x="16" y="12" width="368" height="226" rx="12" fill="#f0f4f6" />
        <rect x="85" y="45" width="230" height="162" rx="3" fill="#f4d997" />
        <path d="M81 37h238" stroke="#7b8f9c" strokeWidth="5" strokeLinecap="round" />
        <path d="M98 57h102v136H98zM200 57h102v136H200z" fill="#496575" />
        <path
          d="M113 58v133M135 58v133M157 58v133M179 58v133M222 58v133M244 58v133M266 58v133M288 58v133"
          stroke="#5d7989"
          strokeWidth="9"
        />
        <path d="M200 58v134" stroke="#354e60" strokeWidth="3" />
        <path d="M31 213h338" stroke="#8b9da8" strokeWidth="2" />
        <path d="M70 120H90M311 120h19" stroke="#a57725" strokeWidth="2" />
        <DiagramNumber x={200} y={43} value={1} />
        <DiagramNumber x={64} y={120} value={2} />
        <DiagramNumber x={336} y={120} value={2} />
        <DiagramNumber x={200} y={208} value={3} />
        <DiagramNumber x={200} y={123} value={4} />
      </svg>
      <ol className="guide-diagram-notes">
        <li>
          <strong>상단: 레일과 커튼박스</strong>
          <span>커튼 위쪽으로 빛이 들어오는지 확인하세요.</span>
        </li>
        <li>
          <strong>양옆: 벽과 커튼 사이</strong>
          <span>창을 덮는 폭과 옆면의 틈을 함께 보세요.</span>
        </li>
        <li>
          <strong>하단: 커튼 끝과 바닥 사이</strong>
          <span>빛샘과 바닥 끌림을 함께 확인해 길이를 정하세요.</span>
        </li>
        <li>
          <strong>가운데: 좌우 커튼이 만나는 부분</strong>
          <span>끝까지 닫히는지, 겹침과 개폐에 문제가 없는지 확인하세요.</span>
        </li>
      </ol>
      <p className="guide-diagram-note">
        틈의 폭·색은 설명용이며 차광률을 나타내지 않습니다. 실제로 불편한 시간대의 사진과 제품
        사양을 함께 확인하세요.
      </p>
    </figure>
  );
}

function SheerLightingScene({ night }: { night: boolean }) {
  const period = night ? 'night' : 'day';
  return (
    <div className="guide-diagram-scene">
      <p className="guide-diagram-scene-title">
        {night ? '밤 · 실내 조명을 켠 경우' : '낮 · 실외가 더 밝은 경우'}
      </p>
      <div className="guide-diagram-scene-labels">
        <span>실외</span>
        <span>실내</span>
      </div>
      <svg viewBox="0 0 320 190" role="img" aria-labelledby={`sheer-${period}-title`}>
        <title id={`sheer-${period}-title`}>
          {night
            ? '어두운 실외와 조명을 켠 밝은 실내 사이의 쉬폰커튼'
            : '밝은 실외와 상대적으로 어두운 실내 사이의 쉬폰커튼'}
        </title>
        <rect x="0" y="0" width="160" height="190" fill={night ? '#334e64' : '#f7e8bc'} />
        <rect x="160" y="0" width="160" height="190" fill={night ? '#f7e8bc' : '#e2e9ed'} />
        {night ? (
          <path d="M61 30a21 21 0 1 0 21 30A22 22 0 0 1 61 30Z" fill="#e9f0f3" />
        ) : (
          <g fill="none" stroke="#bc913e" strokeWidth="2.5">
            <circle cx="61" cy="49" r="16" fill="#efd391" />
            <path d="M61 22v-8m0 62v8M34 49h-8m62 0h8M42 30l-6-6m44 44 6 6M42 68l-6 6m44-44 6-6" />
          </g>
        )}
        <path d="M17 146h75v31H17zM68 124h51v53H68z" fill={night ? '#496579' : '#dbcda8'} />
        <path d="M190 163h116" stroke="#7d909a" strokeWidth="2" />
        <circle cx="231" cy="108" r="12" fill="#607987" />
        <path d="M214 158v-21a17 17 0 0 1 34 0v21" fill="#607987" />
        <path d="M283 89v73m-13 0h26" stroke="#718591" strokeWidth="3" />
        <path d="m271 61-8 29h40l-8-29z" fill={night ? '#d2a657' : '#a3b4bd'} />
        <path d="M139 14h42" stroke="#7d909a" strokeWidth="4" strokeLinecap="round" />
        <rect
          x="142"
          y="19"
          width="36"
          height="159"
          fill="#fff"
          fillOpacity=".75"
          stroke="#a9bdc8"
        />
        <path d="M149 20v157M160 20v157M171 20v157" stroke="#c4d3dc" strokeWidth="3" />
      </svg>
      <p>
        {night
          ? '실내가 더 밝으면 외부에서 내부 윤곽이 보일 수 있어요.'
          : '낮에 실내에서 느끼는 비침만으로 야간 시선 차단을 판단하기 어려워요.'}
      </p>
    </div>
  );
}

function SheerDiagram() {
  return (
    <figure className="guide-diagram" aria-labelledby="sheer-diagram-caption">
      <figcaption id="sheer-diagram-caption">
        <strong>쉬폰커튼 밤 비침: 낮과 조명 조건이 달라요</strong>
        <span>가운데 흰 띠는 쉬폰커튼입니다. 조명 조건을 비교하는 개념도입니다.</span>
      </figcaption>
      <div className="guide-diagram-scenes">
        <SheerLightingScene night={false} />
        <SheerLightingScene night />
      </div>
      <p className="guide-diagram-note">
        실제 투과율·비침을 측정한 이미지가 아닙니다. 같은 원단도 조명·거리·밀도에 따라 보이는 정도가
        달라지므로 낮과 밤에 각각 확인하세요.
      </p>
    </figure>
  );
}

function VisualFrame({
  title,
  description,
  note,
  children,
}: {
  title: string;
  description: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <figure className="guide-diagram">
      <figcaption>
        <strong>{title}</strong>
        <span>{description}</span>
      </figcaption>
      {children}
      {note && <p className="guide-diagram-note">{note}</p>}
    </figure>
  );
}

function FullnessDiagram() {
  return (
    <VisualFrame
      title="원단의 폭과 커튼이 덮는 폭은 달라요"
      description="가로 200cm를 덮고 원단을 2배 사용하는 상황을 가정한 개념도입니다."
      note="봉제·이음·끝단 처리 등을 제외한 설명용 숫자입니다. 실제 원단량과 완제품 폭의 표시 기준은 제품별로 확인하세요."
    >
      <div className="guide-fullness-step">
        <span>펼친 원단의 가로</span>
        <strong>400cm</strong>
        <div className="guide-fullness-flat" aria-hidden="true" />
      </div>
      <div className="guide-fullness-step">
        <span>주름을 잡아 덮는 가로</span>
        <strong>200cm</strong>
        <div className="guide-fullness-folded" aria-hidden="true" />
      </div>
      <p className="guide-diagram-equation">
        덮을 범위 200cm × 가정한 배수 2 = 펼친 원단 가로 400cm
      </p>
    </VisualFrame>
  );
}

function RailDiagram() {
  return (
    <VisualFrame
      title="한 줄 레일과 두 줄 레일, 움직일 공간이 달라요"
      description="원단을 따로 여닫는 경로를 위에서 내려다본 개념도입니다."
      note="선은 레일의 경로를 단순화한 표시입니다. 실제 간격·고정 부품·허용 무게는 제품과 설치면을 확인해야 합니다."
    >
      <div className="guide-visual-pair">
        <div className="guide-visual-panel">
          <strong>1열 레일</strong>
          <p>한 경로에 커튼을 답니다.</p>
          <div className="guide-rail-plan" aria-label="창 쪽에 레일 경로 한 줄, 아래는 실내">
            <span>창 쪽</span>
            <div className="guide-rail-path">레일 1</div>
            <span>실내 쪽</span>
          </div>
        </div>
        <div className="guide-visual-panel">
          <strong>2열 레일</strong>
          <p>두 원단을 각각 여닫습니다.</p>
          <div className="guide-rail-plan" aria-label="창 쪽 속커튼 경로와 실내 쪽 겉커튼 경로">
            <span>창 쪽</span>
            <div className="guide-rail-path guide-rail-sheer">속커튼 경로</div>
            <div className="guide-rail-path">겉커튼 경로</div>
            <span>실내 쪽</span>
          </div>
        </div>
      </div>
      <p>
        두 줄이어도 원단이 서로 걸리거나 손잡이·조명에 닿을 수 있으므로 움직일 공간을 함께
        확인하세요.
      </p>
    </VisualFrame>
  );
}

function CostDiagram() {
  const items = [
    ['원단', '품명·색상·기능·폭'],
    ['창 크기', '덮을 범위·분할 위치'],
    ['주름', '형태·배수·제작 방식'],
    ['겹수', '속커튼·겉커튼 구성'],
    ['부자재', '레일·봉·브래킷'],
    ['실측·설치', '방문·시공·철거 범위'],
  ];
  return (
    <VisualFrame
      title="견적을 같은 조건으로 맞추는 여섯 항목"
      description="각 항목을 맞춘 뒤 최종 총액과 추가 비용을 비교하세요."
    >
      <ol className="guide-visual-factors">
        {items.map(([title, detail], index) => (
          <li key={title}>
            <span aria-hidden="true">0{index + 1}</span>
            <strong>{title}</strong>
            <p>{detail}</p>
          </li>
        ))}
      </ol>
      <p className="guide-diagram-note">
        항목별 가격 비중을 표시한 도표가 아닙니다. 한 항목이 달라졌을 때 견적을 다시 확인하는
        체크리스트입니다.
      </p>
    </VisualFrame>
  );
}

function QuoteDiagram() {
  return (
    <VisualFrame
      title="‘포함’과 ‘별도’를 먼저 나눠 보세요"
      description="같은 창과 제품을 상담했다고 가정한 작성 예시입니다. 실제 업체 견적이나 가격 비교 결과가 아닙니다."
      note="빈칸이나 설명이 없는 항목은 무료로 추정하지 말고 ‘확인 필요’로 남깁니다. 아래 본문 양식에 실제 받은 내역을 적으세요."
    >
      <div className="guide-visual-pair">
        <div className="guide-visual-panel">
          <strong>견적 A · 기록 예시</strong>
          <dl className="guide-quote-lines">
            <div>
              <dt>원단·제작</dt>
              <dd>포함</dd>
            </div>
            <div>
              <dt>레일 교체</dt>
              <dd>포함</dd>
            </div>
            <div>
              <dt>기존 제품 철거</dt>
              <dd>확인 필요</dd>
            </div>
          </dl>
        </div>
        <div className="guide-visual-panel">
          <strong>견적 B · 기록 예시</strong>
          <dl className="guide-quote-lines">
            <div>
              <dt>원단·제작</dt>
              <dd>포함</dd>
            </div>
            <div>
              <dt>레일 교체</dt>
              <dd className="guide-quote-separate">별도</dd>
            </div>
            <div>
              <dt>기존 제품 철거</dt>
              <dd>확인 필요</dd>
            </div>
          </dl>
        </div>
      </div>
      <p>레일 교체가 별도인 B는 그 비용을 확인한 뒤 전체 내역을 비교해야 합니다.</p>
    </VisualFrame>
  );
}

function FabricStructureDiagram() {
  return (
    <VisualFrame
      title="이중커튼의 층을 구분해 보세요"
      description="실내에서 창을 향해 보는 일반적인 배치 예시입니다."
      note="겉커튼이라는 이름이 암막 성능을 뜻하지는 않습니다. 각 원단의 비침과 무게, 두 층이 움직일 공간을 확인하세요."
    >
      <ol className="guide-fabric-order">
        <li>
          <span>실내</span>
        </li>
        <li className="guide-fabric-outer">
          <strong>겉커튼</strong>
          <span>빛과 외부 시선을 조절할 원단</span>
        </li>
        <li className="guide-fabric-inner">
          <strong>속커튼</strong>
          <span>채광을 위해 사용하는 얇은 원단</span>
        </li>
        <li>
          <span>창</span>
        </li>
      </ol>
    </VisualFrame>
  );
}

function CurtainBlindDiagram() {
  return (
    <VisualFrame
      title="열었을 때 모이는 위치도 비교하세요"
      description="좌우로 여는 커튼과 위로 올리는 가로형 블라인드의 개폐 예시입니다."
      note="모든 제품이 같은 방식으로 움직이지 않습니다. 세로형 블라인드 등은 옆으로 모이며, 제품별 조작 방식과 설치 공간을 확인해야 합니다."
    >
      <div className="guide-visual-pair">
        <div className="guide-visual-panel">
          <strong>커튼 예시</strong>
          <svg
            className="guide-comparison-window"
            viewBox="0 0 260 200"
            role="img"
            aria-label="원단이 왼쪽과 오른쪽으로 모여 창을 여는 커튼"
          >
            <rect
              x="48"
              y="36"
              width="164"
              height="133"
              fill="#deebef"
              stroke="#91a7b4"
              strokeWidth="3"
            />
            <path d="M32 26h196" stroke="#637f8f" strokeWidth="4" />
            <path d="M37 32h35L60 174H37zM188 32h35v142h-23z" fill="#6f899a" />
            <path
              d="M85 94H51m0 0 10-7m-10 7 10 7M175 94h34m0 0-10-7m10 7-10 7"
              stroke="#355e79"
              strokeWidth="3"
              fill="none"
            />
          </svg>
          <p>양옆에 모이는 원단이 문이나 스위치를 가리지 않는지 확인합니다.</p>
        </div>
        <div className="guide-visual-panel">
          <strong>블라인드 예시</strong>
          <svg
            className="guide-comparison-window"
            viewBox="0 0 260 200"
            role="img"
            aria-label="블라인드를 위로 올려 상단에 모은 창"
          >
            <rect
              x="48"
              y="36"
              width="164"
              height="133"
              fill="#deebef"
              stroke="#91a7b4"
              strokeWidth="3"
            />
            <path d="M43 30h174" stroke="#637f8f" strokeWidth="9" />
            <path d="M47 41h166M47 49h166M47 57h166M47 65h166" stroke="#8ba0ac" strokeWidth="6" />
            <path d="M130 128V80m0 0-7 10m7-10 7 10" stroke="#355e79" strokeWidth="3" fill="none" />
          </svg>
          <p>상단에 모이는 부분이 창 열림이나 손잡이에 닿는지 확인합니다.</p>
        </div>
      </div>
    </VisualFrame>
  );
}

function LivingRoomDiagram() {
  return (
    <VisualFrame
      title="창·TV·출입구를 한 장에 표시하세요"
      description="위에서 내려다본 가상 거실 배치도입니다. 실제 집의 구조와 빛 방향을 기록해 바꿔 사용하세요."
      note="그림의 선은 확인할 관계를 설명하며 광학 측정이나 TV 반사 정도를 재현하지 않습니다."
    >
      <svg
        className="guide-diagram-svg"
        viewBox="0 0 400 260"
        role="img"
        aria-labelledby="living-plan-title living-plan-desc"
      >
        <title id="living-plan-title">거실 창, TV, 발코니 문 확인 위치</title>
        <desc id="living-plan-desc">
          왼쪽 창과 커튼은 1번, 오른쪽 TV는 2번, 아래쪽 발코니 출입구는 3번입니다. 빛이 불편한
          시간과 커튼을 모아둘 위치를 함께 기록합니다.
        </desc>
        <rect
          x="36"
          y="25"
          width="330"
          height="210"
          fill="#f0f4f6"
          stroke="#99adb8"
          strokeWidth="3"
        />
        <path d="M36 52v120" stroke="#c1dce6" strokeWidth="9" />
        <path d="M55 47v132" stroke="#7896a7" strokeWidth="6" />
        <rect x="273" y="49" width="73" height="16" rx="3" fill="#526e80" />
        <rect x="222" y="156" width="102" height="42" rx="8" fill="#b4c5cb" />
        <path d="M136 235h72" stroke="#fcfcfa" strokeWidth="7" />
        <path
          d="M136 233v-52q65 0 72 52"
          fill="none"
          stroke="#8099a5"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        <path d="M77 86h179m0 0-10-7m10 7-10 7" fill="none" stroke="#ae8f50" strokeWidth="3" />
        <DiagramNumber x={54} y={109} value={1} />
        <DiagramNumber x={310} y={68} value={2} />
        <DiagramNumber x={172} y={231} value={3} />
      </svg>
      <ol className="guide-diagram-notes">
        <li>
          <strong>창과 원단</strong>
          <span>햇빛이 들어오는 시간, 필요한 채광을 적습니다.</span>
        </li>
        <li>
          <strong>TV 화면</strong>
          <span>반사가 불편한 시간과 앉는 위치를 적습니다.</span>
        </li>
        <li>
          <strong>발코니 출입구</strong>
          <span>여닫는 방향과 원단을 모아둘 곳을 표시합니다.</span>
        </li>
      </ol>
    </VisualFrame>
  );
}

function NewlywedDiagram() {
  const rooms = [
    { name: '거실', tone: '아이보리 + 청회색', need: '낮 채광 · 저녁 시선 차단', color: '#718795' },
    {
      name: '침실',
      tone: '아이보리 + 차분한 청회색',
      need: '수면 시간의 빛 조절',
      color: '#4f697c',
    },
    {
      name: '작은방',
      tone: '아이보리 + 세이지',
      need: '책상 · 수납장과 개폐 간섭 확인',
      color: '#8b9c88',
    },
  ];
  return (
    <VisualFrame
      title="색감은 연결하고, 기능은 방마다 정하세요"
      description="공간별 요구사항을 나누는 가상의 조합 예시입니다."
      note="색상 표시는 실제 원단 샘플이 아닙니다. 같은 색 계열도 제품과 조명에 따라 다르게 보입니다."
    >
      <div className="guide-room-palette">
        {rooms.map((room) => (
          <div key={room.name}>
            <div className="guide-room-swatches" aria-hidden="true">
              <span />
              <span style={{ background: room.color }} />
            </div>
            <strong>{room.name}</strong>
            <p>{room.tone}</p>
            <p>{room.need}</p>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}

function MoveInDiagram() {
  const steps = [
    ['현장 일정 확인', '출입 가능일과 마감 공사 일정을 확인합니다.'],
    ['실측·구성 상담', '창 치수와 원단·레일·설치 조건을 정리합니다.'],
    ['제작 내역 확정', '최종 치수·제품·금액과 설치 가능일을 확인합니다.'],
    ['설치·상태 확인', '가구 반입과 작업 공간을 조율하고 개폐 상태를 확인합니다.'],
  ];
  return (
    <VisualFrame
      title="입주 전 커튼 준비, 확인한 날짜로 이어가세요"
      description="정해진 소요 일수 대신 다음 단계로 넘어갈 조건을 정리한 순서도입니다."
      note="공사나 제품 구성이 바뀌면 실측·제작·설치 일정을 다시 확인하세요. 업체별 제작 기간을 보장하는 일정표가 아닙니다."
    >
      <ol className="guide-move-timeline">
        {steps.map(([title, body], index) => (
          <li key={title}>
            <span className="guide-timeline-number" aria-hidden="true">
              {index + 1}
            </span>
            <div>
              <strong>{title}</strong>
              <p>{body}</p>
              <span className="guide-timeline-date">확인한 날짜: __________</span>
            </div>
          </li>
        ))}
      </ol>
    </VisualFrame>
  );
}

export function GuideDiagram({ id, slug }: { id?: GuideVisualId; slug?: string }) {
  const visualId = id ?? slug;
  const visuals: Record<GuideVisualId, ReactNode> = {
    'measurement-basics': <MeasurementDiagram />,
    'measurement-fullness': <FullnessDiagram />,
    'rail-check': <RailDiagram />,
    'curtain-cost-factors': <CostDiagram />,
    'quote-comparison': <QuoteDiagram />,
    'fabric-layers': <SheerDiagram />,
    'fabric-structure': <FabricStructureDiagram />,
    'curtain-vs-blind': <CurtainBlindDiagram />,
    'living-room-light': <LivingRoomDiagram />,
    'bedroom-blackout': <BlackoutDiagram />,
    'newlywed-room-plan': <NewlywedDiagram />,
    'move-in-preparation': <MoveInDiagram />,
  };
  if (!visualId || !(visualId in visuals)) return null;
  return (
    <div className="guide-visual" data-guide-visual={visualId}>
      {visuals[visualId as GuideVisualId]}
    </div>
  );
}
import type { ReactNode } from 'react';
import type { GuideVisualId } from '@/lib/guide-visuals';
