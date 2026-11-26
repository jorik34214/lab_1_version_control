// tests/e2e/bmi.test.js
const { test, expect } = require('@playwright/test');

test.describe('E2E тести - Калькулятор ІМТ', () => {

    test('Перевірка заголовка сторінки калькулятора', async ({ page }) => {
        await page.goto('http://localhost:3000/bmi.html');
        await expect(page).toHaveTitle(/Калькулятор ІМТ/);
    });

    test('Розрахунок ІМТ — нормальна вага (70 кг, 175 см)', async ({ page }) => {
        await page.goto('http://localhost:3000/bmi.html');
        await page.fill('#weight', '70');
        await page.fill('#height', '175');
        await page.click('#calcBtn');
        await expect(page.locator('#result')).toBeVisible();
        await expect(page.locator('#bmiValue')).toHaveText('22.9');
        await expect(page.locator('#bmiCategory')).toHaveText('Нормальна вага');
    });

    test('Розрахунок ІМТ — недостатня вага (45 кг, 170 см)', async ({ page }) => {
        await page.goto('http://localhost:3000/bmi.html');
        await page.fill('#weight', '45');
        await page.fill('#height', '170');
        await page.click('#calcBtn');
        await expect(page.locator('#result')).toBeVisible();
        await expect(page.locator('#bmiCategory')).toHaveText('Недостатня вага');
    });

    test('Розрахунок ІМТ — надлишкова вага (80 кг, 170 см)', async ({ page }) => {
        await page.goto('http://localhost:3000/bmi.html');
        await page.fill('#weight', '80');
        await page.fill('#height', '170');
        await page.click('#calcBtn');
        await expect(page.locator('#result')).toBeVisible();
        await expect(page.locator('#bmiCategory')).toHaveText('Надлишкова вага');
    });

    test('Валідація: кнопка без заповнених полів', async ({ page }) => {
        await page.goto('http://localhost:3000/bmi.html');
        await page.click('#calcBtn');
        const invalid = await page.evaluate(() => document.querySelector(':invalid'));
        expect(invalid).not.toBeNull();
    });

});
