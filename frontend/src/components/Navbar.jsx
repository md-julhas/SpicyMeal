import React, { useContext, useRef, useState } from "react"
import logo from "../assets/logo.png"
import { FaShoppingCart } from "react-icons/fa"
import { IoMdSearch } from "react-icons/io"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { RiMenu3Fill } from "react-icons/ri"
import { AnimatePresence, motion } from "framer-motion"
import { HiOutlineLogout } from "react-icons/hi"
import {
  MdOutlineBookmarkBorder,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md"
import { TiShoppingCart } from "react-icons/ti"
import { HiMiniUserCircle } from "react-icons/hi2"
import { CgProfile } from "react-icons/cg"
import { toast } from "react-toastify"

import { StoreContext } from "../context/StoreContext"
import { navlinks } from "../constants/data"
import SmallScreenSidebar from "./SmallScreenSidebar"
import useClickOutside from "../hooks/useClickOutSide"

const Navbar = () => {
  const userMenuStyles = `px-5 py-2 text-left w-full hover:bg-slate-200 flex items-center gap-2`
  const {
    token,
    setToken,
    getTotalCartAmount,
    search,
    setSearch,
    setIsSmallScreenSidebar,
    setShowLogin,
    fetchCartItems,
    user,
    url,
  } = useContext(StoreContext)

  const [isSearchBox, setIsSearchBox] = useState(false)
  const [isUserMenu, setIsUserMenu] = useState(false)
  const searchButtonRef = useRef(null)
  const userMenuRef = useRef(null)

  useClickOutside(searchButtonRef, isSearchBox, setIsSearchBox)
  useClickOutside(userMenuRef, isUserMenu, setIsUserMenu)
  const navigate = useNavigate()

  const handleLogout = async () => {
    localStorage.removeItem("token")
    setToken("")
    fetchCartItems("")
    navigate("/")
    setIsUserMenu(false)
    toast.success("Logged out successfully!")
  }

  return (
    <div className="section-container sticky top-0 h-16 bg-white border-b z-20">
      <div className="inner-container flex items-center justify-between relative">
        {/* Brand logo and name */}
        <Link to={"/"} className="flex items-center gap-3">
          <img
            src={logo}
            alt="restaurants app"
            className="h-10 p-1.5 bg-themeColor rounded-full"
          />
          <b className="text-2xl hidden xl:block">SpicyMeal</b>
        </Link>

        {/* Nav links for lg screen */}
        <div className="hidden lg:flex gap-5">
          {navlinks.map((nav) => (
            <div key={nav.name}>
              <NavLink
                to={nav.path}
                className={({ isActive }) =>
                  `py-1.5 nav-hover text-sm font-semibold text-gray-500 hover:text-themeColor capitalize ${
                    isActive ? "active-link" : ""
                  }`
                }
              >
                {nav.name}
              </NavLink>
            </div>
          ))}
        </div>

        {/* Cart, search, login or user */}
        <div className="flex items-center gap-3">
          {/* Search for to sm to lg screen */}
          <div className="xl:hidden select-none" ref={searchButtonRef}>
            <IoMdSearch
              className="text-xl cursor-pointer hover:text-themeColor"
              onClick={() => setIsSearchBox(!isSearchBox)}
            />

            <AnimatePresence>
              {isSearchBox && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scaleY: 0.8 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -10, scaleY: 0.8 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute top-[85px] left-0 w-full"
                >
                  <div className="relative bg-white rounded-sm shadow-custom overflow-hidden">
                    <input
                      type="text"
                      className="outline-none py-3 text-sm w-full bg-transparent px-5 rounded-sm"
                      placeholder="Search for foods (e.g., Fried Chicken, Sub Sandwich)"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <IoMdSearch className="text-xl absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search for xl screen */}
          <div className="hidden xl:block relative">
            <IoMdSearch className="absolute text-[22px] text-gray-500 top-2 right-1" />
            <input
              type="text"
              className="outline-none py-1.5 text-sm bg-gray-100 pl-2 pr-6 rounded-sm"
              placeholder="Search Foods..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Cart */}
          <div className="text-xl p-1.5 relative">
            <Link to={"/cart"} className="hover:text-themeColor">
              <FaShoppingCart />
            </Link>

            {getTotalCartAmount() === 0 ? (
              ""
            ) : (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-themeColor"></span>
            )}
          </div>

          {/* Sidebar menu for small screen */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className="relative text-xl hover:text-themeColor rounded-full transition-all duration-300"
              onClick={() => setIsSmallScreenSidebar(true)}
            >
              <RiMenu3Fill />
            </button>

            <SmallScreenSidebar />
          </div>

          {/* Sign in and user */}
          <div className="">
            {!token ? (
              <button
                className="py-1.5 px-3 rounded-sm text-gray-200 text-sm bg-themeColor"
                onClick={() => setShowLogin(true)}
              >
                Sign In
              </button>
            ) : (
              <div className="text-sm" ref={userMenuRef}>
                <button
                  className="flex items-center gap-1 hover:text-themeColor"
                  onClick={() => setIsUserMenu(!isUserMenu)}
                >
                  {user?.image ? (
                    <img
                      src={user.image}
                      className="object-cover h-8 w-8 rounded-full border"
                    />
                  ) : (
                    <HiMiniUserCircle className="h-8 w-8" />
                  )}

                  <span className="hidden lg:flex items-center">
                    {user?.name && (
                      <>
                        {user.name.length > 10
                          ? user.name.slice(0, 10) + "..."
                          : user.name}
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
                      className="h-fit absolute top-[85px] py-1 right-0 bg-white shadow-custom rounded-sm overflow-hidden"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                          delay: 0.1,
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
                        <Link
                          to="/my-orders"
                          className={userMenuStyles}
                          onClick={() => setIsUserMenu(false)}
                        >
                          <TiShoppingCart />
                          <span>My Orders</span>
                        </Link>
                        <Link
                          to="/my-booked-tables"
                          className={userMenuStyles}
                          onClick={() => setIsUserMenu(false)}
                        >
                          <MdOutlineBookmarkBorder />
                          <span>My Booked Tables</span>
                        </Link>
                        <button
                          className={userMenuStyles}
                          onClick={handleLogout}
                        >
                          <HiOutlineLogout />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
