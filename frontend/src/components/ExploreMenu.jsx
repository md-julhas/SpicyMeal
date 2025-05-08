import React from "react"
import { menuList } from "../constants/data"

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="section-container py-10 flex-col items-center bg-whit">
      <h1 className="inner-container text-2xl md:text-4xl font-semibold py-2 text-center">
        Discover Your Perfect Dish!
      </h1>
      <p className="text-sm xl:text-xl text-gray-400 text-center">
        Enjoy a variety of delicious dishes, perfectly crafted to satisfy any
        craving.
      </p>

      <div className="pt-7 flex flex-wrap gap-2">
        {menuList.map((menu) => (
          <button
            key={menu}
            className="py-2 md:py-4 px-3 md:px-5 rounded-sm text-nowrap capitalize"
            style={{
              backgroundColor: category === menu ? "#FF3155" : "white",
              color: category === menu ? "#E5E7EB" : "",
            }}
            onClick={() =>
              setCategory((prev) => (prev === menu ? "All Items" : menu))
            }
          >
            {menu}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ExploreMenu
