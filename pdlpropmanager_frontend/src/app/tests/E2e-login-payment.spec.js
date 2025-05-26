// tests/e2e-login-payment.spec.js
import { test, expect } from '@playwright/test';

test('tenant can login and make payment', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.fill('input[name=email]', 'admin@pdl.com');
  await page.fill('input[name=password]', 'admin123')
  await page.click('button[type=submit]');

  await page.waitForURL('**/dashboard')
  expect(page.url()).toContain('/dashboard');

  await page.goto('http://localhost:3000/payments');

  await page.click('button:has-text("Pay $")');
  await page.waitForURL(/checkout/);
  expect(page.url()).toContain('stripe');
});
