// tests/e2e/local.test.js
const { test, expect } = require('@playwright/test');

test('Перевірка форми входу', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#username', 'student_kaban');
  await page.fill('#password', 'myPass2024');
  await page.click('#loginButton');
  await expect(page.locator('#successMessage')).toBeVisible();
});

test('Перевірка заголовка сторінки', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Вхід до системи/);
});

test('Валідація обов\'язкових полів форми', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('#loginButton');
  const error = await page.evaluate(() => document.querySelector(':invalid'));
  expect(error).not.toBeNull();
});
