// Protects routes based on user roles (admin/vendor/user)
// Used AFTER authentication check (ProtectedRoute)

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ children, roles }) => {
  const { user } = useAuth();

  // If user role is not allowed → redirect
  if (!roles.includes(user?.role)) {
    return <Navigate to="/" replace />
  }

  // Role allowed → render page
  return children
}

export default RoleRoute