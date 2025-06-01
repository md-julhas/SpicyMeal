import React, { useState } from "react"
import { IoMdSearch } from "react-icons/io"
import { CgMenu, CgProfile } from "react-icons/cg"
import { HiOutlineLogout } from "react-icons/hi"
import { AnimatePresence, motion } from "framer-motion"
import { HiMiniUserCircle } from "react-icons/hi2"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { useStateContext } from "../contexts/ContextProvider"
import useClickOutside from "../hooks/useClickOutSide"
import Sidebar from "./Sidebar"
const Navbar = () => {
  const userMenuStyles = `px-5 py-2 text-left w-full hover:bg-slate-200 flex items-center gap-2`
  const {
    userBasic,
    setToken,
    url,
    isSidebarOpen,
    setIsSidebarOpen,
    pageTitle,
  } = useStateContext()
  const [isUserMenu, setIsUserMenu] = useState(false)
  const userMenuRef = React.useRef(null)
  const navigate = useNavigate()

  useClickOutside(userMenuRef, isUserMenu, setIsUserMenu)

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken("")
    localStorage.removeItem("pageTitle")
    toast.success("Logged out successfully!")
    navigate("/")
  }

  return (
    <div className="bg-white h-16 sticky top-0 w-full flex items-center justify-between px-5 border-b z-40">
      {/* Left side menu icon sm screen, page title, search */}
      <div className="flex items-center gap-3">
        <div className="lg:hidden">
          {/* Menu icon */}

          <CgMenu
            className="hover:text-themeColor text-xl flex items-center cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
          />

          {/* Backdrop and animated Sidebar - Only for small screens */}
          <AnimatePresence>
            {isSidebarOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="fixed inset-0 bg-gray-900/65 backdrop-blur-sm z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSidebarOpen(false)}
                />

                {/* Sidebar */}
                <motion.div
                  className="fixed top-0 left-0 h-full z-20"
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Sidebar />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Page title */}
        <h2 className="font-bold capitalize">{pageTitle}</h2>
        {/* Search */}
        <span className="relative hidden md:block">
          <IoMdSearch className="absolute text-[22px] text-gray-500 top-1.5 right-1" />
          <input
            type="text"
            className="outline-none py-1.5 text-sm bg-gray-100 pl-2 pr-6 rounded-sm"
            placeholder="Search Foods..."
          />
        </span>
      </div>

      {/* Right side user section */}
      <div className="text-sm relative hover:bg-gray-20" ref={userMenuRef}>
        <button
          className="flex items-center gap-1 hover:text-themeColor"
          onClick={() => setIsUserMenu(!isUserMenu)}
        >
          {userBasic?.image ? (
            <img
              src={userBasic.image}
              className="object-cover h-8 w-8 rounded-full border"
            />
          ) : (
            <HiMiniUserCircle className="h-8 w-8" />
          )}

          <span className="hidden lg:flex items-center">
            {userBasic?.name && (
              <>
                {userBasic.name.length > 10
                  ? userBasic.name.slice(0, 10) + "..."
                  : userBasic.name}
              </>
            )}
            <MdOutlineKeyboardArrowDown
              className={`transition-transform duration-300 ${
                isUserMenu ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>
        <AnimatePresence>
          {isUserMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-fit w-fit text-nowrap absolute top-[65px] py-1 right-0 bg-white shadow-custom rounded-sm overflow-hidden z-50"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              >
                <Link
                  to="/my-profile"
                  className={userMenuStyles}
                  onClick={() => setIsUserMenu(false)}
                >
                  <CgProfile />
                  <span>View My Profile</span>
                </Link>
                <button className={userMenuStyles} onClick={handleLogout}>
                  <HiOutlineLogout />
                  <span>Logout</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Navbar
