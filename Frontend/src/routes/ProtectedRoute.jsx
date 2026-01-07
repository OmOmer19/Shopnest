// Protects private routes by checking login state using AuthContext
// If user is not logged in, redirects to Login page

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, token } = useAuth();

  // If user or token is missing → not authenticated
  if (!user || !token) {
    return <Navigate to="/login" replace />
  }

  // If authenticated → allow access to the page
  return children
}

export default ProtectedRoute