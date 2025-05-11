// helpers/productIdGenerator.js
const Product = require('../models/productModel');

let counter = 1; // This is just for demo; use a persistent counter for production

async function generateProductId() {
  const count = await Product.countDocuments();
  return `PROD-${(count + 1).toString().padStart(4, '0')}`;
}

module.exports = generateProductId;
