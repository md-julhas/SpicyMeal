# 🌶️ SpicyMeal

**SpicyMeal** is a full-stack restaurant web application that allows customers to explore food items, place orders, book tables, and contact the restaurant. It also includes an admin backend for managing food items, orders, table books, messages, and users.

[Visit SpicyMeal Live](https://your-live-site-link.com)

[Watch Demo on YouTube](https://your-video-link.com)

## 🚀 Features

### 🧾 Frontend (User Side)

- **Display Food Items**  
  View a list of food items categorized by food types.

- **Food Ordering System**

  - Add items to cart.
  - View cart items.
  - Fill up delivery information form.
  - Confirm and place orders.

- **Table Booking System**  
  Book tables through a simple reservation form.

- **Contact Us System**  
  Send messages to the restaurant via a contact form.

- **Food Search System**

  - Search food by name.
  - Highlight matched search text.

- **Organized Food Categories**  
  Food is grouped by type for easier browsing.

- **Authentication System**
  - User registration
  - Login system
  - Logout system


### 🔧 Backend (Admin Side)

- **Manage Messages**

  - View messages submitted by users.
  - Delete messages.

- **Manage Food List**

  - Upload new food items.
  - View all uploaded foods.
  - Delete food items.

- **Manage Orders**

  - View food orders and table bookings.
  - Delete orders.
  - Change order status (e.g., pending, confirmed, completed).

- **Manage Users**
  - View list of registered users.
  - View detailed information of individual users.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT
- **State Management**: React State / Context API


## 🧠 Challenges Faced

### Stale Cart Data After Food Deletion (Data Inconsistency Issue)

Initially, I designed the cart system to rely on the food items fetched during the initial API call. Each user's cart was stored in the database as an object (cartData) using food IDs as keys. The issue arose when an admin deleted a food item that a user had previously added to their cart. Since the cartData still contained the deleted food's ID, the frontend would throw an error when attempting to render the cart—because the item no longer existed in the newly fetched food list.

#### ✅ Solution

To resolve this, I separated the cart rendering process from the initial food fetch logic. Instead, I created a dedicated backend API that directly retrieves and validates the user's cart data.

- Fetched the user's `cartData`.
- Checked if each food ID in `cartData` still existed in the current food collection in the database.
- Removed any invalid or deleted food IDs from the cart.
- Sent back only the valid cart data in the response.

This ensured that users would never encounter errors due to deleted food items in their cart, and the app could handle such cases gracefully.
