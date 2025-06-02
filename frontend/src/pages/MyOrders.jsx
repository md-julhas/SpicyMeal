import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { CiLogin } from "react-icons/ci"
import { toast } from "react-toastify"
import moment from "moment"

import { StoreContext } from "../context/StoreContext"
import { Helmet } from "react-helmet"

const MyOrders = () => {
  const [data, setData] = useState([])
  const [totalOrders, setTotalOrders] = useState(0)
  const [loading, setLoading] = useState(true)
  const { token, url } = useContext(StoreContext)

  const fetchOrders = async () => {
    setLoading(true)

    try {
      const response = await axios.get(url + "/api/order/user-orders", {
        headers: { token },
      })
      setData(response.data.data)
      setTotalOrders(response.data.data.length)
    } catch (err) {
      toast.info("Failed to fetch orders!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }
    fetchOrders()
  }, [token])

  return (
    <div
      className="section-container bg-gray-100"
      style={{ minHeight: "calc(100vh - 300px)" }}
    >
      <div className="inner-container py-10">
        <Helmet>
          <title>My Orders | SpicyMeal</title>
          <meta
            name="description"
            content="Track and manage your orders with SpicyMeal. View your past and current orders, check delivery statuses, and reorder your favorite spicy meals with ease."
          />
          <meta
            name="keywords"
            content="SpicyMeal, your orders, order tracking, food delivery, spicy dishes, reorder meals, food app, delivery status, meal history"
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
            {data.length === 0 ? (
              <p className="h-full flex items-center justify-center text-xl font-bold text-gray-500">
                No orders found!
              </p>
            ) : (
              <div>
                <div className="flex flex-col items-center justify-center gap-2 pb-10">
                  <h2 className="font-bold text-3xl">My Orders Summary</h2>
                  <div className="text-gray-400">
                    Total Orders: {totalOrders}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {data.map(
                    (order) =>
                      order.items.length > 0 && (
                        <div
                          key={order._id}
                          className="text-sm text-gray-500 bg-white rounded-sm shadow-custom p-5"
                        >
                          {/* Dilivery address */}
                          <div className="mb-5 space-y-1.5">
                            <p>
                              <b>Delivery Address: </b>
                              {order.address.name}, {order.address.street},{" "}
                              {order.address.city}, {order.address.state},{" "}
                              {order.address.zipCode}
                            </p>
                            <div>
                              <b>Email:</b> {order.address.email}
                            </div>
                            <div>
                              <b>Phone:</b> {order.address.phone}
                            </div>
                            <div>
                              <b>Order ID:</b> {order._id}
                            </div>
                            <div>
                              <b>Order Date:</b> {moment(order.createdAt).fromNow()}
                            </div>
                          </div>

                          {/* Total items ordered */}
                          <div>
                            <p>
                              <b>Total Items Ordered:</b> {order.items.length}
                            </p>
                            <div className="text-gray-400 py-1">
                              {order.items.map((item, index) => (
                                <p key={item._id} className="py-0.5">
                                  {index + 1}. {item.name} {item.quantity} x $
                                  {item.price}, Total $
                                  {item.quantity * item.price}
                                </p>
                              ))}
                            </div>
                            <p>
                              <strong>Total Amount:</strong> ${order.amount}
                            </p>
                          </div>

                          <div className="space-y-1">
                            {/* <p className="mt-5">
                              <strong>Order Status:</strong> {order.status}
                            </p> */}
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

                            <div className="text-sm text-gray-500">
                              <b className="ml-2">Payment Status: </b>
                              {order.payment ? (
                                <span className="bg-green-200 text-green-600 px-3 py-0.5 rounded-full text-xs">
                                  Paid
                                </span>
                              ) : (
                                <span className="bg-rose-200 text-rose-600 px-3 py-0.5 rounded-full text-xs">
                                  Not Paid
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
