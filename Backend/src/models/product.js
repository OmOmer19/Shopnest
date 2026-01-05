// Import Mongoose
const mongoose = require("mongoose");

// Define Product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Product must have a name
    },
    description: {
      type: String,
      required: true, // Product description required
    },
    price: {
      type: Number,
      required: true, // Price is mandatory
    },
    images: [
      {
        type: String, // URLs of product images
      },
    ],
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to vendor (User model)
      required: true,
    },
    stock: {
      type: Number,
      default: 0, // Default stock is 0
    },
    rating: {
      type: Number,
      default: 0, // Average rating
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// Export Product model
const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;