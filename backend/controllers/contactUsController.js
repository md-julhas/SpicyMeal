import ContactUsModel from "../models/contactUsModel.js"

const handleCreateMessage = async (req, res) => {
  try {
    const { name, email, phone, messageType, message } = req.body

    const newContactUs = new ContactUsModel({
      name,
      email,
      phone,
      messageType,
      message,
    })
    await newContactUs.save()

    res.status(201).json({
      message: "Contact Us entry created successfully",
      contactUs: newContactUs,
    })
  } catch (error) {
    console.error("Error creating Contact Us entry:", error)
    res.status(500).json({
      message: "An error occurred while creating the Contact Us entry",
      error: error.message,
    })
  }
}
const handleGetMessage = async (req, res) => {
  try {
    const messages = await ContactUsModel.find().sort({ createdAt: -1 }) // Show newest first
    res.json({
      success: true,
      message: "Inbox messages fetched successfully",
      data: messages,
    })
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to fetch inbox messages",
      error: error.message,
    })
  }
}
const handleMarkReadMessage = async (req, res) => {
  const { messageID } = req.params

  try {
    const updatedMessage = await ContactUsModel.findByIdAndUpdate(
      messageID,
      { read: true },
      { new: true }
    )

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Inbox message not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: updatedMessage,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update message",
      error: error.message,
    })
  }
}

const handleGetUnreadMessage = async (req, res) => {
  try {
    const unreadCount = await ContactUsModel.countDocuments({ read: false })
    res.json({ success: true, data: unreadCount })
  } catch (error) {
    res.json({
      success: false,
      message: "Error fetching unread message status",
    })
  }
}

const handleDeleteMessage = async (req, res) => {
  const messageID = req.params.messageID

  try {
    const deletedMessage = await ContactUsModel.findByIdAndDelete(messageID)

    if (!deletedMessage) {
      return res.send({
        success: false,
        message: "Message not found",
      })
    }

    res.send({
      success: true,
      message: "Message deleted successfully!",
      data: deletedMessage,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to delete message",
      error: error.message,
    })
  }
}

export {
  handleCreateMessage,
  handleGetMessage,
  handleMarkReadMessage,
  handleGetUnreadMessage,
  handleDeleteMessage,
}
