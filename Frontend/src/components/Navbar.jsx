import { Badge, Dropdown } from "antd";
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
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

  // dropdown menu items
  const menuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: handleLogout
    }
  ]

   // hiding navbar on auth pages
  if(["/login", "/register"].includes(location.pathname)) return null

  return (
    <nav className="sticky top-0 z-50 px-4 md:px-8 py-3 flex justify-between items-center
                    bg-gradient-to-r from-purple-600 via-pink-500 to-red-500
                    text-white shadow-lg">

      {/* Brand / Logo */}
      <Link to={user?.role === "vendor" ? "/vendor-dashboard" : "/"}
      className="text-xl md:text-2xl font-bold tracking-tight">
        🛍️ ShopNest
      </Link>

      {/* Right side — only show when logged in */}
      {user && (
        <div className="flex items-center gap-3 md:gap-5">

          {user?.role === "user" && (
            <Link to="/orders"
                  className="text-white text-sm hover:underline">
                   My Orders </Link>
             )}

          {/* Cart icon with badge */}
          {user?.role !== "vendor" && (
            <Link to="/cart">
            <Badge count={totalItems} showZero
              styles={{ indicator: { backgroundColor: '#fff', color: '#7C3AED', fontWeight: 'bold' } }}
            >
              <ShoppingCartOutlined className="text-2xl text-white cursor-pointer
                                               hover:scale-110 transition-transform" />
            </Badge>
          </Link>
          )}

          {/* User profile dropdown with name */}
          <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
            <div className="flex items-center gap-2 cursor-pointer
                            bg-white/20 hover:bg-white/30
                            transition px-3 py-1.5 rounded-full">
              <UserOutlined className="text-white" />
              {/* hide name on very small screens */}
              <span className="hidden sm:block text-sm font-medium text-white">
                {user?.name}
              </span>
            </div>
          </Dropdown>

        </div>
      )}
    </nav>
  )
}

export default Navbar
