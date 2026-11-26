// tests/screenshots/local.spec.js
const { test, expect } = require('@playwright/test');

test('Перевірка змін сторінки за скриншотом', async ({ page }) => {
  await page.goto('http://localhost:3000');
  expect(await page.screenshot()).toMatchSnapshot('index-page.png');
});

test('Порівняння скриншота елемента', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const element = page.locator('h1');
  expect(await element.screenshot()).toMatchSnapshot('index-page-h1.png');
});
