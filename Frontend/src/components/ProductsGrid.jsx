import { useEffect,useState } from "react";
import api from "../api/api";
import ProductCard from "./ProductCard";
import Footer from "./Footer";

const ProductsGrid = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 bg-linear-to-r from-purple-400 via-pink-400 to-red-400 animate-gradient-xy">
      <h2 className="text-3xl font-bold mb-6 text-center">ShopNest Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsGrid;