import { Wheat, CheckCircle2, ArrowRight, ShieldAlert, Sparkles, Box, Mail, Users, TrendingUp } from "lucide-react";

export default function FarmD2cGuide() {
  return (
    <article className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Editorial Section 1: Why D2C is Essential */}
        <section id="why-d2c" className="space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Wheat className="w-3.5 h-3.5" />
            <span>판로 구조 혁신 가이드 01</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-snug">
            왜 지금 농가 직거래 쇼핑몰(D2C)이 필수인가?
            <br />
            <span className="text-emerald-700">공판장 헐값 경매와 플랫폼 최저가 치킨게임의 현실</span>
          </h2>

          <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              대한민국의 수많은 농업인과 과수원 대표님들이 1년 365일 비바람을 맞으며 정직하게 농사를 짓고도, 수확철마다 깊은 한숨을 쉽니다. 
              풍년이 들면 전국 출하량이 몰려 <strong>공판장 경락 시세가 폭락</strong>하고, 상자비·운임·상장 수수료를 제하고 나면 손에 쥐는 것이 없습니다. 반대로 흉년이 들면 가격은 오르지만 팔 물량이 없어 수익을 보전하기 어렵습니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-5 text-rose-950">
                <div className="flex items-center gap-2 font-bold text-rose-800 text-sm mb-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>기존 공판장·오픈마켓 판매의 악순환</span>
                </div>
                <ul className="text-xs text-rose-900 space-y-2 leading-relaxed">
                  <li>• <strong>가격 결정권 상실:</strong> 농부가 아닌 경매사와 플랫폼 최저가 알고리즘이 내 농산물 가격을 결정함.</li>
                  <li>• <strong>매출의 8~13% 수수료 지출:</strong> 팔릴 때마다 떼이는 중개 수수료가 연간 수백~수천만 원에 달함.</li>
                  <li>• <strong>고객 데이터 차단:</strong> 구매자 전화번호가 가상번호로 가려져 재구매 유도가 불가능함.</li>
                </ul>
              </div>

              <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-5 text-emerald-950">
                <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm mb-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>농가 직거래 쇼핑몰(D2C)이 주는 올바른 승리</span>
                </div>
                <ul className="text-xs text-emerald-900 space-y-2 leading-relaxed">
                  <li>• <strong>정당한 제값 수취:</strong> 품질을 알아주는 소비자에게 농부가 직접 정한 정가로 판매하여 마진율 극대화.</li>
                  <li>• <strong>수수료 2.5% 최소화:</strong> 중간 유통 마진 없이 투명한 카드 결제 수수료만 지출되어 순이익 보존.</li>
                  <li>• <strong>평생 고객 자산화:</strong> 고객 연락처와 주소를 직접 보유하여 매년 수확기마다 품절을 기록하는 팬덤 확보.</li>
                </ul>
              </div>
            </div>

            <p>
              <strong>‘올바른 선택에 의한 승리’</strong>는 남을 짓밟고 이기는 것이 아닙니다. 
              대기업 유통 공룡이나 최저가 파괴 셀러와 가격 경쟁을 벌이는 대신, 
              <strong>“우리 밭에서 갓 딴 신선함과 농부의 정성”</strong>을 인정해 주는 500명에서 1,000명의 단골 가구를 내 쇼핑몰로 모으는 것 — 이것이 농가가 영속적으로 자립할 수 있는 가장 정직하고 확실한 길입니다.
            </p>
          </div>
        </section>

        {/* Editorial Section 2: 4-Step Co-existence Roadmap */}
        <section id="roadmap" className="space-y-6 pt-8 border-t border-stone-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>실전 로드맵 02</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-snug">
            스마트스토어와 자사몰의 완벽한 상생 병행 공식
            <br />
            <span className="text-emerald-700">택배 상자 편지와 QR 쿠폰으로 단골 30%를 전환하는 4단계 실전법</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            농가에서 흔히 저지르는 실수는 “자사몰을 만들면 스마트스토어를 즉시 닫아야 한다”고 생각하는 것입니다. 
            가장 성공적인 농가들은 <strong>스마트스토어를 신규 고객 발굴용 입구로 쓰고, 자사몰을 평생 단골 저장소로 쓰는 상생 모델</strong>을 운영합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  1단계: 신규 유입
                </span>
                <span className="text-xs text-stone-400">포털 검색 활용</span>
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">
                네이버 스마트스토어로 첫 고객을 만난다
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                네이버 쇼핑 검색과 선물하기 기능을 통해 전국 소비자가 우리 농장 과일과 농산물의 첫 맛을 보게 합니다. 이 단계에서는 플랫폼 수수료를 마케팅 비용으로 인정합니다.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-300 shadow-xs relative ring-1 ring-emerald-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  2단계: 택배 상자 전환 (핵심!)
                </span>
                <span className="text-xs text-emerald-600 font-semibold">전환율 25~35%</span>
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">
                택배 상자 안에 ‘농부의 편지’와 ‘자사몰 QR’을 동봉한다
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                과일 상자를 열었을 때 감동을 주는 산지 이야기 엽서와 함께 <strong>“우리 농장 공식 쇼핑몰 첫 구매 3,000원 쿠폰 QR 코드”</strong>를 넣습니다. 이미 맛을 확인한 소비자는 재구매 시 10명 중 3명이 자사몰로 유입됩니다.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                  3단계: 고객 DB 축적
                </span>
                <span className="text-xs text-stone-400">자사몰 회원가입</span>
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">
                고객 전화번호와 주소를 100% 농가 자산으로 흡수한다
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                쿠팡이나 네이버에서는 볼 수 없었던 고객의 진짜 연락처가 농장 관리자 화면에 쌓입니다. 주문할 때마다 자동으로 포인트가 적립되어 이탈하지 않는 잠금(Lock-in) 효과가 생깁니다.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                  4단계: 사전 예약 완판
                </span>
                <span className="text-xs text-stone-400">광고비 0원</span>
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">
                수확 2주 전, 카카오 알림톡으로 수확 전 전량 품절 달성
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                출혈 광고비 한 푼 들이지 않고, 축적된 1,000명의 단골에게 “올해 첫 햇사과 수확 사전 예약” 메시지를 발송합니다. 수확하기도 전에 30~50%의 물량이 선주문으로 완판됩니다.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Section 3: 3 Essential Features for Farm Store */}
        <section id="features" className="space-y-6 pt-8 border-t border-stone-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Box className="w-3.5 h-3.5" />
            <span>기능 설계 가이드 03</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-snug">
            일반 쇼핑몰과 다르다!
            <br />
            <span className="text-emerald-700">농산물 직거래 쇼핑몰에 반드시 들어가야 할 3대 특화 기능</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            옷이나 공산품을 파는 일반 쇼핑몰 솔루션으로는 농산물 고객을 만족시킬 수 없습니다. 
            신선도와 중량이 생명인 농식품 구매 고객의 불안을 잠재우고 신뢰를 주는 3가지 필수 기능이 반드시 탑재되어야 합니다.
          </p>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col sm:flex-row gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 font-black text-lg flex items-center justify-center shrink-0">
                01
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-stone-900 text-base">
                  중량(kg) 및 과수(개수) 옵션 분기 체계
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  3kg 가정용 실속형, 5kg 선물용 특과, 10kg 알뜰 박스 등 농산물의 규격과 크기별로 가격과 재고를 분리할 수 있어야 합니다. 고객이 원하는 용도(자가 소비 vs 명절 선물)에 맞추어 직관적으로 옵션을 고를 수 있도록 설계됩니다.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col sm:flex-row gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 font-black text-lg flex items-center justify-center shrink-0">
                02
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-stone-900 text-base">
                  당일 수확 출고 마감 카운트다운 타이머
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  “오늘 오후 2시까지 주문하시면 아침에 딴 신선한 농산물을 오늘 바로 산지 발송합니다.”라는 실시간 마감 타이머가 상품 페이지 상단에 노출됩니다. 산지 직송의 신선함을 극대화하고 구매 결정을 망설이는 소비자의 당일 결제를 유도합니다.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col sm:flex-row gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 font-black text-lg flex items-center justify-center shrink-0">
                03
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-stone-900 text-base">
                  신선·냉장 포장 안내 및 후숙·보관 가이드 블록
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  아이스박스/에어캡 완충재 포장 사진과 함께 수령 후 과일 보관법, 적정 후숙 기간을 상세 페이지 하단에 표준 블록으로 제공합니다. 배송 과정 중 발생할 수 있는 고객 오해를 사전 방지하여 농가의 반품 및 CS 문의를 80% 이상 줄여줍니다.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
}
