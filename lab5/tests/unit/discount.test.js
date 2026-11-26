const { validateDiscount, calculateDiscount, formatPrice } = require('../../src/discount');

describe('Модульні тести (Unit Tests) - Калькулятор знижок', () => {

    describe('Тест 1: validateDiscount', () => {
        test('повинен повертати true для валідних відсотків (0-100)', () => {
            expect(validateDiscount(0)).toBe(true);
            expect(validateDiscount(50)).toBe(true);
            expect(validateDiscount(100)).toBe(true);
        });

        test('повинен повертати false для невалідних відсотків', () => {
            expect(validateDiscount(-1)).toBe(false);    // від'ємне значення
            expect(validateDiscount(101)).toBe(false);   // більше 100
            expect(validateDiscount('50')).toBe(false);  // рядок замість числа
            expect(validateDiscount(null)).toBe(false);  // null
        });
    });

    describe('Тест 2: calculateDiscount', () => {
        test('повинен коректно обчислювати суму знижки', () => {
            expect(calculateDiscount(1000, 10)).toBe(999);    // Навмисна помилка для перевірки реакції CI
            expect(calculateDiscount(500, 20)).toBe(100);     // 20% від 500 = 100
            expect(calculateDiscount(999, 15)).toBe(149.85);  // 15% від 999 = 149.85
        });

        test('повинен повертати 0 для знижки 0%', () => {
            expect(calculateDiscount(1000, 0)).toBe(0);
        });

        test('повинен кидати помилку при невалідному відсотку', () => {
            expect(() => calculateDiscount(1000, -5)).toThrow('Невалідний відсоток знижки');
            expect(() => calculateDiscount(1000, 150)).toThrow('Невалідний відсоток знижки');
        });
    });

    describe('Тест 3: formatPrice', () => {
        test('повинен форматувати ціну у рядок з валютою', () => {
            expect(formatPrice(1500)).toBe('1500.00 грн');
            expect(formatPrice(99.9)).toBe('99.90 грн');
            expect(formatPrice(0)).toBe('0.00 грн');
        });

        test('повинен коректно округлювати до 2 знаків після коми', () => {
            expect(formatPrice(10.5)).toBe('10.50 грн');
            expect(formatPrice(10.123)).toBe('10.12 грн');
        });
    });

});
