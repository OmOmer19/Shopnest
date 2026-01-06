const jwt = require("jsonwebtoken")
const User = require("../models/user")

// protecting routes middleware
const protect = async (req, res, next) => {
  let token;

  try {
    // Checking for token in headers (Authorization: Bearer <token>)
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

      token = req.headers.authorization.split(" ")[1];

      //Verifying token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attaching user to request object (without password)
      req.user = await User.findById(decoded.id).select("-password");

      // Moving to next middleware/controller
      next();
    }
     else {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token provided",
      })
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
      error: error.message,
    })
  }
}

module.exports = { protect }