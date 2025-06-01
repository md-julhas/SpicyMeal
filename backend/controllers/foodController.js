import fs from "fs"
import foodModel from "../models/foodModel.js"
import cloudinary from "../utils/cloudinary.js"

const handleUploadFood = async (req, res) => {
  if (!req.file) {
    return res.json({ message: "Image file is required" })
  }

  try {
    const imageUploadCloudinary = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "foods",
        use_filename: true,
        unique_filename: true,
        resource_type: "image",
      }
    )

    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting local file:", err)
    })

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: imageUploadCloudinary.secure_url,
      imgPublicId: imageUploadCloudinary.public_id,
      category: req.body.category,
    })

    await food.save()
    res.json({ success: true, message: "Food added successfully", food })
  } catch (error) {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting local file:", err)
      })
    }
    res.json({ success: false, message: error.message })
  }
}

const handleGetFoodList = async (req, res) => {
  try {
    const { search } = req.query

    let filter = {}
    if (search) {
      const searchWords = search.split(" ").filter(Boolean)

      filter = {
        $or: [
          { name: { $regex: searchWords.join(".*"), $options: "i" } },
          { description: { $regex: searchWords.join(".*"), $options: "i" } },
          { category: { $regex: searchWords.join(".*"), $options: "i" } },
        ],
      }

      if (!isNaN(search)) {
        filter.$or.push({ price: Number(search) })
      }
    }

    const foods = await foodModel.find(filter)
    res.json({ success: true, data: foods })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error fetching food list" })
  }
}

const handleRemoveFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id)
    if (!food)
      return res
        .status(404)
        .json({ success: false, message: "Food not found!" })

    await cloudinary.uploader.destroy(food.imgPublicId)
    await food.deleteOne()

    res.json({ success: true, message: "Food removed successfully!" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error to remove food!" })
  }
}

export { handleUploadFood, handleGetFoodList, handleRemoveFood }
