import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import moment from "moment"
import { RiDeleteBinLine } from "react-icons/ri"
import { AnimatePresence, motion } from "framer-motion"
import { IoCloseOutline } from "react-icons/io5"
import { Helmet } from "react-helmet"

import { useStateContext } from "../contexts/ContextProvider"
import useClickOutside from "../hooks/useClickOutSide"
const TableOrders = () => {
  const { url, token, fetchUnreadTableOrders } = useStateContext()
  const modelRef = useRef(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [status, setStatus] = useState("")
  const [deletingId, setDeletingId] = useState(null)

  useClickOutside(modelRef, selectedBooking, setSelectedBooking)

  const fetchTableOrders = async () => {
    try {
      const response = await axios.get(url + "/api/book-table/bookings", {
        headers: { token },
      })
      if (response.data.success) {
        setBookings(response.data.data)
      } else {
        toast.info(response.data.message)
      }
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Too many requests. Please try again after 5 minutes!")
      } else {
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = async (e, id) => {
    const newStatus = e.target.value
    try {
      const response = await axios.put(
        `${url}/api/book-table/update-status`,
        { id, status: newStatus },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message)
        fetchTableOrders()
        setStatus(newStatus)
      }
    } catch (error) {
      toast.error("Failed to update status.")
      console.error(error)
    }
  }

  const handleOpenBooking = async (booking) => {
    setSelectedBooking(booking)

    if (!booking.read) {
      try {
        const response = await axios.put(
          `${url}/api/book-table/mark-read/${booking._id}`,
          {},
          { headers: { token } }
        )
        if (response.data.success) {
          fetchTableOrders(), fetchUnreadTableOrders()
        }
      } catch (error) {
        toast.error("Failed to mark as read!")
      }
    }
  }

  useEffect(() => {
    fetchTableOrders()
  }, [])

  const handleDeleteBooking = async (bookingID) => {
    setDeletingId(bookingID)
    try {
      const response = await axios.delete(
        `${url}/api/book-table/remove/${bookingID}`,
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message)
        fetchTableOrders()
      }
    } catch (error) {
      toast.error("Failed to delete order!")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div
      className="bg-white rounded-md p-5 m-5 flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 130px)" }}
    >
      {/* Set browser tab title for admin UX  */}
      <Helmet>
        <title>Table Orders | Admin SpicyMeal</title>
      </Helmet>

      {/* Admin content goes here */}
      {loading ? (
        <div className="w-10 h-10 border-4 border-t-themeColor rounded-full animate-spin mx-auto mt-10"></div>
      ) : bookings.length === 0 ? (
        <p className="font-bold text-2xl text-gray-500 text-center">
          No table orders available!
        </p>
      ) : (
        <div className="w-full mb-auto">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className={`text-sm hover:bg-gray-100 border-b px-1 flex items-center w-full justify-between ${
                booking.read ? "" : "font-bold bg-green-50 hover:bg-green-100"
              }`}
            >
              <div
                className="py-2 cursor-pointer w-full"
                onClick={() => handleOpenBooking(booking)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                  <b className="capitalize">{booking.customerName}</b>
                  <div className="text-xs text-gray-400">
                    <b>Phone:</b>
                    {booking.phoneNumber}
                  </div>
                </div>
                <div className="mt-2 text-gray-500">
                  <b>Number of Guests: </b> {booking.numberOfGuests} People
                  <div>
                    <b>Schedule Date: </b>
                    <span>
                      {moment(booking.time, "HH:mm").format("hh:mm A")} at{" "}
                      {moment(booking.date).format("D MMMM YYYY")}
                    </span>
                  </div>
                </div>
                <div className="text-gray-400 text-xs mt-1 flex flex-col md:flex-row md:gap-2">
                  <div>
                    <b>Booking Status: </b>
                    <span
                      className={`capitalize px-2 rounded-md ${
                        booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : booking.status === "confirmed"
                          ? "bg-green-200 text-green-600"
                          : booking.status === "canceled"
                          ? "bg-rose-200 text-rose-600"
                          : booking.status === "completed"
                          ? "bg-lime-200 text-lime-600"
                          : ""
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <span className="first-letter:uppercase">
                    {moment(booking.createdAt).fromNow()}
                  </span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleDeleteBooking(booking._id)}
                  className="flex items-end p-2 transition-colors duration-300 bg-themeColor text-themeColor rounded-sm bg-opacity-20 hover:bg-themeColor hover:text-gray-200 text-sm"
                >
                  {deletingId === booking._id ? (
                    <div className="w-3 h-3 border-2 border-t-themeColor rounded-full animate-spin"></div>
                  ) : (
                    <RiDeleteBinLine />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <>
            <motion.div
              className="fixed inset-0 bg-gray-900/65 backdrop-blur-sm z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div
                ref={modelRef}
                className="bg-gray-100 text-sm md:text-base rounded-md p-5 mx-5 w-full max-w-xl min-h-96"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-xl">Booking Table Details</h2>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="hover:text-themeColor"
                  >
                    <IoCloseOutline className="text-xl" />
                  </button>
                </div>

                {/* Sender details */}
                <div className="bg-white p-5 mt-5 rounded-md space-y-1">
                  <div className="capitalize">
                    <b className="font-bold">Customer Name: </b>
                    {selectedBooking.customerName}
                  </div>
                  <div>
                    <b>Phone: </b> {selectedBooking.phoneNumber}
                  </div>

                  <div>
                    <b>Email: </b> {selectedBooking.email || "No email"}
                  </div>
                  <div>
                    <b>Date: </b>
                    {moment(selectedBooking.createdAt).format(
                      "MMMM D, YYYY [at] h:mmA"
                    )}
                  </div>
                  <div>
                    <b>Schedule Date: </b>
                    <span>
                      {moment(selectedBooking.time, "HH:mm").format("hh:mm A")}{" "}
                      at {moment(selectedBooking.date).format("D MMMM YYYY")}
                    </span>
                  </div>

                  {/* Booking status */}
                  <div className="mt-2">
                    <b>Booking Status: </b>
                    <select
                      value={status}
                      onChange={(e) => {
                        handleChange(e, selectedBooking._id)
                      }}
                      className="bg-gray-200 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="canceled">Canceled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                {/* Special requrests  */}
                <div className="bg-white rounded-md mt-5 p-5">
                  <h4 className="font-bold mb-1">Sepecial Requests:</h4>
                  {selectedBooking.specialRequests || "No Special Requests"}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TableOrders
