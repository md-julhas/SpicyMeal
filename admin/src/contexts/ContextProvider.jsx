import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

const StateContext = createContext()

export const ContextProvider = ({ children }) => {
  const url = import.meta.env.VITE_API_URL
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [userBasic, setUserBasic] = useState({})
  const [pageTitle, setPageTitle] = useState("dashboard")
  const [hasUnreadMessages, setHasUnreadMessages] = useState(0)
  const [hasUnreadOrders, setHasUnreadOrders] = useState(0)
  const [hasUnreadTableOrders, setHasUnreadTableOrders] = useState(0)

  useEffect(() => {
    const storedTitle = localStorage.getItem("pageTitle")
    if (storedTitle) {
      setPageTitle(storedTitle)
    }
  }, [])

  // Fetch unread messages count on app load
  const fetchUnreadMessage = async () => {
    try {
      const response = await axios.get(`${url}/api/contact-us/unread-message`, {
        headers: { token },
      })
      if (response.data.success) {
        setHasUnreadMessages(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch unread message", error)
    }
  }

  // Fetch unread orders count on app load
  const fetchUnreadOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/unread-orders`, {
        headers: { token },
      })
      if (response.data.success) {
        setHasUnreadOrders(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch unread orders", error)
    }
  }
  // Fetch unread table orders count on app load
  const fetchUnreadTableOrders = async () => {
    try {
      const response = await axios.get(
        `${url}/api/book-table/unread-bookings`,
        {
          headers: { token },
        }
      )
      if (response.data.success) {
        setHasUnreadTableOrders(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch unread table order", error)
    }
  }

  // useEffect(() => {}, [url, token])

  // Fetch user basic data (name and photo) on load app
  const fetchUser = async () => {
    if (!token) return
    try {
      const response = await axios.get(`${url}/api/users/user-basic`, {
        headers: { token },
      })
      setUserBasic(response.data.data)
    } catch (error) {
      console.error("Error fetching user:", error)
    }
  }

  useEffect(() => {
    fetchUnreadMessage()
    fetchUnreadOrders()
    fetchUnreadTableOrders()
    fetchUser()
  }, [token])

  const contextValue = {
    url,
    token,
    setToken,
    isSidebarOpen,
    setIsSidebarOpen,
    userBasic,
    setUserBasic,
    pageTitle,
    setPageTitle,
    hasUnreadMessages,
    fetchUnreadMessage,
    hasUnreadOrders,
    fetchUnreadOrders,
    hasUnreadTableOrders,
    fetchUnreadTableOrders,
  }

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
