import { test, expect } from '@playwright/test';
import { SELECTORS } from './helpers';

test.describe('Adversarial Stress Test: Challenger 2 (Milestone 3)', () => {

  // =========================================================================
  // Key Stress Test 1: Asymmetric Bento Grid Stress
  // =========================================================================
  test.describe('1. Asymmetric Bento Grid Stress (#infrastructure)', () => {
    test('verifies exact 4 direct children and diagonal rhythm (7/5, 5/7) on desktop (1280px)', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const infra = page.locator('#infrastructure');
      await expect(infra).toBeVisible();

      // Parent grid container
      const grid = infra.locator('.grid');
      await expect(grid).toBeVisible();

      // Verify .grid > div has exactly 4 direct children
      const cards = grid.locator(':scope > div');
      const count = await cards.count();
      expect(count).toBe(4);

      // Verify desktop column spans: Card 0: col-span-7, Card 1: col-span-5, Card 2: col-span-5, Card 3: col-span-7
      const card0Class = await cards.nth(0).getAttribute('class');
      const card1Class = await cards.nth(1).getAttribute('class');
      const card2Class = await cards.nth(2).getAttribute('class');
      const card3Class = await cards.nth(3).getAttribute('class');

      expect(card0Class).toContain('lg:col-span-7');
      expect(card1Class).toContain('lg:col-span-5');
      expect(card2Class).toContain('lg:col-span-5');
      expect(card3Class).toContain('lg:col-span-7');

      // Empirical bounding box measurements on desktop
      const box0 = await cards.nth(0).boundingBox();
      const box1 = await cards.nth(1).boundingBox();
      const box2 = await cards.nth(2).boundingBox();
      const box3 = await cards.nth(3).boundingBox();

      expect(box0).not.toBeNull();
      expect(box1).not.toBeNull();
      expect(box2).not.toBeNull();
      expect(box3).not.toBeNull();

      console.log('[Bento Desktop Boxes]', {
        card0_hero: { x: box0!.x, y: box0!.y, w: box0!.width, h: box0!.height },
        card1_pg: { x: box1!.x, y: box1!.y, w: box1!.width, h: box1!.height },
        card2_domain: { x: box2!.x, y: box2!.y, w: box2!.width, h: box2!.height },
        card3_monitor: { x: box3!.x, y: box3!.y, w: box3!.width, h: box3!.height },
      });

      // On 1280px desktop, Row 1 (Card 0 & Card 1) share approximately same Y (within 5px tolerance)
      expect(Math.abs(box0!.y - box1!.y)).toBeLessThanOrEqual(5);
      // Card 0 (col-span-7) should be wider than Card 1 (col-span-5)
      expect(box0!.width).toBeGreaterThan(box1!.width);

      // Row 2 (Card 2 & Card 3) share approximately same Y (within 5px tolerance)
      expect(Math.abs(box2!.y - box3!.y)).toBeLessThanOrEqual(5);
      // Card 3 (col-span-7) should be wider than Card 2 (col-span-5)
      expect(box3!.width).toBeGreaterThan(box2!.width);
      // Row 2 is placed below Row 1
      expect(box2!.y).toBeGreaterThanOrEqual(box0!.y + box0!.height - 10);
    });

    test('verifies mobile single-column stacking (<640px) and vertical separation (card[i+1].y >= card[i].y + card[i].height - 10)', async ({ page }) => {
      // Test at 375px mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const infra = page.locator('#infrastructure');
      await expect(infra).toBeVisible();

      const cards = infra.locator('.grid > div');
      const count = await cards.count();
      expect(count).toBe(4);

      const boxes = [];
      for (let i = 0; i < count; i++) {
        const box = await cards.nth(i).boundingBox();
        expect(box).not.toBeNull();
        boxes.push(box!);
        // Verify card fits cleanly within mobile viewport (padding applied)
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(375);
      }

      console.log('[Bento Mobile 375px Vertical Separation]', boxes.map((b, i) => `Card ${i}: y=${b.y}, h=${b.height}, bottom=${b.y + b.height}`));

      // Verify vertical separation: card[i+1].y >= card[i].y + card[i].height - 10
      for (let i = 0; i < count - 1; i++) {
        const current = boxes[i];
        const next = boxes[i + 1];
        expect(next.y).toBeGreaterThanOrEqual(current.y + current.height - 10);
      }
    });

    test('verifies all 4 studio graphics render cleanly without missing elements', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const infra = page.locator('#infrastructure');

      // Graphic 1: Catalog Migration Pipeline & Excel chip & Time saved
      await expect(infra.locator('text=products_catalog_export.xlsx')).toBeVisible();
      await expect(infra.locator('text=100개 품목 자동 매핑')).toBeVisible();
      await expect(infra.locator('text=원클릭 3단계 마이그레이션 파이프라인')).toBeVisible();
      await expect(infra.locator('text=01. 원본 추출')).toBeVisible();
      await expect(infra.locator('text=02. 자동 변환 엔진')).toBeVisible();
      await expect(infra.locator('text=03. 자사몰 즉시 런칭')).toBeVisible();
      await expect(infra.locator('text=상품 100개 등록 소요시간 비교')).toBeVisible();
      await expect(infra.locator('text=대량 등록 수작업 시간 절감')).toBeVisible();

      // Graphic 2: 1-Day Approval, 2x2 Payment Brands & Zero Fee Guarantee
      await expect(infra.locator('text=영업일 기준 신속 서류 접수 대행')).toBeVisible();
      await expect(infra.getByText('토스페이', { exact: true })).toBeVisible();
      await expect(infra.getByText('카카오페이', { exact: true })).toBeVisible();
      await expect(infra.getByText('네이버페이', { exact: true })).toBeVisible();
      await expect(infra.getByText('국내 전 카드사', { exact: true })).toBeVisible();
      await expect(infra.locator('text=PG사 직접 정산 계약')).toBeVisible();
      await expect(infra.locator('text=자사몰 판매 시 별도 중개 수수료 없음')).toBeVisible();

      // Graphic 3: Browser URL simulation, DNS A Record, TLS 1.3
      await expect(infra.locator('text=https://brand.co.kr')).toBeVisible();
      await expect(infra.locator('text=보안 연결됨')).toBeVisible();
      await expect(infra.locator('text=DNS A Record')).toBeVisible();
      await expect(infra.locator('text=자동 글로벌 애니캐스트 라우팅')).toBeVisible();
      await expect(infra.locator('text=TLS 1.3 256-bit 무상 자동 갱신')).toBeVisible();

      // Graphic 4: 3-Region Uptime Radar & DB Backup & 1:1 Training
      await expect(infra.locator('text=글로벌 3개 거점 실시간 헬스체크 레이더')).toBeVisible();
      await expect(infra.locator('text=안정적 인프라 가동')).toBeVisible();
      await expect(infra.locator('text=서울 ICN')).toBeVisible();
      await expect(infra.locator('text=Ping 8ms')).toBeVisible();
      await expect(infra.locator('text=미국 PDX')).toBeVisible();
      await expect(infra.locator('text=Ping 118ms')).toBeVisible();
      await expect(infra.locator('text=유럽 FRA')).toBeVisible();
      await expect(infra.locator('text=Ping 182ms')).toBeVisible();
      await expect(infra.locator('text=매일 새벽 자동 DB 백업 (S3 다중 분산)')).toBeVisible();
      await expect(infra.locator('text=1:1 원격 실무 교육 60분 (관리자 핵심 기능 안내)')).toBeVisible();
    });
  });

  // =========================================================================
  // Key Stress Test 2: Channel Routes Direct Navigation & Synchronization
  // =========================================================================
  test.describe('2. Channel Routes Direct Navigation & Synchronization', () => {
    test('Navigate to /channels/fashion -> verifies Fashion tab active by default, Lookbook and demo link visible', async ({ page }) => {
      const response = await page.goto('/channels/fashion');
      expect(response?.status()).toBe(200);
      await page.waitForLoadState('networkidle');

      // Verify Fashion Tab active styling
      const fashionTab = page.locator('button:has-text("패션 · 디자이너 솔루션")').first();
      await expect(fashionTab).toBeVisible();
      const tabClass = await fashionTab.getAttribute('class');
      expect(tabClass).toContain('bg-[#1a73e8]'); // Active tab background
      expect(tabClass).toContain('text-white');

      // Verify Fashion specific elements visible by default without clicking
      await expect(page.locator('text=핏과 감성을 온전히 담아내는 \'온결\'')).toBeVisible();
      await expect(page.locator('text=세로형 고화질 룩북 테마')).toBeVisible();
      await expect(page.locator('text=모델 착용컷 인터랙션')).toBeVisible();
      await expect(page.locator('text=실측 사이즈표 & 소재 가이드')).toBeVisible();

      // Verify Fashion Cloud Run demo link
      const fashionDemoLink = page.locator('#showcase a[href*="shop-store"]').first();
      await expect(fashionDemoLink).toBeVisible();
      const href = await fashionDemoLink.getAttribute('href');
      expect(href).toContain('shop-store-950864605215.asia-northeast3.run.app');
    });

    test('Navigate to /channels/food -> verifies Food tab active by default, "제철곳간" and Food demo link visible', async ({ page }) => {
      const response = await page.goto('/channels/food');
      expect(response?.status()).toBe(200);
      await page.waitForLoadState('networkidle');

      // Verify Food Tab active styling
      const foodTab = page.locator('button:has-text("식품 · 농가 솔루션")').first();
      await expect(foodTab).toBeVisible();
      const tabClass = await foodTab.getAttribute('class');
      expect(tabClass).toContain('bg-[#1a73e8]');
      expect(tabClass).toContain('text-white');

      // Verify Food specific elements visible by default without clicking
      await expect(page.locator('text=산지직송의 신선함을 전하는 \'제철곳간\'')).toBeVisible();
      await expect(page.locator('text=중량(kg) 및 규격 옵션 분기')).toBeVisible();
      await expect(page.locator('text=당일 수확 출고 마감 타이머')).toBeVisible();

      // Verify Food Cloud Run demo link
      const foodDemoLink = page.locator('#showcase a[href*="demo-food"]').first();
      await expect(foodDemoLink).toBeVisible();
      const href = await foodDemoLink.getAttribute('href');
      expect(href).toContain('shop-demo-food-store-950864605215.asia-northeast3.run.app');
    });

    test('Navigate to /channels/farm -> verifies Food tab active by default', async ({ page }) => {
      const response = await page.goto('/channels/farm');
      expect(response?.status()).toBe(200);
      await page.waitForLoadState('networkidle');

      // Verify Food Tab active styling
      const foodTab = page.locator('button:has-text("식품 · 농가 솔루션")').first();
      await expect(foodTab).toBeVisible();
      const tabClass = await foodTab.getAttribute('class');
      expect(tabClass).toContain('bg-[#1a73e8]');
      expect(tabClass).toContain('text-white');

      await expect(page.locator('text=산지직송의 신선함을 전하는 \'제철곳간\'')).toBeVisible();
    });

    test('Click logo on channel pages -> navigates back to / cleanly', async ({ page }) => {
      const routesToTest = ['/channels/fashion', '/channels/food', '/channels/farm'];

      for (const route of routesToTest) {
        await page.goto(route);
        await page.waitForLoadState('networkidle');

        const logo = page.locator(SELECTORS.logo).first();
        await expect(logo).toBeVisible();
        await logo.click();

        await expect(page).toHaveURL(/localhost:3000\/?$/);
        await expect(page.locator(SELECTORS.heroHeading)).toBeVisible();
      }
    });
  });

  // =========================================================================
  // Key Stress Test 3: Boundary & Horizontal Overflow Across 3 Viewports
  // =========================================================================
  test.describe('3. Boundary & Horizontal Overflow (scrollWidth <= clientWidth + 2)', () => {
    const viewports = [
      { name: 'Mobile SE', width: 375, height: 667 },
      { name: 'Mobile Standard', width: 390, height: 844 },
      { name: 'Desktop Large', width: 1280, height: 800 },
    ];

    const routes = ['/', '/channels/food', '/channels/fashion', '/channels/farm'];

    for (const vp of viewports) {
      for (const route of routes) {
        test(`verifies zero horizontal overflow at ${vp.width}px (${vp.name}) on route "${route}"`, async ({ page }) => {
          await page.setViewportSize({ width: vp.width, height: vp.height });
          await page.goto(route);
          await page.waitForLoadState('networkidle');

          const { scrollWidth, clientWidth } = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
          }));

          console.log(`[Challenger 2 Overflow Test] Viewport: ${vp.width}px, Route: ${route} -> scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
          expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
        });
      }
    }
  });

  // =========================================================================
  // Key Stress Test 4: Anchor Smooth Scrolling
  // =========================================================================
  test.describe('4. Anchor Smooth Scrolling (#infrastructure, #showcase)', () => {
    test('clicks #infrastructure anchor link and verifies smooth scroll into viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const infraAnchor = page.locator('nav a[href="#infrastructure"]').first();
      await expect(infraAnchor).toBeVisible();
      await infraAnchor.click();

      const infraSection = page.locator('#infrastructure');
      await expect(infraSection).toBeVisible();

      // Verify section is in viewport
      await expect.poll(async () => {
        return await infraSection.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        });
      }, { timeout: 4000, intervals: [200, 500, 1000] }).toBe(true);
    });

    test('clicks #showcase anchor link and verifies smooth scroll into viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Scroll to bottom first to ensure scrolling up/down works
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      const showcaseAnchor = page.locator('nav a[href="#showcase"]').first();
      await expect(showcaseAnchor).toBeVisible();
      await showcaseAnchor.click();

      const showcaseSection = page.locator('#showcase');
      await expect(showcaseSection).toBeVisible();

      // Verify section is in viewport
      await expect.poll(async () => {
        return await showcaseSection.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        });
      }, { timeout: 4000, intervals: [200, 500, 1000] }).toBe(true);
    });
  });
});
