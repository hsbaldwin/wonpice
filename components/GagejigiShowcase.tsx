import { ExternalLink, Check, ShieldCheck, Clock, RefreshCcw, Bell } from "lucide-react";

export default function GagejigiShowcase() {
  return (
    <section className="py-12 sm:py-16 bg-slate-100/70 border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <span>자사몰 전문 파트너</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            올바른 선택을 현실로 만드는, <span className="text-emerald-700">&apos;가게지기&apos;</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
            &quot;자사몰, 만들고 지켜 드립니다.&quot; 농가·식품·패션 업종에 맞춘 자사몰을 3주 만에 열어 드리고, 결제·배송·회원·장애 대응까지 든든하게 맡습니다.
          </p>
        </div>

        {/* Live Demo Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {/* Food Demo */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                  식품 · 농가 전용 테마
                </span>
                <span className="text-xs text-slate-400">실제 작동 중인 데모</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">제철곳간</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                산지직송 농가와 수제 먹거리를 위한 맞춤 쇼핑몰. 중량 옵션 선택, 오늘 출고 마감 시계, 냉장·냉동 보관 안내 등 식품 판매에 꼭 필요한 기능이 기본 탑재되어 있습니다.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>중량(kg/g)별 맞춤 옵션 및 산지 스토리텔링</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>신선식품 출고 마감 타이머 &amp; 배송 안내</span>
                </div>
              </div>
            </div>
            <a
              href="https://shop-demo-food-store-950864605215.asia-northeast3.run.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
            >
              <span>제철곳간 데모몰 직접 체험하기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Fashion Demo */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60">
                  패션 · 디자이너 브랜드 테마
                </span>
                <span className="text-xs text-slate-400">실제 작동 중인 데모</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">온결</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                브랜드 감성을 온전히 살리는 세로형 룩북 갤러리, 상세 사이즈 가이드, 모델 착용컷 전환 등 패션 의류 고객의 신뢰도를 극대화하는 구성입니다.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>세로형 고화질 룩북 &amp; 모바일 최적화</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>정밀 사이즈 가이드 &amp; 착용컷 전환 뷰어</span>
                </div>
              </div>
            </div>
            <a
              href="https://shop-store-950864605215.asia-northeast3.run.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
            >
              <span>온결 데모몰 직접 체험하기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Operational Reliability Features */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-8">
          <h4 className="text-sm font-bold text-slate-900 mb-4 text-center">
            가게지기가 약속하는 4대 안심 운영 케어
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-xs font-bold text-slate-900">3주 초고속 오픈</div>
              <div className="text-[11px] text-slate-500 mt-1">계약부터 PG 심사·오픈까지 전 과정 밀착 지원</div>
            </div>
            <div className="p-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-xs font-bold text-slate-900">수수료 0%</div>
              <div className="text-[11px] text-slate-500 mt-1">PG 결제 수수료 외 추가 플랫폼 수수료 없음</div>
            </div>
            <div className="p-3">
              <Bell className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-xs font-bold text-slate-900">24시간 장애 모니터링</div>
              <div className="text-[11px] text-slate-500 mt-1">10분마다 접속 확인 및 이상 발생 시 즉시 복구</div>
            </div>
            <div className="p-3">
              <RefreshCcw className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-xs font-bold text-slate-900">매일 자동 백업</div>
              <div className="text-[11px] text-slate-500 mt-1">주문·회원·상품 데이터 안전 분리 및 백업</div>
            </div>
          </div>
        </div>

        {/* Big Outbound CTA Banner */}
        <div className="text-center">
          <a
            href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_banner"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-emerald-600/20 transition-all group"
          >
            <span>가게지기 공식 사이트에서 무료 상담 및 견적 확인하기</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <p className="text-[11px] text-slate-500 mt-2">
            ※ 상담 신청 시 1영업일 안에 전문 매니저가 직접 연락드립니다.
          </p>
        </div>
      </div>
    </section>
  );
}
