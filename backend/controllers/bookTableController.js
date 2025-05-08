import bookTableModel from "../models/bookTableModel.js"

const handleCreateBooking = async (req, res) => {
  try {
    const {
      userId,
      customerName,
      phoneNumber,
      email,
      numberOfGuests,
      date,
      time,
      specialRequests,
    } = req.body

    // Validate required fields
    if (!customerName || !phoneNumber || !numberOfGuests || !date || !time) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    // Create new booking
    const newBooking = new bookTableModel({
      userId,
      customerName,
      phoneNumber,
      email,
      numberOfGuests,
      date,
      time,
      specialRequests,
    })

    await newBooking.save()

    return res
      .status(201)
      .json({ message: "Table booked successfully", data: newBooking })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message })
  }
}

const handleGetUserBookings = async (req, res) => {
  try {
    const bookings = await bookTableModel.find({
      userId: req.body.userId,
    })

    return res.json({ success: true, data: bookings })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message })
  }
}
const handdelGetBookings = async (req, res) => {
  try {
    const bookings = await bookTableModel.find().sort({ createdAt: -1 })

    return res.json({ success: true, data: bookings })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message })
  }
}

const handleGetUnreadBookings = async (req, res) => {
  try {
    const unreadCount = await bookTableModel.countDocuments({ read: false })
    res.json({ success: true, data: unreadCount })
  } catch (error) {
    res.json({
      success: false,
      message: "Error fetching unread table order status",
    })
  }
}

const handleMarkReadBooking = async (req, res) => {
  const { bookingID } = req.params

  try {
    const updatedBooking = await bookTableModel.findByIdAndUpdate(
      bookingID,
      { read: true },
      { new: true }
    )

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Booking marked as read",
      data: updatedBooking,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update booking",
      error: error.message,
    })
  }
}

const handleUpdateBookingStatus = async (req, res) => {
  const { id, status } = req.body

  try {
    await bookTableModel.findByIdAndUpdate(id, { status })
    res.json({
      success: true,
      message: "Booking status updated successfully",
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error updating booking status" })
  }
}

const handleDeleteBooking = async (req, res) => {
  const { bookingID } = req.params

  try {
    const deletedBooking = await bookTableModel.findByIdAndDelete(bookingID)

    if (!deletedBooking) {
      return res.send({
        success: false,
        message: "Booking not found",
      })
    }

    res.send({
      success: true,
      message: "Booking deleted successfully!",
      data: deletedBooking,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to delete booking",
      error: error.message,
    })
  }
}

export {
  handleCreateBooking,
  handleGetUserBookings,
  handdelGetBookings,
  handleGetUnreadBookings,
  handleMarkReadBooking,
  handleUpdateBookingStatus,
  handleDeleteBooking,
}
