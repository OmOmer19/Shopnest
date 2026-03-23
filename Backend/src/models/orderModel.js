const mongoose = require("mongoose")

// defining order schema
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to buyer
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,      // storing name at time of order
        price: Number,     // storing price at time of order
        quantity: Number,
        image: String,     // storing image at time of order
        vendor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"      // which vendor this item belongs to
        }
      }
    ],
    deliveryAddress: {
      name: { type: String, required: true },
      mobile: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending", // all orders start as pending
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      default: "cod" // cash on delivery by default
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending"
    }
  },
  { timestamps: true } // adds createdAt and updatedAt
)

const OrderModel = mongoose.model("Order", orderSchema)
module.exports = OrderModel