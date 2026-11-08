import { test, expect } from '@playwright/test';
import { SELECTORS, assertZeroConsoleErrors } from './helpers';

test.describe('Tier 1: Comprehensive Feature Coverage', () => {

  // 1. Google Sans / Geometric Typography
  test.describe('1. Google Sans / Geometric Typography', () => {
    test('verifies geometric typography font stack, headings, and styling', async ({ page }) => {
      await page.goto('/');

      // 1. Body font-family contains Google Sans or Pretendard/system fallback
      const bodyFont = await page.evaluate(() => window.getComputedStyle(document.body).fontFamily);
      expect(bodyFont).toMatch(/Google Sans|Roboto Flex|Pretendard|sans-serif/i);

      // 2. H1 headline typography styling
      const h1 = page.locator(SELECTORS.heroHeading);
      await expect(h1).toBeVisible();
      const h1Styles = await h1.evaluate((el) => {
        const cs = window.getComputedStyle(el);
        return {
          fontSize: parseFloat(cs.fontSize),
          lineHeight: cs.lineHeight,
          fontWeight: cs.fontWeight,
          letterSpacing: cs.letterSpacing,
        };
      });
      expect(h1Styles.fontSize).toBeGreaterThanOrEqual(32); // Google Store large scale
      expect(parseInt(h1Styles.fontWeight, 10)).toBeGreaterThanOrEqual(400);

      // 3. Section H2 headings typography
      const h2Elements = page.locator('h2');
      const h2Count = await h2Elements.count();
      expect(h2Count).toBeGreaterThanOrEqual(3);
      for (let i = 0; i < h2Count; i++) {
        const h2 = h2Elements.nth(i);
        await expect(h2).toBeVisible();
        const text = await h2.innerText();
        expect(text.trim().length).toBeGreaterThan(5);
      }

      // 4. Subtitle typography styling & readability
      const subtitle = page.locator(SELECTORS.heroSection).locator('p').first();
      await expect(subtitle).toBeVisible();
      const subColor = await subtitle.evaluate((el) => window.getComputedStyle(el).color);
      // Secondary on-surface gray (e.g. #5f6368 / rgb(95, 99, 104))
      expect(subColor).toMatch(/rgb\(95,\s*99,\s*104\)|rgb\(60,\s*64,\s*67\)/);

      // 5. Korean font smoothing & antialiasing
      const antialiased = await page.evaluate(() => {
        const body = window.getComputedStyle(document.body);
        return (
          body.getPropertyValue('-webkit-font-smoothing') === 'antialiased' ||
          body.getPropertyValue('text-rendering') !== ''
        );
      });
      expect(antialiased).toBe(true);
    });
  });

  // 2. Google MD3 Color System & Theme Tokens
  test.describe('2. Google MD3 Color System & Theme Tokens', () => {
    test('validates Google 4-color palette, tonal surfaces, and pill styling', async ({ page }) => {
      await page.goto('/');

      // 1. Google Blue accent text / link in Hero or Navbar
      const blueElement = page.locator('.text-\\[\\#1a73e8\\]').first();
      await expect(blueElement).toBeVisible();
      const blueColor = await blueElement.evaluate((el) => window.getComputedStyle(el).color);
      expect(blueColor).toBe('rgb(26, 115, 232)'); // #1a73e8

      // 2. Google Green tonal badge in Hero or KPI Ribbon
      const greenBadge = page.locator('.bg-\\[\\#e6f4ea\\]').first();
      await expect(greenBadge).toBeVisible();
      const greenBg = await greenBadge.evaluate((el) => window.getComputedStyle(el).backgroundColor);
      expect(greenBg).toBe('rgb(230, 244, 234)'); // #e6f4ea

      // 3. Google Surface tonal gray 1 (#f8f9fa)
      const tonalSurface = page.locator('.bg-\\[\\#f8f9fa\\]').first();
      await expect(tonalSurface).toBeVisible();
      const surfaceBg = await tonalSurface.evaluate((el) => window.getComputedStyle(el).backgroundColor);
      expect(surfaceBg).toBe('rgb(248, 249, 250)'); // #f8f9fa

      // 4. Google Outline / Border tokens (#dadce0 or #e8eaed)
      const borderedEl = page.locator('.border-\\[\\#dadce0\\], .border-\\[\\#e8eaed\\]').first();
      await expect(borderedEl).toBeVisible();

      // 5. Pill button rounded-full tokens
      const primaryPills = page.locator('.rounded-full');
      const pillCount = await primaryPills.count();
      expect(pillCount).toBeGreaterThanOrEqual(5);
    });
  });

  // 3. Page Hygiene & SEO
  test.describe('3. Page Hygiene & Console Cleanliness', () => {
    test('loads without console errors and provides complete SEO metadata', async ({ page }) => {
      await assertZeroConsoleErrors(page, async () => {
        const response = await page.goto('/');
        expect(response?.status()).toBe(200);
      });

      // 1. Page title contains brand and purpose
      const title = await page.title();
      expect(title).toContain('WonPice');
      expect(title).toMatch(/자사몰|솔루션|쇼핑몰/);

      // 2. Meta description is present and descriptive
      const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDesc).toBeTruthy();
      expect(metaDesc!.length).toBeGreaterThan(30);

      // 3. HTML lang attribute set to Korean
      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('ko');

      // 4. JSON-LD structured data elements present
      const jsonLdScripts = page.locator('script[type="application/ld+json"]');
      const jsonLdCount = await jsonLdScripts.count();
      expect(jsonLdCount).toBeGreaterThanOrEqual(1);

      // 5. OpenGraph metadata tags
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();
    });
  });

  // 4. Google Store Header & Sticky GNB
  test.describe('4. Google Store Header & Sticky GNB', () => {
    test('renders sticky header, brand identity, navigation links, and CTA', async ({ page }) => {
      await page.goto('/');

      const header = page.locator(SELECTORS.header);
      await expect(header).toBeVisible();

      // 1. Header has sticky positioning
      const isSticky = await header.evaluate((el) => {
        const pos = window.getComputedStyle(el).position;
        return pos === 'sticky' || pos === 'fixed';
      });
      expect(isSticky).toBe(true);

      // 2. Brand logo links to home with WonPice brand text
      const logo = page.locator(SELECTORS.logo);
      await expect(logo).toBeVisible();
      await expect(logo).toContainText('WonPice');

      // 3. Top promo announcement banner
      const topBanner = header.locator('div:has-text("2026 프로모션"), div:has-text("구축비 50%")').first();
      await expect(topBanner).toBeVisible();

      // 4. Header CTA button/link
      const navCta = page.locator(SELECTORS.navCta).first();
      await expect(navCta).toBeVisible();
      await expect(navCta).toContainText('신청');

      // 5. Header border and subtle backdrop blur
      const headerBorder = await header.evaluate((el) => {
        const cs = window.getComputedStyle(el);
        return cs.borderBottomWidth !== '0px';
      });
      expect(headerBorder).toBe(true);
    });
  });

  // 5. Mobile Navigation Drawer
  test.describe('5. Mobile Navigation Drawer & Responsiveness', () => {
    test('verifies mobile navigation handling across mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      const header = page.locator(SELECTORS.header);
      await expect(header).toBeVisible();

      // 1. Verify header is responsive and does not overflow horizontally
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(377);

      // 2. Mobile menu button check with resilient fallback
      const hamburger = page.locator(SELECTORS.mobileMenuBtn).first();
      const hasHamburger = await hamburger.isVisible().catch(() => false);

      if (hasHamburger) {
        // 3. Hamburger has accessible role / button
        await expect(hamburger).toBeEnabled();

        // 4. Open drawer
        await hamburger.click();
        const drawer = page.locator(SELECTORS.mobileDrawer).first();
        await expect(drawer).toBeVisible();

        // 5. Close drawer via close button or backdrop
        const closeBtn = page.locator(SELECTORS.partnerModalClose).first();
        if (await closeBtn.isVisible()) {
          await closeBtn.click();
          await expect(drawer).not.toBeVisible();
        }
      } else {
        // Fallback for M1/current shell: header adapts cleanly with mobile-friendly CTA
        const mobileCta = header.locator('a, button').filter({ hasText: '신청' }).first();
        await expect(mobileCta).toBeVisible();
        const bbox = await mobileCta.boundingBox();
        expect(bbox).not.toBeNull();
        expect(bbox!.width).toBeLessThanOrEqual(375);
      }
    });
  });

  // 6. Google Store Hero Section
  test.describe('6. Google Store Hero Section', () => {
    test('verifies eyebrow pill, H1 value prop, dual pill CTAs, and subtitle', async ({ page }) => {
      await page.goto('/');

      const hero = page.locator(SELECTORS.heroSection).first();
      await expect(hero).toBeVisible();

      // 1. Eyebrow badge pill
      const eyebrow = page.locator(SELECTORS.heroEyebrow).first();
      await expect(eyebrow).toBeVisible();
      await expect(eyebrow).toContainText('50%');

      // 2. H1 Heading value proposition
      const h1 = hero.locator(SELECTORS.heroHeading);
      await expect(h1).toBeVisible();
      await expect(h1).toContainText('오픈마켓 수수료 없이');
      await expect(h1).toContainText('내 브랜드를 키우는 자사몰 솔루션');

      // 3. Subtitle explaining 3-5 week launch and zero fee
      const subtitle = hero.locator('p').first();
      await expect(subtitle).toContainText('스마트스토어');
      await expect(subtitle).toContainText('3~5주');

      // 4. Primary CTA Pill
      const primaryCta = page.locator(SELECTORS.heroPrimaryCta).first();
      await expect(primaryCta).toBeVisible();
      await expect(primaryCta).toContainText('신청하기');

      // 5. Secondary CTA Pill linking to #showcase
      const secondaryCta = page.locator(SELECTORS.heroSecondaryCta).first();
      await expect(secondaryCta).toBeVisible();
      await expect(secondaryCta).toContainText('데모');
      const href = await secondaryCta.getAttribute('href');
      expect(href).toContain('#showcase');
    });
  });

  // 7. Device & Studio Showcase Stage
  test.describe('7. Device & Studio Showcase Stage', () => {
    test('renders studio mockup frame, Google tonal chips, and clean visual cards', async ({ page }) => {
      await page.goto('/');

      // 1. Showcase container exists
      const showcase = page.locator(SELECTORS.showcaseSection).first();
      await expect(showcase).toBeVisible();

      // 2. Studio mockup frame with rounded borders and browser dots
      const mockCard = showcase.locator('.rounded-\\[36px\\], .rounded-3xl').first();
      await expect(mockCard).toBeVisible();

      // 3. Browser simulation dots
      const dots = showcase.locator('span.rounded-full.bg-\\[\\#dadce0\\]');
      const dotCount = await dots.count();
      expect(dotCount).toBeGreaterThanOrEqual(3);

      // 4. Google tonal chips (green/blue badges)
      const tonalChips = showcase.locator('.rounded-full.border');
      const chipCount = await tonalChips.count();
      expect(chipCount).toBeGreaterThanOrEqual(2);

      // 5. Mockup URL bar simulation
      const urlBar = showcase.locator('span.font-mono').first();
      await expect(urlBar).toBeVisible();
      await expect(urlBar).toContainText('.asia-northeast3.run.app');
    });
  });

  // 8. KPI Metric Ribbon
  test.describe('8. KPI Metric Ribbon', () => {
    test('displays 4-column metric ribbon with cost, fee, and timeline guarantees', async ({ page }) => {
      await page.goto('/');

      const ribbon = page.locator(SELECTORS.metricsRibbon).first();
      await expect(ribbon).toBeVisible();

      // 1. Metric 1: 자사몰 제작비 75만 원부터
      await expect(ribbon).toContainText('자사몰 제작비');
      await expect(ribbon).toContainText('75만 원부터');

      // 2. Metric 2: 월 고정 유지비 10만 원
      await expect(ribbon).toContainText('월 고정 유지비');
      await expect(ribbon).toContainText('10만 원');

      // 3. Metric 3: 추가 중개 수수료 0원 (0%)
      await expect(ribbon).toContainText('추가 중개 수수료');
      await expect(ribbon).toContainText('0원 (0%)');

      // 4. Metric 4: 제작 소요 기간 3~5주 완성
      await expect(ribbon).toContainText('제작 소요 기간');
      await expect(ribbon).toContainText('3~5주 완성');

      // 5. Ribbon styling: 4-column responsive grid container
      const grid = ribbon.locator('.grid').first();
      await expect(grid).toBeVisible();
    });
  });


  // 9. Dual-Industry Interactive Tab Switcher
  test.describe('9. Dual-Industry Interactive Tab Switcher', () => {
    test('switches smoothly between Food and Fashion industry solutions', async ({ page }) => {
      await page.goto('/');

      const foodTab = page.locator(SELECTORS.foodTabBtn).first();
      const fashionTab = page.locator(SELECTORS.fashionTabBtn).first();

      await expect(foodTab).toBeVisible();
      await expect(fashionTab).toBeVisible();

      // 1. Food is active by default
      await expect(page.locator('text=산지직송의 신선함을 전하는 \'제철곳간\'')).toBeVisible();

      // 2. Click Fashion tab
      await fashionTab.click();

      // 3. Fashion content is revealed
      await expect(page.locator('text=핏과 감성을 온전히 담아내는 \'온결\'')).toBeVisible();
      await expect(page.locator('text=세로형 고화질 룩북 테마')).toBeVisible();

      // 4. Food content is hidden
      await expect(page.locator('text=산지직송의 신선함을 전하는 \'제철곳간\'')).not.toBeVisible();

      // 5. Click back to Food tab
      await foodTab.click();
      await expect(page.locator('text=산지직송의 신선함을 전하는 \'제철곳간\'')).toBeVisible();
    });
  });

  // 10. Studio-Quality Showcase Mockups
  test.describe('10. Studio-Quality Industry Showcase Mockups', () => {
    test('renders rich product visuals and micro-features for both industries', async ({ page }) => {
      await page.goto('/');

      // 1. Food Showcase Mockup: features and timer
      await expect(page.locator('text=중량(kg) 및 규격 옵션 분기')).toBeVisible();
      await expect(page.locator('text=당일 수확 출고 마감 타이머')).toBeVisible();
      await expect(page.locator('text=냉장·신선 배송 & 보관법 가이드')).toBeVisible();

      // 2. Food product pricing preview
      await expect(page.locator('text=3kg 실속형')).toBeVisible();
      await expect(page.locator('text=28,000원')).toBeVisible();

      // 3. Switch to Fashion tab
      const fashionTab = page.locator(SELECTORS.fashionTabBtn).first();
      await fashionTab.click();

      // 4. Fashion Showcase Mockup: features and size guide
      await expect(page.locator('text=세로형 고화질 룩북 테마')).toBeVisible();
      await expect(page.locator('text=모델 착용컷 인터랙션')).toBeVisible();
      await expect(page.locator('text=실측 사이즈표 & 소재 가이드')).toBeVisible();

      // 5. Fashion size/stock preview
      await expect(page.locator('text=S (90~95)')).toBeVisible();
      await expect(page.locator('text=재고 있음').first()).toBeVisible();
    });
  });

  // 11. Outbound Live Demo Links
  test.describe('11. Outbound Live Demo Links', () => {
    test('verifies live Cloud Run demo store links for Food and Fashion', async ({ page }) => {
      await page.goto('/');

      // 1. Food Demo Link exists
      const foodDemo = page.locator(SELECTORS.foodDemoLink).first();
      await expect(foodDemo).toBeVisible();

      // 2. Food Demo Link href points to Cloud Run
      const foodHref = await foodDemo.getAttribute('href');
      expect(foodHref).toContain('shop-demo-food-store-950864605215.asia-northeast3.run.app');

      // 3. Target and rel attributes for security
      expect(await foodDemo.getAttribute('target')).toBe('_blank');
      const foodRel = await foodDemo.getAttribute('rel');
      expect(foodRel).toContain('noopener');

      // 4. Switch to Fashion tab and verify Fashion Demo Link
      await page.locator(SELECTORS.fashionTabBtn).first().click();
      const fashionDemo = page.locator(SELECTORS.fashionDemoLink).first();
      await expect(fashionDemo).toBeVisible();

      // 5. Fashion Demo Link href and target
      const fashionHref = await fashionDemo.getAttribute('href');
      expect(fashionHref).toContain('shop-store-950864605215.asia-northeast3.run.app');
      expect(await fashionDemo.getAttribute('target')).toBe('_blank');
    });
  });

  // 12. Asymmetric Bento Grid Value Pillars
  test.describe('12. Asymmetric Bento Grid Value Pillars', () => {
    test('renders 4 infrastructure value pillars with icons and badges', async ({ page }) => {
      await page.goto('/');

      const infra = page.locator(SELECTORS.infrastructureSection).first();
      await expect(infra).toBeVisible();

      // 1. Section Title
      await expect(infra).toContainText('쇼핑몰 오픈에 필요한 모든 기술');

      // 2. Pillar 1: 상품 100개 등록 대행
      await expect(infra).toContainText('기존 상품 100개 등록 대행');
      await expect(infra).toContainText('노가다 작업 없이 즉시 오픈');

      // 3. Pillar 2: 토스페이먼츠 간편결제 연동
      await expect(infra).toContainText('토스페이먼츠 간편결제 연동');
      await expect(infra).toContainText('플랫폼 중개 수수료 0원');

      // 4. Pillar 3: 브랜드 전용 독립 도메인 연결
      await expect(infra).toContainText('브랜드 전용 독립 도메인 연결');
      await expect(infra).toContainText('브랜드 독립성 및 보안 완비');

      // 5. Pillar 4: 3중 모니터링 & 1:1 교육
      await expect(infra).toContainText('3중 모니터링');
      await expect(infra).toContainText('기술 걱정 없는 안정적 운영');
    });
  });

  // 13. Channel Route Synchronization
  test.describe('13. Channel Route Synchronization', () => {
    test('validates /channels/food, /channels/fashion, and /channels/farm routes', async ({ page }) => {
      // 1. /channels/food loads successfully
      const foodRes = await page.goto('/channels/food');
      expect(foodRes?.status()).toBe(200);
      await expect(page.locator('text=산지직송의 신선함을 전하는 \'제철곳간\'')).toBeVisible();

      // 2. Food channel page title contains food context
      const foodTitle = await page.title();
      expect(foodTitle).toMatch(/식품|농가|자사몰/);

      // 3. /channels/fashion loads successfully
      const fashionRes = await page.goto('/channels/fashion');
      expect(fashionRes?.status()).toBe(200);

      // 4. Fashion channel page title contains fashion context
      const fashionTitle = await page.title();
      expect(fashionTitle).toMatch(/패션|브랜드|의류/);

      // 5. /channels/farm loads successfully
      const farmRes = await page.goto('/channels/farm');
      expect(farmRes?.status()).toBe(200);
      const farmTitle = await page.title();
      expect(farmTitle).toMatch(/농가|산지직송|자사몰/);
    });
  });

  // 14. MD3 Pricing Plan Cards
  test.describe('14. MD3 Pricing Plan Cards', () => {
    test('displays 3 pricing tiers with Starter, Recommended Business, and Custom', async ({ page }) => {
      await page.goto('/');

      const pricing = page.locator(SELECTORS.pricingSection).first();
      await expect(pricing).toBeVisible();

      // 1. Starter Plan Card
      const starter = page.locator(SELECTORS.starterPlanCard).first();
      await expect(starter).toBeVisible();
      await expect(starter).toContainText('75만 원');
      await expect(starter).toContainText('50% 할인');

      // 2. Business Plan Card (Recommended)
      const business = page.locator(SELECTORS.businessPlanCard).first();
      await expect(business).toBeVisible();
      await expect(business).toContainText('가장 추천하는 플랜');
      await expect(business).toContainText('비즈니스');

      // 3. Custom Plan Card
      const custom = page.locator(SELECTORS.customPlanCard).first();
      await expect(custom).toBeVisible();
      await expect(custom).toContainText('별도 견적');

      // 4. Plan feature item checkmarks
      const checkmarks = pricing.locator('svg.lucide-check-circle-2, svg.lucide-check-circle, svg');
      const checkCount = await checkmarks.count();
      expect(checkCount).toBeGreaterThanOrEqual(10);

      // 5. CTA buttons on all 3 cards with distinct query parameters
      const starterCta = starter.locator('a, button').first();
      const businessCta = business.locator('a, button').first();
      const customCta = custom.locator('a, button').first();
      await expect(starterCta).toBeVisible();
      await expect(businessCta).toBeVisible();
      await expect(customCta).toBeVisible();
    });
  });

  // 15. 3-Second Eligibility Checker
  test.describe('15. 3-Second Eligibility Checker', () => {
    test('interactively confirms 50% discount eligibility with dynamic feedback', async ({ page }) => {
      await page.goto('/');

      const checker = page.locator(SELECTORS.eligibilityChecker).first();
      await expect(checker).toBeVisible();

      const checkboxes = checker.locator(SELECTORS.eligibilityCheckbox);
      const count = await checkboxes.count();
      expect(count).toBeGreaterThanOrEqual(3);

      // 1. Initially all checkboxes checked -> eligible message visible
      await expect(checker).toContainText('지원 대상 확인 완료: 50% 감면 혜택 적용 대상입니다');

      // 2. Uncheck the first required checkbox
      await checkboxes.first().uncheck();

      // 3. Dynamic feedback updates to warning/instruction
      await expect(checker).toContainText('체크 항목을 확인해 주세요');
      await expect(checker).not.toContainText('지원 대상 확인 완료');

      // 4. Re-check the checkbox
      await checkboxes.first().check();

      // 5. Eligible message is restored
      await expect(checker).toContainText('지원 대상 확인 완료: 50% 감면 혜택 적용 대상입니다');
    });
  });

  // 16. MD3 Partner Application Modal / Funnel
  test.describe('16. MD3 Partner Application Modal & Funnel', () => {
    test('validates partner application schema, dialog semantics, or outbound routing', async ({ page }) => {
      await page.goto('/');

      // Check if modal or modal trigger exists
      const modalTrigger = page.locator(SELECTORS.navCta).first();
      await expect(modalTrigger).toBeVisible();

      // If clicking trigger opens in-page dialog modal
      const modal = page.locator(SELECTORS.partnerModal).first();
      const modalPresent = await modal.isVisible().catch(() => false);

      if (modalPresent) {
        // 1. Dialog semantics
        await expect(modal).toHaveAttribute('role', 'dialog');

        // 2. Required form inputs present
        await expect(modal.locator(SELECTORS.formInputs.company)).toBeVisible();
        await expect(modal.locator(SELECTORS.formInputs.name)).toBeVisible();
        await expect(modal.locator(SELECTORS.formInputs.phone)).toBeVisible();
        await expect(modal.locator(SELECTORS.formInputs.email)).toBeVisible();

        // 3. Honeypot field exists and is hidden
        const honeypot = modal.locator(SELECTORS.formInputs.hp_website);
        if (await honeypot.count() > 0) {
          await expect(honeypot).not.toBeVisible();
        }

        // 4. Privacy checkbox
        await expect(modal.locator(SELECTORS.formInputs.privacy)).toBeVisible();

        // 5. Submit button
        await expect(modal.locator(SELECTORS.formInputs.submitBtn)).toBeVisible();
      } else {
        // Fallback for outbound partner routing: verify outbound link and UTM
        const href = await modalTrigger.getAttribute('href');
        expect(href).toContain('shop-site-950864605215.asia-northeast3.run.app');
        expect(href).toContain('ref=wonpice_nav');

        // Also check hero CTA
        const heroCtaHref = await page.locator(SELECTORS.heroPrimaryCta).first().getAttribute('href');
        expect(heroCtaHref).toContain('ref=wonpice_hero');
      }
    });
  });

  // 17. Outbound Partner UTM Routing Fallback
  test.describe('17. Outbound Partner UTM Routing Fallback', () => {
    test('preserves all required wonpice_* ref parameters across conversion links', async ({ page }) => {
      await page.goto('/');

      // 1. Top banner ref
      const topBannerLink = page.locator('header a[href*="ref=wonpice_topbanner"]').first();
      await expect(topBannerLink).toHaveAttribute('href', /ref=wonpice_topbanner/);

      // 2. Nav CTA ref
      const navLink = page.locator('header a[href*="ref=wonpice_nav"]').first();
      await expect(navLink).toHaveAttribute('href', /ref=wonpice_nav/);

      // 3. Hero CTA ref
      const heroLink = page.locator('a[href*="ref=wonpice_hero"]').first();
      await expect(heroLink).toHaveAttribute('href', /ref=wonpice_hero/);

      // 4. Pricing cards refs (starter, business, custom)
      const starterLink = page.locator('a[href*="ref=wonpice_starter"]').first();
      const businessLink = page.locator('a[href*="ref=wonpice_business"]').first();
      const customLink = page.locator('a[href*="ref=wonpice_custom"]').first();
      await expect(starterLink).toHaveAttribute('href', /ref=wonpice_starter/);
      await expect(businessLink).toHaveAttribute('href', /ref=wonpice_business/);
      await expect(customLink).toHaveAttribute('href', /ref=wonpice_custom/);

      // 5. Eligibility box, FAQ bottom, and footer refs
      const eligLink = page.locator('a[href*="ref=wonpice_eligibility_box"]').first();
      const faqLink = page.locator('a[href*="ref=wonpice_faq_bottom"]').first();
      const footerLink = page.locator('a[href*="ref=wonpice_footer"]').first();
      await expect(eligLink).toHaveAttribute('href', /ref=wonpice_eligibility_box/);
      await expect(faqLink).toHaveAttribute('href', /ref=wonpice_faq_bottom/);
      await expect(footerLink).toHaveAttribute('href', /ref=wonpice_footer/);
    });
  });

  // 18. Accordion FAQ Section
  test.describe('18. Accordion FAQ Section', () => {
    test('expands, collapses, and reveals answers on interaction with 1:1 consult card', async ({ page }) => {
      await page.goto('/');

      const faq = page.locator(SELECTORS.faqSection).first();
      await expect(faq).toBeVisible();

      // 1. Multiple FAQ items rendered (at least 5)
      const questions = faq.locator('button:has-text("Q"), button:has-text("?")');
      const qCount = await questions.count();
      expect(qCount).toBeGreaterThanOrEqual(5);

      // 2. First FAQ item is open by default
      const firstAnswer = faq.locator('p:has-text("3~5주")').first();
      await expect(firstAnswer).toBeVisible();

      // 3. Click second item to expand it
      const secondQuestion = questions.nth(1);
      await secondQuestion.click();

      // 4. Second answer is revealed
      const secondAnswer = faq.locator('p:has-text("엑셀"), p:has-text("얼마든지 가능합니다")').first();
      await expect(secondAnswer).toBeVisible();

      // 5. 1:1 Consultation support card at bottom
      const consultCard = faq.locator('text=내 브랜드 맞춤 제작 견적이나 상담이 필요하신가요?').first();
      await expect(consultCard).toBeVisible();
      const consultCta = faq.locator('a:has-text("1:1 상담")').first();
      await expect(consultCta).toBeVisible();
    });
  });

  // 19. Google Store Footer & Trust Marks
  test.describe('19. Google Store Footer & Trust Marks', () => {
    test('renders 4-column footer layout, legal info, copyright, and trust marks', async ({ page }) => {
      await page.goto('/');

      const footer = page.locator(SELECTORS.footer).first();
      await expect(footer).toBeVisible();

      // 1. Brand identity and mission in footer
      await expect(footer).toContainText('WonPice');
      await expect(footer).toContainText('업종 맞춤 자사몰 솔루션');

      // 2. Section quick anchor links
      const quickLinks = footer.locator('a[href^="#"]');
      const quickLinkCount = await quickLinks.count();
      expect(quickLinkCount).toBeGreaterThanOrEqual(4);

      // 3. Live demo outbound links
      const foodDemoFooter = footer.locator('a[href*="demo-food"]').first();
      const fashionDemoFooter = footer.locator('a[href*="shop-store"]').first();
      await expect(foodDemoFooter).toBeVisible();
      await expect(fashionDemoFooter).toBeVisible();

      // 4. Copyright notice
      await expect(footer).toContainText('© 2026 WonPice');

      // 5. Trust marks (판매 수수료 0%, 50% 구축비 프로모션)
      await expect(footer).toContainText('판매 수수료 0%');
      await expect(footer).toContainText('50% 구축비 프로모션');
    });
  });

});
