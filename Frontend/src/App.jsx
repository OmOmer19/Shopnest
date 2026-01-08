import ProductsGrid from "./components/ProductsGrid";
import "./App.css"
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VendorDashboard from "./pages/VendorDashboard";
import RoleRoute from "./routes/RoleRoute";


function App() {
  return(
    <>
    <Navbar />
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route path="/" 
      element={ <ProtectedRoute>
        <ProductsGrid/>
      </ProtectedRoute>} />
      
      <Route path="/cart" 
      element={ <ProtectedRoute>
        <Cart />
      </ProtectedRoute>} />

      <Route path="/checkout" 
      element={ <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>} />

      {/* role based routes */}
      <Route path="/vendor-dashboard"
      element={ <ProtectedRoute>
        <RoleRoute roles={["vendor"]}>
          <VendorDashboard />
        </RoleRoute>
      </ProtectedRoute>} />

      {/* <Route path="/admin-dashboard"
      element={ <ProtectedRoute>
        <RoleRoute roles={["admin"]}>
          <VendorDashboard />
        </RoleRoute>
      </ProtectedRoute>} /> */}

    </Routes>

    </>
  )
}

export default App;