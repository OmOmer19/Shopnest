import { useState, useEffect } from "react"
import { Layout, Card, Table, Button, Form, Input, InputNumber, message, Modal, Popconfirm } from "antd"
import { DashboardOutlined, ShopOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext"
import api from "../api/api"


const { Content } = Layout

const VendorDashboard = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard") // active menu item
  const [products, setProducts] = useState([]) // vendor's products
  const [loading, setLoading] = useState(false) // loading state
  const [addingProduct, setAddingProduct] = useState(false) // add product loading
  const { user } = useAuth()
  const [form] = Form.useForm()
  const [editForm] = Form.useForm() // edit form instance
  const [editingProduct, setEditingProduct] = useState(null) // product being edited
  const [editModalOpen, setEditModalOpen] = useState(false) // edit modal visibility


  // fetching vendor's products on mount
  useEffect(() => {
    fetchMyProducts()
  }, [])

  // fetching all products and filtering by logged in vendor
  const fetchMyProducts = async () => {
    setLoading(true)
    try {
      const res = await api.get("/products")
      // filtering only this vendor's products
      const myProducts = res.data.data.filter(
        (p) => p.vendor._id === user._id
      )
      setProducts(myProducts)
    } catch (error) {
      message.error("Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }

  // adding a new product
  const handleAddProduct = async (values) => {
    setAddingProduct(true)
    try {
      await api.post("/products", {
        ...values,
        images: [values.images] // converting string to array
      })
      message.success("Product added successfully!")
      form.resetFields()
      fetchMyProducts() // refreshing products list
      setSelectedKey("products") // switching to products tab
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to add product")
    } finally {
      setAddingProduct(false)
    }
  }

  // opening edit modal with product data
  const handleEditClick = (product) => {
       setEditingProduct(product)
       editForm.setFieldsValue({
             name: product.name,
             description: product.description,
             price: product.price,
             stock: product.stock,
             images: product.images?.[0] || ""
             })
             setEditModalOpen(true)
             }

 // saving edited product
const handleEditProduct = async (values) => {
  try {
    await api.put(`/products/${editingProduct._id}`, {
      ...values,
      images: [values.images]
    })
    message.success("Product updated successfully!")
    setEditModalOpen(false)
    fetchMyProducts()
  } catch (error) {
    message.error(error.response?.data?.message || "Failed to update product")
  }
}

    // deleting a product
const handleDeleteProduct = async (productId) => {
  try {
    await api.delete(`/products/${productId}`)
    message.success("Product deleted successfully!")
    fetchMyProducts()
  } catch (error) {
    message.error(error.response?.data?.message || "Failed to delete product")
  }
  }

  // table columns for products list
  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <img src={images?.[0]} alt="product"
          className="w-12 h-12 object-contain rounded" />
      )
    },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `₹${price.toLocaleString('en-IN')}`
    },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => rating > 0 ? `⭐ ${rating}` : "No ratings"
    },
    {
  title: "Actions",
  key: "actions",
  render: (_, record) => (
    <div className="flex gap-2">
      <Button
        icon={<EditOutlined />}
        size="small"
        onClick={() => handleEditClick(record)}
        className="text-purple-600 border-purple-600"
      >
        Edit
      </Button>
      <Popconfirm
        title="Delete Product"
        description="Are you sure you want to delete this product?"
        onConfirm={() => handleDeleteProduct(record._id)}
        okText="Yes, Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <Button icon={<DeleteOutlined />} size="small" danger>
          Delete
        </Button>
      </Popconfirm>
    </div>
  )
  }
  ]

  // rendering content based on selected menu key
  const renderContent = () => {
    switch(selectedKey) {

      // dashboard overview
      case "dashboard":
        return (
          <>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              Welcome, {user?.name}! 👋
            </h1>

            {/* stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="shadow-md rounded-xl border-l-4 border-purple-500">
                <div className="flex items-center gap-4">
                  <ShopOutlined className="text-3xl text-purple-500" />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Total Products</h3>
                    <p className="text-3xl font-bold text-purple-600">{products.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="shadow-md rounded-xl border-l-4 border-pink-500">
                <div className="flex items-center gap-4">
                  <DashboardOutlined className="text-3xl text-pink-500" />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Orders</h3>
                    <p className="text-3xl font-bold text-pink-500">0</p>
                  </div>
                </div>
              </Card>

              <Card className="shadow-md rounded-xl border-l-4 border-green-500">
                <div className="flex items-center gap-4">
                  <DashboardOutlined className="text-3xl text-green-500" />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Revenue</h3>
                    <p className="text-3xl font-bold text-green-600">₹0</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* recent products preview */}
            <Card className="shadow-md rounded-xl">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Your Recent Products
              </h2>
              <Table
                dataSource={products.slice(0, 3)} // showing only 3
                columns={columns}
                rowKey="_id"
                pagination={false}
                loading={loading}
              />
            </Card>
          </>
        )

      // all products table
      case "products":
        return (
          <>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              My Products
            </h1>
            <Card className="shadow-md rounded-xl">
              <Table
                dataSource={products}
                columns={columns}
                rowKey="_id"
                loading={loading}
                pagination={{ pageSize: 8 }}
              />
            </Card>
          </>
        )

      // add product form
      case "add-product":
        return (
          <>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              Add New Product
            </h1>
            <Card className="shadow-md rounded-xl max-w-xl">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleAddProduct}
                size="large"
              >
                <Form.Item name="name" label="Product Name"
                  rules={[{ required: true, message: "Please enter product name" }]}>
                  <Input placeholder="e.g. Wireless Earbuds" />
                </Form.Item>

                <Form.Item name="description" label="Description"
                  rules={[{ required: true, message: "Please enter description" }]}>
                  <Input.TextArea rows={3} placeholder="Product description..." />
                </Form.Item>

                <Form.Item name="price" label="Price (₹)"
                  rules={[{ required: true, message: "Please enter price" }]}>
                  <InputNumber min={1} className="w-full" placeholder="e.g. 999" />
                </Form.Item>

                <Form.Item name="stock" label="Stock"
                  rules={[{ required: true, message: "Please enter stock" }]}>
                  <InputNumber min={0} className="w-full" placeholder="e.g. 50" />
                </Form.Item>

                <Form.Item name="images" label="Image URL"
                  rules={[{ required: true, message: "Please enter image URL" }]}>
                  <Input placeholder="https://..." />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={addingProduct}
                    block
                  >
                    Add Product
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </>
        )

      default:
        return null
    }
  }

  return (
    <Layout className="min-h-screen bg-gray-100">
    <Layout>

      {/* Tab bar — always visible on all screens */}
      <div className="flex gap-2 p-3 bg-white shadow-sm overflow-x-auto sticky top-0 z-10">
        {[
          { key: "dashboard", label: "📊 Dashboard" },
          { key: "products", label: "📦 My Products" },
          { key: "add-product", label: "➕ Add Product" },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedKey(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition
              ${selectedKey === tab.key
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <Content className="p-4 md:p-6">
        {renderContent()}
      </Content>

      {/* edit product modal */}
      <Modal
        title="Edit Product"
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        footer={null}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditProduct}>
          <Form.Item name="name" label="Product Name"
            rules={[{ required: true, message: "Please enter product name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description"
            rules={[{ required: true, message: "Please enter description" }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="price" label="Price (₹)"
            rules={[{ required: true, message: "Please enter price" }]}>
            <InputNumber min={1} className="w-full" />
          </Form.Item>
          <Form.Item name="stock" label="Stock"
            rules={[{ required: true, message: "Please enter stock" }]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item name="images" label="Image URL"
            rules={[{ required: true, message: "Please enter image URL" }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    </Layout>
  </Layout>
)
}

export default VendorDashboard