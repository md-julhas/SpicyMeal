import React, { useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import { Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import PlaceOrder from "./pages/PlaceOrder"
import Login from "./components/Login"
import MyOrders from "./pages/MyOrders"
import Footer from "./components/Footer"
import BookTable from "./pages/BookTable"
import MyBookedTable from "./pages/MyBookedTables"
import Services from "./pages/Services"
import ContactUs from "./pages/ContactUs"
import MyProfile from "./pages/MyProfile"
import NotFound from "./pages/NotFound"

const App = () => {
  useEffect(() => {
    toast.info(
      "This is a hobby project hosted on a free-tier server, the initial data load may take about 1 minute due to server cold starts. Thanks for your patience!",
      { autoClose: 11000 }
    )
  }, [])
  return (
    <div className="text-gray-700 overflow-y-scroll overflow-x-hidden min-h-screen h-screen">
      <Login />
      <Navbar />
      <ToastContainer position="top-left" autoClose={3000} theme="dark" />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-table" element={<BookTable />} />
          <Route path="/my-booked-tables" element={<MyBookedTable />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
