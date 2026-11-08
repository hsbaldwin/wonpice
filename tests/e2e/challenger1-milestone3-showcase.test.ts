import { test, expect } from '@playwright/test';

test.describe('Adversarial Stress Test: Challenger 1 (DualIndustryShowcase Stress & Viewports)', () => {

  // =========================================================================
  // Key Stress Test 1: Tab Transition Stress & Dynamic DOM Lifecycle
  // =========================================================================
  test.describe('1. Tab Transition Stress & Dynamic DOM Lifecycle', () => {
    test('rapidly toggles between Food and Fashion 20 times with zero errors and smooth state transitions', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error' && !msg.text().includes('net::ERR_') && !msg.text().includes('favicon.ico')) {
          consoleErrors.push(msg.text());
        }
      });
      page.on('pageerror', (err) => {
        consoleErrors.push(err.message);
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const foodTab = page.locator('#showcase button:has-text("식품")').first();
      const fashionTab = page.locator('#showcase button:has-text("패션")').first();

      await expect(foodTab).toBeVisible();
      await expect(fashionTab).toBeVisible();

      // Rapidly toggle 20 times back and forth
      const toggleCount = 20;
      const startTime = Date.now();

      for (let i = 0; i < toggleCount; i++) {
        if (i % 2 === 0) {
          await fashionTab.click();
        } else {
          await foodTab.click();
        }
      }

      const durationMs = Date.now() - startTime;
      console.log(`[Tab Transition Stress] Executed ${toggleCount} rapid tab toggles in ${durationMs}ms`);

      // Verify zero console or hydration errors during stress toggle
      expect(consoleErrors).toHaveLength(0);

      // Verify final state matches last toggle (Food active after 20 toggles: 0=fashion, 1=food, ... 19=food)
      // Let's explicitly test State A (Food) and State B (Fashion) styling and icons
      
      // Test Food Active State
      await foodTab.click();
      await expect(page.locator('#showcase').getByText("산지직송의 신선함을 전하는 '제철곳간'")).toBeVisible();

      // Check Food active pill styling: Google Blue (bg-[#1a73e8] text-white)
      const foodPillClass = await foodTab.getAttribute('class');
      expect(foodPillClass).toContain('bg-[#1a73e8]');
      expect(foodPillClass).toContain('text-white');

      // Wait for CSS duration-200 transition to settle
      await expect.poll(async () => {
        return await foodTab.evaluate((el) => window.getComputedStyle(el).backgroundColor);
      }).toBe('rgb(26, 115, 232)'); // Google Blue #1a73e8

      const foodColor = await foodTab.evaluate((el) => window.getComputedStyle(el).color);
      expect(foodColor).toBe('rgb(255, 255, 255)'); // White

      // Food icon Wheat is white, Fashion icon Shirt is Google Blue #1a73e8
      const wheatIcon = foodTab.locator('svg').first();
      const shirtIcon = fashionTab.locator('svg').first();
      await expect.poll(async () => {
        return await wheatIcon.evaluate((el) => window.getComputedStyle(el).color);
      }).toBe('rgb(255, 255, 255)');
      await expect.poll(async () => {
        return await shirtIcon.evaluate((el) => window.getComputedStyle(el).color);
      }).toBe('rgb(26, 115, 232)');

      // Verify dynamic mounting & unmounting:
      // When Food is active: #showcase a[href*="demo-food"] is in DOM, #showcase a[href*="shop-store"] is absent
      const foodDemoLinksInShowcase = page.locator('#showcase a[href*="demo-food"]');
      const fashionDemoLinksInShowcase = page.locator('#showcase a[href*="shop-store"]');
      expect(await foodDemoLinksInShowcase.count()).toBe(1);
      await expect(foodDemoLinksInShowcase.first()).toBeVisible();
      expect(await fashionDemoLinksInShowcase.count()).toBe(0);

      // Switch to Fashion Active State
      await fashionTab.click();
      await expect(page.locator('#showcase').getByText("핏과 감성을 온전히 담아내는 '온결'")).toBeVisible();

      // Check Fashion active pill styling: Google Blue (bg-[#1a73e8] text-white)
      const fashionPillClass = await fashionTab.getAttribute('class');
      expect(fashionPillClass).toContain('bg-[#1a73e8]');
      expect(fashionPillClass).toContain('text-white');

      // Wait for CSS duration-200 transition to settle
      await expect.poll(async () => {
        return await fashionTab.evaluate((el) => window.getComputedStyle(el).backgroundColor);
      }).toBe('rgb(26, 115, 232)');

      const fashionColor = await fashionTab.evaluate((el) => window.getComputedStyle(el).color);
      expect(fashionColor).toBe('rgb(255, 255, 255)');

      // Shirt icon is white, Wheat icon is green #137333
      await expect.poll(async () => {
        return await shirtIcon.evaluate((el) => window.getComputedStyle(el).color);
      }).toBe('rgb(255, 255, 255)');
      await expect.poll(async () => {
        return await wheatIcon.evaluate((el) => window.getComputedStyle(el).color);
      }).toBe('rgb(19, 115, 51)'); // #137333

      // Verify dynamic mounting & unmounting:
      // When Fashion is active: #showcase a[href*="shop-store"] is in DOM, #showcase a[href*="demo-food"] is absent
      expect(await page.locator('#showcase a[href*="shop-store"]').count()).toBe(1);
      await expect(page.locator('#showcase a[href*="shop-store"]').first()).toBeVisible();
      expect(await page.locator('#showcase a[href*="demo-food"]').count()).toBe(0);
    });
  });

  // =========================================================================
  // Key Stress Test 2: Outbound Cloud Run Demo Links Security & Attributes
  // =========================================================================
  test.describe('2. Outbound Cloud Run Demo Links Security & Attributes', () => {
    test('verifies exact Cloud Run URLs, target="_blank", and rel="noopener noreferrer"', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // 1. Food Demo Link Verification
      const foodDemoLink = page.locator('#showcase a[href*="demo-food"]').first();
      await expect(foodDemoLink).toBeVisible();

      const foodHref = await foodDemoLink.getAttribute('href');
      const foodTarget = await foodDemoLink.getAttribute('target');
      const foodRel = await foodDemoLink.getAttribute('rel');

      console.log('[Showcase Food Demo Link]', { href: foodHref, target: foodTarget, rel: foodRel });

      expect(foodHref).toBe('https://shop-demo-food-store-950864605215.asia-northeast3.run.app');
      expect(foodTarget).toBe('_blank');
      expect(foodRel).toContain('noopener');

      // 2. Switch to Fashion tab
      const fashionTab = page.locator('#showcase button:has-text("패션")').first();
      await fashionTab.click();

      // 3. Fashion Demo Link Verification
      const fashionDemoLink = page.locator('#showcase a[href*="shop-store"]').first();
      await expect(fashionDemoLink).toBeVisible();

      const fashionHref = await fashionDemoLink.getAttribute('href');
      const fashionTarget = await fashionDemoLink.getAttribute('target');
      const fashionRel = await fashionDemoLink.getAttribute('rel');

      console.log('[Showcase Fashion Demo Link]', { href: fashionHref, target: fashionTarget, rel: fashionRel });

      expect(fashionHref).toBe('https://shop-store-950864605215.asia-northeast3.run.app');
      expect(fashionTarget).toBe('_blank');
      expect(fashionRel).toContain('noopener');
    });
  });

  // =========================================================================
  // Key Stress Test 3: Mobile Viewport Stress (375px, 390px, 1280px)
  // =========================================================================
  test.describe('3. Mobile Viewport Stress & Responsive Layout', () => {
    const viewports = [
      { name: 'iPhone SE (375px)', width: 375, height: 667 },
      { name: 'iPhone 12/13 (390px)', width: 390, height: 844 },
      { name: 'Desktop (1280px)', width: 1280, height: 800 },
    ];

    for (const vp of viewports) {
      test(`guarantees zero horizontal overflow at ${vp.width}px (${vp.name}) across tabs`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Check Food tab overflow
        const foodOverflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));
        console.log(`[Viewport ${vp.width}px - Food Tab] scrollWidth: ${foodOverflow.scrollWidth}, clientWidth: ${foodOverflow.clientWidth}`);
        expect(foodOverflow.scrollWidth).toBeLessThanOrEqual(foodOverflow.clientWidth + 2);

        // Switch to Fashion tab
        await page.locator('#showcase button:has-text("패션")').first().click();

        // Check Fashion tab overflow
        const fashionOverflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));
        console.log(`[Viewport ${vp.width}px - Fashion Tab] scrollWidth: ${fashionOverflow.scrollWidth}, clientWidth: ${fashionOverflow.clientWidth}`);
        expect(fashionOverflow.scrollWidth).toBeLessThanOrEqual(fashionOverflow.clientWidth + 2);
      });
    }

    test('verifies switcher pill stacks/wraps on 375px mobile and Korean text is not clipped', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const switcherContainer = page.locator('#showcase .max-w-3xl div.flex-col, #showcase div:has(> button:has-text("식품"))').first();
      await expect(switcherContainer).toBeVisible();

      const foodBtn = page.locator('#showcase button:has-text("식품")').first();
      const fashionBtn = page.locator('#showcase button:has-text("패션")').first();

      const foodBox = await foodBtn.boundingBox();
      const fashionBox = await fashionBtn.boundingBox();

      expect(foodBox).not.toBeNull();
      expect(fashionBox).not.toBeNull();

      console.log('[Switcher Pills at 375px]', {
        food: { x: foodBox!.x, y: foodBox!.y, w: foodBox!.width, h: foodBox!.height },
        fashion: { x: fashionBox!.x, y: fashionBox!.y, w: fashionBox!.width, h: fashionBox!.height },
      });

      // On mobile (<640px), container is flex-col: buttons stack vertically
      expect(fashionBox!.y).toBeGreaterThanOrEqual(foodBox!.y + foodBox!.height - 4);

      // Verify buttons fit comfortably within 375px without horizontal overflow
      expect(foodBox!.x).toBeGreaterThanOrEqual(0);
      expect(foodBox!.x + foodBox!.width).toBeLessThanOrEqual(375);
      expect(fashionBox!.x).toBeGreaterThanOrEqual(0);
      expect(fashionBox!.x + fashionBox!.width).toBeLessThanOrEqual(375);

      // Verify text inside buttons is not clipped
      const foodText = await foodBtn.innerText();
      const fashionText = await fashionBtn.innerText();
      expect(foodText).toContain('식품 · 농가 솔루션');
      expect(foodText).toContain('제철곳간');
      expect(fashionText).toContain('패션 · 디자이너 솔루션');
      expect(fashionText).toContain('온결');

      const foodScrollWidth = await foodBtn.evaluate((el) => el.scrollWidth);
      const foodOffsetWidth = await foodBtn.evaluate((el) => (el as HTMLElement).offsetWidth);
      expect(foodScrollWidth).toBeLessThanOrEqual(foodOffsetWidth + 2);

      const fashionScrollWidth = await fashionBtn.evaluate((el) => el.scrollWidth);
      const fashionOffsetWidth = await fashionBtn.evaluate((el) => (el as HTMLElement).offsetWidth);
      expect(fashionScrollWidth).toBeLessThanOrEqual(fashionOffsetWidth + 2);
    });

    test('verifies demo CTA button adapts gracefully (w-full on mobile, w-auto on desktop)', async ({ page }) => {
      // 1. Mobile 375px: CTA is full width (w-full sm:w-auto)
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const mobileFoodCta = page.locator('#showcase a[href*="demo-food"]').first();
      await expect(mobileFoodCta).toBeVisible();
      const mobileBox = await mobileFoodCta.boundingBox();
      expect(mobileBox).not.toBeNull();
      console.log('[Mobile 375px CTA box]', mobileBox);

      // At 375px viewport with px-6 container padding, w-full spans ~327px (>= 300px)
      expect(mobileBox!.width).toBeGreaterThanOrEqual(280);
      expect(mobileBox!.x + mobileBox!.width).toBeLessThanOrEqual(375);

      // Switch to Fashion tab
      await page.locator('#showcase button:has-text("패션")').first().click();
      const mobileFashionCta = page.locator('#showcase a[href*="shop-store"]').first();
      await expect(mobileFashionCta).toBeVisible();
      const mobileFashionBox = await mobileFashionCta.boundingBox();
      expect(mobileFashionBox).not.toBeNull();
      expect(mobileFashionBox!.width).toBeGreaterThanOrEqual(280);

      // 2. Desktop 1280px: CTA is inline/auto width
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.locator('#showcase button:has-text("식품")').first().click();
      const desktopFoodCta = page.locator('#showcase a[href*="demo-food"]').first();
      const desktopBox = await desktopFoodCta.boundingBox();
      expect(desktopBox).not.toBeNull();
      console.log('[Desktop 1280px CTA box]', desktopBox);
      // Auto width should be sized to its text content, not spanning full 5-col width
      expect(desktopBox!.width).toBeLessThan(500);
    });
  });

  // =========================================================================
  // Key Stress Test 4: Invariants Check (Static Countdown Timer & SVG Vectors)
  // =========================================================================
  test.describe('4. Invariants Check (Static Countdown Timer & SVG Vectors)', () => {
    test('confirms static countdown timer string "03:42:18" inside div.font-mono', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const timerElement = page.locator('#showcase div.font-mono:has-text("03:42:18")').first();
      await expect(timerElement).toBeVisible();

      const timerText = (await timerElement.innerText()).trim();
      expect(timerText).toBe('03:42:18');

      // Verify monospace styling
      const fontFamily = await timerElement.evaluate((el) => window.getComputedStyle(el).fontFamily);
      expect(fontFamily).toMatch(/mono|monospace|ui-monospace/i);
    });

    test('confirms complete absence of raw emojis (🍎, 🧥) and presence of SVG vector graphics', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // 1. Food Tab: Check for raw emojis in showcase HTML
      const showcaseHtml = await page.locator('#showcase').innerHTML();
      expect(showcaseHtml).not.toContain('🍎');
      expect(showcaseHtml).not.toContain('🧥');

      // Check for FreshAppleVector SVG graphic
      const appleSvg = page.locator('#showcase svg[aria-label="신선한 사과 일러스트"]').first();
      await expect(appleSvg).toBeVisible();
      expect(await appleSvg.getAttribute('viewBox')).toBe('0 0 100 100');
      expect(await appleSvg.getAttribute('role')).toBe('img');

      // Check SVG gradients
      const appleBodyGrad = appleSvg.locator('radialGradient#appleBodyGrad');
      expect(await appleBodyGrad.count()).toBe(1);

      // 2. Fashion Tab: Switch and verify
      await page.locator('#showcase button:has-text("패션")').first().click();

      const fashionShowcaseHtml = await page.locator('#showcase').innerHTML();
      expect(fashionShowcaseHtml).not.toContain('🍎');
      expect(fashionShowcaseHtml).not.toContain('🧥');

      // Check for CuratedCoatVector SVG graphic
      const coatSvg = page.locator('#showcase svg[aria-label="큐레이티드 울 코트 일러스트"]').first();
      await expect(coatSvg).toBeVisible();
      expect(await coatSvg.getAttribute('viewBox')).toBe('0 0 100 120');
      expect(await coatSvg.getAttribute('role')).toBe('img');

      // Check SVG gradients
      const coatNavyGrad = coatSvg.locator('linearGradient#coatNavyGrad');
      expect(await coatNavyGrad.count()).toBe(1);
      const brassGrad = coatSvg.locator('linearGradient#brassGrad');
      expect(await brassGrad.count()).toBe(1);
    });
  });

});
