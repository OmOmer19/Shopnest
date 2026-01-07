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
      } 
        navigate("/") // normal user
    } 
    catch (error) {
      // Showing error if registration fails
      message.error(error.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    // Full screen gradient background with centered form
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-400 via-pink-400 to-red-400 px-4">
      {/* Card animation using Framer Motion */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Registration Card with blur and shadow */}
        <Card className="rounded-xl shadow-2xl p-6 bg-white/90 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">
            Register
          </h2>

          {/* Registration form */}
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            {/* Name input */}
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Full Name" />
            </Form.Item>

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
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item
            name="role"
            label="Register As"
            rules={[{required:true,message: "Please select a role!"}]}
            initialValue="user" // default to user
            >
              <Select>
                <Select.Option value="user">User</Select.Option>
                <Select.Option value="vendor">Vendor</Select.Option>
              </Select>
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
                Register
              </Button>
            </Form.Item>

            {/* Redirect to login if already registered */}
            <p className="text-center text-gray-500">
              Already have an account?{" "}
              <span
                className="text-purple-600 cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </Form>
        </Card>
      </motion.div>
    </div>
  )
}

export default Register