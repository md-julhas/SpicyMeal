import mongoose from "mongoose"

const contactUsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    messageType: {
      type: String,
      enum: ["inquiry", "complaint", "feedback", "catering", "other"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const ContactUsModel = mongoose.model("inbox", contactUsSchema)

export default ContactUsModel
