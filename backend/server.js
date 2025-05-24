import express from "express"
import cors from "cors"
import "dotenv/config"
import rateLimit from "express-rate-limit"

import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import bookTableRoute from "./routes/bookTableRoute.js"
import contactUsRoute from "./routes/contactUsRoute.js"

// App config
const app = express()
const port = process.env.PORT || 5000

app.set("trust proxy", 1)

// Configure rate limiting
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  message: "Too many requests, please try again in 5 minutes later",
})

// Middleware
app.use(cors())
app.use(rateLimiter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("API is working properly!")
})

// Routes
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/user-images", express.static("uploads/user"))
app.use("/api/users/", userRouter)
app.use("/api/cart/", cartRouter)
app.use("/api/order/", orderRouter)
app.use("/api/book-table/", bookTableRoute)
app.use("/api/contact-us/", contactUsRoute)

// Client error handling (404 not found)
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" })
})

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  })
})

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`)
  await connectDB()
})
