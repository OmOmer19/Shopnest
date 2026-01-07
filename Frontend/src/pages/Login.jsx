// Handles user login with JWT, validation
import { useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { Form, Input, Button, Card, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false); // loading state for button
  const navigate = useNavigate();
  const { login } = useAuth(); // context to store user + token

  // Handle form submission
  const onFinish = async (values) => {
    setLoading(true); // show spinner
    try {
      // Call backend API to login user
      const res = await api.post("/auth/login", values);

      // Store returned user data and JWT in context
      const {token, ...userData} = res.data.data
      login(userData, token) // Saving user info + JWT in AuthContext

      // Show success message and redirect to home
      message.success("Login successful!");

      // redirecting based on role
      if(userData.role === "vendor"){
        navigate("/vendor-dashboard")
      } 
      else if(userData.role === "admin"){
        navigate("/admin-dashboard")
      }else{
      navigate("/") //normal user
    }
  }
     catch (error) {
      // Show error if login fails
      message.error(error.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    // Full screen gradient background with centered form
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-400 via-pink-400 to-red-400 px-4">
      {/* Motion animation for the card */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Login Card with blur and shadow */}
        <Card className="rounded-xl shadow-2xl p-6 bg-white/90 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">
            Login
          </h2>

          {/* Login form */}
          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            {/* Email input */}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Enter a valid email!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            {/* Password input */}
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            {/* Submit button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Login
              </Button>
            </Form.Item>

            {/* Redirect to register if new user */}
            <p className="text-center text-gray-500">
              Don't have an account?{" "}
              <span
                className="text-purple-600 cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </Form>
        </Card>
      </motion.div>
    </div>
  )
}

export default Login