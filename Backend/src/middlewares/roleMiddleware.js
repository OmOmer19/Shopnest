// Restrict certain routes to specific roles (admin/vendor/user)

const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Not authenticated" })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Access forbidden: insufficient permissions" })
    }

    next()
  }
}

module.exports = { allowRoles }