import React, { useContext, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link, NavLink } from "react-router-dom"
import { IoCloseOutline } from "react-icons/io5"

import { StoreContext } from "../context/StoreContext"
import { navlinks } from "../constants/data"
import logo from "../assets/logo.png"
import SocialLinks from "./SocialLinks"

const SmallScreenSidebar = () => {
  const { isSmallScreenSidebar, setIsSmallScreenSidebar } =
    useContext(StoreContext)
  return (
    <>
      <AnimatePresence>
        {isSmallScreenSidebar && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-gray-800/65 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => setIsSmallScreenSidebar(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed left-0 top-0 h-screen w-56 bg-gray-50"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="p-5">
                {/* Brand logo and name */}
                <div className="border-b pb-5 flex items-center justify-between">
                  <Link
                    to={"/"}
                    className="flex items-center gap-2"
                    onClick={() => setIsSmallScreenSidebar(false)}
                  >
                    <img
                      src={logo}
                      alt="restaurants app"
                      className="h-7 p-1.5 bg-themeColor rounded-full"
                    />
                    <b>SpicyMeal</b>
                  </Link>
                  <IoCloseOutline
                    className="text-xl hover:text-themeColor cursor-pointer"
                    onClick={() => setIsSmallScreenSidebar(false)}
                  />
                </div>

                {/* Navigation links */}
                <div className="flex flex-col">
                  {navlinks.map((nav) => (
                    <NavLink
                      to={nav.path}
                      key={nav.name}
                      onClick={() => {
                        setIsSmallScreenSidebar(false)
                      }}
                      className={({ isActive }) =>
                        `text-sm font-semibold text-gray-500 block py-3 border-b hover:text-themeColor capitalize ${
                          isActive ? "text-themeColor" : ""
                        }`
                      }
                    >
                      {nav.name}
                    </NavLink>
                  ))}
                </div>

                {/* Social links */}
                <div>
                  <h2 className="font-semibold mt-10 mb-3 uppercase text-xs text-gray-500">
                    Follow Us Online
                  </h2>
                  <SocialLinks bgColor={"#E5E7EB"} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default SmallScreenSidebar
