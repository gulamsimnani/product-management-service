// routes/productRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

const router = express.Router();

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Save images to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Routes for CRUD operations
router.post('/products', upload.single('image'), productController.createProduct);
router.get('/products', productController.getProducts);
router.put('/products/:productId', upload.single('image'), productController.updateProductByProductId);
router.delete('/products/:productId', productController.deleteProductByProductId);


module.exports = router;
