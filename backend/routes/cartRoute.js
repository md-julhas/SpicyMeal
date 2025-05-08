import express from "express"

import authMiddleware from "../middleware/auth.js"

import {
  addToCart,
  removeFromCart,
  getTotalCartAmmount,
} from "../controllers/cartController.js"
const cartRouter = express.Router()

cartRouter.post("/add", authMiddleware, addToCart)
cartRouter.post("/remove", authMiddleware, removeFromCart)
cartRouter.get("/get", authMiddleware, getTotalCartAmmount)

export default cartRouter
