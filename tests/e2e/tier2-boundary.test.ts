import { test, expect } from '@playwright/test';
import { SELECTORS, expectNoHorizontalScroll } from './helpers';

test.describe('Tier 2: Boundary, Mobile & Input Validation', () => {

  // 1. Mobile Viewports: 375px (iPhone SE)
  test.describe('1. Mobile Viewport 375px (iPhone SE)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
    });

    test('verifies zero horizontal overflow at 375px', async ({ page }) => {
      await page.goto('/');
      await expectNoHorizontalScroll(page);
    });

    test('header collapses and renders mobile-friendly CTA without clipping', async ({ page }) => {
      await page.goto('/');

      const header = page.locator(SELECTORS.header);
      await expect(header).toBeVisible();

      // Brand logo is visible and fits within viewport
      const logo = page.locator(SELECTORS.logo);
      await expect(logo).toBeVisible();
      const logoBox = await logo.boundingBox();
      expect(logoBox).not.toBeNull();
      expect(logoBox!.x + logoBox!.width).toBeLessThanOrEqual(375);

      // Nav CTA or hamburger button fits cleanly
      const navCta = header.locator('a, button').filter({ hasText: '신청' }).first();
      await expect(navCta).toBeVisible();
      const ctaBox = await navCta.boundingBox();
      expect(ctaBox).not.toBeNull();
      expect(ctaBox!.x + ctaBox!.width).toBeLessThanOrEqual(375);
    });

    test('mobile drawer opens and closes if hamburger toggle is present', async ({ page }) => {
      await page.goto('/');

      const hamburger = page.locator(SELECTORS.mobileMenuBtn).first();
      const hasHamburger = await hamburger.isVisible().catch(() => false);

      if (hasHamburger) {
        // Open drawer
        await hamburger.click();
        const drawer = page.locator(SELECTORS.mobileDrawer).first();
        await expect(drawer).toBeVisible();

        // Close via close button or Escape
        const closeBtn = drawer.locator(SELECTORS.partnerModalClose).first();
        if (await closeBtn.isVisible()) {
          await closeBtn.click();
          await expect(drawer).not.toBeVisible();
        } else {
          await page.keyboard.press('Escape');
          await expect(drawer).not.toBeVisible();
        }
      } else {
        // Fallback: Verify that mobile shell header maintains compact single-line layout
        const headerHeight = await page.locator(SELECTORS.header).evaluate((el) => el.getBoundingClientRect().height);
        expect(headerHeight).toBeLessThanOrEqual(150);
      }
    });

    test('hero dual CTAs stack vertically without overlapping at 375px', async ({ page }) => {
      await page.goto('/');

      const primaryCta = page.locator(SELECTORS.heroPrimaryCta).first();
      const secondaryCta = page.locator(SELECTORS.heroSecondaryCta).first();

      await expect(primaryCta).toBeVisible();
      await expect(secondaryCta).toBeVisible();

      const box1 = await primaryCta.boundingBox();
      const box2 = await secondaryCta.boundingBox();

      expect(box1).not.toBeNull();
      expect(box2).not.toBeNull();

      // On mobile (375px), primary CTA should be stacked above secondary CTA
      expect(box2!.y).toBeGreaterThanOrEqual(box1!.y + box1!.height - 5);
      // Both CTAs fit within screen boundaries
      expect(box1!.x + box1!.width).toBeLessThanOrEqual(375);
      expect(box2!.x + box2!.width).toBeLessThanOrEqual(375);
    });

    test('bento grid cards stack in single column on mobile (< 640px)', async ({ page }) => {
      await page.goto('/');

      const infra = page.locator(SELECTORS.infrastructureSection).first();
      await expect(infra).toBeVisible();

      // Locate all pillar cards within infrastructure
      const cards = infra.locator('.grid > div');
      const count = await cards.count();
      expect(count).toBeGreaterThanOrEqual(4);

      // Verify vertical stacking: card[i].y < card[i+1].y
      for (let i = 0; i < count - 1; i++) {
        const boxCurrent = await cards.nth(i).boundingBox();
        const boxNext = await cards.nth(i + 1).boundingBox();
        if (boxCurrent && boxNext) {
          expect(boxNext.y).toBeGreaterThanOrEqual(boxCurrent.y + boxCurrent.height - 10);
        }
      }
    });

    test('pricing plan cards stack in single column on mobile (< 640px)', async ({ page }) => {
      await page.goto('/');

      const starter = page.locator(SELECTORS.starterPlanCard).first();
      const business = page.locator(SELECTORS.businessPlanCard).first();
      const custom = page.locator(SELECTORS.customPlanCard).first();

      await expect(starter).toBeVisible();
      await expect(business).toBeVisible();
      await expect(custom).toBeVisible();

      const boxStarter = await starter.boundingBox();
      const boxBusiness = await business.boundingBox();
      const boxCustom = await custom.boundingBox();

      expect(boxStarter).not.toBeNull();
      expect(boxBusiness).not.toBeNull();
      expect(boxCustom).not.toBeNull();

      // Vertical stacking
      expect(boxBusiness!.y).toBeGreaterThan(boxStarter!.y);
      expect(boxCustom!.y).toBeGreaterThan(boxBusiness!.y);
    });
  });

  // 2. Mobile Viewports: 390px (iPhone 12/13/14)
  test.describe('2. Mobile Viewport 390px (iPhone 12/13)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
    });

    test('verifies zero horizontal overflow across all channel routes at 390px', async ({ page }) => {
      const routes = ['/', '/channels/food', '/channels/fashion', '/channels/farm'];
      for (const route of routes) {
        await page.goto(route);
        await expectNoHorizontalScroll(page);
      }
    });

    test('KPI Metric Ribbon wraps gracefully without text truncation at 390px', async ({ page }) => {
      await page.goto('/');

      const ribbon = page.locator(SELECTORS.metricsRibbon).first();
      await expect(ribbon).toBeVisible();

      await expect(ribbon).toContainText('자사몰 제작비');
      await expect(ribbon).toContainText('75만 원부터');
      await expect(ribbon).toContainText('월 고정 유지비');
      await expect(ribbon).toContainText('10만 원');
      await expect(ribbon).toContainText('추가 중개 수수료');
      await expect(ribbon).toContainText('0원 (0%)');
      await expect(ribbon).toContainText('제작 소요 기간');
      await expect(ribbon).toContainText('3~5주 완성');

      // Verify no horizontal overflow in ribbon
      await expectNoHorizontalScroll(page);
    });

    test('FAQ accordion items expand and collapse cleanly without overflow at 390px', async ({ page }) => {
      await page.goto('/');

      const faq = page.locator(SELECTORS.faqSection).first();
      const questions = faq.locator('button:has-text("Q"), button:has-text("?")');
      const count = await questions.count();
      expect(count).toBeGreaterThanOrEqual(3);

      for (let i = 0; i < Math.min(count, 3); i++) {
        await questions.nth(i).click();
        await expectNoHorizontalScroll(page);
      }
    });
  });

  // 3. Form Input Boundaries & Validation
  test.describe('3. Form Input Boundaries & Validation', () => {
    test('enforces required field and boundary validation when partner form is present', async ({ page }) => {
      await page.goto('/');

      const modalTrigger = page.locator(SELECTORS.navCta).first();
      await expect(modalTrigger).toBeVisible();

      // Check if modal dialog is triggered or exists
      const modal = page.locator(SELECTORS.partnerModal).first();
      let modalVisible = await modal.isVisible().catch(() => false);

      if (!modalVisible) {
        // Try clicking trigger to open modal if clickable
        const isButton = await modalTrigger.evaluate((el) => el.tagName.toLowerCase() === 'button');
        if (isButton) {
          await modalTrigger.click();
          modalVisible = await modal.isVisible().catch(() => false);
        }
      }

      if (modalVisible) {
        // 1. Empty submission triggers required errors
        const submitBtn = modal.locator(SELECTORS.formInputs.submitBtn).first();
        await submitBtn.click();

        // 2. Check HTML5 validity on required inputs
        const companyInput = modal.locator(SELECTORS.formInputs.company).first();
        const isCompanyValid = await companyInput.evaluate((el: HTMLInputElement) => el.checkValidity());
        expect(isCompanyValid).toBe(false);

        // 3. Phone regex boundary validation
        const phoneInput = modal.locator(SELECTORS.formInputs.phone).first();
        await phoneInput.fill('1234'); // Invalid short phone
        const isInvalidPhone = await phoneInput.evaluate((el: HTMLInputElement) => el.checkValidity());
        expect(isInvalidPhone).toBe(false);

        await phoneInput.fill('010-1234-5678'); // Valid Korean mobile
        const isValidMobile = await phoneInput.evaluate((el: HTMLInputElement) => el.checkValidity());
        expect(isValidMobile).toBe(true);

        await phoneInput.fill('02-123-4567'); // Valid Korean landline
        const isValidLandline = await phoneInput.evaluate((el: HTMLInputElement) => el.checkValidity());
        expect(isValidLandline).toBe(true);

        // 4. Email regex boundary validation
        const emailInput = modal.locator(SELECTORS.formInputs.email).first();
        await emailInput.fill('invalid-email-without-at');
        const isInvalidEmail = await emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
        expect(isInvalidEmail).toBe(false);

        await emailInput.fill('founder@wonpice.co.kr');
        const isValidEmail = await emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
        expect(isValidEmail).toBe(true);

        // 5. Honeypot spam field validation
        const hpInput = modal.locator(SELECTORS.formInputs.hp_website).first();
        if (await hpInput.count() > 0) {
          // Honeypot should not be displayed to human users
          const hpVisible = await hpInput.isVisible();
          expect(hpVisible).toBe(false);
        }

        // 6. Privacy checkbox required
        const privacyCheckbox = modal.locator(SELECTORS.formInputs.privacy).first();
        if (await privacyCheckbox.count() > 0) {
          const isPrivacyRequired = await privacyCheckbox.evaluate((el: HTMLInputElement) => el.required);
          expect(isPrivacyRequired).toBe(true);
        }
      } else {
        // Outbound Fallback Boundary Verification:
        // Validate that all partner links carry valid schema UTM queries and point to valid HTTPS
        const partnerLinks = page.locator('a[href*="shop-site-950864605215.asia-northeast3.run.app"]');
        const count = await partnerLinks.count();
        expect(count).toBeGreaterThanOrEqual(4);

        for (let i = 0; i < count; i++) {
          const href = await partnerLinks.nth(i).getAttribute('href');
          expect(href).toMatch(/^https:\/\//);
          expect(href).toContain('ref=wonpice_');
        }
      }
    });

    test('validates 3-second eligibility checklist input boundary states', async ({ page }) => {
      await page.goto('/');

      const checker = page.locator(SELECTORS.eligibilityChecker).first();
      await expect(checker).toBeVisible();

      const checkboxes = checker.locator(SELECTORS.eligibilityCheckbox);
      const count = await checkboxes.count();
      expect(count).toBeGreaterThanOrEqual(3);

      // Boundary 1: All unchecked -> Not eligible
      for (let i = 0; i < count; i++) {
        await checkboxes.nth(i).uncheck();
      }
      await expect(checker).toContainText('체크 항목을 확인해 주세요');
      await expect(checker).not.toContainText('지원 대상 확인 완료');

      // Boundary 2: Only 1 checked -> Still not eligible
      await checkboxes.first().check();
      await expect(checker).toContainText('체크 항목을 확인해 주세요');

      // Boundary 3: Both first and second checked -> Eligible
      await checkboxes.nth(1).check();
      await expect(checker).toContainText('지원 대상 확인 완료: 50% 감면 혜택 적용 대상입니다');

      // Boundary 4: All 3 checked -> Eligible
      await checkboxes.nth(2).check();
      await expect(checker).toContainText('지원 대상 확인 완료: 50% 감면 혜택 적용 대상입니다');
    });
  });

});
