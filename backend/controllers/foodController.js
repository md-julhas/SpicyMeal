import fs from "fs"
import foodModel from "../models/foodModel.js"

// add food item
const handleUploadFood = async (req, res) => {
  if (!req.file) {
    return res.json({ message: "Image file is required" })
  }
  let image_filename = `${req.file.filename}`

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  })
  try {
    await food.save()
    res.json({ success: true, message: "Food added successfully" })
  } catch (error) {
    // Delete the uploaded image if something goes wrong
    fs.unlink(`uploads/${image_filename}`, (err) => {
      if (err) console.error("Error deleting file:", err)
    })

    console.log(error)
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
    const food = await foodModel.findByIdAndDelete({ _id: req.params.id })
    if (!food)
      return res
        .status(404)
        .json({ success: false, message: "Food not found!" })

    fs.unlinkSync(`uploads/${food.image}`)
    res.json({ success: true, message: "Food removed successfully!" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error to remove food!" })
  }
}

export { handleUploadFood, handleGetFoodList, handleRemoveFood }
