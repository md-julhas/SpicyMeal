import React from "react"
import { Helmet } from "react-helmet"
import {
  FaConciergeBell,
  FaRegCreditCard,
  FaUtensils,
  FaTruck,
  FaHandHoldingUsd,
  FaShieldAlt,
} from "react-icons/fa"
import { Link } from "react-router-dom"

const Services = () => {
  return (
    <div className="section-container py-10 bg-gray-100">
      <div className="inner-container text-center">
        <Helmet>
          <title>SpicyMeal | Our Services</title>
          <meta
            name="description"
            content="Discover the variety of services offered by SpicyMeal, including fast food delivery, online order, table reservations, catering services, and more. Experience spicy meals delivered right to your door."
          />
          <meta
            name="keywords"
            content="SpicyMeal, services, online order, food delivery, table reservation, catering services, spicy dishes, online order, restaurant services, food app, meal delivery"
          />
        </Helmet>

        <h2 className="text-4xl font-semibold mb-10">Our Premium Services</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {/* Service 1: Dine-In */}
          <div className="bg-white rounded-sm shadow-custom p-8  transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <FaConciergeBell className="text-pink-500 mx-auto mb-6" size={60} />
            <h3 className="text-2xl font-semibold mb-4">Dine-In</h3>
            <p className="text-gray-500 mb-6">
              Relax and enjoy your meal in our spacious, comfortable dining area
              with excellent service.
            </p>
            <Link to={"/book-table"}>
              <button className="bg-pink-500 text-gray-200 py-2 px-4 rounded-sm hover:bg-pink-600 transition duration-200">
                Book a Table
              </button>
            </Link>
          </div>

          {/* Service 2: Online Ordering */}
          <div className="bg-white rounded-sm shadow-custom p-8  transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <FaRegCreditCard
              className="text-yellow-400 mx-auto mb-6"
              size={60}
            />
            <h3 className="text-2xl font-semibold mb-4">Online Ordering</h3>
            <p className="text-gray-500 mb-6">
              Order your favorite meals online and have them delivered right to
              your doorstep with ease.
            </p>
            <Link to={"/"}>
              <button className="bg-yellow-400 text-white py-2 px-4 rounded-sm hover:bg-yellow-500 transition duration-200">
                Order Now
              </button>
            </Link>
          </div>

          {/* Service 3: Catering */}
          <div className="bg-white rounded-sm shadow-custom p-8  transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <FaUtensils className="text-green-500 mx-auto mb-6" size={60} />
            <h3 className="text-2xl font-semibold mb-4">Catering</h3>
            <p className="text-gray-500 mb-6">
              We offer catering for all occasions, delivering high-quality meals
              with top-notch service.
            </p>
            <Link to={"/contact-us"}>
              <button className="bg-green-500 text-gray-100 py-2 px-4 rounded-sm hover:bg-green-600 transition duration-200">
                Request a Quote
              </button>
            </Link>
          </div>

          {/* Service 4: Fast Delivery */}
          <div className="bg-white rounded-sm shadow-custom p-8  transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <FaTruck className="text-blue-500 mx-auto mb-6" size={60} />
            <h3 className="text-2xl font-semibold mb-4">Fast Delivery</h3>
            <p className="text-gray-500 mb-6">
              We guarantee fast delivery to your doorstep with our reliable and
              efficient service.
            </p>
            <Link to={"/my-orders"}>
              <button className="bg-blue-500 text-gray-200 py-2 px-4 rounded-sm hover:bg-blue-600 transition duration-200">
                Track Your Order
              </button>
            </Link>
          </div>

          {/* Service 5: Exclusive Discounts */}
          <div className="bg-white rounded-sm shadow-custom p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <FaHandHoldingUsd
              className="text-purple-500 mx-auto mb-6"
              size={60}
            />
            <h3 className="text-2xl font-semibold mb-4">Exclusive Discounts</h3>
            <p className="text-gray-500 mb-6">
              Get special discounts on your orders with our loyalty program and
              seasonal promotions.
            </p>
            <Link to={"/"}>
              <button className="bg-purple-500 text-gray-200 py-2 px-4 rounded-sm hover:bg-purple-600 transition duration-200">
                View Offers
              </button>
            </Link>
          </div>

          {/* Service 6: Secure Payment */}
          <div className="bg-white rounded-sm shadow-custom p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <FaShieldAlt className="text-teal-500 mx-auto mb-6" size={60} />
            <h3 className="text-2xl font-semibold mb-4">Secure Payment</h3>
            <p className="text-gray-500 mb-6">
              Your online transactions are safe with us, thanks to secure
              payment gateways and encryption.
            </p>
            <Link to={"/"}>
              <button className="bg-teal-500 text-gray-200 py-2 px-4 rounded-sm hover:bg-teal-600 transition duration-200">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
