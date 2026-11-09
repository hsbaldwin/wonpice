import {
  Layers,
  CreditCard,
  Globe,
  Server,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Lock,
  Activity,
  Database,
  GraduationCap,
  ArrowDown,
} from "lucide-react";

export default function SolutionInfrastructure() {
  return (
    <section id="infrastructure" className="py-24 sm:py-32 lg:py-36 bg-white border-b border-[#e8eaed]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 sm:space-y-20">
        {/* Header with Numerological Storytelling (The Tetrad of Foundation) */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f1f3f4] text-[#3c4043] text-xs sm:text-sm font-medium mb-6">
            <Server className="w-4 h-4 text-[#1a73e8]" />
            <span className="font-mono">The Tetrad of Foundation · 4대 인프라 기반</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#202124] tracking-tight mb-6 leading-tight">
            쇼핑몰 오픈에 필요한 모든 기술을 원스톱으로 제공합니다
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5f6368] leading-relaxed">
            복잡한 PG사 가맹 계약, 도메인 DNS 설정, 상품 100개 등록, 일일 백업까지.
            <br className="hidden sm:inline" />
            대표님은 판매에만 집중하실 수 있도록 사각(四角)의 흔들림 없는 4대 인프라 토대를 솔루션이 책임집니다.
          </p>
        </div>

        {/* Asymmetric Bento Grid spanning 12 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 lg:gap-8">
          {/* Card 1: Hero Bento (7 cols desktop) */}
          <div className="col-span-1 sm:col-span-12 lg:col-span-7 bg-[#f8f9fa] p-8 sm:p-9 lg:p-10 rounded-[32px] border border-[#dadce0] shadow-xs flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center shrink-0">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-medium text-[#1a73e8] bg-[#e8f0fe] px-3 py-1 rounded-full border border-[#d2e3fc]">
                    Foundation I · 데이터 (Data)
                  </span>
                </div>
                <h3 className="font-medium text-[#202124] text-xl sm:text-2xl">
                  기존 상품 100개 등록 대행
                </h3>
                <p className="text-sm text-[#5f6368] leading-relaxed">
                  스마트스토어나 카페24의 상품 엑셀 파일만 전달해 주시면, 상품명·옵션·상세페이지 이미지까지 비즈니스 플랜 기준 100개까지 일괄 등록해 드립니다.
                </p>
              </div>

              {/* Graphic: Excel pill, 3-stage pipeline & time saved */}
              <div className="space-y-3.5 pt-2">
                {/* Excel export chip */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#dadce0] text-xs font-mono text-[#3c4043] shadow-xs">
                    <FileSpreadsheet className="w-4 h-4 text-[#137333]" />
                    <span>products_catalog_export.xlsx</span>
                    <span className="text-[11px] font-sans text-[#137333] font-medium bg-[#e6f4ea] px-2 py-0.5 rounded-full">
                      100개 품목 자동 매핑
                    </span>
                  </div>
                </div>

                {/* 3-stage migration pipeline */}
                <div className="bg-white rounded-2xl border border-[#dadce0] p-4 sm:p-5 shadow-xs space-y-3">
                  <div className="text-xs font-medium text-[#5f6368]">원클릭 3단계 마이그레이션 파이프라인</div>
                  <div className="flex flex-col sm:flex-row gap-2 text-center text-xs">
                    <div className="flex-1 p-3 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex flex-col items-center justify-center">
                      <span className="text-[10px] text-[#5f6368] font-mono">01. 원본 추출</span>
                      <span className="font-medium text-[#202124] mt-0.5">스토어·카페24</span>
                      <span className="text-[11px] text-[#5f6368]">엑셀 원본 파일</span>
                    </div>
                    <div className="flex-1 p-3 rounded-xl bg-[#e8f0fe] border border-[#d2e3fc] flex flex-col items-center justify-center text-[#1a73e8]">
                      <span className="text-[10px] text-[#1a73e8] font-mono">02. 자동 변환 엔진</span>
                      <span className="font-medium text-[#1a73e8] mt-0.5">WonPice Engine</span>
                      <span className="text-[11px] text-[#1967d2]">규격화 &amp; 이미지 최적화</span>
                    </div>
                    <div className="flex-1 p-3 rounded-xl bg-[#e6f4ea] border border-[#ceead6] flex flex-col items-center justify-center text-[#137333]">
                      <span className="text-[10px] text-[#137333] font-mono">03. 자사몰 즉시 런칭</span>
                      <span className="font-medium text-[#137333] mt-0.5">자사몰 즉시 런칭</span>
                      <span className="text-[11px] text-[#188038]">100개 상품 완료</span>
                    </div>
                  </div>
                </div>

                {/* Time saved comparison bar */}
                <div className="bg-white rounded-2xl border border-[#dadce0] p-4 sm:p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#202124]">상품 100개 등록 소요시간 비교</span>
                    <span className="font-medium text-[#1a73e8]">대량 등록 수작업 시간 절감</span>
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-[#5f6368]">
                        <span>기존 수작업 등록 시</span>
                        <span>약 40시간 소요</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#f1f3f4] overflow-hidden">
                        <div className="h-full bg-[#dadce0] rounded-full w-full" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-[#1a73e8] font-medium">
                        <span>WonPice 대행 솔루션</span>
                        <span>등록 대행 지원 (기본 100개 포함)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#e8f0fe] overflow-hidden">
                        <div className="h-full bg-[#1a73e8] rounded-full w-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs font-medium text-[#1a73e8] pt-4 border-t border-[#dadce0] flex items-center justify-between">
              <span>수작업 부담 없는 일괄 등록 지원</span>
              <span className="text-[#5f6368] font-normal">비즈니스 플랜 기본 제공</span>
            </div>
          </div>

          {/* Card 2: PG Payments Bento (5 cols desktop) */}
          <div className="col-span-1 sm:col-span-6 lg:col-span-5 bg-[#f8f9fa] p-8 sm:p-9 lg:p-10 rounded-[32px] border border-[#dadce0] shadow-xs flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#e6f4ea] text-[#137333] flex items-center justify-center shrink-0">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-medium text-[#137333] bg-[#e6f4ea] px-3 py-1 rounded-full border border-[#ceead6]">
                    Foundation II · 결제 (Exchange)
                  </span>
                </div>
                <h3 className="font-medium text-[#202124] text-xl sm:text-2xl">
                  토스페이먼츠 간편결제 연동
                </h3>
                <p className="text-sm text-[#5f6368] leading-relaxed">
                  신용카드, 토스페이, 카카오페이, 네이버페이 심사 서류를 대행 접수합니다. 고객사와 PG사 간의 직접 계약으로 판매 중개 수수료가 0%입니다.
                </p>
              </div>

              {/* Graphic: 1-day approval, 2x2 brands, zero fee guarantee */}
              <div className="space-y-3 pt-2">
                {/* PG application badge */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#ceead6] text-xs font-medium text-[#137333] shadow-xs">
                    <Clock className="w-4 h-4 text-[#137333]" />
                    <span>영업일 기준 신속 서류 접수 대행</span>
                  </div>
                </div>

                {/* 2x2 Payment brand grid */}
                <div className="bg-white rounded-2xl border border-[#dadce0] p-4 sm:p-5 shadow-xs">
                  <div className="flex flex-col gap-2.5 text-xs font-medium">
                    <div className="flex gap-2.5">
                      <div className="flex-1 p-3 rounded-xl bg-[#e8f0fe] border border-[#d2e3fc] text-[#1a73e8] flex items-center justify-between">
                        <span>토스페이</span>
                        <CheckCircle2 className="w-4 h-4 text-[#1a73e8]" />
                      </div>
                      <div className="flex-1 p-3 rounded-xl bg-[#fef7e0] border border-[#feefc3] text-[#b06000] flex items-center justify-between">
                        <span>카카오페이</span>
                        <CheckCircle2 className="w-4 h-4 text-[#b06000]" />
                      </div>
                    </div>
                    <div className="flex gap-2.5">
                      <div className="flex-1 p-3 rounded-xl bg-[#e6f4ea] border border-[#ceead6] text-[#137333] flex items-center justify-between">
                        <span>네이버페이</span>
                        <CheckCircle2 className="w-4 h-4 text-[#137333]" />
                      </div>
                      <div className="flex-1 p-3 rounded-xl bg-[#f8f9fa] border border-[#dadce0] text-[#3c4043] flex items-center justify-between">
                        <span>국내 전 카드사</span>
                        <CheckCircle2 className="w-4 h-4 text-[#1a73e8]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct contract zero-fee note */}
                <div className="bg-[#e6f4ea]/40 border border-[#ceead6] rounded-2xl p-3.5 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#137333] shrink-0" />
                  <div className="text-xs text-[#137333] leading-tight">
                    <span className="font-semibold">PG사 직접 정산 계약</span> · 자사몰 판매 시 별도 중개 수수료 없음
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs font-medium text-[#137333] pt-4 border-t border-[#ceead6] flex items-center justify-between">
              <span>플랫폼 중개 수수료 0원</span>
              <span className="text-[#5f6368] font-normal">정산 대금 직입금</span>
            </div>
          </div>

          {/* Card 3: Custom Domain Bento (5 cols desktop) */}
          <div className="col-span-1 sm:col-span-6 lg:col-span-5 bg-[#f8f9fa] p-8 sm:p-9 lg:p-10 rounded-[32px] border border-[#dadce0] shadow-xs flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#fef7e0] text-[#b06000] flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-medium text-[#b06000] bg-[#fef7e0] px-3 py-1 rounded-full border border-[#feefc3]">
                    Foundation III · 정체성 (Identity)
                  </span>
                </div>
                <h3 className="font-medium text-[#202124] text-xl sm:text-2xl">
                  브랜드 전용 독립 도메인 연결
                </h3>
                <p className="text-sm text-[#5f6368] leading-relaxed">
                  우리 브랜드만의 주소(brand.co.kr, .kr)를 연결해 드립니다. 최신 HTTPS 보안 SSL 인증서가 무상 자동 갱신 제공됩니다.
                </p>
              </div>

              {/* Graphic: Browser URL bar, DNS A record, TLS 1.3 */}
              <div className="space-y-3 pt-2">
                <div className="bg-white rounded-2xl border border-[#dadce0] p-4 sm:p-5 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f8f9fa] border border-[#dadce0]">
                    <Lock className="w-4 h-4 text-[#137333] shrink-0" />
                    <span className="text-xs font-mono font-medium text-[#202124] flex-1 truncate">
                      https://brand.co.kr
                    </span>
                    <span className="text-[11px] font-medium text-[#137333] bg-[#e6f4ea] px-2 py-0.5 rounded-full shrink-0">
                      보안 연결됨
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8f9fa] text-[#5f6368]">
                      <span className="font-mono text-[11px]">DNS A Record</span>
                      <span className="text-[#202124] font-medium">자동 글로벌 애니캐스트 라우팅</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8f9fa] text-[#5f6368]">
                      <span className="font-mono text-[11px]">SSL/TLS</span>
                      <span className="text-[#137333] font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>TLS 1.3 256-bit 무상 자동 갱신</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs font-medium text-[#b06000] pt-4 border-t border-[#feefc3] flex items-center justify-between">
              <span>브랜드 독립성 및 보안 완비</span>
              <span className="text-[#5f6368] font-normal">포워딩이 아닌 독립 연결</span>
            </div>
          </div>

          {/* Card 4: Monitoring Radar Bento (7 cols desktop) */}
          <div className="col-span-1 sm:col-span-12 lg:col-span-7 bg-[#f8f9fa] p-8 sm:p-9 lg:p-10 rounded-[32px] border border-[#dadce0] shadow-xs flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#fce8e6] text-[#d93025] flex items-center justify-center shrink-0">
                    <Server className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-medium text-[#d93025] bg-[#fce8e6] px-3 py-1 rounded-full border border-[#fad2cf]">
                    Foundation IV · 영속성 (Continuity)
                  </span>
                </div>
                <h3 className="font-medium text-[#202124] text-xl sm:text-2xl">
                  3중 모니터링 &amp; 1:1 교육
                </h3>
                <p className="text-sm text-[#5f6368] leading-relaxed">
                  10분 주기 서울·미국·유럽 3중 장애 감시와 매일 새벽 자동 DB 백업을 수행합니다. 관리자 화면 조작이 익숙해질 때까지 1시간 원격 실무 교육을 제공합니다.
                </p>
              </div>

              {/* Graphic: 3-way multi-region radar & DB backup / 1:1 training */}
              <div className="space-y-3 pt-2">
                <div className="bg-white rounded-2xl border border-[#dadce0] p-4 sm:p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#1a73e8]" />
                      <span className="font-medium text-[#202124]">글로벌 3개 거점 실시간 헬스체크 레이더</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#137333] bg-[#e6f4ea] px-2 py-0.5 rounded-full font-medium">안정적 인프라 가동</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="flex-1 p-3 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34a853] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1e8e3e]"></span>
                        </span>
                        <div>
                          <div className="text-xs font-medium text-[#202124]">서울 ICN</div>
                          <div className="text-[11px] text-[#5f6368]">Ping 8ms</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#137333] font-medium bg-[#e6f4ea] px-1.5 py-0.5 rounded">정상</span>
                    </div>

                    <div className="flex-1 p-3 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34a853] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1e8e3e]"></span>
                        </span>
                        <div>
                          <div className="text-xs font-medium text-[#202124]">미국 PDX</div>
                          <div className="text-[11px] text-[#5f6368]">Ping 118ms</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#137333] font-medium bg-[#e6f4ea] px-1.5 py-0.5 rounded">정상</span>
                    </div>

                    <div className="flex-1 p-3 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34a853] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1e8e3e]"></span>
                        </span>
                        <div>
                          <div className="text-xs font-medium text-[#202124]">유럽 FRA</div>
                          <div className="text-[11px] text-[#5f6368]">Ping 182ms</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#137333] font-medium bg-[#e6f4ea] px-1.5 py-0.5 rounded">정상</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 text-xs pt-1">
                    <div className="flex-1 p-2.5 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center gap-2.5">
                      <Database className="w-4 h-4 text-[#1a73e8] shrink-0" />
                      <span className="text-[#3c4043] font-medium">매일 새벽 자동 DB 백업 (S3 다중 분산)</span>
                    </div>
                    <div className="flex-1 p-2.5 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center gap-2.5">
                      <GraduationCap className="w-4 h-4 text-[#d93025] shrink-0" />
                      <span className="text-[#3c4043] font-medium">1:1 원격 실무 교육 60분 (관리자 핵심 기능 안내)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs font-medium text-[#d93025] pt-4 border-t border-[#fad2cf] flex items-center justify-between">
              <span>기술 걱정 없는 안정적 운영</span>
              <span className="text-[#5f6368] font-normal">24/7 장애 자동 감시</span>
            </div>
          </div>
        </div>

        {/* The Heptad of Completion (7대 완성 프로세스 로드맵) */}
        <div className="pt-6 sm:pt-10">
          <div className="bg-[#f8f9fa] rounded-[36px] border border-[#dadce0] p-8 sm:p-12 shadow-xs space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#dadce0] text-xs font-mono text-[#3c4043] font-medium shadow-xs">
                The Heptad of Completion · 7대 완성 주기
              </span>
              <h3 className="text-xl sm:text-2xl font-normal text-[#202124]">
                신청부터 자립까지 이어지는 7단계 런칭 아키텍처
              </h3>
              <p className="text-xs sm:text-sm text-[#5f6368]">
                체계적인 7단계 절차를 통해 시행착오 없이 3~5주 만에 견고한 자사몰을 완성합니다.
              </p>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap gap-3 sm:gap-4">
              {[
                { step: "01", title: "업종 진단", desc: "농식품/패션 데이터 분석", tag: "Analysis" },
                { step: "02", title: "테마 설정", desc: "업종 특화 룩북/옵션 세팅", tag: "Design" },
                { step: "03", title: "결제 접수", desc: "토스 PG 직접 가맹 대행", tag: "Payment" },
                { step: "04", title: "상품 이관", desc: "기본 100개 규격 자동 매핑", tag: "Catalog" },
                { step: "05", title: "보안 도메인", desc: "독립 도메인 & TLS 세팅", tag: "Security" },
                { step: "06", title: "실무 전수", desc: "1:1 원격 관리자 교육", tag: "Mastery" },
                { step: "07", title: "그랜드 오픈", desc: "24/7 글로벌 가동 감시", tag: "Continuity" },
              ].map((item, idx) => (
                <div
                  key={item.step}
                  className="flex-1 min-w-[200px] lg:min-w-0 bg-white rounded-2xl border border-[#dadce0] p-4 flex flex-col justify-between shadow-xs hover:border-[#1a73e8]/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-semibold text-[#1a73e8]">
                        Step {item.step}
                      </span>
                      <span className="text-[10px] font-mono text-[#5f6368] bg-[#f8f9fa] px-1.5 py-0.5 rounded">
                        {item.tag}
                      </span>
                    </div>
                    <div className="font-medium text-[#202124] text-sm mb-1">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[#5f6368] leading-tight">
                      {item.desc}
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#f1f3f4] flex items-center justify-between text-[10px] text-[#9aa0a6]">
                    <span>Phase {idx + 1}</span>
                    <span>완료 보장</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contextual Transition Bridge to Section 04 (Pricing) */}
        <div className="pt-4">
          <a
            href="#pricing"
            className="group block max-w-4xl mx-auto bg-[#f8f9fa] border border-[#dadce0] rounded-3xl p-6 sm:p-7 text-left shadow-xs hover:border-[#1a73e8]/50 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-[#1a73e8] bg-[#e8f0fe] px-2.5 py-0.5 rounded-full">
                    Next Chapter · 04
                  </span>
                  <span className="text-xs font-medium text-[#5f6368]">
                    요금제 &amp; 50% 구축비 프로모션
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-medium text-[#202124] group-hover:text-[#1a73e8] transition-colors flex items-center gap-1.5">
                  <span>체계적인 4대 인프라와 7단계 런칭, 시작 비용은 얼마일까요?</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#5f6368]">
                  개발사 외주 대비 50% 감면 혜택, 스타터 75만 원부터 시작하는 투명한 요금제와 자가진단
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-medium text-[#1a73e8] bg-white border border-[#dadce0] px-4 py-2 rounded-full group-hover:bg-[#1a73e8] group-hover:text-white transition-all shadow-xs inline-flex items-center gap-1.5">
                  <span>04 요금제 및 프로모션 확인</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
