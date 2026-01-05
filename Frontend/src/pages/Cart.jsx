import { Button, Card, Empty } from "antd";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Cart = () =>{
    const {cartItems, removeFromCart, clearCart, increaseQty, decreaseQty} = useCart()
    
    const navigate = useNavigate()

    const totalPrice = cartItems.reduce(
        (sum,item) => sum + item.price * item.quantity, 0
    )

    if(cartItems.length === 0){
        return(
            
            <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-r from-purple-400 via-pink-400 to-red-400">
                <Empty description="Your cart is empty" />
                <button onClick={() => navigate("/")}
                   className="mt-3 px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition" >
                    Shop Now
                   </button>
            </div>
        )
    }

    return(
         <div className="min-h-screen px-6 py-6 bg-linear-to-r from-purple-400 via-pink-400 to-red-400">
            <h2 className="text-3xl font-bold text-center mb-6">Your Cart</h2>
            
            <div className="max-w-3xl mx-auto space-y-4">
                {cartItems.map((item) => (
                    <Card key={item._id} className="shadow-lg">
                        <div className="flex items-center gap-4">
                            <img src={item.images[0]} alt={item.name} 
                            className="w-24 h-24 object-contain"
                             />
                             <div className="flex-1">
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-gray-600">
                                     ₹{item.price} x {item.quantity}
                                </p>
                             </div>
                             <div className="flex items-center gap-3">
                                <button onClick={() => decreaseQty(item._id)}>−</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => increaseQty(item._id)}>+</button>
                             </div>
                             <Button danger onClick={() => removeFromCart(item._id)}>
                                Remove
                             </Button>
                        </div>
                    </Card>
                ))}
                {/* Cart Summary */}
                <Card className="shadow-xl">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">
                            Total: ₹{totalPrice.toFixed(2)}
                        </h3>
                        <div className="flex gap-3">
                            <Button danger onClick={clearCart}>
                                Clear Cart
                            </Button>
                            <Button type="primary" onClick={() => navigate('/checkout')}>
                                Checkout
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="text-center mt-4">
                <button onClick={() => navigate("/")}
                    className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition">
                    Shop More
                </button>
            </div>
            <Footer />
         </div>
         
    )
}
export default Cart