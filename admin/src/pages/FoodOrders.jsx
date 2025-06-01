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

const FoodOrders = () => {
  const { url, token, fetchUnreadOrders } = useStateContext()
  const modelRef = useRef(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [status, setStatus] = useState("")

  useClickOutside(modelRef, selectedOrder, setSelectedOrder)

  const fetchOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/order-list")
      if (response.data.success) {
        setOrders(response.data.data)
      } else {
        toast.info(response.data.message)
      }
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Too many requests. Please try again after 5 minutes!")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleOpenOrder = async (order) => {
    setSelectedOrder(order)
    setStatus(order.status)

    if (!order.read) {
      try {
        const response = await axios.put(
          `${url}/api/order/mark-read/${order._id}`,
          {},
          { headers: { token } }
        )
        if (response.data.success) {
          fetchOrders(), fetchUnreadOrders()
        }
      } catch (error) {
        toast.error("Failed to mark as read!")
      }
    }
  }

  const handleChange = async (e, id) => {
    const newStatus = e.target.value
    try {
      const response = await axios.put(
        `${url}/api/order/update-status`,
        { id, status: newStatus },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message)
        fetchOrders()
        setStatus(newStatus)
      }
    } catch (error) {
      toast.error("Failed to update status.")
      console.error(error)
    }
  }

  const handleDelete = async (orderID) => {
    try {
      const response = await axios.delete(
        `${url}/api/order/delete/${orderID}`,
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message)
        fetchOrders()
      }
    } catch (error) {
      toast.error("Failed to delete order!")
    }
  }

  return (
    <div
      className="bg-white rounded-md p-5 m-5 flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 130px)" }}
    >
      {/* Set browser tab title for admin UX  */}
      <Helmet>
        <title>Food Orders | Admin SpicyMeal</title>
      </Helmet>

      {/* Admin content goes here */}
      {loading ? (
        <div className="w-10 h-10 border-4 border-t-themeColor rounded-full animate-spin mx-auto mt-10"></div>
      ) : orders.length === 0 ? (
        <p className="font-bold text-2xl text-gray-500 text-center">
          No orders available!
        </p>
      ) : (
        <div className="w-full mb-auto">
          {orders.map(
            (order) =>
              order.items.length > 0 && (
                <div
                  key={order._id}
                  className={`text-sm hover:bg-gray-100 border-b px-1 flex w-full justify-between ${
                    order.read ? "" : "font-bold bg-green-50 hover:bg-green-100"
                  }`}
                >
                  <div
                    className="overflow-hidden w-full py-3 cursor-pointer"
                    onClick={() => handleOpenOrder(order)}
                  >
                    <div className="flex flex-col md:flex-row md:gap-2">
                      <b>{order.address.name}</b>
                      <p className="text-gray-400">{order.address.email}</p>
                    </div>

                    <div className="truncate mt-2">
                      {order.items.map((item, index) => (
                        <span key={item._id}>
                          ({item.name} x {item.quantity})
                          {index < order.items.length - 1 && ", "}
                        </span>
                      ))}
                    </div>

                    <div className="text-gray-400 flex items-center flex-wrap mt-1">
                      <div className="mr-2">
                        <b>Order Status: </b>
                        <span
                          className={`px-3 py-0.5 rounded-full text-xs text-nowrap ${
                            order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : order.status === "Food Processing"
                              ? "bg-blue-100 text-blue-600"
                              : order.status === "Delivered"
                              ? "bg-green-100 text-green-600"
                              : ""
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <span>{moment(order.date).fromNow()}</span>
                    </div>
                  </div>

                  <div className="flex items-center ml-1">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="flex items-end p-2 transition-colors duration-300 bg-themeColor text-themeColor rounded-sm bg-opacity-20 hover:bg-themeColor hover:text-gray-200 text-sm"
                    >
                      <RiDeleteBinLine className="" />
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedOrder && (
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
                className="bg-gray-100 rounded-md px-5 py-3 mx-5 w-full max-w-3xl min-h-96 overflow-hidden"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-xl">Order Details</h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="hover:text-themeColor"
                  >
                    <IoCloseOutline className="text-xl" />
                  </button>
                </div>

                <div
                  className="overflow-auto scroll-container mt-2"
                  style={{ maxHeight: "calc(100vh - 110px)" }}
                >
                  <div className="min-w-[600px] text-sm mr-0.5">
                    {/* Order ID, payment status and order date, order status */}
                    <div className="rounded-md p-5 bg-white">
                      <b>Order ID: </b>
                      <span>{selectedOrder._id}</span>
                      <b className="ml-2">Payment Status: </b>
                      {selectedOrder.payment ? (
                        <span className="bg-green-200 text-green-600 px-3 py-0.5 rounded-full text-xs">
                          Paid
                        </span>
                      ) : (
                        <span className="bg-rose-100 text-rose-600 px-3 py-0.5 rounded-full text-xs">
                          Not Paid
                        </span>
                      )}

                      {/* Order date */}
                      <div className="text-sm text-gray-400 mt-1">
                        <b className="text-gray-700">Order Date: </b>
                        {moment(selectedOrder.date).format(
                          "MMMM D, YYYY [at] h:mmA"
                        )}
                      </div>

                      {/* Order status */}
                      <div className="mt-2">
                        <b>Order Status: </b>
                        <select
                          value={status}
                          onChange={(e) => {
                            handleChange(e, selectedOrder._id)
                          }}
                          className="bg-gray-200 py-1"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Food Processing">
                            Food Processing
                          </option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    {/* Dilivery address */}
                    <div className="mb-5 space-y-1.5 bg-white p-5 mt-5 rounded-md">
                      <div>
                        <b>Delivery Address: </b>
                        {selectedOrder.address.name},{" "}
                        {selectedOrder.address.street},{" "}
                        {selectedOrder.address.city},{" "}
                        {selectedOrder.address.state},{" "}
                        {selectedOrder.address.country},{" "}
                        {selectedOrder.address.zipCode}
                      </div>
                      <div>
                        <b>Email:</b> {selectedOrder.address.email}
                      </div>
                      <div>
                        <b>Phone:</b> {selectedOrder.address.phone}
                      </div>
                      <div>
                        <b>Order ID:</b> {selectedOrder._id}
                      </div>
                      <div>
                        <b>Order Date:</b>{" "}
                        {moment(selectedOrder.date).fromNow()}
                      </div>
                    </div>

                    {/* Order items */}
                    <div className=" bg-white p-5 rounded-md mt-5">
                      <div className="flex justify-between items-center border-b border-dashed py-2">
                        <b>Order Item</b>
                        <div className="flex justify-end w-52">
                          <b className="w-16">Quntity</b>
                          <b className="text-center  w-16">Price</b>
                          <b className="text-end  w-16">Amount</b>
                        </div>
                      </div>

                      {selectedOrder.items.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center justify-between py-1 border-b border-dashed"
                        >
                          <div className="flex items-center gap-2 ">
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              className="rounded-sm object-cover h-14 w-14"
                            />
                            <div className="">
                              <div className="capitalize text-gray-400">
                                {item.category}
                              </div>
                              <div className="line-clamp-2">{item.name} </div>
                            </div>
                          </div>
                          <div className="flex text-gray-500">
                            <div className="text-center w-16">
                              {item.quantity}
                            </div>
                            <div className="text-center w-16">
                              ${item.price}
                            </div>
                            <div className="text-end w-16">
                              ${item.quantity * item.price}.00
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="flex justify-end items-center gap-5 py-2 border-b border-dashed">
                        <b>Sub Total: </b>{" "}
                        <span>${selectedOrder.amount}.00</span>
                      </div>

                      <div className="flex items-center justify-between py-2 border-b border-dashed">
                        <span>Country Tax Fee</span> <span>$0.00</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-dashed">
                        <span>Devlivery Fee</span> <span>$2.00</span>
                      </div>
                      <div className="flex items-center justify-end gap-5 pt-2">
                        <b>Total Amount</b>
                        <span>${selectedOrder.amount + 2}.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FoodOrders
