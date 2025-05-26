# Test info

- Name: tenant can login and make payment
- Location: C:\Users\plabr\PDL_APP\v2\frontend\pdlpropmanager_frontend\src\app\tests\E2e-login-payment.spec.js:4:5

# Error details

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Pay $")')

    at C:\Users\plabr\PDL_APP\v2\frontend\pdlpropmanager_frontend\src\app\tests\E2e-login-payment.spec.js:16:14
```

# Page snapshot

```yaml
- alert
- button "Open Next.js Dev Tools":
  - img
- button "Open issues overlay": 4 Issue
- button "Collapse issues badge":
  - img
- complementary:
  - heading "PDL Rentals" [level=2]
  - navigation:
    - link "Home":
      - /url: /
    - link "Admin Dashboard":
      - /url: /dashboard
    - link "Maintenance Requests":
      - /url: /maintenance
    - link "Payments":
      - /url: /payments
    - link "Tenant Directory":
      - /url: /tenants
  - button "Logout"
- banner:
  - heading "PDL" [level=1]
  - button "Hide Menu"
- img "User Avatar"
- paragraph: User
- paragraph: admin@pdl.com
- main:
  - heading "Payments List" [level=1]
  - cell "Delete":
    - button "Delete":
      - button "Delete"
- button "Toggle theme": ☀️ Light Mode
- contentinfo:
  - paragraph: © 2025 PDL Rentals
```

# Test source

```ts
   1 | // tests/e2e-login-payment.spec.js
   2 | import { test, expect } from '@playwright/test';
   3 |
   4 | test('tenant can login and make payment', async ({ page }) => {
   5 |   await page.goto('http://localhost:3000/login');
   6 |
   7 |   await page.fill('input[name=email]', 'admin@pdl.com');
   8 |   await page.fill('input[name=password]', 'admin123')
   9 |   await page.click('button[type=submit]');
  10 |
  11 |   await page.waitForURL('**/dashboard')
  12 |   expect(page.url()).toContain('/dashboard');
  13 |
  14 |   await page.goto('http://localhost:3000/payments');
  15 |
> 16 |   await page.click('button:has-text("Pay $")');
     |              ^ Error: page.click: Test timeout of 30000ms exceeded.
  17 |   await page.waitForURL(/checkout/);
  18 |   expect(page.url()).toContain('stripe');
  19 | });
  20 |
```