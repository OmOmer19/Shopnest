# 🛍️ ShopNest — Multi-Vendor E-Commerce Platform

![Node.js](https://img.shields.io/badge/Node.js-22.0.0-green)
![Express](https://img.shields.io/badge/Express-5.0.0-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0.0-brightgreen)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.0.0-green)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0.0-blueviolet)
![Ant Design](https://img.shields.io/badge/AntDesign-6.0.0-blue)
![License](https://img.shields.io/badge/License-ISC-yellow)

A full-stack multi-vendor e-commerce platform where users can browse and purchase products from multiple vendors, while vendors manage their inventory through a dedicated dashboard.

🔗 **Live Demo:** [https://shopnest-eta.vercel.app](https://shopnest-eta.vercel.app)
🔗 **Backend API:** [https://shopnest-api-dn9q.onrender.com](https://shopnest-api-dn9q.onrender.com)

---

## 🌟 Features

### User Features
- 🔐 **JWT Authentication** — Secure register/login with role-based access
- 🛒 **Shopping Cart** — Add, remove, increase/decrease quantity with localStorage persistence
- 🔍 **Search & Filter** — Search products by name or vendor, filter by price range
- 📦 **Order System** — Place orders with delivery address, view order history
- 📱 **Fully Responsive** — Optimized for mobile, tablet and desktop

### Vendor Features
- 🏪 **Vendor Dashboard** — Dedicated dashboard with stats and product management
- ➕ **Add Products** — Add new products with image URL, price, stock
- ✏️ **Edit Products** — Update product details via modal
- 🗑️ **Delete Products** — Remove products with confirmation popup
- 📊 **Product Analytics** — View total products, orders, revenue stats

### Platform Features
- 🎨 **Modern UI** — Clean design with gradient hero sections and Ant Design components
- 🔒 **Role-Based Routes** — Separate access for users, vendors and admins
- 🏷️ **Vendor Badges** — Products display vendor name ribbon
- ⚠️ **Stock Indicators** — Low stock and out of stock warnings
- 🌐 **Production Deployed** — Backend on Render, Frontend on Vercel

---

## 🛠️ Tech Stack

### Backend
- Node.js + Express.js v5
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- CORS + dotenv

### Frontend
- React 19 + Vite 7
- Tailwind CSS v4
- Ant Design v6
- Framer Motion
- Axios
- React Router DOM v7

---

## 📁 Project Structure

```
Shopnest/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── mongodb.config.js     # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js     # Register, login logic
│   │   │   ├── productController.js  # Product CRUD
│   │   │   └── orderController.js    # Order management
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js     # JWT protection
│   │   │   └── roleMiddleware.js     # Role-based access
│   │   ├── models/
│   │   │   ├── userModel.js          # User schema
│   │   │   ├── productModel.js       # Product schema
│   │   │   └── orderModel.js         # Order schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js         # /api/auth
│   │   │   ├── productRoutes.js      # /api/products
│   │   │   └── orderRoutes.js        # /api/orders
│   │   └── server.js                 # Entry point
│   ├── .env.example
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js                # Axios instance with JWT interceptor
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Sticky navbar with role-based links
│   │   │   ├── ProductCard.jsx       # Product card with cart integration
│   │   │   ├── ProductsGrid.jsx      # Product listing with search & filter
│   │   │   └── Footer.jsx            # Site footer
│   │   ├── context/
│   │   │   ├── AuthContext.jsx       # Auth state management
│   │   │   └── CartContext.jsx       # Cart state with localStorage
│   │   ├── pages/
│   │   │   ├── Login.jsx             # Split layout login page
│   │   │   ├── Register.jsx          # Split layout register page
│   │   │   ├── Cart.jsx              # Cart with quantity controls
│   │   │   ├── Checkout.jsx          # Checkout with address form
│   │   │   ├── Orders.jsx            # Order history page
│   │   │   └── VendorDashboard.jsx   # Vendor management dashboard
│   │   ├── routes/
│   │   │   ├── ProtectedRoute.jsx    # Auth guard
│   │   │   └── RoleRoute.jsx         # Role-based guard
│   │   ├── App.jsx                   # Route definitions
│   │   └── main.jsx                  # App entry point
│   ├── .env.example
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v20+
- MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/OmOmer19/Shopnest.git
cd Shopnest
```

### 2. Backend setup

```bash
cd Backend
npm install
cp .env.example .env
```

Fill in your `.env` values — see Environment Variables section below.

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd Frontend
npm install
cp .env.example .env
```

Fill in your `.env` values.

```bash
npm run dev
```

---

## 🔑 Environment Variables

### Backend `.env`

| Variable | Description |
|---|---|
| `PORT` | Server port (default 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |

### Frontend `.env`

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API base URL |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user/vendor | Public |
| POST | `/api/auth/login` | Login and get JWT token | Public |

### Products
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/products` | Get all products | Public |
| POST | `/api/products` | Create new product | Vendor |
| PUT | `/api/products/:id` | Update product | Vendor |
| DELETE | `/api/products/:id` | Delete product | Vendor |

### Orders
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/orders` | Place a new order | User |
| GET | `/api/orders/my` | Get user's orders | User |
| PUT | `/api/orders/:id/status` | Update order status | Admin |

---

## 🗺️ Pages

- `/login` — Split layout login page with branding
- `/register` — Split layout register page with role selection
- `/` — Product catalog with search and price filter
- `/cart` — Shopping cart with quantity controls
- `/checkout` — Checkout with delivery address form
- `/orders` — Order history with status tracking
- `/vendor-dashboard` — Vendor dashboard with product management

---

## 🔐 User Roles

| Role | Permissions |
|---|---|
| `user` | Browse products, add to cart, place orders, view order history |
| `vendor` | All user permissions + manage own products (add/edit/delete) |
| `admin` | All permissions + update order status |

---

## 📸 Screenshots

### User Flow
- 🏠 Product catalog with search and price filter
- 🛒 Cart with quantity controls and total
- 📦 Checkout with delivery address
- 📋 Order history with status badges

### Vendor Flow
- 📊 Dashboard with product count stats
- ➕ Add product form
- ✏️ Edit product modal
- 🗑️ Delete with confirmation

---

## 🚢 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://shopnest-eta.vercel.app |
| Backend | Render | https://shopnest-api-dn9q.onrender.com |
| Database | MongoDB Atlas | Cloud hosted |

> ⚠️ **Note:** Backend is on Render free tier — first request after inactivity may take 30-50 seconds to wake up.

---

## 👨‍💻 Developer

Made by **Om Omer**

🔗 [GitHub](https://github.com/OmOmer19) | 🌐 [Live Project](https://shopnest-eta.vercel.app)