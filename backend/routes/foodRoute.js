import express from "express"
import upload from "../utils/upload.js"

import {
  handleUploadFood,
  handleGetFoodList,
  handleRemoveFood,
} from "../controllers/foodController.js"

const foodRouter = express.Router()

foodRouter.post("/upload", upload.single("image"), handleUploadFood)
foodRouter.get("/food-list", handleGetFoodList)
foodRouter.delete("/remove/:id", handleRemoveFood)

export default foodRouter
