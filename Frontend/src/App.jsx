import ProductsGrid from "./components/ProductsGrid";
import "./App.css"
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { Route, Routes } from "react-router-dom";

function App() {
  return(
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<ProductsGrid/>} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
    </>
  )
}

export default App;