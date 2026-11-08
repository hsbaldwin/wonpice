import { Heart } from "lucide-react";

export default function ValueStory() {
  return (
    <section id="philosophy" className="py-24 sm:py-32 lg:py-36 bg-[#f8f9fa] border-b border-[#e8eaed]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 sm:space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#dadce0] text-[#3c4043] text-xs sm:text-sm font-medium mb-6">
            <Heart className="w-4 h-4 text-[#1e8e3e]" />
            <span>가치와 철학</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#202124] tracking-tight mb-6 leading-tight">
            왜 농가에게 독립된 직거래 공간이 필요할까요?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5f6368] leading-relaxed">
            거창한 경쟁에서 승리하려는 것이 아닙니다.
            <br />
            땀 흘려 지은 농산물이 정당한 가치를 인정받고, 소비자와 신뢰로 이어지는 직거래의 본질을 되찾는 일입니다.
          </p>
        </div>

        {/* Narrative Comparison in 1280px Scale */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 sm:p-14 rounded-[36px] border border-[#dadce0] shadow-xs space-y-5">
            <span className="text-xs sm:text-sm font-medium text-[#5f6368] bg-[#f1f3f4] px-4 py-1.5 rounded-full inline-block">
              플랫폼 최저가 경쟁의 현실
            </span>
            <h3 className="font-medium text-[#202124] text-xl sm:text-2xl">
              농부의 얼굴이 사라진 익명의 상품
            </h3>
            <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
              10원 차이에 소비자가 등을 돌리고, 구매자의 연락처는 가상번호로 가려집니다. 
              아무리 정성을 들여 길러도 결국 남는 것은 매년 불안하게 요동치는 시세와 노출 알고리즘뿐입니다.
            </p>
          </div>

          <div className="bg-white p-10 sm:p-14 rounded-[36px] border border-[#ceead6] shadow-xs space-y-5">
            <span className="text-xs sm:text-sm font-medium text-[#137333] bg-[#e6f4ea] px-4 py-1.5 rounded-full inline-block">
              직거래 자사몰이 만드는 변화
            </span>
            <h3 className="font-medium text-[#202124] text-xl sm:text-2xl">
              신뢰로 단단해지는 우리 농장만의 공간
            </h3>
            <p className="text-sm sm:text-base text-[#3c4043] leading-relaxed">
              우리 밭의 흙과 햇살, 농부의 이야기가 있는 곳에서는 가격을 깎지 않아도 소비자가 기꺼이 제값을 지불합니다. 
              한 번 맛을 본 고객은 해마다 수확 소식을 기다리는 평생 단골이 됩니다.
            </p>
          </div>
        </div>

        {/* Google Ethos Callout in Large Scale */}
        <div className="p-10 sm:p-12 rounded-[36px] bg-white border border-[#dadce0] text-center max-w-4xl mx-auto shadow-xs">
          <p className="text-base sm:text-xl text-[#202124] font-normal leading-relaxed">
            “진정한 승리는 남과의 경쟁에서 이기는 것이 아니라, 
            <br className="hidden sm:inline" />
            내 농산물의 진가를 알아주는 <strong>정직한 단골들과 함께</strong> 지속 가능한 농사를 짓는 것입니다.”
          </p>
        </div>
      </div>
    </section>
  );
}
