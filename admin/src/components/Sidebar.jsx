import React from "react"
import { Link, NavLink } from "react-router-dom"
import { IoCloseOutline } from "react-icons/io5"

import { navLinks } from "../constants/data"
import logo from "../assets/logo.png"
import { useStateContext } from "../contexts/ContextProvider"

const Sidebar = () => {
  const {
    setIsSidebarOpen,
    setPageTitle,
    hasUnreadMessages,
    hasUnreadOrders,
    hasUnreadTableOrders,
  } = useStateContext()

  return (
    <div className="h-screen w-56 bg-gray-900 text-slate-300 p-5 flex flex-col justify-between ">
      <div>
        {/* Brand logo and name */}
        <div className="border-b border-slate-700 flex items-center justify-between pb-4">
          <Link
            to={"/"}
            className="flex items-center gap-2"
            onClick={() => setIsSidebarOpen(false)}
          >
            <img
              src={logo}
              alt="restaurants app"
              className="h-7 p-1.5 bg-themeColor rounded-full"
            />
            <b>SpicyMeal</b>
          </Link>
          <IoCloseOutline
            className="text-xl hover:text-themeColor cursor-pointer lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Nav links */}
        <div>
          {navLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2.5 capitalize border-b border-slate-700 hover:text-themeColor ${
                  isActive ? "text-themeColor" : ""
                }`
              }
              onClick={() => {
                setIsSidebarOpen(false),
                  setPageTitle(item.name),
                  localStorage.setItem("pageTitle", item.name)
              }}
            >
              <span className="text-sm">{item.icon}</span>
              <div>{item.name}</div>
              {item.name === "inbox" && hasUnreadMessages > 0 && (
                <div className="text-xs px-1 rounded-sm text-pink-600 ml-auto flex items-center justify-center gap-1 bg-gray-300">
                  <span>New </span> {hasUnreadMessages}
                </div>
              )}
              {item.name === "food orders" && hasUnreadOrders > 0 && (
                <div className="text-xs px-1 rounded-sm text-pink-600 ml-auto flex items-center justify-center gap-1 bg-gray-300">
                  <span>New </span> {hasUnreadOrders}
                </div>
              )}
              {item.name === "table orders" && hasUnreadTableOrders > 0 && (
                <div className="text-xs px-1 rounded-sm text-pink-600 ml-auto flex items-center justify-center gap-1 bg-gray-300">
                  <span>New </span> {hasUnreadTableOrders}
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div>
        <b>SpicyMeal Admin Panel</b>
        <div className="text-sm mt-2 text-slate-500">
          © {new Date().getFullYear()} All Rights Reserved
        </div>
        {/* Developer info */}
        <p className="py-2 text-sm text-slate-500">
          Developed by: <span className="text-themeColor"> Md Julhas</span>
        </p>
      </div>
    </div>
  )
}

export default Sidebar
