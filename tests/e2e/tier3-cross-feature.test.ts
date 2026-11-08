import { test, expect } from '@playwright/test';
import { SELECTORS } from './helpers';

test.describe('Tier 3: Cross-Feature & Section Interactions', () => {

  // 1. GNB & Footer Anchor Navigation Smooth Scrolling
  test.describe('1. Anchor Navigation & Viewport Scrolling', () => {
    const targets = [
      { id: 'features', text: '핵심' },
      { id: 'showcase', text: '데모' },
      { id: 'infrastructure', text: '인프라' },
      { id: 'pricing', text: '요금제' },
      { id: 'faq', text: 'FAQ' },
    ];

    for (const target of targets) {
      test(`anchor link #${target.id} smoothly scrolls target section into viewport`, async ({ page }) => {
        await page.goto('/');

        // Find anchor link pointing to target (from GNB, Hero, or Footer)
        const anchor = page.locator(`a[href*="#${target.id}"]`).first();
        await expect(anchor).toBeVisible();

        // Target element must exist in page
        const section = page.locator(`#${target.id}`);
        await expect(section).toBeAttached();

        // Scroll / click anchor
        await anchor.click();

        // Target section should smoothly scroll into viewport
        await expect.poll(async () => {
          return await section.evaluate((el) => {
            const rect = el.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
          });
        }, { timeout: 3000 }).toBe(true);
      });
    }
  });

  // 2. Tab Switching Dynamic Showcase Updates
  test.describe('2. Showcase Tab Switching & Dynamic URL Synchronization', () => {
    test('toggling industry tabs updates showcase graphics, copy, and Cloud Run outbound URLs', async ({ page }) => {
      await page.goto('/');

      const foodTab = page.locator(SELECTORS.foodTabBtn).first();
      const fashionTab = page.locator(SELECTORS.fashionTabBtn).first();

      // --- State A: Food Active by default ---
      await expect(foodTab).toBeVisible();
      await expect(page.locator('text=산지직송의 신선함을 전하는 \'제철곳간\'')).toBeVisible();

      // Food demo link inside showcase section is rendered
      const showcaseFoodDemo = page.locator('#showcase a[href*="demo-food"]').first();
      await expect(showcaseFoodDemo).toBeVisible();
      const foodUrl = await showcaseFoodDemo.getAttribute('href');
      expect(foodUrl).toContain('shop-demo-food-store-950864605215.asia-northeast3.run.app');

      // --- Action: Switch to Fashion ---
      await fashionTab.click();

      // --- State B: Fashion Active ---
      await expect(page.locator('text=핏과 감성을 온전히 담아내는 \'온결\'')).toBeVisible();
      await expect(page.locator('text=세로형 고화질 룩북 테마')).toBeVisible();

      // Fashion demo link inside showcase is rendered
      const showcaseFashionDemo = page.locator('#showcase a[href*="shop-store"]').first();
      await expect(showcaseFashionDemo).toBeVisible();
      const fashionUrl = await showcaseFashionDemo.getAttribute('href');
      expect(fashionUrl).toContain('shop-store-950864605215.asia-northeast3.run.app');

      // Food demo link inside showcase is unmounted
      await expect(page.locator('#showcase a[href*="demo-food"]')).not.toBeVisible();

      // --- Action: Switch back to Food ---
      await foodTab.click();

      // --- State C: Restored to Food ---
      await expect(page.locator('text=산지직송의 신선함을 전하는 \'제철곳간\'')).toBeVisible();
      await expect(page.locator('#showcase a[href*="demo-food"]').first()).toBeVisible();
      await expect(page.locator('#showcase a[href*="shop-store"]')).not.toBeVisible();
    });
  });


  // 3. Eligibility Checklist Unlocking Dynamic Partner Status
  test.describe('3. Dynamic Eligibility State Propagation', () => {
    test('toggling eligibility checkboxes dynamically updates 50% discount state and partner CTA', async ({ page }) => {
      await page.goto('/');

      const checker = page.locator(SELECTORS.eligibilityChecker).first();
      await expect(checker).toBeVisible();

      const checkboxes = checker.locator(SELECTORS.eligibilityCheckbox);
      const cbCount = await checkboxes.count();
      expect(cbCount).toBeGreaterThanOrEqual(3);

      // Verify Initial Eligible State
      await expect(checker).toContainText('지원 대상 확인 완료: 50% 감면 혜택 적용 대상입니다');
      const ctaLink = checker.locator('a[href*="ref=wonpice_eligibility_box"]').first();
      await expect(ctaLink).toBeVisible();

      // Uncheck first checkbox -> Updates to ineligible warning
      await checkboxes.first().uncheck();
      await expect(checker).toContainText('체크 항목을 확인해 주세요');
      await expect(checker).not.toContainText('지원 대상 확인 완료');

      // Uncheck second checkbox -> Remains in warning state
      await checkboxes.nth(1).uncheck();
      await expect(checker).toContainText('체크 항목을 확인해 주세요');

      // Restore first checkbox -> Still needs second
      await checkboxes.first().check();
      await expect(checker).toContainText('체크 항목을 확인해 주세요');

      // Restore second checkbox -> Eligible state re-activated
      await checkboxes.nth(1).check();
      await expect(checker).toContainText('지원 대상 확인 완료: 50% 감면 혜택 적용 대상입니다');
      await expect(ctaLink).toHaveAttribute('href', /ref=wonpice_eligibility_box/);
    });
  });

  // 4. Modal Trigger & Plan Context Propagation
  test.describe('4. Plan & Industry Context Propagation Across Entry Points', () => {
    test('triggering application from GNB, Hero, and Pricing cards passes correct conversion context', async ({ page }) => {
      await page.goto('/');

      // Entry Point 1: GNB Nav CTA
      const navCta = page.locator(SELECTORS.navCta).first();
      await expect(navCta).toBeVisible();
      const navHref = await navCta.getAttribute('href');
      expect(navHref).toContain('ref=wonpice_nav');

      // Entry Point 2: Hero Primary CTA
      const heroCta = page.locator(SELECTORS.heroPrimaryCta).first();
      await expect(heroCta).toBeVisible();
      const heroHref = await heroCta.getAttribute('href');
      expect(heroHref).toContain('ref=wonpice_hero');

      // Entry Point 3: Starter Plan Card CTA
      const starterCard = page.locator(SELECTORS.starterPlanCard).first();
      const starterCta = starterCard.locator('a[href*="ref=wonpice_starter"]').first();
      await expect(starterCta).toBeVisible();
      const starterHref = await starterCta.getAttribute('href');
      expect(starterHref).toContain('ref=wonpice_starter');

      // Entry Point 4: Business Plan Card CTA
      const businessCard = page.locator(SELECTORS.businessPlanCard).first();
      const businessCta = businessCard.locator('a[href*="ref=wonpice_business"]').first();
      await expect(businessCta).toBeVisible();
      const businessHref = await businessCta.getAttribute('href');
      expect(businessHref).toContain('ref=wonpice_business');

      // Entry Point 5: Custom Plan Card CTA
      const customCard = page.locator(SELECTORS.customPlanCard).first();
      const customCta = customCard.locator('a[href*="ref=wonpice_custom"]').first();
      await expect(customCta).toBeVisible();
      const customHref = await customCta.getAttribute('href');
      expect(customHref).toContain('ref=wonpice_custom');

      // Entry Point 6: FAQ Bottom CTA
      const faqCta = page.locator(SELECTORS.faqSection).locator('a[href*="ref=wonpice_faq_bottom"]').first();
      await expect(faqCta).toBeVisible();
      const faqHref = await faqCta.getAttribute('href');
      expect(faqHref).toContain('ref=wonpice_faq_bottom');
    });

    test('pre-selects plan or industry context when in-page modal is triggered', async ({ page }) => {
      await page.goto('/');

      const businessCta = page.locator(SELECTORS.businessPlanCard).locator('a, button').first();
      await expect(businessCta).toBeVisible();

      const modal = page.locator(SELECTORS.partnerModal).first();
      const isButton = await businessCta.evaluate((el) => el.tagName.toLowerCase() === 'button');

      if (isButton) {
        await businessCta.click();
        if (await modal.isVisible()) {
          const planSelect = modal.locator(SELECTORS.formInputs.plan).first();
          if (await planSelect.count() > 0) {
            const selectedPlan = await planSelect.inputValue();
            expect(selectedPlan).toBe('business');
          }
        }
      } else {
        // Fallback for outbound routing
        const href = await businessCta.getAttribute('href');
        expect(href).toContain('ref=wonpice_business');
      }
    });
  });

  // 5. Channel Route Active State Synchronization
  test.describe('5. Channel Route State Synchronization', () => {
    test('direct navigation to /channels/fashion synchronizes fashion branding and meta', async ({ page }) => {
      const response = await page.goto('/channels/fashion');
      expect(response?.status()).toBe(200);

      // Title & Meta customized for Fashion
      const title = await page.title();
      expect(title).toContain('패션');
      expect(title).toContain('자사몰');

      // Page renders all primary sections intact
      await expect(page.locator(SELECTORS.header)).toBeVisible();
      await expect(page.locator(SELECTORS.heroSection).first()).toBeVisible();
      await expect(page.locator(SELECTORS.showcaseSection).first()).toBeVisible();
      await expect(page.locator(SELECTORS.pricingSection).first()).toBeVisible();
      await expect(page.locator(SELECTORS.footer)).toBeVisible();
    });

    test('direct navigation to /channels/food synchronizes food branding and showcase', async ({ page }) => {
      const response = await page.goto('/channels/food');
      expect(response?.status()).toBe(200);

      // Showcase defaults to Food '제철곳간'
      await expect(page.locator('text=산지직송의 신선함을 전하는 \'제철곳간\'')).toBeVisible();
      await expect(page.locator(SELECTORS.foodDemoLink).first()).toBeVisible();
    });

    test('navigating between channel routes and home preserves consistent layout and branding', async ({ page }) => {
      await page.goto('/channels/farm');
      await expect(page.locator(SELECTORS.logo)).toBeVisible();

      await page.locator(SELECTORS.logo).click();
      await expect(page).toHaveURL(/localhost:3000\/?$/);
      await expect(page.locator(SELECTORS.heroHeading)).toBeVisible();
    });
  });

});
