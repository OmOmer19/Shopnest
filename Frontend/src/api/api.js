// this is api setup
//  * Central API instance
//  * - baseURL comes from env (safe for deployment)
//  * - all frontend requests will use this

import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;