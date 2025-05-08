import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    })

    await newOrder.save()
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

    // Stripe payment here

    res.json({
      success: true,
      message: "Order created successfully",
    })
  } catch (error) {}
}

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body
  try {
    if (success == "true") {
      const paidOrder = await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      })
      res.json({
        success: true,
        data: paidOrder.payment,
        message: "Payment successful",
      })
    } else {
      await orderModel.findByIdAndUpdate(orderId, { payment: false })
      res.json({ success: false, message: "Pot paid" })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error verifying order" })
  }
}

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId })
    res.json({ success: true, data: orders })
  } catch (error) {
    res.json({ success: false, message: "Error getting user orders" })
  }
}

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 })
    res.json({ success: true, data: orders })
  } catch (error) {
    res.json({ success: false, message: "Error getting all orders" })
  }
}
const handleGetUnreadOrders = async (req, res) => {
  try {
    const unreadCount = await orderModel.countDocuments({ read: false })
    res.json({ success: true, data: unreadCount })
  } catch (error) {
    res.json({
      success: false,
      message: "Error fetching unread order status",
    })
  }
}
const handleMarkRead = async (req, res) => {
  const { orderID } = req.params

  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderID,
      { read: true },
      { new: true }
    )

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order message not found",
      })
    }

    res.json({
      success: true,
      message: "Order marked as read",
      data: updatedOrder,
    })
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    })
  }
}

const updateOrderStatus = async (req, res) => {
  const { id, status } = req.body

  try {
    await orderModel.findByIdAndUpdate(id, { status })
    res.json({
      success: true,
      message: "Order status updated successfully",
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error updating order status" })
  }
}
const handleDeleteOrder = async (req, res) => {
  const { orderID } = req.params

  try {
    await orderModel.findByIdAndDelete(orderID)
    res.json({
      success: true,
      message: "Order deleted sccessfully!",
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error delete order" })
  }
}

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  handleGetUnreadOrders,
  handleMarkRead,
  updateOrderStatus,
  handleDeleteOrder,
}
