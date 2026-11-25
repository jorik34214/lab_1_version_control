// tests/integration/discountApi.test.js
const { applyMultipleDiscounts } = require('../../src/discount');
const { fetchProductsWithDiscount } = require('../../src/productApi');
const axios = require('axios');

jest.mock('axios');

describe('Інтеграційні тести (Integration Tests) - Калькулятор знижок', () => {

    // Інтеграційний тест 1: Послідовне застосування кількох знижок
    describe('Тест 1: applyMultipleDiscounts - інтеграція validateDiscount + calculateDiscount', () => {
        test('повинен послідовно застосовувати кілька знижок до ціни', () => {
            // 1000 грн -> знижка 10% -> 900 грн -> знижка 20% -> 720 грн
            expect(applyMultipleDiscounts(1000, [10, 20])).toBe(720);
        });

        test('повинен повертати початкову ціну при пустому масиві знижок', () => {
            expect(applyMultipleDiscounts(1000, [])).toBe(1000);
        });

        test('повинен кидати помилку якщо одна зі знижок невалідна', () => {
            expect(() => applyMultipleDiscounts(1000, [10, -5])).toThrow('Невалідний відсоток знижки');
        });
    });

    // Інтеграційний тест 2: Отримання товарів з API та застосування знижок
    describe('Тест 2: fetchProductsWithDiscount - інтеграція з моканим API', () => {
        let mockResponse;

        beforeEach(() => {
            mockResponse = {
                data: [
                    { id: 1, title: 'Ноутбук ASUS', price: 25000 },
                    { id: 2, title: 'Навушники Sony', price: 3000 },
                    { id: 3, title: 'Смартфон Samsung', price: 15000 }
                ]
            };
        });

        test('повинен отримати товари та застосувати знижку до кожного', async () => {
            axios.get.mockResolvedValue(mockResponse);

            const products = await fetchProductsWithDiscount(10); // 10% знижка

            expect(axios.get).toBeCalledTimes(1);
            expect(products).toBeInstanceOf(Array);
            expect(products.length).toBe(3);

            // Перевірка першого товару: 25000 - 10% = 22500
            expect(products[0].id).toBe(1);
            expect(products[0].originalPrice).toBe(25000);
            expect(products[0].discountAmount).toBe(2500);
            expect(products[0].finalPrice).toBe(22500);
            expect(products[0].formattedPrice).toBe('22500.00 грн');

            // Перевірка другого товару: 3000 - 10% = 2700
            expect(products[1].id).toBe(2);
            expect(products[1].finalPrice).toBe(2700);
        });

        test('повинен повертати товари з нульовою знижкою (0%)', async () => {
            axios.get.mockResolvedValue(mockResponse);

            const products = await fetchProductsWithDiscount(0);

            expect(products[0].discountAmount).toBe(0);
            expect(products[0].finalPrice).toBe(25000);
            expect(products[0].formattedPrice).toBe('25000.00 грн');
        });
    });

});
