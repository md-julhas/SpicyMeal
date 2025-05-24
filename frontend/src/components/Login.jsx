import React, { useContext, useState } from "react"
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import { IoCloseOutline } from "react-icons/io5"
import { toast } from "react-toastify"

import { StoreContext } from "../context/StoreContext"
const Login = () => {
  const inputStyles = "outline-none p-3 border rounded-sm focus:border-pink-500"
  const { url, setToken, showLogin, setShowLogin, fetchCartItems, setUser } =
    useContext(StoreContext)

  const [isLoading, setIsLoading] = useState(false)
  const [currentState, setCurrentState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [image, setImage] = useState(null)

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const onImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"]
      const maxSize = 500 * 1024 // 500KB in bytes

      if (!validTypes.includes(file.type)) {
        toast.error("Only JPG, JPEG, or PNG files are allowed.")
        return
      }

      if (file.size > maxSize) {
        toast.error("Image must be smaller than 500KB!")
        return
      }

      setImage(file)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      let newUrl = url
      const formData = new FormData()

      if (currentState === "Login") {
        newUrl += "/api/users/login"
      } else {
        newUrl += "/api/users/register"
        formData.append("name", data.name)
        formData.append("email", data.email)
        formData.append("password", data.password)
        if (image) {
          formData.append("image", image)
        }
      }

      const requestData =
        currentState === "Login"
          ? { email: data.email, password: data.password }
          : formData

      const response = await axios.post(newUrl, requestData, {
        headers: {
          "Content-Type":
            currentState === "Login"
              ? "application/json"
              : "multipart/form-data",
        },
      })

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        setShowLogin(false)
        toast.success(response.data.message)
        await fetchCartItems(response.data.token)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {showLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute z-50 w-full h-screen flex items-center justify-center bg-gray-900/75"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="sm:w-3/4 md:w-[500px] bg-gray-100 p-5 mx-5 rounded-md"
          >
            <div className="flex justify-between items-center pb-5">
              <h2 className="text-xl font-semibold">{currentState}</h2>
              <button type="button" onClick={() => setShowLogin(false)}>
                <IoCloseOutline className="text-2xl hover:text-themeColor" />
              </button>
            </div>
            <form className="flex flex-col gap-3" onSubmit={onSubmit}>
              {currentState === "Login" ? (
                <></>
              ) : (
                <input
                  type="text"
                  name="name"
                  onChange={onChangeHandler}
                  value={data.name}
                  placeholder="Your name"
                  className={inputStyles}
                  required
                />
              )}
              <input
                type="email"
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                placeholder="Email"
                className={inputStyles}
                required
              />
              <input
                type="password"
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                placeholder="Password"
                className={inputStyles}
                required
              />
              {currentState === "Sign Up" && (
                <>
                  <input
                    type="file"
                    name="image"
                    onChange={onImageChange}
                    className="outline-none focus:border-pink-500"
                  />
                  <p className="text-gray-400 text-sm">
                    Profile picture uploads are limited to JPG, JPEG, or PNG
                    formats, with a maximum file size of 1MB!
                  </p>
                  {image && (
                    <div className="mt-3">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Selected"
                        className="w-20 h-20 object-cover rounded-sm"
                      />
                    </div>
                  )}
                </>
              )}
              <button
                type="submit"
                className="bg-themeColor px-5 py-2 rounded-sm text-gray-100 my-5"
                disabled={isLoading}
              >
                {isLoading
                  ? "Loading..."
                  : currentState === "Sign Up"
                  ? "Create account"
                  : "Login"}
              </button>

              {currentState === "Login" ? (
                <></>
              ) : (
                <div className="flex gap-2 items-center">
                  <input type="checkbox" required />
                  <p>
                    By continuing, I agree to the terms fo use & privacy policy
                  </p>
                </div>
              )}

              {currentState === "Login" ? (
                <div>
                  Create a new account?
                  <button
                    type="button"
                    className="text-themeColor ml-2 hover:underline"
                    onClick={() => setCurrentState("Sign Up")}
                  >
                    Click here
                  </button>
                </div>
              ) : (
                <div>
                  Already have an account
                  <button
                    type="button"
                    className="text-themeColor ml-2 hover:underline"
                    onClick={() => setCurrentState("Login")}
                  >
                    Login Here
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Login
