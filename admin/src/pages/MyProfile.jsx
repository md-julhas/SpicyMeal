import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { HiMiniUserCircle } from "react-icons/hi2"
import { Helmet } from "react-helmet"

import { useStateContext } from "../contexts/ContextProvider"

const MyProfile = () => {
  const { url, token } = useStateContext()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    setLoading(true)

    try {
      const response = await axios.get(`${url}/api/users/user`, {
        headers: {
          token,
        },
      })

      if (response.data.success) {
        setUser(response.data.data)
      }
    } catch (err) {
      toast.error("Error fetching user")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }
    fetchUser()
  }, [token])

  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <div className="flex items-center justify-center w-full m-5">
        {/* Set browser tab title for admin UX  */}
        <Helmet>
          <title>My Profile | Admin SpicyMeal</title>
        </Helmet>

        {/* Admin content goes here */}
        {loading ? (
          <div className="w-10 h-10 border-4 border-white border-t-themeColor rounded-full animate-spin"></div>
        ) : user ? (
          <div className="bg-white w-full max-w-3xl p-5 rounded-md">
            <div>
              <h1 className="text-3xl font-bold text-center py-3">
                My Profile
              </h1>
              <p className="text-gray-400 text-center">
                Your complete account overview Details, updates, and
                preferences—right here
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 md:py-10 text-gray-500">
              <div>
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="object-cover h-52 w-52 rounded-sm"
                  />
                ) : (
                  <HiMiniUserCircle className="h-52 w-52 text-gray-500 rounded-sm border p-2" />
                )}
              </div>
              <div>
                <div className="border-b py-2">
                  <b>Name: </b>
                  {user.name}
                </div>
                <div className="border-b py-2">
                  <b>Email: </b>
                  {user.email}
                </div>

                <div className="border-b py-2">
                  <b>Account Created: </b>
                  {new Date(user.createdAt).toLocaleString()}
                </div>

                <div className="border-b py-2">
                  <b>Account Type: </b>
                  {user.isAdmin ? "Admin User" : "User"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-3xl font-bold text-gray-500">
            No found user!
          </div>
        )}
      </div>
    </div>
  )
}

export default MyProfile
