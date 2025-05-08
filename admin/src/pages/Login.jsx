import React, { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Helmet } from "react-helmet"

import { useStateContext } from "../contexts/ContextProvider"
import logo from "../assets/logo.png"

const Login = () => {
  const inputStyles =
    "outline-none p-3 mb-3 border rounded-sm focus:border-themeColor w-full"
  const { url, setToken } = useStateContext()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    email: "julhas.info@gmail.com",
    password: "66666666",
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`${url}/api/users/admin-login`, data)
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        toast.success(response.data.message)
      } else {
        toast.info(response.data.message)
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      )
    }
    setLoading(false)
  }

  return (
    <div className="section-container h-screen items-center w-full py-20 bg-gray-200">
      <div className="bg-white shadow-custom rounded-md p-10 w-full max-w-md">
        {/* Set browser tab title for admin UX  */}
        <Helmet>
          <title>Login | Admin SpicyMeal</title>
        </Helmet>

        {/* Admin content goes here */}
        {/* Brand logo and name */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <img
            src={logo}
            alt="restaurants app"
            className="h-10 p-1.5 bg-themeColor rounded-full"
          />
          <b className="text-3xl">SpicyMeal</b>
        </div>
        <h1 className="text-xl font-bold text-center mb-2">
          Welcome to the Admin Panel
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Authorized access for restaurant admins only. Regular users are
          restricted.
        </p>
        <h2 className="font-bold text-center text-gray-500 mb-5">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            placeholder="Email Address"
            className={inputStyles}
            required
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleOnChange}
            placeholder="Password"
            className={inputStyles}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-themeColor text-gray-100 rounded-sm"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
