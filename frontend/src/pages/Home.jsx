import React, { useContext, useState } from "react"

import Hero from "../components/Hero"
import ExploreMenu from "../components/ExploreMenu"
import FoodDisplay from "../components/FoodDisplay"
import { StoreContext } from "../context/StoreContext"
import { Helmet } from "react-helmet"

const Home = () => {
  const [category, setCategory] = useState("All Items")
  const { search } = useContext(StoreContext)

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>SpicyMeal</title>
        <meta
          name="description"
          content="SpicyMeal offers a wide variety of delicious, spicy dishes. Order your favorite meals through our app and enjoy fast and reliable food delivery right to your door. Perfect for spice lovers and foodies!"
        />
        <meta
          name="keywords"
          content="SpicyMeal, spicy food, food delivery, restaurant, spicy meals, order food online, food app, fast food delivery, international cuisine, spice lovers, restaurant app"
        />
      </Helmet>

      {!search && <Hero />}
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  )
}

export default Home
