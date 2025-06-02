import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import moment from "moment"
import { IoCloseOutline } from "react-icons/io5"
import { AnimatePresence, motion } from "framer-motion"
import { RiDeleteBinLine } from "react-icons/ri"

import { useStateContext } from "../contexts/ContextProvider"
import useClickOutside from "../hooks/useClickOutSide"
import { Helmet } from "react-helmet"
const Inbox = () => {
  const { url, token, fetchUnreadMessage } = useStateContext()
  const modelRef = useRef(null)
  const [inbox, setInbox] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  useClickOutside(modelRef, selectedMessage, setSelectedMessage)

  const fetchInbox = async () => {
    try {
      const response = await axios.get(`${url}/api/contact-us/messages`, {
        headers: { token },
      })
      if (response.data.success) {
        setInbox(response.data.data)
      } else {
        toast.info(response.data.message)
      }
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Too many requests. Please try again after 5 minutes!")
      } else {
        toast.error("Failed to fetch inbox!")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMessage = async (event, id) => {
    event.stopPropagation()
    setDeletingId(id)
    try {
      const response = await axios.delete(
        `${url}/api/contact-us/delete-message/${id}`,
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchInbox()
      } else {
        toast.info(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setDeletingId(null)
    }
  }

  const handleOpenMessage = async (msg) => {
    setSelectedMessage(msg)
    if (!msg.read) {
      try {
        const response = await axios.put(
          `${url}/api/contact-us/mark-read/${msg._id}`,
          {},
          { headers: { token } }
        )

        if (response.data.success) {
          fetchInbox(), fetchUnreadMessage()
        }
      } catch (error) {
        toast.error("Failed to mark as read")
      }
    }
  }

  useEffect(() => {
    fetchInbox()
  }, [])

  return (
    <div
      className="bg-white rounded-md p-5 m-5 flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 130px)" }}
    >
      {/* Set browser tab title for admin UX  */}
      <Helmet>
        <title>Inbox | Admin SpicyMeal</title>
      </Helmet>

      {/* Admin content goes here */}
      {loading ? (
        <div className="w-10 h-10 border-4 border-t-themeColor rounded-full animate-spin mx-auto mt-10"></div>
      ) : inbox.length === 0 ? (
        <p className="font-bold text-2xl text-gray-500 text-center">
          No inbox available!
        </p>
      ) : (
        <div className="w-full mb-auto">
          {inbox.map((msg) => (
            <div
              key={msg._id}
              className={`flex items-center justify-between gap-2 border-b px-1 hover:bg-gray-100 text-sm ${
                msg.read
                  ? ""
                  : "bg-green-50 font-bold text-gray-800 hover:bg-green-100"
              }`}
            >
              <div
                className="overflow-hidden w-full cursor-pointer py-1"
                onClick={() => handleOpenMessage(msg)}
              >
                <div className="flex items-center gap-2">
                  <div className="truncate font-bold">{msg.name}</div>
                  <div className="truncate text-xs text-gray-400">
                    {msg.email}
                  </div>
                </div>

                <div className="truncate first-letter:uppercase">
                  {msg.message}
                </div>

                <div className="flex flex-col md:flex-row md:gap-1 text-gray-400 text-xs md:text-sm mt-1">
                  <div>
                    <b>Message Type:</b>
                    <span className="capitalize ml-1">{msg.messageType},</span>
                  </div>
                  <span className="first-letter:uppercase">
                    {moment(msg.createdAt).fromNow()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={(e) => handleDeleteMessage(e, msg._id)}
                  className="ml-auto h-fit p-2 transition-colors duration-300 bg-themeColor text-themeColor rounded-sm bg-opacity-20 hover:bg-themeColor hover:text-gray-200 text-sm"
                >
                  {deletingId === msg._id ? (
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
        {selectedMessage && (
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
                  <h2 className="font-bold text-xl">Message Details</h2>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="hover:text-themeColor"
                  >
                    <IoCloseOutline className="text-xl" />
                  </button>
                </div>

                {/* Sender details */}
                <div className="bg-white p-5 mt-5 rounded-md space-y-1">
                  <div>
                    <b className="font-bold">Sender Name: </b>
                    {selectedMessage.name}
                  </div>
                  <div>
                    <b>Email: </b> {selectedMessage.email}
                  </div>
                  <div>
                    <b>Phone: </b> {selectedMessage.phone || "No phone"}
                  </div>
                  <div className="capitalize">
                    <b>Message Type: </b> {selectedMessage.messageType}
                  </div>
                  <div>
                    <b>Date:</b>
                    {moment(selectedMessage.createdAt).format(
                      "MMMM D, YYYY [at] h:mmA"
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="bg-white rounded-md mt-5 p-5">
                  <h4 className="font-bold mb-1">Messsage:</h4>
                  {selectedMessage.message}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Inbox
