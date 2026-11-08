import { Heart, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export default function ValueStory() {
  return (
    <section id="philosophy" className="py-20 sm:py-28 bg-[#f8f9fa] border-b border-[#e8eaed]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#dadce0] text-[#3c4043] text-xs font-medium mb-4">
            <Heart className="w-3.5 h-3.5 text-[#1e8e3e]" />
            <span>가치와 철학</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal text-[#202124] tracking-tight mb-4 leading-snug">
            왜 농가에게 독립된 직거래 공간이 필요할까요?
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
            거창한 경쟁에서 승리하려는 것이 아닙니다.
            <br />
            땀 흘려 지은 농산물이 정당한 가치를 인정받고, 소비자와 신뢰로 이어지는 직거래의 본질을 되찾는 일입니다.
          </p>
        </div>

        {/* Narrative Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-[#dadce0] shadow-xs space-y-4">
            <span className="text-xs font-medium text-[#5f6368] bg-[#f1f3f4] px-3 py-1 rounded-full">
              플랫폼 최저가 경쟁의 현실
            </span>
            <h3 className="font-medium text-[#202124] text-lg">
              농부의 얼굴이 사라진 익명의 상품
            </h3>
            <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
              10원 차이에 소비자가 등을 돌리고, 구매자의 연락처는 가상번호로 가려집니다. 
              아무리 정성을 들여 길러도 결국 남는 것은 매년 불안하게 요동치는 시세와 노출 알고리즘뿐입니다.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#ceead6] shadow-xs space-y-4">
            <span className="text-xs font-medium text-[#137333] bg-[#e6f4ea] px-3 py-1 rounded-full">
              직거래 자사몰이 만드는 변화
            </span>
            <h3 className="font-medium text-[#202124] text-lg">
              신뢰로 단단해지는 우리 농장만의 공간
            </h3>
            <p className="text-xs sm:text-sm text-[#3c4043] leading-relaxed">
              우리 밭의 흙과 햇살, 농부의 이야기가 있는 곳에서는 가격을 깎지 않아도 소비자가 기꺼이 제값을 지불합니다. 
              한 번 맛을 본 고객은 해마다 수확 소식을 기다리는 평생 단골이 됩니다.
            </p>
          </div>
        </div>

        {/* Quiet Google Ethos Callout */}
        <div className="p-7 rounded-3xl bg-white border border-[#dadce0] text-center max-w-2xl mx-auto">
          <p className="text-sm sm:text-base text-[#202124] font-normal leading-relaxed">
            “진정한 승리는 남과의 경쟁에서 이기는 것이 아니라, 
            <br className="hidden sm:inline" />
            내 농산물의 진가를 알아주는 <strong>정직한 단골들과 함께</strong> 지속 가능한 농사를 짓는 것입니다.”
          </p>
        </div>
      </div>
    </section>
  );
}
