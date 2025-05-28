// tests/admin-ledger-e2e.spec.ts
import { test, expect } from '@playwright/test';


  test('Admin can log in', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'admin1@example.com');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:3000/dashboard');
    expect(page.url()).toContain('/dashboard');
  });

  test('Admin can add, edit, delete, and send a ledger entry', async ({ page }) => {
    // Navigate to Ledger Manager
    await page.click('text=accountledgers');

    // Select a tenant
    await page.selectOption('select', { label: 'John Doe' });
    await page.click('button:has-text("Load Ledger")');

    // Add a new charge
    await page.selectOption('select[name="description"]', 'Rent');
    await page.fill('input[name="amount"]', '1000');
    await page.click('button:has-text("Add Charge")');
    await expect(page.locator('text=Rent')).toBeVisible();

    // Edit the entry
    await page.click('button:has-text("Edit")');
    await page.fill('input[name="amount"]', '950');
    await page.click('button:has-text("Update Entry")');
    await expect(page.locator('text=$950.00')).toBeVisible();

    // Delete the entry
    await page.click('button:has-text("Delete")');
    await page.on('dialog', dialog => dialog.accept());

    // Send statement
    await page.click('button:has-text("Send Statement")');
    await expect(page.locator('text=Statement sent')).toBeVisible();
  });
