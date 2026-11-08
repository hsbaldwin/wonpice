import { test, expect } from '@playwright/test';
import { SELECTORS } from './helpers';

test.describe('Adversarial Stress Test: Challenger 1 (Mobile & Viewports)', () => {

  // Test 1: Zero horizontal overflow across viewports (375px, 390px, 1280px) and all routes
  const viewports = [
    { name: 'iPhone SE (375px)', width: 375, height: 667 },
    { name: 'iPhone 12/13 (390px)', width: 390, height: 844 },
    { name: 'Desktop (1280px)', width: 1280, height: 800 },
  ];

  const routes = ['/', '/channels/food', '/channels/fashion', '/channels/farm'];

  for (const vp of viewports) {
    test.describe(`Horizontal Overflow Stress: ${vp.name}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
      });

      for (const route of routes) {
        test(`verifies zero horizontal overflow at ${vp.width}px on route "${route}"`, async ({ page }) => {
          await page.goto(route);
          await page.waitForLoadState('networkidle');

          const { scrollWidth, clientWidth } = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
          }));

          console.log(`[Viewport ${vp.width}px - ${route}] scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
          expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
        });
      }
    });
  }

  // Test 2: Hero dual CTAs vertical stacking and no horizontal clipping at 375px
  test.describe('Hero Dual CTAs at 375px (iPhone SE)', () => {
    test('strictly enforces vertical stacking and boundary containment', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const primaryCta = page.locator(SELECTORS.heroPrimaryCta).first();
      const secondaryCta = page.locator(SELECTORS.heroSecondaryCta).first();

      await expect(primaryCta).toBeVisible();
      await expect(secondaryCta).toBeVisible();

      const box1 = await primaryCta.boundingBox();
      const box2 = await secondaryCta.boundingBox();

      expect(box1).not.toBeNull();
      expect(box2).not.toBeNull();

      console.log('[Hero CTAs at 375px]', {
        primary: { x: box1!.x, y: box1!.y, width: box1!.width, height: box1!.height },
        secondary: { x: box2!.x, y: box2!.y, width: box2!.width, height: box2!.height },
      });

      // 1. Vertical stacking requirement: box2.y >= box1.y + box1.height - 5
      expect(box2!.y).toBeGreaterThanOrEqual(box1!.y + box1!.height - 5);

      // 2. Horizontal clipping check: primary CTA completely inside viewport
      expect(box1!.x).toBeGreaterThanOrEqual(0);
      expect(box1!.x + box1!.width).toBeLessThanOrEqual(375);

      // 3. Horizontal clipping check: secondary CTA completely inside viewport
      expect(box2!.x).toBeGreaterThanOrEqual(0);
      expect(box2!.x + box2!.width).toBeLessThanOrEqual(375);
    });
  });

  // Test 3: Mobile Navigation Drawer - 4 Dismissal Interactions & Body Scroll Lock
  test.describe('Mobile Navigation Drawer: 4 Dismissal Interactions & Body Scroll Lock', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    });

    // Interaction 1: Open -> Click close button (aria-label="닫기") -> drawer closes
    test('Dismissal 1: Closes via close button [aria-label="닫기"]', async ({ page }) => {
      const hamburger = page.locator(SELECTORS.mobileMenuBtn).first();
      await expect(hamburger).toBeVisible();
      await hamburger.click();

      const drawer = page.locator(SELECTORS.mobileDrawer).first();
      await expect(drawer).toBeVisible();

      // Verify body scroll lock active
      const overflowWhenOpen = await page.evaluate(() => document.body.style.overflow);
      expect(overflowWhenOpen).toBe('hidden');

      // Click close button
      const closeBtn = drawer.locator('button[aria-label="닫기"]').first();
      await expect(closeBtn).toBeVisible();
      await closeBtn.click();

      await expect(drawer).not.toBeVisible();

      // Verify body scroll lock released
      const overflowWhenClosed = await page.evaluate(() => document.body.style.overflow);
      expect(overflowWhenClosed).not.toBe('hidden');
    });

    // Interaction 2: Open -> Press Escape key -> drawer closes
    test('Dismissal 2: Closes via Escape key press', async ({ page }) => {
      const hamburger = page.locator(SELECTORS.mobileMenuBtn).first();
      await hamburger.click();

      const drawer = page.locator(SELECTORS.mobileDrawer).first();
      await expect(drawer).toBeVisible();

      // Verify body scroll lock active
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

      // Press Escape
      await page.keyboard.press('Escape');
      await expect(drawer).not.toBeVisible();

      // Verify body scroll lock released
      expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
    });

    // Interaction 3: Open -> Click backdrop overlay (e.g. at x=20, y=250) -> drawer closes
    test('Dismissal 3: Closes via clicking backdrop overlay at (x=20, y=250)', async ({ page }) => {
      const hamburger = page.locator(SELECTORS.mobileMenuBtn).first();
      await hamburger.click();

      const drawer = page.locator(SELECTORS.mobileDrawer).first();
      await expect(drawer).toBeVisible();

      // Verify body scroll lock active
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

      // Click on backdrop outside drawer panel (x=20, y=250 is outside the 290px drawer anchored to the right)
      await page.mouse.click(20, 250);

      await expect(drawer).not.toBeVisible();

      // Verify body scroll lock released
      expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
    });

    // Interaction 4: Open -> Click navigation anchor link -> drawer closes and smoothly scrolls
    test('Dismissal 4: Closes via anchor link click and target section scrolls into viewport', async ({ page }) => {
      const hamburger = page.locator(SELECTORS.mobileMenuBtn).first();
      await hamburger.click();

      const drawer = page.locator(SELECTORS.mobileDrawer).first();
      await expect(drawer).toBeVisible();

      // Verify body scroll lock active
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

      // Click anchor link #pricing
      const pricingAnchor = drawer.locator('a[href="#pricing"]').first();
      await expect(pricingAnchor).toBeVisible();
      await pricingAnchor.click();

      // Drawer must be dismissed
      await expect(drawer).not.toBeVisible();

      // Body scroll lock released
      expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');

      // Target section (#pricing) should be scrolled into view
      const pricingSection = page.locator('#pricing');
      await expect(pricingSection).toBeVisible();

      // Wait for smooth scroll to bring section into viewport
      await expect.poll(async () => {
        return await pricingSection.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        });
      }, { timeout: 4000, intervals: [200, 500, 1000] }).toBe(true);
    });

    // Interaction 4b: Test another anchor link (#faq) for robustness
    test('Dismissal 4b: Closes via anchor link #faq and scrolls into view', async ({ page }) => {
      const hamburger = page.locator(SELECTORS.mobileMenuBtn).first();
      await hamburger.click();

      const drawer = page.locator(SELECTORS.mobileDrawer).first();
      await expect(drawer).toBeVisible();

      const faqAnchor = drawer.locator('a[href="#faq"]').first();
      await expect(faqAnchor).toBeVisible();
      await faqAnchor.click();

      await expect(drawer).not.toBeVisible();
      expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');

      const faqSection = page.locator('#faq');
      await expect(faqSection).toBeVisible();

      // Wait for smooth scroll to bring section into viewport
      await expect.poll(async () => {
        return await faqSection.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        });
      }, { timeout: 4000, intervals: [200, 500, 1000] }).toBe(true);
    });
  });
});
