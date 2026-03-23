import { Card, Button, Input, Form, message } from "antd";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api"
import { useState } from "react";


const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false) // loading state for place order button
  const [form] = Form.useForm()

  // calculating total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  // placing order by sending to backend
  const handlePlaceOrder = async (values) => {
    setLoading(true)
    try {
      // preparing order items from cart
      const items = cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.images?.[0] || "",
        vendor: item.vendor._id
      }))

      // sending order to backend
      await api.post("/orders", {
        items,
        deliveryAddress: {
          name: values.name,
          mobile: values.mobile,
          address: values.address,
          city: values.city,
          pincode: values.pincode
        },
        totalPrice,
        paymentMethod: "cod"
      })

      message.success("Order placed successfully! 🎉")
      clearCart()
      navigate("/orders")
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to place order")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 py-8 px-4 text-center mb-8">
        <h1 className="text-3xl font-extrabold text-white">🧾 Checkout</h1>
        <p className="text-white/80 mt-1">Complete your order</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-8 grid md:grid-cols-2 gap-6">

        {/* Address Form */}
        <Card className="shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Delivery Address</h3>
          <Form
            form={form}
            layout="vertical"
            onFinish={handlePlaceOrder}
          >
            <Form.Item name="name"
              rules={[{ required: true, message: "Please enter your name" }]}>
              <Input placeholder="Full Name" />
            </Form.Item>

            <Form.Item name="mobile"
              rules={[{ required: true, message: "Please enter mobile number" }]}>
              <Input placeholder="Mobile Number" />
            </Form.Item>

            <Form.Item name="address"
              rules={[{ required: true, message: "Please enter address" }]}>
              <Input placeholder="Address Line" />
            </Form.Item>

            <Form.Item name="city"
              rules={[{ required: true, message: "Please enter city" }]}>
              <Input placeholder="City" />
            </Form.Item>

            <Form.Item name="pincode"
              rules={[{ required: true, message: "Please enter pincode" }]}>
              <Input placeholder="Pincode" />
            </Form.Item>
          </Form>
        </Card>

        {/* Order Summary */}
        <Card className="shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          {/* triggers form validation before placing order */}
          <Button
            type="primary"
            className="w-full mt-4"
            loading={loading}
            onClick={() => form.submit()}
          >
            Place Order
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default Checkout