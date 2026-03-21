// Handles user registration and communicates with AuthContext to register a new user
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { Form, Input, Button, Card, message, Select } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import api from "../api/api";

const Register = () => {
  const [loading, setLoading] = useState(false); // loading state for submit button
  const navigate = useNavigate();
  const { login } = useAuth(); // context to store user + token

  // Handle form submission
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Calling backend API to register user
      const res = await api.post("/auth/register", values) 

      // Saving returned user data and JWT in context
      const {token, ...userData} = res.data.data
      login(userData, token)

      // Showing success message and redirect to home
      message.success("Registration successful!");
      
      // redirecting based on role
      if(userData.role === "vendor"){
        navigate("/vendor-dashboard")
      } else {
        navigate("/")     
      }
    } 
    catch (error) {
      // Showing error if registration fails
      message.error(error.response?.data?.message || "Registration failed");
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* Left side — branding (same as login) */}
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
            Join ShopNest Today!
          </p>
          <p className="text-white/80 text-center text-base md:text-lg mb-6">
            Create your account and start shopping or selling
            with thousands of vendors across India!
          </p>

          {/* Features list */}
          <div className="space-y-3 w-full">
            {[
              "🛒 Shop from 500+ Vendors",
              "💰 Best Prices Guaranteed",
              "🔒 100% Secure Payments",
              "🚀 Sell Your Products Easily",
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

      {/* Right side — register form */}
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
              Create Account! 🎉
            </h2>
            <p className="text-gray-500 mt-2">
              Join thousands of happy shoppers
            </p>
          </div>

          {/* Register form */}
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            {/* Name */}
            <Form.Item
              name="name"
              label={<span className="font-semibold text-gray-700">Full Name</span>}
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                prefix={<UserOutlined className="text-purple-400" />}
                placeholder="Enter your full name"
                className="rounded-lg"
              />
            </Form.Item>

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
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-purple-400" />}
                placeholder="Create a password"
                className="rounded-lg"
              />
            </Form.Item>

            {/* Role */}
            <Form.Item
              name="role"
              label={<span className="font-semibold text-gray-700">Register As</span>}
              rules={[{ required: true, message: "Please select a role!" }]}
              initialValue="user"
            >
              <Select size="large">
                <Select.Option value="user">🛒 Customer</Select.Option>
                <Select.Option value="vendor">🏪 Vendor</Select.Option>
              </Select>
            </Form.Item>

            {/* Submit button */}
            <Form.Item className="mt-6">
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="h-12 rounded-lg text-base font-semibold border-none"
              >
                Create Account
              </Button>
            </Form.Item>

            {/* Divider */}
            <div className="text-center text-gray-400 my-4">
              ── or ──
            </div>

            {/* Login link */}
            <p className="text-center text-gray-500">
              Already have an account?{" "}
              <span
                className="text-purple-600 font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </p>
          </Form>
        </div>
      </motion.div>
    </div>
  )
}

export default Register