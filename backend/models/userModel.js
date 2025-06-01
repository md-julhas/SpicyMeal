import mongoose from "mongoose"

const userShcema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cartData: {
      type: Object,
      default: {},
    },
    imgPublicId: { type: String },
  },
  { minimize: false, timestamps: true }
)

const userModel = mongoose.models.user || mongoose.model("user", userShcema)
export default userModel
