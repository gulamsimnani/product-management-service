const Product = require("../models/productModel");
const path = require("path");
const generateProductId = require("../helpers/productIdGenerator");

// Create a new product
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
    const product = new Product({
      productId, // Add the generated product ID
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
      image: req.file ? req.file.path : null, // Store the file path of the image if available
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating product", error: err.message });
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

// Update product by productId
exports.updateProductByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = { ...req.body };

    if (req.file) {
      updates.image = req.file.path;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { productId },
      updates,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

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
