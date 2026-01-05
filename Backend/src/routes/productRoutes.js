const express = require("express");
const router = express.Router();

// importing controller
const productController = require('../controllers/productController')

// Route: GET /api/products → get all products
router.get("/", productController.getAllProducts);

// Route: POST /api/products → create a new product
router.post("/", productController.createProduct);

module.exports = router;
