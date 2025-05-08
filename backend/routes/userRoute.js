import express from "express"

import {
  adminLoginUser,
  handleGetUser,
  handleGetUserBasic,
  handleGetUsersList,
  loginUser,
  registerUser,
} from "../controllers/userController.js"
import authMiddleware from "../middleware/auth.js"
import multer from "multer"
const userRouter = express.Router()

const storage = multer.diskStorage({
  destination: "uploads/user",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage: storage })

userRouter.post("/register", upload.single("image"), registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/user-basic", authMiddleware, handleGetUserBasic)
userRouter.get("/user", authMiddleware, handleGetUser)
userRouter.get("/user-list", authMiddleware, handleGetUsersList)
userRouter.post("/admin-login", adminLoginUser)

export default userRouter
