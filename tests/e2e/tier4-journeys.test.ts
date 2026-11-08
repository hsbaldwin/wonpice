import { test, expect } from '@playwright/test';
import {
  SELECTORS,
  VALID_PARTNER_DATA,
  VALID_FASHION_DATA,
  expectNoHorizontalScroll,
} from './helpers';

test.describe('Tier 4: Real-World Merchant User Journeys', () => {

  // Journey 1: Food Merchant ('제철곳간') Journey
  test('Journey 1: Food Merchant ("제철곳간") D2C Exploration & Application Flow', async ({ page }) => {
    // Step 1: Merchant lands on food channel page
    const response = await page.goto('/channels/food');
    expect(response?.status()).toBe(200);

    // Step 2: Confirm food D2C branding and messaging
    const foodHeading = page.locator('text=산지직송의 신선함을 전하는 \'제철곳간\'').first();
    await expect(foodHeading).toBeVisible();

    // Step 3: Inspect the 3 food industry specialty features
    await expect(page.locator('text=중량(kg) 및 규격 옵션 분기')).toBeVisible();
    await expect(page.locator('text=당일 수확 출고 마감 타이머')).toBeVisible();
    await expect(page.locator('text=냉장·신선 배송 & 보관법 가이드')).toBeVisible();

    // Step 4: Verify countdown timer simulation is actively rendered
    const timerDisplay = page.locator('div.font-mono:has-text("03:42:18")').first();
    await expect(timerDisplay).toBeVisible();

    // Step 5: Check food live Cloud Run demo store link
    const demoLink = page.locator('#showcase a[href*="demo-food"]').first();
    await expect(demoLink).toBeVisible();
    expect(await demoLink.getAttribute('href')).toContain('shop-demo-food-store-950864605215.asia-northeast3.run.app');

    // Step 6: Scroll to 3-second eligibility confirmation card
    const checker = page.locator(SELECTORS.eligibilityChecker).first();
    await checker.scrollIntoViewIfNeeded();
    await expect(checker).toBeVisible();

    // Step 7: Confirm 50% discount eligibility status
    await expect(checker).toContainText('지원 대상 확인 완료: 50% 감면 혜택 적용 대상입니다');

    // Step 8: Trigger application via eligibility box or nav CTA
    const eligCta = checker.locator('a[href*="ref=wonpice_eligibility_box"]').first();
    await expect(eligCta).toBeVisible();

    const modal = page.locator(SELECTORS.partnerModal).first();
    if (await modal.isVisible()) {
      // Step 9A: Fill valid food partner form in modal
      await modal.locator(SELECTORS.formInputs.company).fill(VALID_PARTNER_DATA.company);
      await modal.locator(SELECTORS.formInputs.name).fill(VALID_PARTNER_DATA.name);
      await modal.locator(SELECTORS.formInputs.phone).fill(VALID_PARTNER_DATA.phone);
      await modal.locator(SELECTORS.formInputs.email).fill(VALID_PARTNER_DATA.email);

      const industrySelect = modal.locator(SELECTORS.formInputs.industry).first();
      if (await industrySelect.count() > 0) {
        await industrySelect.selectOption('food');
      }

      const privacyBox = modal.locator(SELECTORS.formInputs.privacy).first();
      if (await privacyBox.count() > 0) {
        await privacyBox.check();
      }

      // Submit application
      const submitBtn = modal.locator(SELECTORS.formInputs.submitBtn).first();
      await submitBtn.click();
    } else {
      // Step 9B: Verify outbound fallback conversion route
      const href = await eligCta.getAttribute('href');
      expect(href).toContain('ref=wonpice_eligibility_box');
      expect(href).toMatch(/^https:\/\/shop-site-.*\.run\.app/);
    }
  });

  // Journey 2: Fashion Brand ('온결') Journey
  test('Journey 2: Fashion Brand ("온결") Lookbook & Business Plan Conversion Flow', async ({ page }) => {
    // Step 1: Fashion designer lands on root landing page
    await page.goto('/');

    // Step 2: Switch to Fashion ('온결') showcase
    const fashionTab = page.locator(SELECTORS.fashionTabBtn).first();
    await fashionTab.scrollIntoViewIfNeeded();
    await fashionTab.click();

    // Step 3: Explore fashion lookbook and aesthetic details
    await expect(page.locator('text=핏과 감성을 온전히 담아내는 \'온결\'')).toBeVisible();
    await expect(page.locator('text=세로형 고화질 룩북 테마')).toBeVisible();
    await expect(page.locator('text=모델 착용컷 인터랙션')).toBeVisible();
    await expect(page.locator('text=실측 사이즈표 & 소재 가이드')).toBeVisible();

    // Step 4: Verify fashion store live Cloud Run demo store link
    const fashionDemo = page.locator('#showcase a[href*="shop-store"]').first();
    await expect(fashionDemo).toBeVisible();
    expect(await fashionDemo.getAttribute('href')).toContain('shop-store-950864605215.asia-northeast3.run.app');

    // Step 5: Scroll down to Infrastructure Bento grid
    const infra = page.locator(SELECTORS.infrastructureSection).first();
    await infra.scrollIntoViewIfNeeded();
    await expect(infra).toBeVisible();

    // Verify all 4 infrastructure value pillars
    await expect(infra).toContainText('기존 상품 100개 등록 대행');
    await expect(infra).toContainText('토스페이먼츠 간편결제 연동');
    await expect(infra).toContainText('브랜드 전용 독립 도메인 연결');
    await expect(infra).toContainText('3중 모니터링');

    // Step 6: Review pricing plans and select Business Plan (Recommended)
    const businessCard = page.locator(SELECTORS.businessPlanCard).first();
    await businessCard.scrollIntoViewIfNeeded();
    await expect(businessCard).toBeVisible();
    await expect(businessCard).toContainText('가장 추천하는 플랜');
    await expect(businessCard).toContainText('비즈니스');
    await expect(businessCard).toContainText('50% 할인');

    // Step 7: Trigger Business plan 50% application
    const businessCta = businessCard.locator('a, button').filter({ hasText: '신청' }).first();
    await expect(businessCta).toBeVisible();

    const modal = page.locator(SELECTORS.partnerModal).first();
    if (await modal.isVisible()) {
      // Step 8A: Fill valid fashion partner data
      await modal.locator(SELECTORS.formInputs.company).fill(VALID_FASHION_DATA.company);
      await modal.locator(SELECTORS.formInputs.name).fill(VALID_FASHION_DATA.name);
      await modal.locator(SELECTORS.formInputs.phone).fill(VALID_FASHION_DATA.phone);
      await modal.locator(SELECTORS.formInputs.email).fill(VALID_FASHION_DATA.email);

      const planSelect = modal.locator(SELECTORS.formInputs.plan).first();
      if (await planSelect.count() > 0) {
        await planSelect.selectOption('business');
      }

      const privacyBox = modal.locator(SELECTORS.formInputs.privacy).first();
      if (await privacyBox.count() > 0) {
        await privacyBox.check();
      }

      await modal.locator(SELECTORS.formInputs.submitBtn).first().click();
    } else {
      // Step 8B: Verify outbound Business plan UTM context
      const href = await businessCta.getAttribute('href');
      expect(href).toContain('ref=wonpice_business');
    }
  });

  // Journey 3: Skeptical Mobile Merchant Due Diligence & FAQ Journey
  test('Journey 3: Skeptical Mobile Merchant Due Diligence & 1:1 Consultation Flow', async ({ page }) => {
    // Step 1: Merchant accesses via mobile viewport (iPhone 12/13: 390px)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    // Step 2: Verify flawless mobile responsiveness with no horizontal overflow
    await expectNoHorizontalScroll(page);

    // Step 3: Audit 0% commission claim in KPI Metric Ribbon
    const ribbon = page.locator(SELECTORS.metricsRibbon).first();
    await ribbon.scrollIntoViewIfNeeded();
    await expect(ribbon).toContainText('추가 중개 수수료');
    await expect(ribbon).toContainText('0원 (0%)');
    await expect(ribbon).toContainText('토스 PG 직접 계약');

    // Step 4: Scroll down to FAQ section for comprehensive due diligence
    const faq = page.locator(SELECTORS.faqSection).first();
    await faq.scrollIntoViewIfNeeded();
    await expect(faq).toBeVisible();

    const questions = faq.locator('button:has-text("Q"), button:has-text("?")');
    const qCount = await questions.count();
    expect(qCount).toBeGreaterThanOrEqual(5);

    // Check Question 1: 제작 소요 기간 (3~5주)
    await expect(faq.locator('p:has-text("3~5주")').first()).toBeVisible();

    // Check Question 2: 상품 이전 대행 (엑셀 100개 등록)
    await questions.nth(1).click();
    await expect(faq.locator('p:has-text("엑셀"), p:has-text("얼마든지 가능합니다")').first()).toBeVisible();

    // Check Question 3: 결제 수수료 투명 정산
    await questions.nth(2).click();
    await expect(faq.locator('p:has-text("카드사 결제 수수료"), p:has-text("매출 정산")').first()).toBeVisible();

    // Check Question 4: 서버 장애 대응 (3중 모니터링 & 자동 백업)
    await questions.nth(3).click();
    await expect(faq.locator('p:has-text("3개 거점"), p:has-text("자동 감시")').first()).toBeVisible();

    // Check Question 5: 서비스 종료 시 데이터 소유권 (엑셀 온전 반환)
    await questions.nth(4).click();
    await expect(faq.locator('p:has-text("온전히 반환")').first()).toBeVisible();

    // Step 5: Verify no layout overflow after expanding multiple FAQ items
    await expectNoHorizontalScroll(page);

    // Step 6: Complete due diligence and click 1:1 Consultation CTA
    const consultCard = faq.locator('text=내 브랜드 맞춤 제작 견적이나 상담이 필요하신가요?').first();
    await expect(consultCard).toBeVisible();

    const consultCta = faq.locator('a[href*="ref=wonpice_faq_bottom"]').first();
    await expect(consultCta).toBeVisible();
    const href = await consultCta.getAttribute('href');
    expect(href).toContain('ref=wonpice_faq_bottom');
  });

});
