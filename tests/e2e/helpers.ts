import { Page, expect } from '@playwright/test';

export interface PartnerFormData {
  company: string;
  name: string;
  phone: string;
  email: string;
  industry?: 'fashion' | 'food' | 'beauty' | 'living' | 'b2b' | 'other';
  platform?: 'none' | 'smartstore' | 'cafe24' | 'imweb' | 'godo' | 'other';
  productCount?: 's' | 'm' | 'l' | 'xl';
  plan?: 'starter' | 'business' | 'custom' | 'undecided';
  launch?: string;
  website?: string;
  message?: string;
  privacy: boolean;
  hp_website?: string;
}

export const VALID_PARTNER_DATA: PartnerFormData = {
  company: '(주)제철곳간농업회사법인',
  name: '홍길동',
  phone: '010-1234-5678',
  email: 'founder@freshfarm.co.kr',
  industry: 'food',
  platform: 'smartstore',
  productCount: 'm',
  plan: 'business',
  launch: '1개월 이내',
  website: 'https://smartstore.naver.com/sample',
  message: '기존 스마트스토어에서 독립 자사몰로 전환하고 싶습니다. PG 연동 지원 문의드립니다.',
  privacy: true,
};

export const SELECTORS = {
  // GNB & Header
  header: 'header',
  logo: 'header a[href="/"]',
  navLinks: {
    features: 'header a[href*="#features"]',
    showcase: 'header a[href*="#showcase"]',
    infrastructure: 'header a[href*="#infrastructure"]',
    pricing: 'header a[href*="#pricing"]',
    faq: 'header a[href*="#faq"]',
  },
  navCta: 'header a[href*="ref=wonpice_nav"], header a:has-text("신청"), header button:has-text("신청")',
  mobileMenuBtn: 'header button[aria-label*="메뉴"], header button[aria-label*="menu"], header button svg.lucide-menu',
  mobileDrawer: '[data-testid="mobile-drawer"], [role="dialog"][aria-label*="메뉴"], .mobile-nav-drawer',

  // Hero Section
  heroSection: 'section#hero, main > section:first-of-type',
  heroEyebrow: '[data-testid="hero-eyebrow"], div:has-text("2026 자사몰 구축비 50%"), div:has-text("프로모션 진행 중"), span:has-text("프로모션")',
  heroHeading: 'h1',
  heroPrimaryCta: 'section:first-of-type a[href*="shop-site"], section:first-of-type button:has-text("신청"), section:first-of-type a:has-text("신청")',
  heroSecondaryCta: 'section:first-of-type a[href*="#showcase"], section:first-of-type a:has-text("데모")',
  heroMockup: 'section:first-of-type [data-testid="device-mockup"], section:first-of-type .rounded-3xl, section:first-of-type .rounded-\\[32px\\]',

  // Metrics Ribbon
  metricsRibbon: '[data-testid="metrics-ribbon"], section:has-text("0%")',

  // Industry Showcase
  showcaseSection: 'section#showcase, section:has(#showcase)',
  foodTabBtn: 'button:has-text("식품"), button:has-text("제철곳간")',
  fashionTabBtn: 'button:has-text("패션"), button:has-text("온결")',
  foodDemoLink: 'a[href*="demo-food"]',
  fashionDemoLink: 'a[href*="shop-store"]',

  // Infrastructure Bento
  infrastructureSection: 'section#infrastructure, section:has(#infrastructure)',

  // Pricing & Eligibility
  pricingSection: 'section#pricing, section:has(#pricing)',
  starterPlanCard: '#pricing .grid > div:nth-child(1), [data-testid="plan-starter"]',
  businessPlanCard: '#pricing .grid > div:nth-child(2), [data-testid="plan-business"]',
  customPlanCard: '#pricing .grid > div:nth-child(3), [data-testid="plan-custom"]',
  eligibilityChecker: '[data-testid="eligibility-checker"], div:has-text("3초 자가진단"), div:has-text("3초 프로모션"), div:has-text("50% 대상자 확인")',
  eligibilityCheckbox: 'input[type="checkbox"]',

  // Partner Modal
  partnerModal: '[role="dialog"][aria-labelledby*="partner"], [data-testid="partner-modal"], .partner-modal, [role="dialog"]',
  partnerModalClose: '[data-testid="partner-modal-close"], button[aria-label="닫기"], button:has-text("닫기"), button[aria-label="close"]',
  formInputs: {
    company: 'input[name="company"], input[id="company"]',
    name: 'input[name="name"], input[id="name"]',
    phone: 'input[name="phone"], input[id="phone"]',
    email: 'input[name="email"], input[id="email"]',
    industry: 'select[name="industry"], select[id="industry"]',
    platform: 'select[name="platform"], select[id="platform"]',
    productCount: 'select[name="productCount"], select[id="productCount"]',
    plan: 'select[name="plan"], select[id="plan"]',
    launch: 'input[name="launch"], input[id="launch"]',
    website: 'input[name="website"], input[id="website"]',
    message: 'textarea[name="message"], textarea[id="message"]',
    privacy: 'input[name="privacy"], input[id="privacy"], input[type="checkbox"]#privacy',
    hp_website: 'input[name="hp_website"], input[id="hp_website"]',
    submitBtn: 'button[type="submit"]:has-text("신청"), button[type="submit"]:has-text("접수"), button:has-text("신청하기")',
  },

  // FAQ
  faqSection: 'section#faq, section:has(#faq)',
  faqQuestion: '#faq button:has-text("Q"), button:has-text("Q")',

  // Footer
  footer: 'footer',
  footerLinks: 'footer a',
};

export const VALID_FASHION_DATA: PartnerFormData = {
  company: '온결 스튜디오',
  name: '이지은',
  phone: '010-9876-5432',
  email: 'jieun@ongyeol-studio.com',
  industry: 'fashion',
  platform: 'imweb',
  productCount: 's',
  plan: 'business',
  launch: '2주 이내',
  website: 'https://ongyeol.com',
  message: '2026 S/S 컬렉션 런칭을 앞두고 자사몰 핏감 룩북 및 토스페이먼츠 연동을 희망합니다.',
  privacy: true,
};

/**
 * Asserts that the current viewport page does not have horizontal overflow.
 */
export async function expectNoHorizontalScroll(page: Page) {
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // small allowance for subpixel rendering
}

/**
 * Attaches console error and page error listeners and asserts zero errors occur during action.
 */
export async function assertZeroConsoleErrors(page: Page, action: () => Promise<void>) {
  const errors: string[] = [];
  const errorHandler = (msg: { text: () => string; type: () => string }) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore network cert or external font loading failure in offline headless sandbox
      if (!text.includes('net::ERR_') && !text.includes('favicon.ico')) {
        errors.push(text);
      }
    }
  };
  const pageErrorHandler = (err: Error) => {
    errors.push(err.message);
  };

  page.on('console', errorHandler);
  page.on('pageerror', pageErrorHandler);

  try {
    await action();
  } finally {
    page.off('console', errorHandler);
    page.off('pageerror', pageErrorHandler);
  }

  expect(errors).toHaveLength(0);
}


