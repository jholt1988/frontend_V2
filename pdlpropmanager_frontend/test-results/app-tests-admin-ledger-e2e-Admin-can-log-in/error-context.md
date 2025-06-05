# Test info

- Name: Admin can log in
- Location: C:\Users\plabr\PDL_APP\v2\frontend\pdlpropmanager_frontend\src\app\tests\admin-ledger-e2e.spec.js:5:7

# Error details

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation to "http://localhost:3000/dashboard" until "load"
============================================================
    at C:\Users\plabr\PDL_APP\v2\frontend\pdlpropmanager_frontend\src\app\tests\admin-ledger-e2e.spec.js:10:16
```

# Page snapshot

```yaml
- alert
- button "Open Next.js Dev Tools":
  - img
- banner:
  - heading "PDL Rentals" [level=1]
  - button "Show Menu"
- img "User Avatar"
- paragraph: User
- paragraph
- main:
  - heading "Login" [level=2]
  - text: "Email:"
  - textbox: admin1@example.com
  - text: "Password:"
  - textbox: admin123
  - button "Login"
  - paragraph:
    - link "Forgot Password?":
      - /url: /forgot-password
  - paragraph:
    - text: Don't have an account?
    - link "Register":
      - /url: /register
- contentinfo:
  - button "Toggle theme": ☀️ Light Mode
  - paragraph: © 2025 PDL Rentals
```

# Test source

```ts
   1 | // tests/admin-ledger-e2e.spec.ts
   2 | import { test, expect } from '@playwright/test';
   3 |
   4 |
   5 |   test('Admin can log in', async ({ page }) => {
   6 |     await page.goto('http://localhost:3000/login');
   7 |     await page.fill('input[name="email"]', 'admin1@example.com');
   8 |     await page.fill('input[name="password"]', 'admin123');
   9 |     await page.click('button[type="submit"]');
> 10 |     await page.waitForURL('http://localhost:3000/dashboard');
     |                ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  11 |     expect(page.url()).toContain('/dashboard');
  12 |   });
  13 |
  14 |   test('Admin can add, edit, delete, and send a ledger entry', async ({ page }) => {
  15 |     // Navigate to Ledger Manager
  16 |     await page.click('text=accountledgers');
  17 |
  18 |     // Select a tenant
  19 |     await page.selectOption('select', { label: 'John Doe' });
  20 |     await page.click('button:has-text("Load Ledger")');
  21 |
  22 |     // Add a new charge
  23 |     await page.selectOption('select[name="description"]', 'Rent');
  24 |     await page.fill('input[name="amount"]', '1000');
  25 |     await page.click('button:has-text("Add Charge")');
  26 |     await expect(page.locator('text=Rent')).toBeVisible();
  27 |
  28 |     // Edit the entry
  29 |     await page.click('button:has-text("Edit")');
  30 |     await page.fill('input[name="amount"]', '950');
  31 |     await page.click('button:has-text("Update Entry")');
  32 |     await expect(page.locator('text=$950.00')).toBeVisible();
  33 |
  34 |     // Delete the entry
  35 |     await page.click('button:has-text("Delete")');
  36 |     await page.on('dialog', dialog => dialog.accept());
  37 |
  38 |     // Send statement
  39 |     await page.click('button:has-text("Send Statement")');
  40 |     await expect(page.locator('text=Statement sent')).toBeVisible();
  41 |   });
  42 |
```