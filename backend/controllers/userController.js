import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import fs from "fs"
import validator from "validator"

import cloudinary from "../utils/cloudinary.js"

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: "User does not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" })
    }
    const token = createToken(user._id)

    res.json({ success: true, token, message: "Logged in successfully" })
  } catch (error) {
    res.json({ success: false, message: "error" })
  }
}
const adminLoginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: "User does not exist" })
    }

    if (!user.isAdmin) {
      return res.json({
        success: false,
        message: "To login user must be an administrator!",
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" })
    }
    const token = createToken(user._id)
    res.json({ success: true, token, message: "Logged in successfully!" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "error" })
  }
}

const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const exists = await userModel.findOne({ email })
    if (exists) {
      return res.json({
        success: false,
        message: "User already exist with this email, please login",
      })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" })
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 chracter",
      })
    }

    // Password hashed
    const salt = await bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hashSync(password, salt)

    // Cloudinary user image upload
    const imageUploadCloudinary = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "users",
        use_filename: true,
        qnique_filename: true,
        resource_type: "image",
      }
    )

    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting local file:", err)
    })

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      image: imageUploadCloudinary.secure_url,
      imgPublicId: imageUploadCloudinary.public_id,
    })

    const user = await newUser.save()
    const token = createToken(user._id)

    res.json({
      success: true,
      token,
      message: "Registration successful. You are now logged in.",
    })
  } catch (error) {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting local file:", err)
      })
    }
    res.json({ success: false, message: error.message })
  }
}

const handleGetUserBasic = async (req, res) => {
  try {
    const userId = req.body.userId
    const user = await userModel.findById(userId).select("name image")

    if (!user) {
      return res.status(404).json({ error: "User not found!" })
    }

    return res.status(200).json({ data: user })
  } catch (err) {
    return res.status(500).json({ error: "Server error" })
  }
}
const handleGetUser = async (req, res) => {
  try {
    const userId = req.body.userId
    const user = await userModel.findById(userId).select("-password")

    if (!user) {
      return res.status(404).json({ error: "User not found!" })
    }

    return res.status(200).json({ success: true, data: user })
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server error" })
  }
}
const handleGetUsersList = async (req, res) => {
  try {
    const users = await userModel.find().select("-password")

    if (users.length === 0) {
      return res.status(404).json({ error: "No users found!" })
    }

    return res.status(200).json({ success: true, data: users })
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch users" })
  }
}

export {
  loginUser,
  registerUser,
  adminLoginUser,
  handleGetUserBasic,
  handleGetUser,
  handleGetUsersList,
}
