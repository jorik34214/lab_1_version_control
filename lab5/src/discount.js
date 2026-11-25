/**
 * Перевіряє валідність відсотку знижки.
 * @param {number} percent - Відсоток знижки (0-100).
 * @returns {boolean}
 */
function validateDiscount(percent) {
    return typeof percent === 'number' && percent >= 0 && percent <= 100;
}

/**
 * Обчислює суму знижки від початкової ціни.
 * @param {number} price - Початкова ціна.
 * @param {number} discountPercent - Відсоток знижки.
 * @returns {number} - Сума знижки.
 */
function calculateDiscount(price, discountPercent) {
    if (!validateDiscount(discountPercent)) {
        throw new Error('Невалідний відсоток знижки: має бути від 0 до 100');
    }
    return parseFloat((price * discountPercent / 100).toFixed(2));
}

/**
 * Форматує ціну у рядок з позначенням валюти.
 * @param {number} price - Ціна.
 * @returns {string} - Наприклад, "1500.00 грн".
 */
function formatPrice(price) {
    return `${price.toFixed(2)} грн`;
}

/**
 * Застосовує кілька знижок послідовно до ціни.
 * Інтегрує validateDiscount та calculateDiscount.
 * @param {number} price - Початкова ціна.
 * @param {number[]} discounts - Масив відсотків знижок.
 * @returns {number} - Фінальна ціна після всіх знижок.
 */
function applyMultipleDiscounts(price, discounts) {
    return discounts.reduce((currentPrice, discount) => {
        const discountAmount = calculateDiscount(currentPrice, discount);
        return parseFloat((currentPrice - discountAmount).toFixed(2));
    }, price);
}

module.exports = { validateDiscount, calculateDiscount, formatPrice, applyMultipleDiscounts };
