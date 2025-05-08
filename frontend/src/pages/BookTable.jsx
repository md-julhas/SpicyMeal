import React, { useState, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"

import { StoreContext } from "../context/StoreContext"

const BookTable = () => {
  const inputStyles =
    "outline-none p-3 mb-3 border rounded-sm focus:border-themeColor w-full"
  const { url, token } = useContext(StoreContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    email: "",
    numberOfGuests: "",
    date: "",
    time: "",
    specialRequests: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) {
      toast.info("You must be logged in to book a table.")
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(
        `${url}/api/book-table/create`,
        formData,
        { headers: { token } }
      )

      navigate("/my-booked-tables")
      toast.success(response.data.message)
      setFormData({
        customerName: "",
        phoneNumber: "",
        email: "",
        numberOfGuests: "",
        date: "",
        time: "",
        specialRequests: "",
      })
    } catch (error) {
      toast.error(error.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="shadow-custom p-10 rounded-md w-full max-w-xl my-10 bg-white">
        <Helmet>
          <title>Book a table | SpicyMeal</title>
          <meta
            name="description"
            content="Reserve your table at SpicyMeal and enjoy a flavorful dining experience with your favorite spicy dishes. Book now and skip the wait!"
          />
          <meta
            name="keywords"
            content="SpicyMeal, book table, restaurant reservation, dining experience, spicy food, reserve online, table booking, food reservation, spicy restaurant"
          />
        </Helmet>

        <h1 className="text-3xl font-bold text-center mb-2">
          Book a Reservation
        </h1>
        <p className="text-center mb-6 text-gray-400">
          Reserve your table in advance for a seamless dining experience with
          preferred seating and timely service!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <b>Name:</b>
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            required
            className={inputStyles}
          />

          <b>Phone Number:</b>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className={inputStyles}
          />

          <b>Email:</b>
          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            value={formData.email}
            onChange={handleChange}
            className={inputStyles}
          />

          <b>Number of Guests:</b>
          <input
            type="number"
            name="numberOfGuests"
            placeholder="Number of Guests"
            value={formData.numberOfGuests}
            onChange={handleChange}
            required
            className={inputStyles}
          />

          <b>Schedule Date:</b>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={inputStyles}
          />

          <b>Schedule Time: </b>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className={inputStyles}
          />

          <b>Special Request:</b>
          <textarea
            name="specialRequests"
            placeholder="Special Requests (optional)"
            rows={3}
            value={formData.specialRequests}
            onChange={handleChange}
            className={inputStyles}
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-themeColor text-gray-100 py-3 rounded-sm"
          >
            {loading ? "Booking..." : "Book Table"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookTable
