# 🌶️ SpicyMeal – Backend

This is the backend of the **SpicyMeal** full-stack restaurant web application. It powers both the **user side** and the **admin panel**, handling data storage, business logic, authentication, and API communication using **Node.js**, **Express.js**, and **MongoDB (via Mongoose ODM)**.

---

## 🚀 API Features

### 👥 Authentication & Users

- User registration with hashed passwords
- JWT-based login and secure session handling
- Get user profile data
- Admin-specific access control
- Logout functionality

---

### 🍽️ Food Management

- Add new food items (admin)
- View all food items (public)
- Delete food items (admin)

---

### 🛒 Order Management

- Place food orders (user)
- View order history (admin & optionally user)
- Change order status: Pending, Confirmed, Completed (admin)
- Delete orders (admin)

---

### 📅 Table Booking

- Submit table reservation requests (user)
- View all bookings (admin)
- Delete/cancel bookings (admin)

---

### 📬 Contact Messages

- Submit messages via contact form (user)
- View submitted messages (admin)
- Delete messages (admin)

---

### 🧺 Cart Data Validation

- Fetch and validate cart items
- Ensure deleted food items don't break the cart UI
- Clean up stale cart data automatically

---

## 🛠️ Tech Stack

- **Backend Framework**: Node.js + Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT), bcryptjs
- **API Design**: RESTful endpoints
- **Middleware**: Custom auth middleware, error handlers
- **Environment Management**: dotenv
