import { test, expect } from '@playwright/test';
const URL = 'https://material.playwrightvn.com/'

test('has title', async ({ page }) => {
  await page.goto(URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Tài liệu học automation test - Playwright Việt Nam');
  expect(await page.title()).toContain('Tài liệu học automation test');
});

test('get started link', async ({ page }) => {
  await page.goto(URL);

  // Click the get started link.
  await page.getByRole('link', { name: 'Bài học 1: Register Page' }).click();
  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'User Registration' })).toBeVisible();
});
