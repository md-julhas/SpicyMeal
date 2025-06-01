import React, { useContext } from "react"
import { IoCloseOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa"

import { StoreContext } from "../context/StoreContext"
import { Helmet } from "react-helmet"

const Cart = () => {
  const {
    cartItems,
    cartFoodItems,
    removeFromCart,
    getTotalCartAmount,
    url,
    removingCartItem,
  } = useContext(StoreContext)

  const navigate = useNavigate()
  const totalAmount = getTotalCartAmount()
  const deliveryFee = totalAmount === 0 ? 0 : 2

  return (
    <div className="section-container px-4 md:px-10 lg:px-20 py-10 bg-gray-100">
      <div className="inner-container bg-white p-5 rounded-md shadow-custom">
        <Helmet>
          <title>My Cart | SpicyMeal</title>
          <meta
            name="description"
            content="View and manage your cart at SpicyMeal. Add your favorite spicy dishes, review your order, and proceed to a fast and secure checkout for quick delivery."
          />
          <meta
            name="keywords"
            content="SpicyMeal, food cart, order food, checkout, spicy dishes, food delivery, cart page, online order, food app, fast delivery"
          />
        </Helmet>

        {cartFoodItems.length === 0 || totalAmount === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <FaShoppingCart className="text-6xl mb-4" />
            <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>
            <p className="text-center mt-2">
              Browse our categories and discover the best deals!
            </p>
            <button
              className="mt-5 px-6 py-2 bg-themeColor text-white rounded-sm"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-6 py-5 font-semibold text-gray-500 border-b text-sm">
                  <p>Items</p>
                  <p>Title</p>
                  <p>Price</p>
                  <p>Quantity</p>
                  <p>Total</p>
                  <p>Remove</p>
                </div>

                <div>
                  {cartFoodItems.map(
                    (food) =>
                      cartItems[food._id] > 0 && (
                        <div
                          key={food._id}
                          className="grid grid-cols-6 gap-4 py-3 border-b items-center text-gray-400 text-sm"
                        >
                          <div className="flex items-center">
                            <img
                              src={food.image}
                              alt={food.name}
                              className="h-10 w-10 object-cover rounded-sm"
                            />
                          </div>
                          <p>{food.name}</p>
                          <p>${food.price}</p>
                          <p>{cartItems[food._id]}</p>
                          <p>${food.price * cartItems[food._id]}</p>

                          <button
                            onClick={() => removeFromCart(food._id)}
                            className="flex justify-center items-center w-8 h-8 group"
                            disabled={removingCartItem === food._id}
                          >
                            {removingCartItem === food._id ? (
                              <div className="w-5 h-5 border-2 border-gray-300 border-t-themeColor rounded-full animate-spin"></div>
                            ) : (
                              <IoCloseOutline className="text-xl group-hover:text-themeColor cursor-pointer" />
                            )}
                          </button>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-10 lg:gap-20 mt-20">
              {/* Promo Code */}
              <div className="w-full">
                <h2 className="text-xl py-3 font-medium">Have a Promo Code?</h2>
                <div className="flex items-center border rounded-sm overflow-hidden">
                  <input
                    type="text"
                    placeholder="Enter Promo Code"
                    className="flex-1 outline-none px-3 py-2"
                  />
                  <button className="px-5 py-2 bg-themeColor text-gray-200">
                    Apply
                  </button>
                </div>
              </div>

              {/* Cart total */}
              <div className="w-full">
                <h2 className="font-semibold text-2xl ">Cart Total</h2>
                <div className="flex justify-between border-b py-3">
                  <p>Subtotal</p>
                  <p>${totalAmount}</p>
                </div>
                <div className="flex justify-between border-b py-3">
                  <p>Delivery Fee</p>
                  <p>${deliveryFee}</p>
                </div>
                <b className="flex justify-between py-3">
                  <p>Total</p>
                  <p>${totalAmount + deliveryFee}</p>
                </b>
                <button
                  className="w-full px-5 py-3 rounded-sm bg-themeColor text-gray-200 mt-5"
                  onClick={() => navigate("/order")}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
