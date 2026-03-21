// Handles user login, logout, and stores JWT token for role-based access
import { createContext,useContext,useState,useEffect } from "react";

//creating the context
const AuthContext = createContext()

//provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stores logged-in user info
  const [token, setToken] = useState(null); // stores JWT token
  const [loading, setLoading] = useState(true); // loading state while checking localStorage

  // Loading auth state from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("shopnest_user");
    const storedToken = localStorage.getItem("shopnest_token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false) // done loading auth state
  }, [])
  //saving auth state to localStorage whenever it changes
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("shopnest_user", JSON.stringify(user));
      localStorage.setItem("shopnest_token", token);
    } else {
      localStorage.removeItem("shopnest_user");
      localStorage.removeItem("shopnest_token");
    }
  }, [user, token])

  //Login function
  const login = (userData, jwtToken) => {
    setUser(userData)
    setToken(jwtToken)
  }
  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
  }
  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// 7. Custom hook for easier use in components
export const useAuth = () => useContext(AuthContext)