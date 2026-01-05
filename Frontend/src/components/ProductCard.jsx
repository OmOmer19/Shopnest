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
        color="green"
      >
        <Card
          hoverable
          className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          cover={
            <div className="h-48 w-full overflow-hidden rounded-t-lg">
              <img
                alt={product.name}
                src={product.images[0]}
                className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-110"
              />
            </div>
          }
        >
            {/* product title,price, rating and add to cart buttton */}
          <Meta
            title={product.name}
            description={
                <div className="mt-2">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-700 font-bold text-lg">₹{product.price}</span>
                        <span className="flex items-center text-yellow-400 font-semibold">
                            ⭐ {product.rating}
                        </span>
                    </div>
                    <Button type="primary" size="medium" onClick={() => addToCart(product)}
                    className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
                    >Add to Cart
                    </Button>
                </div>
            }
          />
        </Card>
      </Badge.Ribbon>
    </motion.div>
  );
};


export default ProductCard;