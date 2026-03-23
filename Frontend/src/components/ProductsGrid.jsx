import { useEffect,useState } from "react";
import { Input, Skeleton, Empty, Slider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import api from "../api/api";
import ProductCard from "./ProductCard";
import Footer from "./Footer";

const ProductsGrid = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("") //search query
  const [priceRange, setPriceRange] = useState([0, 10000]) // price filter range
  const [maxPrice, setMaxPrice] = useState(10000) // max price from products initial value

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.data);

        // setting max price dynamically according to max price product value
        const max = Math.max(...res.data.data.map(p => p.price))
        setMaxPrice(max)
        setPriceRange([0,max])
      } 
      catch (error) {
        console.error("Failed to fetch products:", error);
      }
      finally {
        setLoading(false)
      }
    };
    fetchProducts();
  }, []);

  // filtering products based on search query
  const filteredProducts = products.filter(product =>
    (product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.vendor.name.toLowerCase().includes(search.toLowerCase())) &&
    product.price >= priceRange[0] &&
    product.price <= priceRange[1]
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* header section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 py-10 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          🛍️ Welcome to ShopNest
        </h1>
        <p className="text-white/80 text-base md:text-lg mb-6">
          Discover amazing products from top vendors across India
        </p>

        {/* search bar */}
        <div className="max-w-xl mx-auto">
          <Input
          size="large"
          placeholder="Search products or vendors..."
          prefix = {<SearchOutlined className="text-gray-400" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-full px-4 shadow-lg"
          />
        </div>
        {/* price range filter — add here */}
        <div className="max-w-xl mx-auto mt-4">
          <p className="text-white/80 text-sm mb-2 text-center">
            Price: ₹{priceRange[0].toLocaleString('en-IN')} — ₹{priceRange[1].toLocaleString('en-IN')}
          </p>
          <Slider
            range
            min={0}
            max={maxPrice}
            value={priceRange}
            onChange={(value) => setPriceRange(value)}
            styles={{
              track: { backgroundColor: 'white' },
              rail: { backgroundColor: 'rgba(255,255,255,0.3)' },
              handle: { borderColor: 'white', backgroundColor: 'white' }
            }}
          />
        </div>
      </div>
      {/* products section */}
      <div className="px-4 md:px-8 py-8">
        {/* result count */}
        {!loading && (
          <p className="text-gray-500 mb-4 text-sm">
            Showing <span className="font-semibold text-purple-600">
              {filteredProducts.length}</span> products
          </p>
        )}
        {/* loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow">
                <Skeleton.Image active className="w-full mb-4" style={{ width: '100%', height: 180 }} />
                <Skeleton active paragraph={{ rows: 2 }} />
              </div>
            ))}
          </div>
        )}
        {/* Empty state */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Empty description={
              <span className="text-gray-500">
                No products found for "<strong>{search}</strong>"
              </span>
            } />
          </div>
        )}
        {/* products grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
};

export default ProductsGrid;