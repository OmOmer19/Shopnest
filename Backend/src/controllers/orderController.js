const Order = require('../models/orderModel')

// to place a new order
const placeOrder = async (req, res) => {
    try {
        const { items, deliveryAddress, totalPrice, paymentMethod } = req.body

        if(!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No items in order"
            })
        }

        if(!deliveryAddress) {
            return res.status(400).json({
                success: false,
                message: "Delivery address is required"
            })
        }

        const order = await Order.create({
            user: req.user._id, // from JWT token
            items,
            deliveryAddress,
            totalPrice,
            paymentMethod: paymentMethod || "cod"
        })

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: order
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to place order",
            error: error.message
        })
    }
}

// to get logged in user's orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate("items.product", "name images price")
            .sort({ createdAt: -1 }) // newest first

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message
        })
    }
}

// to update order status (admin only)
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )

        if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Order status updated",
            data: order
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update order status",
            error: error.message
        })
    }
}

module.exports = { placeOrder, getMyOrders, updateOrderStatus }