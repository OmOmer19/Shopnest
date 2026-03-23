const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware")
const { allowRoles } = require("../middlewares/roleMiddleware")
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require("../controllers/productController")

// Route: GET /api/products → get all products
router.get("/",getAllProducts);

// Route: POST /api/products → create a new product
router.post(
  "/",
  protect,           // user must be logged in
  allowRoles("vendor", "admin"), // only vendor/admin can create product
  createProduct
)
// update product — vendor only
router.put("/:id", protect, allowRoles("vendor"), updateProduct)

// delete product — vendor only
router.delete("/:id", protect, allowRoles("vendor"), deleteProduct)

module.exports = router;
