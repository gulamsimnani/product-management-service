const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productController = require("../controllers/productController");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Create product with multiple image uploads
router.post(
  "/products",
  upload.array("images", 5),
  productController.createProduct
);

// Get all products
router.get("/products", productController.getProducts);

// Update product with multiple image uploads
router.put(
  "/products/:productId",
  upload.array("images", 5),
  productController.updateProductByProductId
);

// Delete product
router.delete("/products/:productId", productController.deleteProductByProductId);

module.exports = router;
