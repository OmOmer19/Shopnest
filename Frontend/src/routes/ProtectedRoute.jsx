// Protects private routes by checking login state using AuthContext
// If user is not logged in, redirects to Login page

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, token, loading } = useAuth();

  // waiting for auth state to load before checking
if(loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-purple-600 text-xl font-semibold">Loading...</p>
    </div>
  )
}

  // If user or token is missing → not authenticated
  if (!user || !token) {
    return <Navigate to="/login" replace />
  }

  // If authenticated → allow access to the page
  return children
}

export default ProtectedRoute