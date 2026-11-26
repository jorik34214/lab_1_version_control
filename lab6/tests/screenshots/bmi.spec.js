// tests/screenshots/bmi.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Screenshot тести - Калькулятор ІМТ', () => {

    test('Перевірка вигляду сторінки калькулятора ІМТ', async ({ page }) => {
        await page.goto('http://localhost:3000/bmi.html');
        expect(await page.screenshot()).toMatchSnapshot('bmi-page.png');
    });

    test('Порівняння скриншота результату після розрахунку', async ({ page }) => {
        await page.goto('http://localhost:3000/bmi.html');
        await page.fill('#weight', '70');
        await page.fill('#height', '175');
        await page.click('#calcBtn');
        const element = page.locator('#result');
        expect(await element.screenshot()).toMatchSnapshot('bmi-result.png');
    });

});
