import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://julhas120:julhasxmz.5323.49@cluster0.a1ywe.mongodb.net/restaurant"
    )
    console.log("Connection to DB is successfully established")
  } catch (error) {
    console.log("Error connecting to DB:", error.toString())
  }
}
