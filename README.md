# 🌶️ SpicyMeal

**SpicyMeal** is a full-stack restaurant food delivery application that delivers a seamless food ordering experience. It offers features like food search, organized categories, cart management, table booking, order tracking, and a contact form for customers to send messages directly to the restaurant or support team. The admin panel includes comprehensive tools to manage food items, user profiles, orders, and customer messages, ensuring efficient restaurant operations and excellent customer service.
<br>
Visit SpicyMeal User Side Live: [Click Here](https://spicymeal.vercel.app/) <br>
Visit SpicyMeal Admin Panel Live: [Click Here](https://spicymealadmin.vercel.app/)

<br>

## 🚀 Features

### 🧾 Frontend (User Side)

- Display food items via API calls  
- Food Search System  
- Organized Food Categories
- Food ordering system (Add and view cart items, fill up delivery form and place orders) 
- Table booking system  
- Contact Us System  
- View orders and status  
- View user profile
- Customer Message Submission

<br>

### 🔧 Admin Panel

- Manage messages (view & delete)  
- Manage food list (upload, view, delete)  
- Manage orders (view, delete, change status)  
- Manage users (view all, detailed info) 
- Authenticate users with JWT  

<br>

### 🧾 Authentication System

- User registration  
- Login system  
- Logout system  

<br>

### 🔧 Backend

- Provide food data via REST API  
- Handle cart, orders, and store them in database  
- Process and store table booking requests  
- Store contact messages from users  
- Authenticate users with JWT  
- Hash and verify passwords securely  
- Support admin actions: manage messages, food items, orders, and users
- Enhancing API security with route-specific rate limiting

<br>


### 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios, React Router  
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) 
- **File Handling**: Multer
- **API Testing**: Postman 
- **Validation**: Express-Validator / Custom logic
- **Security**: Rate Limiter, Helmet, CORS, and dotenv for managing environment variables
- **State Management**: React State / Context API

<br>

## 🧠 Challenges Faced

### 1.Stale Cart Data After Food Deletion (Data Inconsistency Issue)

Initially, I designed the cart system to rely on the food items fetched during the initial API call. Each user's cart was stored in the database as an object (`cartData`) using food IDs as keys.  

The issue arose when an admin deleted a food item that a user had previously added to their cart. Since the `cartData` still contained the deleted food's ID, the frontend would throw an error when attempting to render the cart—because the item no longer existed in the newly fetched food list.


### ✅ Solution

To resolve this, I separated the cart rendering process from the initial food fetch logic. Instead, I created a dedicated backend API that directly retrieves and validates the user's cart data.

Steps taken:

1. Fetched the user's `cartData`.  
2. Checked if each food ID in `cartData` still existed in the current food collection in the database.  
3. Removed any invalid or deleted food IDs from the cart.  
4. Sent back only the valid cart data in the response.  

This ensured that users would never encounter errors due to deleted food items in their cart, and the app could handle such cases gracefully.

<br>

### 2.Incorrect Client IP Detection Behind Proxy

The backend application was running behind a proxy server, which caused the client IP addresses to be detected incorrectly. As a result, even though I had configured rate limits on various routes, clients were still able to send excessive requests because the server couldn’t accurately identify their real IP addresses.

### ✅ Solution

I resolved the issue by using `app.set('trust proxy', true)` in the Express.js application. This allowed Express to trust the `X-Forwarded-For` header and accurately extract the client’s real IP address from it. As a result, the rate-limiting middleware functioned properly and enforced request limits based on the actual client IPs.
