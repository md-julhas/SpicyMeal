import React, { useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Helmet } from "react-helmet"

import { StoreContext } from "../context/StoreContext"

const PlaceOrder = () => {
  const navigate = useNavigate()
  const inputStyles =
    "outline-none p-3 mb-3 border rounded-sm focus:border-themeColor w-full"
  const {
    getTotalCartAmount,
    token,
    cartItems,
    cartFoodItems,
    url,
    setCartItems,
    setCartFoodItems,
  } = useContext(StoreContext)

  const [data, setData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  })

  const onChangeHanlder = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let orderItems = []

    cartFoodItems.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })

    // Prepare order data
    let orderData = {
      items: orderItems,
      address: data,
      amount: getTotalCartAmount(),
    }

    if (!orderData.amount || orderData.amount <= 2) {
      toast.error("Invalid order amount. Please check your cart.")
      return
    }

    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    })

    if (response.data.success) {
      navigate("/my-orders")
      setCartItems({})
      setCartFoodItems([])
      toast.success("Order placed successfully")
    } else {
      toast.error("Failed to place order")
    }
  }

  return (
    <div className="section-container">
      <div className="inner-container">
        <Helmet>
          <title>Place My Order | SpicyMeal</title>
          <meta
            name="description"
            content="Order your favorite spicy dishes from SpicyMeal with ease. Choose from a variety of flavorful meals and enjoy fast, reliable delivery straight to your door."
          />
          <meta
            name="keywords"
            content="SpicyMeal, place order, food delivery, spicy food, order meals, food app, quick delivery, online order, restaurant app"
          />
        </Helmet>

        <form
          className="grid grid-cols-1 xl:grid-cols-2 gap-10 py-10"
          onSubmit={handleSubmit}
        >
          {/* Delivery information */}
          <div>
            <h2 className="font-semibold text-2xl text-gray-700 mb-5">
              Delivery Information
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter the name of the recipient"
                name="name"
                value={data.name}
                onChange={onChangeHanlder}
                className={inputStyles}
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={onChangeHanlder}
                placeholder="Email address"
                className={`${inputStyles}`}
                required
              />
              <input
                type="text"
                name="street"
                value={data.street}
                onChange={onChangeHanlder}
                placeholder="Street"
                className={`${inputStyles}`}
                required
              />
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                name="city"
                value={data.city}
                onChange={onChangeHanlder}
                placeholder="City"
                className={inputStyles}
                required
              />
              <input
                type="text"
                name="state"
                value={data.state}
                onChange={onChangeHanlder}
                placeholder="State"
                className={inputStyles}
                required
              />
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                name="zipCode"
                value={data.zipCode}
                onChange={onChangeHanlder}
                placeholder="Zip code"
                className={inputStyles}
                required
              />
              <input
                type="text"
                name="country"
                value={data.country}
                onChange={onChangeHanlder}
                placeholder="Country"
                className={inputStyles}
                required
              />
            </div>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={onChangeHanlder}
              placeholder="Phone"
              className={`${inputStyles}`}
              required
            />
          </div>

          {/* Order Summary */}
          <div className="text-gray-500">
            <h2 className="font-semibold text-2xl text-gray-700">
              Order Summary
            </h2>

            {/* Subtotal */}
            <div className="flex justify-between border-b py-4">
              <p>Subtotal</p>
              <p className="font-medium text-gray-900">
                ${getTotalCartAmount()}
              </p>
            </div>

            {/* Delivery Fee */}
            <div className="flex justify-between border-b py-4">
              <p>Delivery Fee</p>
              <p className="font-medium">
                ${getTotalCartAmount() === 0 ? 0 : 2}
              </p>
            </div>

            {/* Total */}
            <div className="flex justify-between py-4 font-semibold text-xl">
              <p>Total</p>
              <p>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </p>
            </div>

            {/* Payment Info */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-5 rounded-sm">
              <p className="text-sm">
                Online payments are currently unavailable. Please use Cash on
                Delivery (COD) for your order.
              </p>
            </div>

            {/* Confirm Order Button */}
            <button
              type="submit"
              className="w-full py-3 px-5 mt-5 rounded-sm bg-themeColor text-gray-200"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlaceOrder
