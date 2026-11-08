import { test, expect } from '@playwright/test';
import { SELECTORS, expectNoHorizontalScroll } from './helpers';

test.describe('Adversarial Stress Test: Challenger 2 (Milestone 4 - Pricing, Eligibility, FAQ & Mobile Responsiveness)', () => {

  // =========================================================================
  // Stress Test 1: 3-Second Eligibility Checklist Multi-Boundary & Permutations
  // =========================================================================
  test.describe('1. 3-Second Eligibility Checklist Multi-Boundary & Permutations', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const pricingSection = page.locator('#pricing');
      await expect(pricingSection).toBeVisible();
    });

    test('verifies initial state has all 3 boxes checked and shows eligibility success text', async ({ page }) => {
      const checker = page.locator('[data-testid="eligibility-checker"]');
      await expect(checker).toBeVisible();

      const checkboxes = checker.locator('input[type="checkbox"]');
      await expect(checkboxes).toHaveCount(3);

      // Verify all initially checked
      expect(await checkboxes.nth(0).isChecked()).toBe(true);
      expect(await checkboxes.nth(1).isChecked()).toBe(true);
      expect(await checkboxes.nth(2).isChecked()).toBe(true);

      // Verify dynamic text
      const eligibleText = checker.locator('text=지원 대상 확인 완료: 50% 감면 혜택 적용 대상입니다');
      await expect(eligibleText).toBeVisible();
      await expect(checker.locator('text=체크 항목을 확인해 주세요')).not.toBeVisible();
    });

    test('multi-boundary toggling sequence: uncheck box1, uncheck box2, check box1, check box2', async ({ page }) => {
      const checker = page.locator('[data-testid="eligibility-checker"]');
      const checkboxes = checker.locator('input[type="checkbox"]');
      const box1 = checkboxes.nth(0);
      const box2 = checkboxes.nth(1);
      const successMsg = checker.locator('text=지원 대상 확인 완료: 50% 감면 혜택 적용 대상입니다');
      const nonEligibleMsg = checker.locator('text=체크 항목을 확인해 주세요');

      // Initial: [true, true, true] -> Eligible
      await expect(successMsg).toBeVisible();
      await expect(nonEligibleMsg).not.toBeVisible();

      // Step 1: Uncheck box 1 -> [false, true, true] -> Non-eligible
      await box1.uncheck();
      expect(await box1.isChecked()).toBe(false);
      await expect(nonEligibleMsg).toBeVisible();
      await expect(successMsg).not.toBeVisible();

      // Step 2: Uncheck box 2 -> [false, false, true] -> Non-eligible
      await box2.uncheck();
      expect(await box2.isChecked()).toBe(false);
      await expect(nonEligibleMsg).toBeVisible();
      await expect(successMsg).not.toBeVisible();

      // Step 3: Check box 1 -> [true, false, true] -> Still Non-eligible because box 2 is false
      await box1.check();
      expect(await box1.isChecked()).toBe(true);
      await expect(nonEligibleMsg).toBeVisible();
      await expect(successMsg).not.toBeVisible();

      // Step 4: Check box 2 -> [true, true, true] -> Eligible!
      await box2.check();
      expect(await box2.isChecked()).toBe(true);
      await expect(successMsg).toBeVisible();
      await expect(nonEligibleMsg).not.toBeVisible();
    });

    test('rigorous permutation stress test: all 8 permutations of (checked1, checked2, checked3)', async ({ page }) => {
      const checker = page.locator('[data-testid="eligibility-checker"]');
      const checkboxes = checker.locator('input[type="checkbox"]');
      const box1 = checkboxes.nth(0);
      const box2 = checkboxes.nth(1);
      const box3 = checkboxes.nth(2);

      const successMsg = checker.locator('text=지원 대상 확인 완료: 50% 감면 혜택 적용 대상입니다');
      const nonEligibleMsg = checker.locator('text=체크 항목을 확인해 주세요');

      // Test all 8 permutations
      const permutations = [
        { b1: false, b2: false, b3: false, expectedEligible: false },
        { b1: false, b2: false, b3: true,  expectedEligible: false },
        { b1: false, b2: true,  b3: false, expectedEligible: false },
        { b1: false, b2: true,  b3: true,  expectedEligible: false },
        { b1: true,  b2: false, b3: false, expectedEligible: false },
        { b1: true,  b2: false, b3: true,  expectedEligible: false },
        { b1: true,  b2: true,  b3: false, expectedEligible: true },
        { b1: true,  b2: true,  b3: true,  expectedEligible: true },
      ];

      for (const p of permutations) {
        // Set state
        if (p.b1) await box1.check(); else await box1.uncheck();
        if (p.b2) await box2.check(); else await box2.uncheck();
        if (p.b3) await box3.check(); else await box3.uncheck();

        // Verify checkbox state
        expect(await box1.isChecked()).toBe(p.b1);
        expect(await box2.isChecked()).toBe(p.b2);
        expect(await box3.isChecked()).toBe(p.b3);

        if (p.expectedEligible) {
          await expect(successMsg).toBeVisible();
          await expect(nonEligibleMsg).not.toBeVisible();
          console.log(`[Permutation PASSED] (${p.b1}, ${p.b2}, ${p.b3}) => Eligible text confirmed`);
        } else {
          await expect(nonEligibleMsg).toBeVisible();
          await expect(successMsg).not.toBeVisible();
          console.log(`[Permutation PASSED] (${p.b1}, ${p.b2}, ${p.b3}) => Non-eligible warning confirmed`);
        }
      }
    });

    test('keyboard accessibility: toggling checkboxes via Space key', async ({ page }) => {
      const checker = page.locator('[data-testid="eligibility-checker"]');
      const checkboxes = checker.locator('input[type="checkbox"]');
      const box1 = checkboxes.nth(0);
      const successMsg = checker.locator('text=지원 대상 확인 완료: 50% 감면 혜택 적용 대상입니다');
      const nonEligibleMsg = checker.locator('text=체크 항목을 확인해 주세요');

      await box1.focus();
      await page.keyboard.press('Space'); // toggle off
      expect(await box1.isChecked()).toBe(false);
      await expect(nonEligibleMsg).toBeVisible();

      await page.keyboard.press('Space'); // toggle back on
      expect(await box1.isChecked()).toBe(true);
      await expect(successMsg).toBeVisible();
    });
  });

  // =========================================================================
  // Stress Test 2: Context Propagation from Pricing to Partner Modal & Outbound Links
  // =========================================================================
  test.describe('2. Context Propagation from Pricing & Outbound Conversion Links', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    });

    test('clicking Starter CTA propagates plan="starter" into partner modal', async ({ page }) => {
      const starterCard = page.locator('[data-testid="plan-starter"]');
      const starterCta = starterCard.locator('a:has-text("스타터 50% 신청")');
      await expect(starterCta).toBeVisible();

      await starterCta.click();

      // Partner modal should be open
      const modal = page.locator(SELECTORS.partnerModal);
      await expect(modal).toBeVisible();

      // Plan select should have "starter"
      const planSelect = page.locator(SELECTORS.formInputs.plan);
      await expect(planSelect).toHaveValue('starter');

      // Close modal via Escape
      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    });

    test('clicking Business CTA propagates plan="business" into partner modal', async ({ page }) => {
      const businessCard = page.locator('[data-testid="plan-business"]');
      const businessCta = businessCard.locator('a:has-text("비즈니스 50% 신청")');
      await expect(businessCta).toBeVisible();

      await businessCta.click();

      const modal = page.locator(SELECTORS.partnerModal);
      await expect(modal).toBeVisible();

      const planSelect = page.locator(SELECTORS.formInputs.plan);
      await expect(planSelect).toHaveValue('business');

      // Close modal via close button
      const closeBtn = page.locator(SELECTORS.partnerModalClose);
      await closeBtn.click();
      await expect(modal).not.toBeVisible();
    });

    test('clicking Custom CTA propagates plan="custom" into partner modal', async ({ page }) => {
      const customCard = page.locator('[data-testid="plan-custom"]');
      const customCta = customCard.locator('a:has-text("맞춤 플랜 상담")');
      await expect(customCta).toBeVisible();

      await customCta.click();

      const modal = page.locator(SELECTORS.partnerModal);
      await expect(modal).toBeVisible();

      const planSelect = page.locator(SELECTORS.formInputs.plan);
      await expect(planSelect).toHaveValue('custom');

      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    });

    test('clicking Eligibility Box CTA propagates plan="business" into partner modal', async ({ page }) => {
      const checker = page.locator('[data-testid="eligibility-checker"]');
      const applyCta = checker.locator('a:has-text("공식 지원 신청서 바로가기")');
      await expect(applyCta).toBeVisible();

      await applyCta.click();

      const modal = page.locator(SELECTORS.partnerModal);
      await expect(modal).toBeVisible();

      const planSelect = page.locator(SELECTORS.formInputs.plan);
      await expect(planSelect).toHaveValue('business');

      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    });

    test('clicking FAQ bottom card CTA propagates plan="custom" into partner modal', async ({ page }) => {
      const faqSection = page.locator('#faq');
      const faqCta = faqSection.locator('a:has-text("1:1 상담 신청서 작성")');
      await expect(faqCta).toBeVisible();

      await faqCta.click();

      const modal = page.locator(SELECTORS.partnerModal);
      await expect(modal).toBeVisible();

      const planSelect = page.locator(SELECTORS.formInputs.plan);
      await expect(planSelect).toHaveValue('custom');

      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    });

    test('verifies all 9 outbound conversion links carry their exact ref=wonpice_* parameters', async ({ page }) => {
      // Find all anchors with shop-site
      const conversionLinks = page.locator('a[href*="shop-site-950864605215.asia-northeast3.run.app"]');
      const totalLinks = await conversionLinks.count();
      expect(totalLinks).toBeGreaterThanOrEqual(9);

      const foundRefs = new Set<string>();
      const expectedRefs = [
        'wonpice_topbanner',
        'wonpice_nav',
        'wonpice_hero',
        'wonpice_starter',
        'wonpice_business',
        'wonpice_custom',
        'wonpice_eligibility_box',
        'wonpice_faq_bottom',
        'wonpice_footer',
      ];

      for (let i = 0; i < totalLinks; i++) {
        const link = conversionLinks.nth(i);
        const href = await link.getAttribute('href');
        const target = await link.getAttribute('target');
        const rel = await link.getAttribute('rel');

        expect(href).not.toBeNull();
        expect(target).toBe('_blank');
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');

        const url = new URL(href!);
        const refParam = url.searchParams.get('ref');
        if (refParam) {
          foundRefs.add(refParam);
        }
      }

      console.log('[Found Outbound Conversion Refs]', Array.from(foundRefs));

      for (const expectedRef of expectedRefs) {
        expect(foundRefs.has(expectedRef), `Expected ref="${expectedRef}" to be present`).toBe(true);
      }
      expect(foundRefs.size).toBe(9);
    });
  });

  // =========================================================================
  // Stress Test 3: Mobile Viewports (375px & 390px) & Accordion & Footer
  // =========================================================================
  test.describe('3. Mobile Viewports (375px & 390px) Responsive Layout & Accordion Stress', () => {
    const mobileViewports = [
      { name: 'iPhone SE (375px)', width: 375, height: 667 },
      { name: 'iPhone 13/14 Pro (390px)', width: 390, height: 844 },
    ];

    for (const vp of mobileViewports) {
      test(`verifies zero horizontal overflow at ${vp.width}px (${vp.name}) on /`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        await expectNoHorizontalScroll(page);
      });

      test(`verifies vertical stacking and separation of 3 pricing cards at ${vp.width}px (${vp.name})`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const starter = page.locator('[data-testid="plan-starter"]');
        const business = page.locator('[data-testid="plan-business"]');
        const custom = page.locator('[data-testid="plan-custom"]');

        await expect(starter).toBeVisible();
        await expect(business).toBeVisible();
        await expect(custom).toBeVisible();

        const boxStarter = await starter.boundingBox();
        const boxBusiness = await business.boundingBox();
        const boxCustom = await custom.boundingBox();

        expect(boxStarter).not.toBeNull();
        expect(boxBusiness).not.toBeNull();
        expect(boxCustom).not.toBeNull();

        console.log(`[Pricing Mobile Stacking at ${vp.width}px]`, {
          starter: { y: boxStarter!.y, h: boxStarter!.height, bottom: boxStarter!.y + boxStarter!.height },
          business: { y: boxBusiness!.y, h: boxBusiness!.height, bottom: boxBusiness!.y + boxBusiness!.height },
          custom: { y: boxCustom!.y, h: boxCustom!.height, bottom: boxCustom!.y + boxCustom!.height },
        });

        // 1. Vertical stacking order: boxStarter.y < boxBusiness.y < boxCustom.y
        expect(boxStarter!.y).toBeLessThan(boxBusiness!.y);
        expect(boxBusiness!.y).toBeLessThan(boxCustom!.y);

        // 2. Vertical separation: each card starts below the previous card
        expect(boxBusiness!.y).toBeGreaterThanOrEqual(boxStarter!.y + boxStarter!.height - 10);
        expect(boxCustom!.y).toBeGreaterThanOrEqual(boxBusiness!.y + boxBusiness!.height - 10);

        // 3. Horizontal containment: each card fits cleanly inside the viewport
        for (const [, box] of [['Starter', boxStarter!], ['Business', boxBusiness!], ['Custom', boxCustom!]] as const) {
          expect(box.x).toBeGreaterThanOrEqual(0);
          expect(box.x + box.width).toBeLessThanOrEqual(vp.width + 1);
        }
      });

      test(`verifies FAQ accordion items expand/collapse cleanly without overflow at ${vp.width}px (${vp.name})`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const faqSection = page.locator('#faq');
        await expect(faqSection).toBeVisible();

        const faqItems = faqSection.locator('.rounded-\\[28px\\]');
        const faqCount = await faqItems.count();
        expect(faqCount).toBe(6);

        // Item 0 is open by default
        const firstAnswer = faqItems.nth(0).locator('p');
        await expect(firstAnswer).toBeVisible();
        await expectNoHorizontalScroll(page);

        // Click item 0 to collapse
        const firstBtn = faqItems.nth(0).locator('button');
        await firstBtn.click();
        await page.waitForTimeout(100);
        await expect(firstAnswer).not.toBeVisible();
        await expectNoHorizontalScroll(page);

        // Click item 0 to expand again
        await firstBtn.click();
        await page.waitForTimeout(100);
        await expect(firstAnswer).toBeVisible();
        await expectNoHorizontalScroll(page);

        // Now test remaining items 1 through 5: initially closed, click to open, click to close
        for (let i = 1; i < faqCount; i++) {
          const item = faqItems.nth(i);
          const btn = item.locator('button');
          const answer = item.locator('p');

          // Initially closed
          await expect(answer).not.toBeVisible();

          // Click to expand
          await btn.click();
          await page.waitForTimeout(100);
          await expect(answer).toBeVisible();
          await expectNoHorizontalScroll(page);

          // Click to collapse
          await btn.click();
          await page.waitForTimeout(100);
          await expect(answer).not.toBeVisible();
          await expectNoHorizontalScroll(page);
        }
      });

      test(`verifies Footer layout wraps cleanly without text clipping at ${vp.width}px (${vp.name})`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const footer = page.locator('footer');
        await expect(footer).toBeVisible();

        // Footer element itself must not overflow
        const footerScrollWidth = await footer.evaluate((el) => el.scrollWidth);
        const footerClientWidth = await footer.evaluate((el) => el.clientWidth);
        expect(footerScrollWidth).toBeLessThanOrEqual(footerClientWidth + 1);

        // Check each footer link and ensure no text is clipped
        const footerLinks = footer.locator('a');
        const linkCount = await footerLinks.count();
        expect(linkCount).toBeGreaterThan(0);

        for (let i = 0; i < linkCount; i++) {
          const link = footerLinks.nth(i);
          const box = await link.boundingBox();
          if (box) {
            expect(box.x).toBeGreaterThanOrEqual(0);
            expect(box.x + box.width).toBeLessThanOrEqual(vp.width + 2);
          }
        }

        // Verify key footer text content is fully readable and visible
        await expect(footer.locator('span.font-semibold:has-text("WonPice")')).toBeVisible();
        await expect(footer.locator('text=업종 맞춤 자사몰 솔루션').first()).toBeVisible();
        await expect(footer.locator('text=© 2026 WonPice & MallStudio')).toBeVisible();
        await expect(footer.getByText('판매 수수료 0%', { exact: true })).toBeVisible();
        await expect(footer.getByText('50% 구축비 프로모션', { exact: true })).toBeVisible();
      });
    }
  });
});
