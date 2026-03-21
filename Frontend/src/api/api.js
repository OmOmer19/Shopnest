import axios from "axios"

// creating axios instance with base URL from env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// adding JWT token to every request automatically
api.interceptors.request.use((config) => {
  // getting token from localStorage
  const token = localStorage.getItem("shopnest_token")
  
  // attaching token to Authorization header if exists
  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// handling token expiry globally
api.interceptors.response.use(
  (response) => response, // if success just return response
  (error) => {
    // if token expired → redirect to login
    if(error.response?.status === 401) {
      localStorage.removeItem("shopnest_token")
      localStorage.removeItem("shopnest_user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default api