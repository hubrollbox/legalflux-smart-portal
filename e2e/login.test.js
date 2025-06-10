import { test, expect } from '@playwright/test';

test('Login válido redireciona para /dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'user@legalflux.com');
  await page.fill('#password', 'senha123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
