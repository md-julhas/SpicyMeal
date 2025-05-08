import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const url = import.meta.env.VITE_API_URL
  const [cartItems, setCartItems] = useState({})
  const [cartFoodItems, setCartFoodItems] = useState([])
  const [search, setSearch] = useState("")
  const [token, setToken] = useState("")
  const [foodList, setFoodList] = useState([])
  const [foodListLoading, setFoodListLoading] = useState(false)
  const [foodListError, setFoodListError] = useState("")
  const [removingCartItem, setRemovingCartItem] = useState(null)
  const [addingCartItem, setAddingCartItem] = useState(null)
  const [isSmallScreenSidebar, setIsSmallScreenSidebar] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState({})

  const fetchCartItems = async (token) => {
    if (!token) {
      setCartItems({})
      setCartFoodItems([])
      return
    }
    const response = await axios.get(url + "/api/cart/get", {
      headers: { token },
    })
    setCartItems(response.data.data.validCartData)
    setCartFoodItems(response.data.data.validFoodItems)
  }

  const addToCart = async (itemId) => {
    setAddingCartItem(itemId)
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      )
    }
    setAddingCartItem(null)
    await fetchCartItems(token)
  }

  const removeFromCart = async (itemId) => {
    setRemovingCartItem(itemId)
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      )
    }
    await fetchCartItems(token)
    setRemovingCartItem(null)
  }

  const getTotalCartAmount = () => {
    return cartFoodItems.reduce((total, food) => {
      return total + (cartItems[food._id] || 0) * food.price
    }, 0)
  }

  // const fetchFoodList = async () => {
  //   setFoodListLoading(true)

  //   try {
  //     const response = await axios.get(url + "/api/food/food-list", {
  //       params: { search: search },
  //     })
  //     if (response.data.data) {
  //       setFoodList(response.data.data)
  //     } else {
  //       throw new Error("Could not found foods!")
  //     }
  //   } catch (error) {
  //     console.log(error)

  //     setFoodListError(error.message)
  //   } finally {
  //     setFoodListLoading(false)
  //   }
  // }

  const fetchFoodList = async () => {
    setFoodListLoading(true)

    try {
      const response = await axios.get(url + "/api/food/food-list", {
        params: { search: search },
      })

      if (response.data.data) {
        setFoodList(response.data.data)
      } else {
        throw new Error("Could not found foods!")
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setFoodListError(
          "Too many requests from this IP, please try again in 5 minutes later"
        )
      } else {
        setFoodListError(error.message)
      }
    } finally {
      setFoodListLoading(false)
    }
  }

  // Get total foods, if search value is "" then return all food items, if search value is something then return foods based on search value
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList()
    }
    const delayDebounce = setTimeout(
      () => {
        loadData()
      },
      search ? 500 : 0
    )

    return () => clearTimeout(delayDebounce)
  }, [search])

  // Get token and call user cart items when user revisit the app after login
  useEffect(() => {
    const loadData = async () => {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
        await fetchCartItems(localStorage.getItem("token"))
      }
    }
    loadData()
  }, [])

  // Fetch user basic data (name and photo) after login user and if login, and if login token exist when user revisit the app.
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return
      try {
        const response = await axios.get(`${url}/api/users/user-basic`, {
          headers: { token },
        })
        setUser(response.data.data)
      } catch (error) {
        console.error("Error fetching user:", error)
      }
    }

    fetchUser()
  }, [token])

  const contextValue = {
    foodList,
    foodListLoading,
    foodListError,
    setFoodList,
    getTotalCartAmount,
    cartItems,
    setCartItems,
    cartFoodItems,
    setCartFoodItems,
    setSearch,
    addToCart,
    removeFromCart,
    url,
    token,
    setToken,
    fetchFoodList,
    search,
    fetchCartItems,
    removingCartItem,
    addingCartItem,
    isSmallScreenSidebar,
    setIsSmallScreenSidebar,
    showLogin,
    setShowLogin,
    user,
    setUser,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
