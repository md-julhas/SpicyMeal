import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connection to DB is successfully established")
  } catch (error) {
    console.error("Error connecting to DB:", error.message)
  }
}
