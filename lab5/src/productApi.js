// src/productApi.js
const axios = require('axios');
const { calculateDiscount, formatPrice } = require('./discount');

/**
 * Отримує список товарів з API та застосовує знижку до кожного.
 * @param {number} discountPercent - Відсоток знижки.
 * @returns {Promise<Array>} - Масив товарів зі знижками.
 */
async function fetchProductsWithDiscount(discountPercent) {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data.map(product => {
        const discountAmount = calculateDiscount(product.price, discountPercent);
        const finalPrice = parseFloat((product.price - discountAmount).toFixed(2));
        return {
            id: product.id,
            title: product.title,
            originalPrice: product.price,
            discountPercent: discountPercent,
            discountAmount: discountAmount,
            finalPrice: finalPrice,
            formattedPrice: formatPrice(finalPrice)
        };
    });
}

module.exports = { fetchProductsWithDiscount };
