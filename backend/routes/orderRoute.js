import express from "express"
import authMiddleware from "../middleware/auth.js"
import {
  handleDeleteOrder,
  handleGetUnreadOrders,
  handleMarkRead,
  listOrders,
  placeOrder,
  updateOrderStatus,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js"

const orderRouter = express.Router()

// user
orderRouter.post("/place", authMiddleware, placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.get("/user-orders", authMiddleware, userOrders)

// admin
orderRouter.get("/order-list", listOrders)
orderRouter.get("/unread-orders", handleGetUnreadOrders)
orderRouter.put("/mark-read/:orderID", authMiddleware, handleMarkRead)
orderRouter.put("/update-status", authMiddleware, updateOrderStatus)
orderRouter.delete("/delete/:orderID", authMiddleware, handleDeleteOrder)

export default orderRouter
