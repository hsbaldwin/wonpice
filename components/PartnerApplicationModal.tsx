"use client";

import { useEffect, useState, FormEvent } from "react";
import { X, CheckCircle2, ExternalLink, Store } from "lucide-react";
import { usePartnerModal } from "./PartnerModalContext";

interface DialogProps {
  plan: string;
  industry: string;
  closePartnerModal: () => void;
}

function PartnerModalDialog({ plan, industry, closePartnerModal }: DialogProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>(plan || "business");
  const [selectedIndustry, setSelectedIndustry] = useState<string>(industry || "food");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("smartstore");
  const [selectedProductCount, setSelectedProductCount] = useState<string>("m");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [submittedData, setSubmittedData] = useState<{
    company: string;
    name: string;
    phone: string;
    email: string;
    plan: string;
    industry: string;
  } | null>(null);

  // Body scroll lock & Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePartnerModal();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePartnerModal]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const honeypot = formData.get("hp_website");
    if (honeypot && String(honeypot).trim().length > 0) {
      // Spam honeypot triggered: silently terminate
      return;
    }

    const generatedLeadId = `WP-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setLeadId(generatedLeadId);
    setSubmittedData({
      company: String(formData.get("company") || ""),
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      plan: String(formData.get("plan") || selectedPlan),
      industry: String(formData.get("industry") || selectedIndustry),
    });
    setIsSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="partner-modal-title"
      data-testid="partner-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={closePartnerModal}
    >
      <div
        className="bg-white rounded-[32px] border border-[#dadce0] shadow-2xl w-full max-w-2xl my-auto p-6 sm:p-8 md:p-10 relative overflow-hidden text-[#202124] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          aria-label="닫기"
          data-testid="partner-modal-close"
          onClick={closePartnerModal}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-[#f1f3f4] text-[#5f6368] hover:text-[#202124] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Submission Complete View */
          <div data-testid="apply-done" className="space-y-6 text-center py-4">
            <div className="w-16 h-16 bg-[#e6f4ea] text-[#137333] rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8 text-[#1e8e3e]" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc]">
                접수 완료
              </span>
              <h3 className="text-2xl font-normal text-[#202124]">
                파트너십 신청이 정상 접수되었습니다
              </h3>
              <p className="text-sm text-[#5f6368] max-w-md mx-auto">
                2026 자사몰 구축비 50% 감면 프로모션 신청이 확인되었습니다. 영업일 기준 24시간 이내에 전담 매니저가 기재해 주신 연락처로 안내드립니다.
              </p>
            </div>

            <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-2xl p-5 text-left text-xs sm:text-sm space-y-2.5 text-[#3c4043] max-w-lg mx-auto">
              <div className="flex justify-between pb-2 border-b border-[#e8eaed]">
                <span className="text-[#5f6368]">접수 번호</span>
                <span className="font-mono font-medium text-[#1a73e8]">{leadId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5f6368]">브랜드 / 회사명</span>
                <span className="font-medium text-[#202124]">{submittedData?.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5f6368]">담당자 성함</span>
                <span className="font-medium text-[#202124]">{submittedData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5f6368]">연락처</span>
                <span className="font-medium text-[#202124]">{submittedData?.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5f6368]">이메일</span>
                <span className="font-medium text-[#202124]">{submittedData?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5f6368]">희망 요금제</span>
                <span className="font-medium text-[#137333] uppercase">{submittedData?.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5f6368]">업종 분야</span>
                <span className="font-medium text-[#202124] uppercase">{submittedData?.industry}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <button
                type="button"
                onClick={closePartnerModal}
                className="flex-1 py-3 px-6 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium text-sm transition-all cursor-pointer"
              >
                확인 완료 / 닫기
              </button>
              <a
                href="https://shop-site-950864605215.asia-northeast3.run.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-6 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#202124] font-medium text-sm transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>가게지기 포털 바로가기</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#5f6368]" />
              </a>
            </div>
          </div>
        ) : (
          /* Form View */
          <div>
            {/* Header */}
            <div className="mb-6 pr-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#1a73e8] text-white flex items-center justify-center">
                  <Store className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
                  2026 자사몰 구축 프로모션
                </span>
              </div>
              <h2
                id="partner-modal-title"
                className="text-xl sm:text-2xl font-normal text-[#202124] tracking-tight"
              >
                mord (모르드) 자사몰 파트너십 구축 신청서
              </h2>
              <p className="text-xs sm:text-sm text-[#5f6368] mt-1">
                별도 중개 수수료 없는 자사몰 운영을 시작하세요. 3~5주 내 제작 완료 및 50% 혜택이 적용됩니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {/* Honeypot field - must be hidden */}
              <input
                type="text"
                id="hp_website"
                name="hp_website"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Grid row 1: Company & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="company" className="block text-xs font-medium text-[#3c4043] mb-1">
                    회사명 / 브랜드명 <span className="text-[#d93025]">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    minLength={1}
                    maxLength={60}
                    required
                    placeholder="예: (주)제철곳간농업회사법인"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#dadce0] rounded-xl text-[#202124] placeholder:text-[#9aa0a6] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-[#3c4043] mb-1">
                    담당자 성함 <span className="text-[#d93025]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    minLength={1}
                    maxLength={30}
                    required
                    placeholder="예: 홍길동 대표"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#dadce0] rounded-xl text-[#202124] placeholder:text-[#9aa0a6] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Grid row 2: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-[#3c4043] mb-1">
                    연락처 <span className="text-[#d93025]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="0\d{1,2}-?\d{3,4}-?\d{4}"
                    required
                    placeholder="010-1234-5678"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#dadce0] rounded-xl text-[#202124] placeholder:text-[#9aa0a6] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-[#3c4043] mb-1">
                    이메일 주소 <span className="text-[#d93025]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                    required
                    placeholder="founder@wonpice.co.kr"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#dadce0] rounded-xl text-[#202124] placeholder:text-[#9aa0a6] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Grid row 3: Industry & Platform */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="industry" className="block text-xs font-medium text-[#3c4043] mb-1">
                    업종 분야 <span className="text-[#d93025]">*</span>
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#dadce0] rounded-xl text-[#202124] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="food">식품 / 농수산물 / 가공식품</option>
                    <option value="fashion">패션 / 의류 / 잡화</option>
                    <option value="beauty">뷰티 / 코스메틱</option>
                    <option value="living">리빙 / 가구 / 인테리어</option>
                    <option value="b2b">B2B 도소매 / 제조업</option>
                    <option value="other">기타 업종</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="platform" className="block text-xs font-medium text-[#3c4043] mb-1">
                    현재 운영 플랫폼 <span className="text-[#d93025]">*</span>
                  </label>
                  <select
                    id="platform"
                    name="platform"
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#dadce0] rounded-xl text-[#202124] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="smartstore">네이버 스마트스토어</option>
                    <option value="cafe24">카페24</option>
                    <option value="imweb">아임웹</option>
                    <option value="godo">고도몰</option>
                    <option value="none">운영 몰 없음 (신규 구축)</option>
                    <option value="other">기타 플랫폼</option>
                  </select>
                </div>
              </div>

              {/* Grid row 4: ProductCount & Plan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="productCount" className="block text-xs font-medium text-[#3c4043] mb-1">
                    취급 상품 수 <span className="text-[#d93025]">*</span>
                  </label>
                  <select
                    id="productCount"
                    name="productCount"
                    value={selectedProductCount}
                    onChange={(e) => setSelectedProductCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#dadce0] rounded-xl text-[#202124] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="s">10개 미만</option>
                    <option value="m">10 ~ 50개 (권장)</option>
                    <option value="l">50 ~ 100개</option>
                    <option value="xl">100개 초과</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="plan" className="block text-xs font-medium text-[#3c4043] mb-1">
                    희망 요금제 <span className="text-[#d93025]">*</span>
                  </label>
                  <select
                    id="plan"
                    name="plan"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#dadce0] rounded-xl text-[#202124] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="starter">스타터 (75만 원~ / 50% 적용)</option>
                    <option value="business">비즈니스 (150만 원~ / 50% 적용, 추천)</option>
                    <option value="custom">맞춤형 플랜 (별도 견적)</option>
                    <option value="undecided">미정 (전문가 상담 후 결정)</option>
                  </select>
                </div>
              </div>

              {/* Grid row 5: Launch & Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="launch" className="block text-xs font-medium text-[#3c4043] mb-1">
                    목표 오픈 일정 (선택)
                  </label>
                  <input
                    type="text"
                    id="launch"
                    name="launch"
                    maxLength={30}
                    placeholder="예: 1개월 이내, 2026년 상반기"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#dadce0] rounded-xl text-[#202124] placeholder:text-[#9aa0a6] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-xs font-medium text-[#3c4043] mb-1">
                    기존 쇼핑몰 / SNS URL (선택)
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    placeholder="https://smartstore.naver.com/sample"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#dadce0] rounded-xl text-[#202124] placeholder:text-[#9aa0a6] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Message textarea */}
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-[#3c4043] mb-1">
                  문의 및 요청사항 (선택)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  maxLength={2000}
                  placeholder="예: 스마트스토어에서 독립 전환을 희망하며 상품 100개 등록 대행과 PG사 심사 일정 문의드립니다."
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#dadce0] rounded-xl text-[#202124] placeholder:text-[#9aa0a6] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Privacy Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#3c4043]">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    required
                    className="mt-0.5 w-4 h-4 rounded text-[#1a73e8] focus:ring-[#1a73e8] border-[#dadce0] cursor-pointer"
                  />
                  <span>
                    [필수] 개인정보 수집 및 이용 동의 (파트너십 상담 및 프로모션 안내 목적으로 회사명, 담당자명, 연락처, 이메일을 수집하며 상담 완료 후 즉시 파기됩니다.)
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium text-sm sm:text-base shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>50% 프로모션 신청서 접수하기</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PartnerApplicationModal() {
  const { isOpen, plan, industry, closePartnerModal } = usePartnerModal();

  if (!isOpen) {
    return null;
  }

  return (
    <PartnerModalDialog
      key={`${plan}-${industry}`}
      plan={plan}
      industry={industry}
      closePartnerModal={closePartnerModal}
    />
  );
}
