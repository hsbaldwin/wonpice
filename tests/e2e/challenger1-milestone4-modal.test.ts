import { test, expect } from '@playwright/test';

test.describe('Milestone 4 Adversarial Stress Test: Partner Modal & Form Integrity (Challenger 1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  // =========================================================================
  // Section 1: Modal Lifecycle & Keyboard Accessibility
  // =========================================================================
  test.describe('1. Modal Lifecycle & Keyboard Accessibility', () => {

    test('1.1 Escape key reliably closes modal across entry points and while input is focused', async ({ page }) => {
      // Entry 1: Open from Business Pricing Plan
      const businessBtn = page.locator('#pricing a:has-text("비즈니스 50% 신청")').first();
      await expect(businessBtn).toBeVisible();
      await businessBtn.click();

      const modal = page.locator('[data-testid="partner-modal"]');
      await expect(modal).toBeVisible();

      // Press Escape to dismiss
      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();

      // Entry 2: Open from FAQ 1:1 Consultation link
      const faqBtn = page.locator('#faq a:has-text("1:1 상담 신청서 작성")').first();
      await expect(faqBtn).toBeVisible();
      await faqBtn.click();
      await expect(modal).toBeVisible();

      // Focus an input field, type something, and press Escape
      const companyInput = modal.locator('input#company');
      await companyInput.fill('테스트업체');
      await expect(companyInput).toBeFocused();

      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    });

    test('1.2 Backdrop click closes the modal, but clicking inside the modal dialog does NOT close it', async ({ page }) => {
      // Open modal from Starter plan
      const starterBtn = page.locator('#pricing a:has-text("스타터 50% 신청")').first();
      await starterBtn.click();

      const modal = page.locator('[data-testid="partner-modal"]');
      await expect(modal).toBeVisible();

      // Adversarial probe: Click on modal content elements (Header, Labels, Inputs, Card Background)
      const modalDialog = modal.locator('> div'); // The inner card
      await modalDialog.click({ position: { x: 50, y: 50 } });
      await expect(modal).toBeVisible(); // Must NOT close

      const title = modal.locator('#partner-modal-title');
      await title.click();
      await expect(modal).toBeVisible(); // Must NOT close

      const nameInput = modal.locator('input#name');
      await nameInput.click();
      await expect(modal).toBeVisible(); // Must NOT close

      // Now click on backdrop outside inner card (top-left corner of overlay, e.g. x: 5, y: 5)
      await modal.click({ position: { x: 5, y: 5 } });
      await expect(modal).not.toBeVisible(); // Must close
    });

    test('1.3 Body scroll locking: sets overflow="hidden" on open, restores original overflow on close', async ({ page }) => {
      // Check initial overflow
      const initialOverflow = await page.evaluate(() => document.body.style.overflow);
      expect(initialOverflow).not.toBe('hidden');

      // 1. Open modal
      const businessBtn = page.locator('#pricing a:has-text("비즈니스 50% 신청")').first();
      await businessBtn.click();

      const modal = page.locator('[data-testid="partner-modal"]');
      await expect(modal).toBeVisible();

      // Verify scroll lock active
      const overflowWhenOpen = await page.evaluate(() => document.body.style.overflow);
      expect(overflowWhenOpen).toBe('hidden');

      // Dismiss via Close Button
      const closeBtn = modal.locator('[data-testid="partner-modal-close"]');
      await expect(closeBtn).toBeVisible();
      await closeBtn.click();
      await expect(modal).not.toBeVisible();

      // Verify scroll restored
      const overflowAfterCloseBtn = await page.evaluate(() => document.body.style.overflow);
      expect(overflowAfterCloseBtn).toBe(initialOverflow);

      // 2. Re-open and dismiss via Escape
      await businessBtn.click();
      await expect(modal).toBeVisible();
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
      expect(await page.evaluate(() => document.body.style.overflow)).toBe(initialOverflow);

      // 3. Re-open and dismiss via Backdrop click
      await businessBtn.click();
      await expect(modal).toBeVisible();
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

      await modal.click({ position: { x: 5, y: 5 } });
      await expect(modal).not.toBeVisible();
      expect(await page.evaluate(() => document.body.style.overflow)).toBe(initialOverflow);
    });

    test('1.4 Close button [data-testid="partner-modal-close"] works reliably across multiple opens', async ({ page }) => {
      const modal = page.locator('[data-testid="partner-modal"]');

      for (let i = 0; i < 3; i++) {
        const starterBtn = page.locator('#pricing a:has-text("스타터 50% 신청")').first();
        await starterBtn.click();
        await expect(modal).toBeVisible();

        const closeBtn = modal.locator('[data-testid="partner-modal-close"]');
        await expect(closeBtn).toBeVisible();
        await closeBtn.click();
        await expect(modal).not.toBeVisible();
      }
    });

    test('1.5 Pre-selects corresponding plan option depending on trigger entry point', async ({ page }) => {
      const modal = page.locator('[data-testid="partner-modal"]');

      // Trigger Starter
      await page.locator('#pricing a:has-text("스타터 50% 신청")').first().click();
      await expect(modal).toBeVisible();
      await expect(modal.locator('select#plan')).toHaveValue('starter');
      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();

      // Trigger Business
      await page.locator('#pricing a:has-text("비즈니스 50% 신청")').first().click();
      await expect(modal).toBeVisible();
      await expect(modal.locator('select#plan')).toHaveValue('business');
      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();

      // Trigger Custom
      await page.locator('#pricing a:has-text("맞춤 플랜 상담")').first().click();
      await expect(modal).toBeVisible();
      await expect(modal.locator('select#plan')).toHaveValue('custom');
      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    });
  });

  // =========================================================================
  // Section 2: Form Validation Boundaries & Honeypot
  // =========================================================================
  test.describe('2. Form Validation Boundaries & Honeypot Probing', () => {

    test('2.1 Empty submission triggers HTML5 required validation and blocks submission', async ({ page }) => {
      await page.locator('#pricing a:has-text("비즈니스 50% 신청")').first().click();
      const modal = page.locator('[data-testid="partner-modal"]');
      await expect(modal).toBeVisible();

      // Submit empty form
      const submitBtn = modal.locator('button[type="submit"]');
      await submitBtn.click();

      // Must NOT submit
      await expect(modal.locator('[data-testid="apply-done"]')).not.toBeVisible();
      await expect(modal.locator('form')).toBeVisible();

      // Check HTML5 validity flags
      const validityReport = await modal.evaluate((modalEl) => {
        const form = modalEl.querySelector('form') as HTMLFormElement;
        const company = modalEl.querySelector('input#company') as HTMLInputElement;
        const name = modalEl.querySelector('input#name') as HTMLInputElement;
        const phone = modalEl.querySelector('input#phone') as HTMLInputElement;
        const email = modalEl.querySelector('input#email') as HTMLInputElement;
        const privacy = modalEl.querySelector('input#privacy') as HTMLInputElement;

        return {
          formValid: form.checkValidity(),
          companyValid: company.checkValidity(),
          nameValid: name.checkValidity(),
          phoneValid: phone.checkValidity(),
          emailValid: email.checkValidity(),
          privacyValid: privacy.checkValidity(),
        };
      });

      expect(validityReport.formValid).toBe(false);
      expect(validityReport.companyValid).toBe(false);
      expect(validityReport.nameValid).toBe(false);
      expect(validityReport.phoneValid).toBe(false);
      expect(validityReport.emailValid).toBe(false);
      expect(validityReport.privacyValid).toBe(false);
    });

    test('2.2 Phone boundary matrix: rejects invalid patterns, accepts valid Korean phone formats', async ({ page }) => {
      await page.locator('#pricing a:has-text("비즈니스 50% 신청")').first().click();
      const modal = page.locator('[data-testid="partner-modal"]');
      const phoneInput = modal.locator('input#phone');

      const invalidPhones = [
        '1234',
        'abc',
        '010-abc',
        '010-123-',
        '010123456789012',
        '01-12-12',
        '+82-10-1234-5678', // Pattern requires starting with 0
      ];

      for (const invalid of invalidPhones) {
        await phoneInput.fill(invalid);
        const isValid = await phoneInput.evaluate((el: HTMLInputElement) => el.checkValidity());
        const mismatch = await phoneInput.evaluate((el: HTMLInputElement) => el.validity.patternMismatch);
        expect(isValid, `Expected "${invalid}" to be invalid`).toBe(false);
        expect(mismatch, `Expected "${invalid}" to trigger patternMismatch`).toBe(true);
      }

      const validPhones = [
        '010-1234-5678', // Standard mobile with hyphens
        '01012345678',   // Mobile without hyphens
        '02-123-4567',   // Seoul 2-digit area code with 7 digits
        '02-1234-5678',  // Seoul 2-digit area code with 8 digits
        '0212345678',    // Seoul without hyphens
        '031-123-4567',  // Regional 3-digit area code with 7 digits
        '031-1234-5678', // Regional 3-digit area code with 8 digits
        '051-987-6543',  // Busan area code
      ];

      for (const valid of validPhones) {
        await phoneInput.fill(valid);
        const isValid = await phoneInput.evaluate((el: HTMLInputElement) => el.checkValidity());
        expect(isValid, `Expected "${valid}" to be valid`).toBe(true);
      }
    });

    test('2.3 Email boundary matrix: rejects missing @ and invalid domains, accepts valid emails', async ({ page }) => {
      await page.locator('#pricing a:has-text("비즈니스 50% 신청")').first().click();
      const modal = page.locator('[data-testid="partner-modal"]');
      const emailInput = modal.locator('input#email');

      const invalidEmails = [
        'plainaddress',
        '@missinguser.com',
        'founder@',
        'founder@nodomain',
        'founder with space@brand.co.kr',
        'founder@.com',
      ];

      for (const invalid of invalidEmails) {
        await emailInput.fill(invalid);
        const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
        expect(isValid, `Expected "${invalid}" to be invalid`).toBe(false);
      }

      const validEmails = [
        'founder@brand.co.kr',
        'ceo@wonpice.com',
        'store.partner@company.org',
        'test+merchant@gmail.com',
      ];

      for (const valid of validEmails) {
        await emailInput.fill(valid);
        const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
        expect(isValid, `Expected "${valid}" to be valid`).toBe(true);
      }
    });

    test('2.4 Privacy checkbox strictly blocks submission if unchecked', async ({ page }) => {
      await page.locator('#pricing a:has-text("비즈니스 50% 신청")').first().click();
      const modal = page.locator('[data-testid="partner-modal"]');

      // Fill all other required fields validly
      await modal.locator('input#company').fill('(주)동해물산');
      await modal.locator('input#name').fill('홍길동');
      await modal.locator('input#phone').fill('010-1234-5678');
      await modal.locator('input#email').fill('founder@donghae.kr');

      // Leave privacy unchecked
      const privacy = modal.locator('input#privacy');
      await expect(privacy).not.toBeChecked();

      // Submit
      await modal.locator('button[type="submit"]').click();

      // Must not submit
      await expect(modal.locator('[data-testid="apply-done"]')).not.toBeVisible();
      await expect(modal.locator('form')).toBeVisible();

      const privacyValid = await privacy.evaluate((el: HTMLInputElement) => el.checkValidity());
      const valueMissing = await privacy.evaluate((el: HTMLInputElement) => el.validity.valueMissing);
      expect(privacyValid).toBe(false);
      expect(valueMissing).toBe(true);
    });

    test('2.5 Honeypot verification: hp_website is hidden and silently suppresses bot submissions', async ({ page }) => {
      await page.locator('#pricing a:has-text("비즈니스 50% 신청")').first().click();
      const modal = page.locator('[data-testid="partner-modal"]');

      const honeypot = modal.locator('input#hp_website');
      await expect(honeypot).toBeAttached();

      // 1. Must be hidden from human users
      await expect(honeypot).toBeHidden();
      const tabIndex = await honeypot.getAttribute('tabindex');
      expect(tabIndex).toBe('-1');

      // 2. Fill all legitimate required fields
      await modal.locator('input#company').fill('(주)스팸방어테스트');
      await modal.locator('input#name').fill('봇탐지관');
      await modal.locator('input#phone').fill('010-9999-8888');
      await modal.locator('input#email').fill('security@wonpice.kr');
      await modal.locator('input#privacy').check();

      // 3. Simulate bot injecting spam URL into honeypot field
      await honeypot.evaluate((el: HTMLInputElement) => {
        el.value = 'http://automated-spam-attack.xyz';
      });

      // Submit
      await modal.locator('button[type="submit"]').click();

      // 4. Adversarial assertion: Spam submission MUST NOT produce a lead receipt
      await expect(modal.locator('[data-testid="apply-done"]')).not.toBeVisible();
      await expect(modal.locator('form')).toBeVisible();

      // Clear honeypot and submit again -> Should succeed!
      await honeypot.evaluate((el: HTMLInputElement) => {
        el.value = '';
      });
      await modal.locator('button[type="submit"]').click();

      // Now it must succeed
      await expect(modal.locator('[data-testid="apply-done"]')).toBeVisible();
    });
  });

  // =========================================================================
  // Section 3: Genuine Submission & Lead Receipt Verification
  // =========================================================================
  test.describe('3. Genuine Submission & Lead Receipt Verification', () => {

    test('3.1 Genuine submission produces unique Lead ID (WP-2026-XXXXX), renders receipt, and allows clean dismissal', async ({ page }) => {
      await page.locator('#pricing a:has-text("비즈니스 50% 신청")').first().click();
      const modal = page.locator('[data-testid="partner-modal"]');

      // Fill full application form
      await modal.locator('input#company').fill('(주)제철식품농원');
      await modal.locator('input#name').fill('박지민 대표');
      await modal.locator('input#phone').fill('010-8765-4321');
      await modal.locator('input#email').fill('ceo@jecheol.co.kr');
      await modal.locator('select#industry').selectOption('food');
      await modal.locator('select#platform').selectOption('smartstore');
      await modal.locator('select#productCount').selectOption('m');
      await modal.locator('select#plan').selectOption('business');
      await modal.locator('input#launch').fill('2026년 4월 이내');
      await modal.locator('input#website').fill('https://smartstore.naver.com/jecheol');
      await modal.locator('textarea#message').fill('스마트스토어에서 독립 전환 및 토스 PG 연동 희망합니다.');
      await modal.locator('input#privacy').check();

      // Submit
      await modal.locator('button[type="submit"]').click();

      // Verify apply-done screen is revealed
      const doneSection = modal.locator('[data-testid="apply-done"]');
      await expect(doneSection).toBeVisible();

      // Verify Lead ID matches WP-2026-XXXXX format
      const leadIdEl = doneSection.locator('span.font-mono');
      await expect(leadIdEl).toBeVisible();
      const leadId = (await leadIdEl.textContent())?.trim();
      console.log(`[Challenger 1 Lead ID Captured]: ${leadId}`);
      expect(leadId).toMatch(/^WP-2026-\d{5}$/);

      // Verify submitted data receipt details
      await expect(doneSection).toContainText('(주)제철식품농원');
      await expect(doneSection).toContainText('박지민 대표');
      await expect(doneSection).toContainText('010-8765-4321');
      await expect(doneSection).toContainText('ceo@jecheol.co.kr');
      await expect(doneSection).toContainText('business');
      await expect(doneSection).toContainText('food');

      // Verify uppercase styling on plan and industry tags
      const planTag = doneSection.locator('span.uppercase').first();
      const industryTag = doneSection.locator('span.uppercase').nth(1);
      await expect(planTag).toHaveText('business');
      await expect(industryTag).toHaveText('food');
      const planTransform = await planTag.evaluate((el) => window.getComputedStyle(el).textTransform);
      expect(planTransform).toBe('uppercase');

      // Verify External Admin Portal link
      const portalLink = doneSection.locator('a:has-text("가게지기 포털 바로가기")');
      await expect(portalLink).toBeVisible();
      await expect(portalLink).toHaveAttribute('href', 'https://shop-site-950864605215.asia-northeast3.run.app');
      await expect(portalLink).toHaveAttribute('target', '_blank');

      // Dismiss from Done screen via "확인 완료 / 닫기"
      const confirmDismissBtn = doneSection.locator('button:has-text("확인 완료 / 닫기")');
      await expect(confirmDismissBtn).toBeVisible();
      await confirmDismissBtn.click();

      await expect(modal).not.toBeVisible();

      // Verify body scroll unlocked after completion dismissal
      const overflowAfterDone = await page.evaluate(() => document.body.style.overflow);
      expect(overflowAfterDone).not.toBe('hidden');
    });

    test('3.2 Uniqueness stress: multiple consecutive submissions produce distinct randomized Lead IDs', async ({ page }) => {
      const generatedLeadIds = new Set<string>();

      for (let i = 0; i < 5; i++) {
        await page.locator('#pricing a:has-text("스타터 50% 신청")').first().click();
        const modal = page.locator('[data-testid="partner-modal"]');
        await expect(modal).toBeVisible();

        await modal.locator('input#company').fill(`(주)테스트상사-${i + 1}`);
        await modal.locator('input#name').fill(`담당자${i + 1}`);
        await modal.locator('input#phone').fill(`010-1111-222${i}`);
        await modal.locator('input#email').fill(`user${i + 1}@domain.com`);
        await modal.locator('input#privacy').check();

        await modal.locator('button[type="submit"]').click();

        const doneSection = modal.locator('[data-testid="apply-done"]');
        await expect(doneSection).toBeVisible();

        const leadId = (await doneSection.locator('span.font-mono').textContent())?.trim();
        expect(leadId).toMatch(/^WP-2026-\d{5}$/);
        generatedLeadIds.add(leadId!);

        // Close modal
        await doneSection.locator('button:has-text("확인 완료 / 닫기")').click();
        await expect(modal).not.toBeVisible();
      }

      console.log('[Generated Unique Lead IDs]:', Array.from(generatedLeadIds));
      expect(generatedLeadIds.size).toBe(5);
    });
  });
});
