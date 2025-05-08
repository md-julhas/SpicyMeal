import mongoose from "mongoose"

const bookTableSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    customerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    numberOfGuests: { type: Number, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    specialRequests: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled", "completed"],
      default: "pending",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const bookTableModel =
  mongoose.models.bookTable || mongoose.model("tableOrder", bookTableSchema)

export default bookTableModel
