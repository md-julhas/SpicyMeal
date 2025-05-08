import express from "express"
import authMiddleware from "../middleware/auth.js"
import {
  handleCreateMessage,
  handleDeleteMessage,
  handleGetMessage,
  handleGetUnreadMessage,
  handleMarkReadMessage,
} from "../controllers/contactUsController.js"

const contactUsRoute = express.Router()

contactUsRoute.post("/create", handleCreateMessage)
contactUsRoute.get("/messages", authMiddleware, handleGetMessage)
contactUsRoute.put(
  "/mark-read/:messageID",
  authMiddleware,
  handleMarkReadMessage
)
contactUsRoute.get("/unread-message", authMiddleware, handleGetUnreadMessage)
contactUsRoute.delete(
  "/delete-message/:messageID",
  authMiddleware,
  handleDeleteMessage
)

export default contactUsRoute
