import { Card, Button, Input } from "antd";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    alert("Order placed successfully (UI only)");
    clearCart();
    navigate("/");
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-linear-to-r from-purple-400 via-pink-400 to-red-400">
      <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Address Form */}
        <Card className="shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Delivery Address</h3>

          <div className="space-y-3">
            <Input placeholder="Full Name" />
            <Input placeholder="Mobile Number" />
            <Input placeholder="Address Line" />
            <Input placeholder="City" />
            <Input placeholder="Pincode" />
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          <div className="space-y-2">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <Button
            type="primary"
            className="w-full mt-4"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
