import { TrendingUp } from "lucide-react";

export default function ConnectionMethod() {
  return (
    <section id="connection" className="py-24 sm:py-32 lg:py-36 bg-white border-b border-[#e8eaed]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 sm:space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f1f3f4] text-[#3c4043] text-xs sm:text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 text-[#1e8e3e]" />
            <span>실전 로드맵</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#202124] tracking-tight mb-6 leading-tight">
            스마트스토어로 만나고, 자사몰로 이어지는 4단계 공식
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5f6368] leading-relaxed">
            스마트스토어를 닫을 필요가 없습니다. 
            신규 고객은 익숙한 플랫폼에서 만나고, 택배 상자에 담긴 농부의 진심으로 평생 단골을 자사몰로 초대합니다.
          </p>
        </div>

        {/* 4 Step Horizontal Progressive Grid spanning full 1280px */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-[#f8f9fa] p-8 sm:p-9 rounded-[32px] border border-[#dadce0] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#137333] bg-[#e6f4ea] px-3.5 py-1 rounded-full">
                  1단계: 첫 만남
                </span>
                <span className="text-xs text-[#5f6368]">검색과 노출</span>
              </div>
              <h3 className="font-medium text-[#202124] text-lg sm:text-xl leading-snug">
                스마트스토어로 새로운 소비자를 만납니다
              </h3>
              <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                네이버 쇼핑 검색을 통해 전국 소비자가 우리 농장 농산물의 첫 맛을 보게 합니다. 진입 장벽이 낮아 신규 유입 창구로 이상적입니다.
              </p>
            </div>
            <div className="text-[11px] text-[#5f6368] pt-2 border-t border-[#dadce0]">
              역할: 첫 맛의 경험 제공
            </div>
          </div>

          {/* Step 2 (Core Highlight) */}
          <div className="bg-[#f8f9fa] p-8 sm:p-9 rounded-[32px] border-2 border-[#1e8e3e] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#b06000] bg-[#fef7e0] px-3.5 py-1 rounded-full">
                  2단계: 마음 전달
                </span>
                <span className="text-xs text-[#137333] font-medium">전환율 25~35%</span>
              </div>
              <h3 className="font-medium text-[#202124] text-lg sm:text-xl leading-snug">
                택배 상자에 편지와 자사몰 QR을 넣습니다
              </h3>
              <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                과일 상자를 열었을 때 감동을 주는 농부의 산지 이야기와 함께 <strong>자사몰 첫 구매 혜택 QR</strong>을 동봉합니다.
              </p>
            </div>
            <div className="text-[11px] text-[#137333] font-medium pt-2 border-t border-[#ceead6]">
              핵심: 10명 중 3명의 단골 전환
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#f8f9fa] p-8 sm:p-9 rounded-[32px] border border-[#dadce0] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#1a73e8] bg-[#e8f0fe] px-3.5 py-1 rounded-full">
                  3단계: 단골 저장
                </span>
                <span className="text-xs text-[#5f6368]">회원 가입</span>
              </div>
              <h3 className="font-medium text-[#202124] text-lg sm:text-xl leading-snug">
                고객 연락처가 농장의 영구 자산이 됩니다
              </h3>
              <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                플랫폼에서는 가려졌던 고객 연락처를 농가가 직접 소유합니다. 주문할 때마다 적립 혜택이 이어집니다.
              </p>
            </div>
            <div className="text-[11px] text-[#5f6368] pt-2 border-t border-[#dadce0]">
              결과: 독점 고객 DB 확보
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-[#f8f9fa] p-8 sm:p-9 rounded-[32px] border border-[#dadce0] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#202124] bg-[#f1f3f4] px-3.5 py-1 rounded-full">
                  4단계: 수확기 완판
                </span>
                <span className="text-xs text-[#5f6368]">광고비 0원</span>
              </div>
              <h3 className="font-medium text-[#202124] text-lg sm:text-xl leading-snug">
                수확 2주 전, 단골 예약으로 완판 달성
              </h3>
              <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                축적된 단골에게 카카오 알림톡으로 햇수확 사전 예약 소식을 전해, 광고 없이 매년 완판을 달성합니다.
              </p>
            </div>
            <div className="text-[11px] text-[#5f6368] pt-2 border-t border-[#dadce0]">
              효과: 매년 수확 전 전량 선판매
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
