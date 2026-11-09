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
} from "lucide-react";

export default function SolutionInfrastructure() {
  return (
    <section id="infrastructure" className="py-24 sm:py-32 lg:py-36 bg-[#fafafa] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 sm:space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-medium mb-6 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span>SYSTEM ARCHITECTURE // 4대 기술 인프라 ⚡</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-tight break-keep drop-shadow-[0_0_16px_rgba(56,189,248,0.2)]">
            쇼핑몰 오픈에 필요한 모든 기술을 원스톱으로 제공합니다
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed break-keep font-normal">
            복잡한 PG사 가맹 계약, 도메인 DNS 설정, 상품 100개 등록, 일일 백업까지.
            <br className="hidden sm:inline" />
            대표님은 판매에만 집중하실 수 있도록 안정적인 4대 기술 인프라를 솔루션이 책임집니다.
          </p>
        </div>

        {/* Asymmetric Bento Grid spanning 12 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 lg:gap-8">
          {/* Card 1: Hero Bento (7 cols desktop) */}
          <div className="col-span-1 sm:col-span-12 lg:col-span-7 bg-white p-8 sm:p-9 lg:p-10 rounded-2xl border border-slate-200/90 card-3d-elevated shimmer-glass-card hover:border-cyan-400 hover:shadow-[0_20px_45px_-10px_rgba(6,182,212,0.25)] transition-all duration-300 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-medium text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80 shadow-2xs">
                    PIPELINE // 01 · 상품 데이터 등록
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-xl sm:text-2xl tracking-tight break-keep">
                  기존 상품 100개 등록 대행
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed break-keep">
                  보유하신 상품 카탈로그 엑셀 파일만 전달해 주시면, 상품명·옵션·상세페이지 이미지까지 비즈니스 플랜 기준 100개 품목을 정합성 있게 일괄 등록해 드립니다.
                </p>
              </div>

              {/* Graphic: Excel pill, 3-stage pipeline & time saved */}
              <div className="space-y-3.5 pt-2">
                {/* Excel export chip */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#dadce0] text-xs font-mono text-[#3c4043] shadow-xs font-medium">
                    <FileSpreadsheet className="w-4 h-4 text-[#137333]" />
                    <span>products_catalog_export.xlsx</span>
                    <span className="text-[11px] font-sans text-[#137333] font-semibold bg-[#e6f4ea] px-2 py-0.5 rounded-full shadow-2xs">
                      100개 품목 자동 매핑
                    </span>
                  </div>
                </div>

                {/* 3-stage migration pipeline */}
                <div className="bg-white rounded-2xl border border-[#dadce0] p-4 sm:p-5 shadow-xs space-y-3">
                  <div className="text-xs font-semibold text-[#5f6368]">원클릭 3단계 마이그레이션 파이프라인</div>
                  <div className="flex flex-col sm:flex-row gap-2 text-center text-xs">
                    <div className="flex-1 p-3 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex flex-col items-center justify-center hover:-translate-y-0.5 transition-transform">
                      <span className="text-[10px] text-[#5f6368] font-mono">01. 원본 추출</span>
                      <span className="font-semibold text-[#202124] mt-0.5">카탈로그 연동</span>
                      <span className="text-[11px] text-[#5f6368]">엑셀 원본 파일</span>
                    </div>
                    <div className="flex-1 p-3 rounded-xl bg-[#e8f0fe] border border-[#d2e3fc] flex flex-col items-center justify-center text-[#1a73e8] hover:-translate-y-0.5 transition-transform">
                      <span className="text-[10px] text-[#1a73e8] font-mono font-medium">02. 자동 변환 엔진</span>
                      <span className="font-semibold text-[#1a73e8] mt-0.5">mord Engine</span>
                      <span className="text-[11px] text-[#1967d2]">규격화 &amp; 이미지 최적화</span>
                    </div>
                    <div className="flex-1 p-3 rounded-xl bg-[#e6f4ea] border border-[#ceead6] flex flex-col items-center justify-center text-[#137333] hover:-translate-y-0.5 transition-transform">
                      <span className="text-[10px] text-[#137333] font-mono font-medium">03. 자사몰 즉시 런칭</span>
                      <span className="font-semibold text-[#137333] mt-0.5">자사몰 즉시 런칭</span>
                      <span className="text-[11px] text-[#188038]">100개 상품 완료</span>
                    </div>
                  </div>
                </div>

                {/* Batch Ingestion Specification Box */}
                <div className="bg-slate-50/70 rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="font-mono text-xs font-semibold text-slate-900">상품 100개 등록 소요시간 비교</span>
                    </div>
                    <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-medium border border-blue-200/60 shadow-2xs">
                      대량 등록 수작업 시간 절감
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 text-xs pt-1">
                    <div className="flex-1 p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                      <span className="font-mono text-[10px] text-slate-500 uppercase block">처리 파이프라인</span>
                      <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">Batch Ingest Engine</span>
                    </div>
                    <div className="flex-1 p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                      <span className="font-mono text-[10px] text-slate-500 uppercase block">자동 변환율</span>
                      <span className="font-mono font-bold text-emerald-600 text-xs sm:text-sm">100% 규격 자동화</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs font-semibold text-[#1a73e8] pt-4 border-t border-[#dadce0] flex items-center justify-between h-10">
              <span>수작업 부담 없는 일괄 등록 지원</span>
              <span className="text-[#5f6368] font-normal">비즈니스 플랜 기본 제공</span>
            </div>
          </div>

          {/* Card 2: PG Payments Bento (5 cols desktop) */}
          <div className="col-span-1 sm:col-span-6 lg:col-span-5 bg-white p-8 sm:p-9 lg:p-10 rounded-2xl border border-slate-200/90 card-3d-elevated shimmer-glass-card hover:border-emerald-400 hover:shadow-[0_20px_45px_-10px_rgba(16,185,129,0.25)] transition-all duration-300 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 shadow-2xs">
                    GATEWAY // 02 · 간편결제 직연동
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-xl sm:text-2xl h-8 flex items-center tracking-tight break-keep">
                  토스페이먼츠 간편결제 연동
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed break-keep">
                  신용카드, 토스페이, 카카오페이, 네이버페이 심사 서류를 대행 접수합니다. 고객사와 PG사 간의 직접 계약으로 판매 중개 수수료가 0%입니다.
                </p>
              </div>

              {/* Graphic: 1-day approval, 2x2 brands, zero fee guarantee */}
              <div className="space-y-3 pt-2">
                {/* PG application badge */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 shadow-2xs font-medium">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>영업일 기준 신속 서류 접수 대행</span>
                  </div>
                </div>

                {/* 2x2 Payment brand grid */}
                <div className="bg-slate-50/70 rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
                  <div className="flex flex-col gap-2.5 text-xs font-semibold">
                    <div className="flex gap-2.5">
                      <div className="flex-1 p-3 rounded-lg bg-white border border-slate-200 text-blue-600 flex items-center justify-between hover:-translate-y-0.5 transition-transform shadow-2xs">
                        <span>토스페이</span>
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 p-3 rounded-lg bg-white border border-slate-200 text-amber-600 flex items-center justify-between hover:-translate-y-0.5 transition-transform shadow-2xs">
                        <span>카카오페이</span>
                        <CheckCircle2 className="w-4 h-4 text-amber-600" />
                      </div>
                    </div>
                    <div className="flex gap-2.5">
                      <div className="flex-1 p-3 rounded-lg bg-white border border-slate-200 text-emerald-600 flex items-center justify-between hover:-translate-y-0.5 transition-transform shadow-2xs">
                        <span>네이버페이</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="flex-1 p-3 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-between hover:-translate-y-0.5 transition-transform shadow-2xs">
                        <span>국내 전 카드사</span>
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct contract zero-fee note */}
                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div className="text-xs text-emerald-800 leading-tight">
                    <span className="font-semibold">PG사 직접 정산 계약</span> · 자사몰 판매 시 별도 중개 수수료 없음
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs font-semibold text-emerald-700 pt-4 border-t border-slate-100 flex items-center justify-between h-10">
              <span>플랫폼 중개 수수료 0원</span>
              <span className="text-slate-500 font-normal">정산 대금 직입금</span>
            </div>
          </div>

          {/* Card 3: Custom Domain Bento (5 cols desktop) */}
          <div className="col-span-1 sm:col-span-6 lg:col-span-5 bg-white p-8 sm:p-9 lg:p-10 rounded-2xl border border-slate-200/90 card-3d-elevated shimmer-glass-card hover:border-amber-400 hover:shadow-[0_20px_45px_-10px_rgba(245,158,11,0.25)] transition-all duration-300 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-medium text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80 shadow-2xs">
                    EDGE DNS // 03 · 독립 도메인 &amp; 보안
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-xl sm:text-2xl h-8 flex items-center tracking-tight break-keep">
                  브랜드 전용 독립 도메인 연결
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed break-keep">
                  우리 브랜드만의 주소(brand.co.kr, .kr)를 연결해 드립니다. 최신 HTTPS 보안 SSL 인증서가 무상 자동 갱신 제공됩니다.
                </p>
              </div>

              {/* Graphic: Browser URL bar, DNS A record, TLS 1.3 */}
              <div className="space-y-3 pt-2">
                <div className="bg-slate-50/70 rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200 slot-depth-inset">
                    <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-mono font-semibold text-slate-900 flex-1 truncate">
                      https://brand.co.kr
                    </span>
                    <span className="text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0 border border-emerald-200/60 shadow-2xs">
                      보안 연결됨
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/60 text-slate-600 shadow-2xs">
                      <span className="font-mono text-[11px] font-medium text-slate-500">DNS A Record</span>
                      <span className="text-slate-900 font-medium">자동 글로벌 애니캐스트 라우팅</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/60 text-slate-600 shadow-2xs">
                      <span className="font-mono text-[11px] font-medium text-slate-500">SSL/TLS</span>
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>TLS 1.3 256-bit 무상 자동 갱신</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs font-semibold text-amber-700 pt-4 border-t border-slate-100 flex items-center justify-between h-10">
              <span>브랜드 독립성 및 보안 완비</span>
              <span className="text-slate-500 font-normal">포워딩이 아닌 독립 연결</span>
            </div>
          </div>

          {/* Card 4: Monitoring Radar Bento (7 cols desktop) */}
          <div className="col-span-1 sm:col-span-12 lg:col-span-7 bg-white p-8 sm:p-9 lg:p-10 rounded-2xl border border-slate-200/90 card-3d-elevated shimmer-glass-card hover:border-indigo-400 hover:shadow-[0_20px_45px_-10px_rgba(99,102,241,0.25)] transition-all duration-300 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 border border-rose-200/80 flex items-center justify-center shrink-0">
                    <Server className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-medium text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/80">
                    OBSERVABILITY // 04 · 24/7 모니터링
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-xl sm:text-2xl h-8 flex items-center tracking-tight break-keep">
                  3중 모니터링 &amp; 1:1 교육
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed break-keep">
                  10분 주기 서울·미국·유럽 3중 장애 감시와 매일 새벽 자동 DB 백업을 수행합니다. 관리자 화면 조작이 익숙해질 때까지 1시간 원격 실무 교육을 제공합니다.
                </p>
              </div>

              {/* Graphic: 3-way multi-region radar & DB backup / 1:1 training */}
              <div className="space-y-3 pt-2">
                <div className="bg-slate-50/70 rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="font-mono text-xs font-semibold text-slate-900">글로벌 3개 거점 실시간 헬스체크 레이더</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200/60">
                      안정적 인프라 가동
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="flex-1 p-3 rounded-lg bg-white border border-slate-200 digital-meter-well flex items-center justify-between hover:-translate-y-0.5 transition-transform">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">서울 ICN</div>
                          <div className="text-[11px] font-mono text-slate-500">Ping 8ms</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 shadow-2xs">OK</span>
                    </div>

                    <div className="flex-1 p-3 rounded-lg bg-white border border-slate-200 digital-meter-well flex items-center justify-between hover:-translate-y-0.5 transition-transform">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">미국 PDX</div>
                          <div className="text-[11px] font-mono text-slate-500">Ping 118ms</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 shadow-2xs">OK</span>
                    </div>

                    <div className="flex-1 p-3 rounded-lg bg-white border border-slate-200 digital-meter-well flex items-center justify-between hover:-translate-y-0.5 transition-transform">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">유럽 FRA</div>
                          <div className="text-[11px] font-mono text-slate-500">Ping 182ms</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 shadow-2xs">OK</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 text-xs pt-1">
                    <div className="flex-1 p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2.5">
                      <Database className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="text-slate-700 font-medium">매일 새벽 자동 DB 백업 (S3 다중 분산)</span>
                    </div>
                    <div className="flex-1 p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2.5">
                      <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="text-slate-700 font-medium">1:1 원격 실무 교육 60분 (관리자 핵심 기능 안내)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs font-semibold text-rose-700 pt-4 border-t border-slate-100 flex items-center justify-between h-10">
              <span>기술 걱정 없는 안정적 운영</span>
              <span className="text-slate-500 font-normal">24/7 장애 자동 감시</span>
            </div>
          </div>
        </div>

        {/* 7단계 런칭 프로세스 로드맵 */}
        <div className="pt-6 sm:pt-10">
          <div className="bg-[#f8f9fa] rounded-[36px] border border-[#dadce0] p-8 sm:p-12 card-3d-elevated space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#dadce0] text-xs text-[#3c4043] font-semibold shadow-xs">
                7단계 런칭 프로세스
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#202124] tracking-tight break-keep">
                신청부터 자립까지 이어지는 7단계 런칭 아키텍처
              </h3>
              <p className="text-xs sm:text-sm text-[#5f6368] break-keep font-normal">
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
                  className="flex-1 min-w-[200px] lg:min-w-0 bg-white rounded-2xl border border-[#dadce0] p-4 flex flex-col justify-between card-3d-elevated hover:border-[#1a73e8]/60 hover:-translate-y-1 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-semibold text-[#1a73e8]">
                        Step {item.step}
                      </span>
                      <span className="text-[10px] font-mono text-[#5f6368] bg-[#f8f9fa] px-1.5 py-0.5 rounded font-medium shadow-2xs">
                        {item.tag}
                      </span>
                    </div>
                    <div className="font-semibold text-[#202124] text-sm mb-1 h-5 flex items-center tracking-tight">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[#5f6368] leading-tight min-h-[32px] break-keep">
                      {item.desc}
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#f1f3f4] flex items-center justify-between text-[10px] text-[#9aa0a6] h-6 font-medium">
                    <span>Phase {idx + 1}</span>
                    <span>완료 보장</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
