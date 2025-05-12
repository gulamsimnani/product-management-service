const fs = require('fs');
const Product = require("../models/productModel");
const path = require("path");
const generateProductId = require("../helpers/productIdGenerator");

// controllers/productController.js

// const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    // Generate a unique product ID
    const productId = await generateProductId();

    const {
      title,
      description,
      price,
      oldPrice,
      rating,
      reviews,
      category,
      color,
      size,
      bestseller,
    } = req.body;

    // Collect all image paths from multer's req.files
    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    const product = new Product({
      productId,
      title,
      description,
      price,
      oldPrice,
      rating,
      reviews,
      category,
      color,
      size,
      bestseller,
      images: imagePaths, // assuming your model has `images: [String]`
    });

    await product.save();

    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error("Error creating product:", err); // This will show actual error
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: err.message,
    });
  }
};



// Get all products (with pagination)
exports.getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const products = await Product.find().skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();
    res.json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Update product by productId and merge new images without duplicates
exports.updateProductByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = { ...req.body };

    const existingProduct = await Product.findOne({ productId });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.files && req.files.length > 0) {
      const newImagePaths = req.files.map(file => file.path);
      const mergedImages = Array.from(
        new Set([...(existingProduct.images || []), ...newImagePaths])
      );
      updates.images = mergedImages;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { productId },
      updates,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating product" });
  }
};

// Delete product by productId
exports.deleteProductByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findOneAndDelete({ productId });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting product" });
  }
};
