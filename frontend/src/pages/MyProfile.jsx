import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { CiLogin } from "react-icons/ci"
import { HiMiniUserCircle } from "react-icons/hi2"

import { StoreContext } from "../context/StoreContext"
import { Helmet } from "react-helmet"

const MyProfile = () => {
  const { url, token } = useContext(StoreContext)
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
      className="section-container"
      style={{ minHeight: "calc(100vh - 550px)" }}
    >
      <div className="inner-container space-y-4">
        <Helmet>
          <title>My Profile | SpicyMeal</title>
          <meta
            name="description"
            content="View your profile on SpicyMeal. Manage your personal information, track your orders, and customize your preferences for a better food delivery experience."
          />
          <meta
            name="keywords"
            content="SpicyMeal, user profile, account settings, update profile, order history, food preferences, personal information, food delivery"
          />
        </Helmet>

        {!token ? (
          <div className="h-full flex flex-col items-center justify-center gap-5">
            <CiLogin className="text-7xl text-gray-400" />
            <h2 className="text-xl font-bold text-gray-500">
              Please log in to view your profile!
            </h2>
          </div>
        ) : loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-t-themeColor rounded-full animate-spin"></div>
          </div>
        ) : user ? (
          <div className="py-10">
            <h1 className="text-3xl font-bold text-center pb-10">My Profile</h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <div>
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="object-cover h-52 w-52 rounded-lg"
                  />
                ) : (
                  <HiMiniUserCircle className="h-52 w-52 text-gray-500" />
                )}
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <b>Name: </b>
                  {user.name}
                </div>
                <div>
                  <b>Email: </b>
                  {user.email}
                </div>
                {user.createdAt && (
                  <div>
                    <b>Account Created: </b>
                    {new Date(user.createdAt).toLocaleString()}
                  </div>
                )}

                <div>
                  <b>Account Type: </b>
                  {user.isAdmin ? "Administrator" : "User"}
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
