const express = require("express")
const cors = require("cors"); // allows requests from frontend
require('dotenv').config(); //to load .env variables

//creating express app
const app = express();

app.use(cors()) //enabling cors

app.use(express.json()) //enabling json parsing for request bodies

//importing db connection fun
const connectToDB = require('./config/mongodb.config')
// connecting to mongodb atlas
connectToDB()

// Importing routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')

app.use("/api/products", productRoutes);
app.use("/api/auth",authRoutes)
app.use("/api/orders", orderRoutes)

app.get("/", (req, res) => {
  res.send("ShopNest API is working fine!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});