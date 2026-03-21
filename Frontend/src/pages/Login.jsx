// Handles user login with JWT, validation
import { useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", values);
      const { token, ...userData } = res.data.data;
      login(userData, token);
      message.success("Login successful!");
      if (userData.role === "vendor") {
        navigate("/vendor-dashboard");
      } else if (userData.role === "admin") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* Left side — branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 bg-gradient-to-br from-purple-600 via-pink-500 to-red-400
                   flex flex-col items-center justify-center p-4 md:p-12 text-white
                   min-h-[120px] sm:min-h-[200px] md:min-h-screen"
      >
        {/* Logo — always visible */}
        <div className="text-3xl md:text-5xl font-extrabold tracking-tight">
          🛍️ ShopNest
        </div>

        {/* Everything below hidden on mobile */}
        <div className="hidden sm:flex flex-col items-center w-full max-w-sm">
          <p className="text-xl md:text-2xl font-semibold text-center mt-3 mb-4">
            Your One-Stop Shopping Destination
          </p>
          <p className="text-white/80 text-center text-base md:text-lg mb-6">
            Discover thousands of products from top vendors across India.
            Shop smart, shop easy!
          </p>

          {/* Features list */}
          <div className="space-y-3 w-full">
            {[
              "🚀 Fast & Secure Checkout",
              "🏪 500+ Trusted Vendors",
              "🎁 Exclusive Deals Every Day",
              "📦 Fast Delivery Across India",
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * i, duration: 0.5 }}
                className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3"
              >
                <span className="text-base">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right side — login form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex items-center justify-center
           bg-gray-50 px-6 sm:px-8 py-8 min-h-screen md:min-h-0"
      >
        <div className="w-full max-w-md">

          {/* Form header */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome back! 👋
            </h2>
            <p className="text-gray-500 mt-2">
              Login to continue shopping
            </p>
          </div>

          {/* Login form */}
          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            {/* Email */}
            <Form.Item
              name="email"
              label={<span className="font-semibold text-gray-700">Email</span>}
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Enter a valid email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-purple-400" />}
                placeholder="Enter your email"
                className="rounded-lg"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              label={<span className="font-semibold text-gray-700">Password</span>}
              rules={[
                { required: true, message: "Please input your password!" }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-purple-400" />}
                placeholder="Enter your password"
                className="rounded-lg"
              />
            </Form.Item>

            {/* Submit button */}
            <Form.Item className="mt-6">
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="h-12 rounded-lg text-base font-semibold
                           bg-gradient-to-r from-purple-600 to-pink-500
                           border-none hover:opacity-90"
              >
                Login to ShopNest
              </Button>
            </Form.Item>

            {/* Divider */}
            <div className="text-center text-gray-400 my-4">
              ── or ──
            </div>

            {/* Register link */}
            <p className="text-center text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-purple-600 font-semibold hover:underline"
              >
                Register for free
              </Link>
            </p>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;