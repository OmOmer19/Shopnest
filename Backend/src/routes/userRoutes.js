const express = require('express')
const router = express.Router()

// importing user controllers
const {createUser, getAllUsers} = require('../controllers/userController')

// Create a new user (user/vendor/admin)
router.post("/", createUser);

// Get all users (testing purpose)

router.get("/", getAllUsers);

// Export router
module.exports = router;