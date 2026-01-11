// Vendor Dashboard main layout
// Only accessible by users with role vendor

import {Layout, Menu, Card} from "antd"
import {DashboardOutlined,AppstoreOutlined,PlusCircleOutlined,} from "@ant-design/icons";

const { Sider, Content } = Layout

const VendorDashboard = () => {
  return (
    // Full height dashboard layout
    <Layout className="min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sider
        width={240}
        className="bg-white shadow-lg"
        breakpoint="lg"
        collapsedWidth="0"
      >
        {/* Sidebar brand */}
        <div className="h-16 flex items-center justify-center text-xl font-bold text-purple-600">
          Vendor Panel
        </div>

        {/* Sidebar navigation */}
        <Menu
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          className="border-r-0"
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "products",
              icon: <AppstoreOutlined />,
              label: "My Products",
            },
            {
              key: "add-product",
              icon: <PlusCircleOutlined />,
              label: "Add Product",
            },
          ]}
        />
      </Sider>

      {/* Main content area */}
      <Layout>
        <Content className="p-6">
          
          {/* Page title */}
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Vendor Dashboard
          </h1>

          {/* Stats / cards section (static for now) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Card className="shadow-md rounded-xl">
              <h3 className="text-lg font-semibold text-gray-600">
                Total Products
              </h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                0
              </p>
            </Card>

            <Card className="shadow-md rounded-xl">
              <h3 className="text-lg font-semibold text-gray-600">
                Orders
              </h3>
              <p className="text-3xl font-bold text-pink-500 mt-2">
                0
              </p>
            </Card>

            <Card className="shadow-md rounded-xl">
              <h3 className="text-lg font-semibold text-gray-600">
                Revenue
              </h3>
              <p className="text-3xl font-bold text-green-600 mt-2">
                ₹0
              </p>
            </Card>

          </div>

          {/* Placeholder content */}
          <div className="mt-10 bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500">
              Vendor analytics, product tables and actions will appear here.
            </p>
          </div>

        </Content>
      </Layout>
    </Layout>
  )
}

export default VendorDashboard