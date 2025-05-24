# 🌶️ SpicyMeal

**SpicyMeal** SpicyMeal is a full-stack restaurant food delivery application that offers a seamless food ordering experience for customers, including features like food search, organized categories, cart management, table booking, and order tracking. The admin panel provides comprehensive tools to manage food items, user profiles, orders, and customer messages, ensuring efficient restaurant operations and customer service.

---

[Visit SpicyMeal Live](https://spicymeal.vercel.app/)


---

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

### 🧾 Authentication System

- User registration
- Login system
- Logout system

---

### 🔧 Backend

- Provide food data via REST API  
- Handle cart, orders, and store them in database  
- Process and store table booking requests  
- Store contact messages from users  
- Authenticate users with JWT  
- Hash and verify passwords securely  
- Support admin actions: manage messages, food items, orders, and users  

---

### 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT
- **State Management**: React State / Context API

---

### 🧠 Challenges Faced

### Stale Cart Data After Food Deletion (Data Inconsistency Issue)

Initially, I designed the cart system to rely on the food items fetched during the initial API call. Each user's cart was stored in the database as an object (cartData) using food IDs as keys. The issue arose when an admin deleted a food item that a user had previously added to their cart. Since the cartData still contained the deleted food's ID, the frontend would throw an error when attempting to render the cart—because the item no longer existed in the newly fetched food list.

#### ✅ Solution

To resolve this, I separated the cart rendering process from the initial food fetch logic. Instead, I created a dedicated backend API that directly retrieves and validates the user's cart data. Fetched the user's cartData. Checked if each food ID in cartData still existed in the current food collection in the database. Removed any invalid or deleted food IDs from the cart. Sent back only the valid cart data in the response. This ensured that users would never encounter errors due to deleted food items in their cart, and the app could handle such cases gracefully.
