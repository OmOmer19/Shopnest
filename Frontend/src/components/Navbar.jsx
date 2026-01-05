import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center
                    bg-linear-to-r from-purple-600 via-pink-500 to-red-500
                    text-white shadow-lg">
      <Link to="/" className="text-2xl font-bold">
        ShopNest
      </Link>

      <Link to="/cart">
        <Badge count={totalItems} showZero>
          <ShoppingCartOutlined className="text-2xl cursor-pointer hover:scale-110 transition-transform" />
        </Badge>
      </Link>
    </nav>
  );
};

export default Navbar;
