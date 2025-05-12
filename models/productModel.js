const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: String, unique: true },
  title: String,
  description: String,
  price: Number,
  oldPrice: Number,
  rating: Number,
  reviews: Number,
  category: String,
  color: String,
  size: String,
  bestseller: Boolean,
  featured: Boolean,
  newArrival: Boolean,
  onSale: Boolean,
  soldOut: Boolean,
  inStock: Boolean,
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
