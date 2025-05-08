import React, { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useRef } from "react"
import { Helmet } from "react-helmet"

import { useStateContext } from "../contexts/ContextProvider"

const UploadFood = () => {
  const { url } = useStateContext()
  const inputStyles =
    "outline-none p-3 w-full border rounded-sm focus:border-pink-500 w-2/5"

  const fileInputRef = useRef()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "burger",
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const onImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"]
      const maxSize = 500 * 1024 // 500KB in bytes

      if (!validTypes.includes(file.type)) {
        toast.error("Only JPG, JPEG, or PNG files are allowed.")
        return
      }

      if (file.size > maxSize) {
        toast.error("Image must be smaller than 500KB!")
        return
      }

      setImage(file)
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)

    try {
      const response = await axios.post(`${url}/api/food/upload`, formData)

      if (response.data.success) {
        toast.success(response.data.message)
        setData({
          name: "",
          description: "",
          price: "",
          category: "burger",
        })
        setImage(false)
        fileInputRef.current.value = null
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl md:m-5 p-5 rounded-md">
        {/* Set browser tab title for admin UX  */}
        <Helmet>
          <title>Upload Food | Admin SpicyMeal</title>
        </Helmet>

        {/* Admin content goes here */}
        <h1 className="font-bold text-3xl text-center py-2">
          Upload Food Item
        </h1>
        <p className="pb-5 text-center text-gray-400 text-s">
          Upload restaurant food items for showcase and online ordering.
          Streamline menu management and enhance customer experience.
        </p>

        <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
          <div className="flex flex-col gap-2">
            <b>Upload Food Image</b>
            <input
              ref={fileInputRef}
              type="file"
              name="image"
              onChange={onImageChange}
              className="outline-none focus:border-pink-500"
              required
            />
            <p className="text-gray-400 text-sm">
              Food picture uploads are limited to JPG, JPEG, or PNG formats,
              with a maximum file size of 500KB!
            </p>
            {image && (
              <div className="mt-3">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="w-40 h-40 object-cover rounded-sm"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <b>Food Name</b>
            <input
              type="text"
              name="name"
              value={data.name}
              placeholder="Enter name (e.g. Delicious salmon fish fries)"
              className={inputStyles}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <b>Food Description</b>
            <textarea
              name="description"
              value={data.description}
              rows={6}
              placeholder="Write description here..."
              onChange={onChangeHandler}
              className={inputStyles}
              required
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <b>Food Category</b>
            <select
              name="category"
              value={data.category}
              className={inputStyles}
              onChange={onChangeHandler}
            >
              <option value="burger">Burger</option>
              <option value="pizza">Pizza</option>
              <option value="fried chicken">Fried Chicken</option>
              <option value="sandwich">sandwich</option>
              <option value="grilled salmon">Grilled Salmon</option>
              <option value="fries">Fries</option>
              <option value="cheesecake">Cheesecake</option>
              <option value="ice cream">Ice Cream</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <b>Food Price</b>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="Type price...$"
              className={inputStyles}
              required
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 rounded-sm bg-themeColor text-gray-100 w-full"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Food"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UploadFood
