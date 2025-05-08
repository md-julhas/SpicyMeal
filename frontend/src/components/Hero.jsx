import React from "react"
import hero from "../assets/hero.jpg"

const Hero = () => {
  return (
    <div
      className="h-[300px] md:h-[400px] bg-cover bg-center flex flex-col items-center justify-center gap-5 text-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <h2 className="text-2xl md:text-4xl xl:text-6xl font-bold text-gray-200">
        <span className="text-themeColor">Taste the Best,</span> Every Time
      </h2>
      <p className="max-w-xl xl:max-w-2xl text-sm xl:text-lg px-5 text-gray-200">
        Indulge in our expertly crafted dishes made from the finest ingredients,
        delivered to your door with speed and care. We ensure every meal arrives
        fresh, hot, and ready to delight your taste buds.
      </p>
    </div>
  )
}

export default Hero
