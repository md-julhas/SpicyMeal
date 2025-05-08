# 🔧 SpicyMeal – Admin Panel

This is the **Admin Panel** for the SpicyMeal full-stack restaurant web application.  
It provides backend management functionalities for food items, orders, table bookings, messages, and users.  
Built with **Node.js**, **Express.js**, and **MongoDB**, it serves as the core API and admin interface of the application.

---

## 🚀 Admin Features

### 💬 Manage Messages
- View messages submitted via the Contact Form
- Delete unwanted or spam messages

### 🍽️ Manage Food Items
- Upload new food items with relevant details
- View and edit the existing food list
- Delete food items from the collection

### 🛒 Manage Orders
- View and filter all food orders placed by users
- Change order status: `pending`, `confirmed`, `completed`
- Delete old or canceled orders

### 📅 Manage Table Bookings
- View all table reservations submitted by users
- Approve, reject, or delete reservations as needed

### 👥 Manage Users
- View a list of all registered users
- Access detailed information about individual users
- Optionally block or delete accounts (if implemented)

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB with Mongoose ODM  
- **Authentication**: JWT (JSON Web Tokens)  
- **API Testing**: Postman or Thunder Client  
- **File Handling**: Multer (if used for food image uploads)  
- **Validation**: Express-Validator / Custom logic  
- **Security**: Helmet, CORS, dotenv for environment variables
