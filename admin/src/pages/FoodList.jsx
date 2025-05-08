import axios from "axios"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { RiDeleteBinLine } from "react-icons/ri"
import moment from "moment"

import { useStateContext } from "../contexts/ContextProvider"
import { Helmet } from "react-helmet"

const FoodList = () => {
  const { url } = useStateContext()
  const [foodList, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/food-list`)
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.info(response.data.message)
      }
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Too many requests. Please try again after 5 minutes!")
      } else {
        toast.error("Feild to fetch food list!")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const removeFood = async (foodId) => {
    const response = await axios.delete(`${url}/api/food/remove/${foodId}`)

    if (response.data.success) {
      toast.success(response.data.message)
      await fetchList()
    } else {
      toast.error(response.data.message)
    }
  }

  return (
    <div
      className="bg-white rounded-md p-5 m-5 flex items-center justify-center overflow-hidden text-sm"
      style={{ height: "calc(100vh - 130px)" }}
    >
      {/* Set browser tab title for admin UX  */}
      <Helmet>
        <title>Food List | Admin SpicyMeal</title>
      </Helmet>

      {/* Admin content goes here */}
      {loading ? (
        <div className="w-10 h-10 border-4 border-t-themeColor rounded-full animate-spin"></div>
      ) : foodList.length === 0 ? (
        <p className="font-bold text-2xl text-gray-500">No food available!</p>
      ) : (
        <div
          className="overflow-auto w-full scroll-container"
          style={{
            height: "calc(100vh - 140px)",
          }}
        >
          <div className="min-w-[1000px]">
            <div className="grid grid-cols-7 py-3 border-b items-center text-gray-600 sticky top-0 w-full bg-white">
              <b>Image</b>
              <b>Uploaded</b>
              <b className="col-span-2">Name</b>
              <b>Category</b>
              <b>Price</b>
              <b className="text-end">Action</b>
            </div>
            {foodList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-7 border-b border-dashed py-2 items-center gap-5 hover:bg-gray-100"
                >
                  <img
                    src={`${url}/images/` + item.image}
                    alt=""
                    className="h-10 w-10 rounded-sm"
                  />
                  <p className="text-gray-400 first-letter:uppercase">
                    {moment(item.createdAt).fromNow()}
                  </p>
                  <p className="first-letter:uppercase col-span-2 line-clamp-2">
                    {item.name}
                  </p>
                  <p className="capitalize text-gray-400">{item.category}</p>
                  <p className="font-bold">${item.price}.00</p>

                  <button
                    onClick={() => removeFood(item._id)}
                    className="ml-auto h-fit p-2 transition-colors duration-300 bg-themeColor text-themeColor rounded-sm bg-opacity-20 hover:bg-themeColor hover:text-gray-200 text-sm"
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default FoodList
