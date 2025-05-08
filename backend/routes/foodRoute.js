import express from "express"
import multer from "multer"
import {
  handleUploadFood,
  handleGetFoodList,
  handleRemoveFood,
} from "../controllers/foodController.js"

const foodRouter = express.Router()

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage: storage })

foodRouter.post("/upload", upload.single("image"), handleUploadFood, upload.single("image"))
foodRouter.get("/food-list", handleGetFoodList)
foodRouter.delete("/remove/:id", handleRemoveFood)

export default foodRouter
