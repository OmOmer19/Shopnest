const Product = require('../models/product')

//controller functions

// to get all products
const getAllProducts = async(req, res) =>{
    try {
    // Fetching products and populating  vendor details using populat
    const products = await Product.find()
      .populate("vendor", "name email role");

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message
    });
  }
}

// to create a new product
const createProduct = async (req, res) => {
    const {name, description, price, stock, images} = req.body

    try{
        const newProduct = new Product({
            name,
            description,
            price,
            vendor: req.user.id, // setting vendor from authenticated user
            stock,
            images
        })
        const savedProduct = await newProduct.save() //saving to db
        res.status(201).json({success: true, data: savedProduct})
    }
    catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

// to update a product — vendor only
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        // checking if this vendor owns the product
        if(product.vendor.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own products"
            })
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // returning updated product
        )

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: error.message
        })
    }
}

// to delete a product — vendor only
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        // checking if this vendor owns the product
        if(product.vendor.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own products"
            })
        }

        await Product.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error: error.message
        })
    }
}


module.exports = {getAllProducts, createProduct, updateProduct, deleteProduct}