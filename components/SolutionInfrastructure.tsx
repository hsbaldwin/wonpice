import { Layers, CreditCard, Globe, Server, CheckCircle2 } from "lucide-react";

export default function SolutionInfrastructure() {
  return (
    <section id="infrastructure" className="py-24 sm:py-32 lg:py-36 bg-white border-b border-[#e8eaed]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 sm:space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f1f3f4] text-[#3c4043] text-xs sm:text-sm font-medium mb-6">
            <Server className="w-4 h-4 text-[#1a73e8]" />
            <span>원스톱 솔루션 인프라</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#202124] tracking-tight mb-6 leading-tight">
            쇼핑몰 오픈에 필요한 모든 기술을 원스톱으로 제공합니다
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5f6368] leading-relaxed">
            복잡한 PG사 가맹 계약, 도메인 DNS 설정, 상품 100개 등록, 일일 백업까지.
            <br className="hidden sm:inline" />
            대표님은 판매에만 집중하실 수 있도록 기술적인 모든 과정을 솔루션이 책임집니다.
          </p>
        </div>

        {/* 4 Infrastructure Cards Grid spanning 1280px */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Item 1 */}
          <div className="bg-[#f8f9fa] p-8 sm:p-9 rounded-[32px] border border-[#dadce0] shadow-xs flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-medium text-[#202124] text-lg sm:text-xl">
                기존 상품 100개 등록 대행
              </h3>
              <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                스마트스토어나 카페24의 상품 엑셀 파일만 전달해 주시면, 상품명·옵션·상세페이지 이미지까지 비즈니스 플랜 기준 100개까지 일괄 등록해 드립니다.
              </p>
            </div>
            <div className="text-xs font-medium text-[#1a73e8] pt-3 border-t border-[#dadce0]">
              노가다 작업 없이 즉시 오픈
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-[#f8f9fa] p-8 sm:p-9 rounded-[32px] border border-[#dadce0] shadow-xs flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#e6f4ea] text-[#137333] flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-medium text-[#202124] text-lg sm:text-xl">
                토스페이먼츠 간편결제 연동
              </h3>
              <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                신용카드, 토스페이, 카카오페이, 네이버페이 심사 서류를 대행 접수합니다. 고객사와 PG사 간의 직접 계약으로 판매 중개 수수료가 0%입니다.
              </p>
            </div>
            <div className="text-xs font-medium text-[#137333] pt-3 border-t border-[#ceead6]">
              플랫폼 중개 수수료 0원
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-[#f8f9fa] p-8 sm:p-9 rounded-[32px] border border-[#dadce0] shadow-xs flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#fef7e0] text-[#b06000] flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-medium text-[#202124] text-lg sm:text-xl">
                브랜드 전용 독립 도메인 연결
              </h3>
              <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                우리 브랜드만의 주소(brand.co.kr, .kr)를 연결해 드립니다. 최신 HTTPS 보안 SSL 인증서가 평생 무상으로 자동 갱신 제공됩니다.
              </p>
            </div>
            <div className="text-xs font-medium text-[#b06000] pt-3 border-t border-[#feefc3]">
              브랜드 독립성 및 보안 완비
            </div>
          </div>

          {/* Item 4 */}
          <div className="bg-[#f8f9fa] p-8 sm:p-9 rounded-[32px] border border-[#dadce0] shadow-xs flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#fce8e6] text-[#d93025] flex items-center justify-center">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="font-medium text-[#202124] text-lg sm:text-xl">
                3중 모니터링 &amp; 1:1 교육
              </h3>
              <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                10분 주기 서울·미국·유럽 3중 장애 감시와 매일 새벽 자동 DB 백업을 수행합니다. 관리자 화면 조작이 익숙해질 때까지 1시간 원격 실무 교육을 제공합니다.
              </p>
            </div>
            <div className="text-xs font-medium text-[#d93025] pt-3 border-t border-[#fad2cf]">
              기술 걱정 없는 안정적 운영
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
