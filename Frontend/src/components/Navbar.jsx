import { Badge, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth() // get logged-in user info and logout function
  const { cartItems } = useCart() // get cart items
  const navigate = useNavigate()
  const location = useLocation() // get current route

  // Calculate total items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle logout
  const handleLogout = () => {
    logout();          // clear auth context and localStorage
    navigate("/login"); // redirect to login page
  };

  return (
    <nav className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center
                    bg-linear-to-r from-purple-600 via-pink-500 to-red-500
                    text-white shadow-lg">
      {/* Brand / Logo */}
      <Link to="/" className="text-2xl font-bold">
        ShopNest
      </Link>

      {/* Right side of navbar */}
      <div className="flex items-center gap-4">
        {/* Showing cart icon + logout only if user is logged in and not on login/register page */}
        {user && location.pathname !== "/login" && location.pathname !== "/register" && (
          <>
            {/* Cart Icon with badge */}
            <Link to="/cart">
              <Badge count={totalItems} showZero>
                <ShoppingCartOutlined className="text-2xl cursor-pointer hover:scale-110 transition-transform" />
              </Badge>
            </Link>

            {/* Logout button */}
            <Button type="default" onClick={handleLogout} className="ml-2 text-black hover:bg-gray-200">
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
