import React, { useContext } from "react"

import { StoreContext } from "../context/StoreContext"
import { toast } from "react-toastify"

// Hightlight search text
const highlightText = (text, search) => {
  if (!search || typeof text !== "string") return text

  const searchTerms = search.trim().split(/\s+/).filter(Boolean)
  if (searchTerms.length === 0) return text

  const regex = new RegExp(
    `(${searchTerms
      .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})`,
    "gi"
  )

  const highlightedText = text.replace(
    regex,
    (match) => `<span class="bg-yellow-200 font-semibold">${match}</span>`
  )

  return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />
}

const FoodItem = ({ id, name, price, description, image }) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    url,
    removingCartItem,
    addingCartItem,
    token,
    search,
  } = useContext(StoreContext)

  const addBtnStyle = "w-16 py-1 bg-green-500 rounded-sm text-sm text-gray-100"
  const removeBtnStyle =
    "w-16 py-1 bg-themeColor/20 rounded-sm text-sm text-pink-600"

  return (
    <div className="bg-white p-5 rounded-sm">
      <div className="h-60 w-full">
        <img
          src={url + "/images/" + image}
          alt={name}
          loading="lazy"
          className="rounded-sm object-cover h-60 w-full"
        />
      </div>
      <div>
        <div className="flex justify-between py-3">
          <b className="first-letter:uppercase truncate">
            {highlightText(name, search)}
          </b>
        </div>
        <p className="first-letter:uppercase line-clamp-2 overflow-hidden text-ellipsis text-gray-400 text-sm">
          {highlightText(description, search)}
        </p>
        <p className="text-2xl font-semibold text-themeColor py-2">${price}</p>
      </div>

      {/* Add and remove cart btn */}
      <div className="flex gap-3 select-none">
        {/* Add to cart btn */}
        <div className="flex items-center gap-2">
          {addingCartItem === id ? (
            <div className={`${addBtnStyle} flex items-center justify-center`}>
              <span className="w-5 h-5 border-2 border-green-100 border-t-green-700 rounded-full animate-spin"></span>
            </div>
          ) : (
            <button
              className={addBtnStyle}
              onClick={() => {
                if (token) {
                  addToCart(id)
                } else {
                  toast.info("You must logged in to add items to the cart.")
                }
              }}
            >
              Add Cart
            </button>
          )}
        </div>

        {/* Remove to cart btn */}
        {cartItems[id] > 0 && (
          <div className="flex items-center gap-2">
            {removingCartItem === id ? (
              <div
                className={`${removeBtnStyle} flex items-center justify-center`}
              >
                <span className="w-5 h-5 border-2 border-pink-100 border-t-themeColor rounded-full animate-spin"></span>
              </div>
            ) : (
              <button
                className={`${removeBtnStyle}`}
                onClick={() => removeFromCart(id)}
              >
                Remove
              </button>
            )}

            <div className="border border-green-500 px-2 py-[2px]">
              {cartItems[id]}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodItem
