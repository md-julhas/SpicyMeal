import React from "react"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"


const Home = () => {
  return (
    <div className="bg-slate-200 text-gray-700 h-screen w-full flex overflow-hidden">
      {/* Sidebar - Always visible on large screens */}
      <div className={`hidden lg:block`}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="w-full overflow-auto">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Home
