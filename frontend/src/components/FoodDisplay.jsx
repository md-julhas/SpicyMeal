import React, { useContext } from "react"

import { StoreContext } from "../context/StoreContext"
import FoodItem from "./FoodItem"

const FoodDisplay = ({ category }) => {
  const { foodList, foodListLoading, foodListError } = useContext(StoreContext)

  // Filter food list based on the selected category
  const filteredFoodList =
    category === "All Items"
      ? foodList
      : foodList.filter((food) => food.category === category)

  return (
    <div className="section-container">
      <div className="inner-container py-10">
        {foodListLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-t-themeColor rounded-full animate-spin"></div>
          </div>
        ) : foodListError ? (
          <div className="h-full flex flex-col items-center justify-center gap-5 text-xl font-bold text-gray-500">
            {foodListError}
          </div>
        ) : filteredFoodList.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xl font-bold text-gray-500">
            No food found!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pb-10">
            {filteredFoodList.map((food) => (
              <FoodItem
                key={food._id}
                id={food._id}
                name={food.name}
                description={food.description}
                price={food.price}
                image={food.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay
