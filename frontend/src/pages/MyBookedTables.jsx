import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import { CiLogin } from "react-icons/ci"
import moment from "moment"
import { Helmet } from "react-helmet"
import { toast } from "react-toastify"

import { StoreContext } from "../context/StoreContext"
const MyBookedTables = () => {
  const { token, url } = useContext(StoreContext)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }

    const fetchBookings = async () => {
      setLoading(true)

      try {
        const response = await axios.get(
          `${url}/api/book-table/user-bookings`,
          {
            headers: { token },
          }
        )

        if (response.data.success) {
          setBookings(response.data.data)
        }
      } catch (err) {
        toast.info("Failed to fetch bookings!")
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [token])

  return (
    <div
      className="section-container bg-gray-100"
      style={{ minHeight: "calc(100vh - 550px)" }}
    >
      <div className="inner-container py-10">
        <Helmet>
          <title>My Booked Tables | SpicyMeal</title>
          <meta
            name="description"
            content="View and manage your booked tables at SpicyMeal. Check your reservation details, modify bookings, and enjoy a seamless dining experience."
          />
          <meta
            name="keywords"
            content="SpicyMeal, booked tables, table reservations, restaurant booking, dining experience, reservation details, manage bookings, spicy food"
          />
        </Helmet>

        {!token ? (
          <div className="h-full flex flex-col items-center justify-center gap-5">
            <CiLogin className="text-7xl text-gray-400" />
            <h2 className="text-xl font-bold text-gray-500">
              Please log in to view your orders!
            </h2>
          </div>
        ) : loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-t-themeColor rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="h-full">
            {bookings.length === 0 ? (
              <p className="h-full flex items-center justify-center text-xl font-bold text-gray-500">
                No booking found!
              </p>
            ) : (
              <div>
                <div className="flex flex-col items-center justify-center gap-2 pb-10">
                  <h2 className="font-bold text-3xl">
                    My Booked Tables Summary
                  </h2>
                  <div className="text-gray-400">
                    Total Booked: {bookings.length}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="p-5 rounded-sm text-sm bg-white shadow-custom text-gray-500 space-y-1.5"
                    >
                      <div className="capitalize">
                        <b>Guest Name:</b> {booking.customerName}
                      </div>
                      <div>
                        <b>Phone:</b> {booking.phoneNumber}
                      </div>
                      {booking.email && (
                        <div>
                          <b>Email:</b> {booking.email}
                        </div>
                      )}
                      <div>
                        <b>Booking ID:</b> {booking._id}
                      </div>
                      <div>
                        <b>Guests:</b> {booking.numberOfGuests}
                      </div>
                      <div>
                        <b>Schedule Date:</b>{" "}
                        {moment(booking.date).format("MMMM D, YYYY")} at{" "}
                        {moment(booking.time, "HH:mm").format("h:mm A")}
                      </div>
                      <div className="capitalize">
                        <b>Status: </b>{" "}
                        <span
                          className={`${
                            booking.status === "pending"
                              ? "text-yellow-500"
                              : booking.status === "confirmed"
                              ? "text-green-500"
                              : booking.status === "canceled"
                              ? "text-red-500"
                              : booking.status === "completed"
                              ? "text-blue-500"
                              : "text-gray-500"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div>
                        <b>Special Requests & Notes:</b>
                        <p className="text-gray-400 mt-1">
                          {booking.specialRequests ||
                            "No Special Requests or Notes"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBookedTables
