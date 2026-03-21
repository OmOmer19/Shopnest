import {Card, Badge, Button} from "antd"
import {motion} from "framer-motion"
import { useCart } from "../context/CartContext";

const { Meta } = Card;

const ProductCard = ({ product }) => {

    const {addToCart} = useCart() //cart function

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-2"
    >
      <Badge.Ribbon
        text={product.vendor.name}
        color="purple"
      >
        <Card
          hoverable
          className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          cover={
            <div className="h-48 w-full overflow-hidden rounded-t-lg bg-gray-50">
              <img
                alt={product.name}
                src={product.images?.[0] || "/placeholder.png"} //fallback if no img
                className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-110"
              />
            </div>
          }
        >
            {/* product title,price, rating and add to cart buttton */}
          <Meta
            title={
              <span className="text-gray-800 font-semibold text-base">
                {product.name}
              </span>
            }
            description={
                <div className="mt-2">
                    <div className="flex justify-between items-center mb-3">
                      {/* price */}
                        <span className="text-purple-700 font-bold text-lg">₹{product.price}</span>
                        {/* rating — only show if > 0 */}
                  {product.rating > 0 ? (
                    <span className="flex items-center gap-1 text-yellow-500 font-semibold text-sm">
                      ⭐ {product.rating}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">
                      No ratings yet
                    </span>
                  )}
                    </div>
                  {/* stock indicator */}
                  {product.stock < 10 && product.stock > 0 && (
                  <p className="text-orange-500 text-xs mb-2 font-medium">
                    ⚠️ Only {product.stock} left!
                  </p>
                  )}
                  {/* out of stock */}
                  {product.stock === 0 && (
                  <p className="text-red-500 text-xs mb-2 font-medium">
                    ❌ Out of Stock
                  </p>
                  )}
                  {/* add to cart */}
                    <Button type="primary" 
                            size="medium"
                            onClick={() => addToCart(product)}
                            disabled={product.stock ===0} //disable if out of stock
                    className="w-full border-none hover:opacity-90 transition-all duration-300"
                    >Add to Cart
                    </Button>
                </div>
            }
          />
        </Card>
      </Badge.Ribbon>
    </motion.div>
  )
}

export default ProductCard;