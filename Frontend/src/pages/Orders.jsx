import { useEffect, useState } from "react";
import { Card, Tag, Empty, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // fetching user's orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my")
        setOrders(res.data.data)
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  // color coding order status
  const getStatusColor = (status) => {
    switch(status) {
      case "pending":    return "orange"
      case "processing": return "blue"
      case "shipped":    return "purple"
      case "delivered":  return "green"
      case "cancelled":  return "red"
      default:           return "default"
    }
  }

  if(loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 py-8 px-4 text-center">
        <h1 className="text-3xl font-extrabold text-white">📦 My Orders</h1>
        <p className="text-white/80 mt-1">Track all your orders here</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">

        {/* empty state */}
        {orders.length === 0 && (
          <div className="text-center py-20">
            <Empty description="No orders yet!" />
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500
                         text-white font-semibold rounded-full hover:opacity-90 transition">
              Start Shopping 🛍️
            </button>
          </div>
        )}

        {/* orders list */}
        {orders.map((order) => (
          <Card key={order._id} className="shadow-md rounded-xl">

            {/* order header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs text-gray-400">Order ID</p>
                <p className="text-sm font-mono text-gray-600">
                  #{order._id.slice(-8).toUpperCase()}
                </p>
              </div>
              <Tag color={getStatusColor(order.status)}
                className="text-sm px-3 py-1 rounded-full capitalize">
                {order.status}
              </Tag>
            </div>

            {/* order items */}
            <div className="space-y-3 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded bg-gray-50"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-purple-600">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
            </div>

            <hr className="my-3" />

            {/* order footer */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">Delivery Address</p>
                <p className="text-sm text-gray-600">
                  {order.deliveryAddress.city}, {order.deliveryAddress.pincode}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Total</p>
                <p className="text-lg font-bold text-purple-700">
                  ₹{order.totalPrice.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* order date */}
            <p className="text-xs text-gray-400 mt-2">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </p>

          </Card>
        ))}
      </div>
    </div>
  )
}

export default Orders