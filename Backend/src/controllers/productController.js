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

module.exports = {getAllProducts, createProduct}