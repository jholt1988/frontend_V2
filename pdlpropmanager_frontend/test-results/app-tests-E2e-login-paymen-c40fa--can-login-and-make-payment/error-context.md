# Test info

- Name: tenant can login and make payment
- Location: C:\Users\plabr\PDL_APP\v2\frontend\pdlpropmanager_frontend\src\app\tests\E2e-login-payment.spec.js:4:5

# Error details

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation to "/checkout/" until "load"
============================================================
    at C:\Users\plabr\PDL_APP\v2\frontend\pdlpropmanager_frontend\src\app\tests\E2e-login-payment.spec.js:17:14
```

# Page snapshot

```yaml
- alert
- button "Open Next.js Dev Tools":
  - img
- button "Open issues overlay": 7 Issue
- button "Collapse issues badge":
  - img
- banner:
  - heading "PDL Rentals" [level=1]
  - button "Show Menu"
- img "User Avatar"
- paragraph: User
- paragraph: admin1@pdl.com
- button
- main:
  - heading "Payments List" [level=1]
  - cell "Delete":
    - button "Delete":
      - button "Delete"
  - heading "Make a Payment" [level=2]
  - paragraph: Use the button below to make a payment via Stripe.
  - button "Pay $undefined"
- contentinfo:
  - button "Toggle theme": ☀️ Light Mode
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
   7 |   await page.fill('input[name=email]', 'admin1@pdl.com');
   8 |   await page.fill('input[name=password]', 'admin123')
   9 |   await page.click('button[type=submit]');
  10 |
  11 |   await page.waitForURL('**/dashboard')
  12 |   expect(page.url()).toContain('/dashboard');
  13 |
  14 |   await page.goto('http://localhost:3000/payments');
  15 |
  16 |   await page.click('button:has-text("Pay $")');
> 17 |   await page.waitForURL('/checkout/');
     |              ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  18 |   expect(page.url()).toContain('stripe');
  19 | });
  20 |
```