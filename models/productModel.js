// models/productModel.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  category: { type: String, required: true },
  color: { type: String },
  size: { type: String },
  bestseller: { type: Boolean, default: false },
  image: { type: String, required: true }, // Stores the path to the image
  hoverImage: { type: String },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
