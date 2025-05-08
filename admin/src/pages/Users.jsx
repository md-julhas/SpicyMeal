import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import moment from "moment"
import { AnimatePresence, motion } from "framer-motion"
import { IoCloseOutline } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa"
import { Helmet } from "react-helmet"

import { useStateContext } from "../contexts/ContextProvider"
import useClickOutside from "../hooks/useClickOutSide"
const Users = () => {
  const { url, token } = useStateContext()
  const modelRef = useRef(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)

  useClickOutside(modelRef, selectedUser, setSelectedUser)

  const fetchUsers = async () => {
    try {
      const response = await axios.get(url + "/api/users/user-list", {
        headers: { token },
      })
      if (response.data.success) {
        setUsers(response.data.data)
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

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div
      className="bg-white rounded-md p-5 m-5 flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 130px)" }}
    >
      {/* Set browser tab title for admin UX  */}
      <Helmet>
        <title>Users | Admin SpicyMeal</title>
      </Helmet>

      {/* Admin content goes here */}
      {loading ? (
        <div className="w-10 h-10 border-4 border-t-themeColor rounded-full animate-spin mx-auto mt-10"></div>
      ) : users.length === 0 ? (
        <p className="font-bold text-2xl text-gray-500 text-center">
          No users available!
        </p>
      ) : (
        <div className="w-full mb-auto">
          {users.map((user) => (
            <div
              key={user._id}
              className="text-sm hover:bg-gray-100 border-b px-1 py-2 md:flex items-center w-full gap-2 text-nowrap cursor-pointer"
              onClick={() => setSelectedUser(user)}
            >
              <div className="flex items-center gap-2">
                {user.image ? (
                  <img
                    src={url + "/user-images/" + user.image}
                    alt={user.name}
                    className="h-7 w-7 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="h-7 w-7 " />
                )}
                <b>{user.name}</b>
              </div>
              <div className="text-gray-400">{user.email}</div>

              <div className="text-gray-400 ml-auto">
                <b>Joined On: </b>
                {moment(user.createdAt).format("D MMMM YYYY")}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedUser && (
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
                className="bg-gray-100 text-sm md:text-base rounded-md p-5 mx-5 w-full max-w-xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-xl">User Details</h2>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="hover:text-themeColor"
                  >
                    <IoCloseOutline className="text-xl" />
                  </button>
                </div>

                {/* User details */}
                <div className="grid md:grid-cols-2 my-5">
                  <div className="flex items-center justify-center">
                    {selectedUser.image ? (
                      <img
                        src={url + "/user-images/" + selectedUser.image}
                        alt={selectedUser.name}
                        className="h-40 w-40 rounded-sm"
                      />
                    ) : (
                      <FaUserCircle className="h-40 w-40 rounded-sm border p-2" />
                    )}
                  </div>

                  <div className="mt-5 md:mt-0 text-sm md:text-base">
                    <div className="border-b py-2">
                      <b>Name: </b>
                      {selectedUser.name}
                    </div>
                    <div className="border-b py-2">
                      <b>Email: </b>
                      {selectedUser.email}
                    </div>
                    <div className="border-b py-2">
                      <b>User Type: </b>
                      {selectedUser.isAdmin ? "Admin User" : "User"}
                    </div>
                    <div className="border-b py-2">
                      <b>ID: </b>
                      {selectedUser._id}
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

export default Users
