import express from "express"
import authMiddleware from "../middleware/auth.js"
import {
  handdelGetBookings,
  handleCreateBooking,
  handleDeleteBooking,
  handleGetUnreadBookings,
  handleGetUserBookings,
  handleMarkReadBooking,
  handleUpdateBookingStatus,
} from "../controllers/bookTableController.js"

const bookTableRoute = express.Router()

bookTableRoute.post("/create", authMiddleware, handleCreateBooking)
bookTableRoute.get("/user-bookings", authMiddleware, handleGetUserBookings)
bookTableRoute.get("/unread-bookings", authMiddleware, handleGetUnreadBookings)

// For admin panel
bookTableRoute.get("/bookings", authMiddleware, handdelGetBookings)
bookTableRoute.put(
  "/mark-read/:bookingID",
  authMiddleware,
  handleMarkReadBooking
)
bookTableRoute.put("/update-status", authMiddleware, handleUpdateBookingStatus)
bookTableRoute.delete("/remove/:bookingID", authMiddleware, handleDeleteBooking)

export default bookTableRoute
