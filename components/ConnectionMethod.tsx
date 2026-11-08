import { TrendingUp, Mail, Users, Bell } from "lucide-react";

export default function ConnectionMethod() {
  return (
    <section id="connection" className="py-20 sm:py-28 bg-white border-b border-[#e8eaed]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-14">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f1f3f4] text-[#3c4043] text-xs font-medium mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-[#1e8e3e]" />
            <span>실전 로드맵</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal text-[#202124] tracking-tight mb-4 leading-snug">
            스마트스토어로 만나고, 자사몰로 이어지는 4단계 연결 공식
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
            스마트스토어를 닫을 필요가 없습니다. 
            신규 고객은 익숙한 플랫폼에서 만나고, 택배 상자에 담긴 농부의 진심으로 평생 단골을 자사몰로 초대합니다.
          </p>
        </div>

        {/* 4 Step Cards in Google Minimalist Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Step 1 */}
          <div className="bg-[#f8f9fa] p-7 rounded-3xl border border-[#dadce0] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#137333] bg-[#e6f4ea] px-3 py-1 rounded-full">
                1단계: 첫 만남
              </span>
              <span className="text-xs text-[#5f6368]">검색과 선물하기</span>
            </div>
            <h3 className="font-medium text-[#202124] text-base">
              스마트스토어로 새로운 소비자를 만납니다
            </h3>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              네이버 쇼핑 검색을 통해 전국 소비자가 우리 농장 농산물의 첫 맛을 보게 합니다. 진입 장벽이 낮아 신규 유입 창구로 이상적입니다.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#f8f9fa] p-7 rounded-3xl border-2 border-[#1e8e3e] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#b06000] bg-[#fef7e0] px-3 py-1 rounded-full">
                2단계: 마음 전달 (핵심)
              </span>
              <span className="text-xs text-[#137333] font-medium">전환율 25~35%</span>
            </div>
            <h3 className="font-medium text-[#202124] text-base">
              택배 상자 안에 정직한 편지와 자사몰 QR을 동봉합니다
            </h3>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              과일 상자를 열었을 때 감동을 주는 농부의 산지 이야기와 함께 <strong>자사몰 첫 구매 혜택 QR</strong>을 넣습니다. 맛을 확인한 고객은 자연스럽게 자사몰로 이동합니다.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#f8f9fa] p-7 rounded-3xl border border-[#dadce0] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#1a73e8] bg-[#e8f0fe] px-3 py-1 rounded-full">
                3단계: 단골 저장
              </span>
              <span className="text-xs text-[#5f6368]">회원 가입</span>
            </div>
            <h3 className="font-medium text-[#202124] text-base">
              소중한 고객 연락처가 농장의 영구 자산이 됩니다
            </h3>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              외부 플랫폼에서는 볼 수 없었던 고객 연락처를 농가가 직접 소유합니다. 주문할 때마다 포인트가 쌓여 단골 관계가 견고해집니다.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#f8f9fa] p-7 rounded-3xl border border-[#dadce0] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#202124] bg-[#f1f3f4] px-3 py-1 rounded-full">
                4단계: 수확기 완판
              </span>
              <span className="text-xs text-[#5f6368]">광고비 0원</span>
            </div>
            <h3 className="font-medium text-[#202124] text-base">
              수확 2주 전, 단골 알림으로 사전 예약 완판을 달성합니다
            </h3>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              출혈 광고 없이 모인 단골 고객에게 카카오 알림톡으로 햇수확 사전 예약 소식을 전합니다. 매년 수확기마다 품절을 기록하는 든든한 기반이 완성됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
