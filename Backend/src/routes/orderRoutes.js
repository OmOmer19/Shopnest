const express = require('express')
const router = express.Router()
const {protect} = require('../middlewares/authMiddleware')
const {allowRoles} = require('../middlewares/roleMiddleware')
const {placeOrder, getMyOrders, updateOrderStatus} = require('../controllers/orderController')

// POST /api/orders → place a new order (users only)
router.post("/", protect, allowRoles("user"), placeOrder)

// GET /api/orders/my → get logged in user's orders
router.get("/my", protect, allowRoles("user"), getMyOrders)

// PUT /api/orders/:id/status → update order status (admin only)
router.put("/:id/status", protect, allowRoles("admin"), updateOrderStatus)

module.exports = router