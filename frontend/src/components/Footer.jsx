import React from "react"
import { CiLocationOn } from "react-icons/ci"
import { CiPhone } from "react-icons/ci"
import { Link } from "react-router-dom"

import logo from "../assets/logo.png"
import SocialLinks from "./SocialLinks"
import { navlinks } from "../constants/data"

const Footer = () => {
  return (
    <div className="section-container bg-[#202526] text-gray-200">
      <div className="inner-container ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:justify-items-center py-14 border-b border-gray-700">
          <div>
            {/* Brand logo and name */}
            <Link to={"/"} className="flex items-center gap-3">
              <img
                src={logo}
                alt="restaurants app"
                className="h-10 p-1.5 bg-themeColor rounded-full"
              />
              <b className="text-xl hidden xl:block">SpicyMeal</b>
            </Link>

            {/* Address */}
            <div className="text-gray-400 flex flex-col gap-2 py-5">
              <div className="flex items-center gap-2">
                <CiLocationOn /> 123 address St, City, State, ZIP
              </div>
              <div className="flex items-center gap-2">
                <CiPhone /> +1 (555) 123-4567
              </div>
            </div>

            <SocialLinks bgColor={"#2E3436"} />
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-5 font-bold">Quick Links</h3>
            <div className="flex flex-col gap-2 capitalize text-sm text-gray-400">
              {navlinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="hover:text-themeColor w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Opening hours */}
          <div>
            <h3 className="mb-5 font-bold">Opening Hours</h3>
            <div className="text-gray-400 pb-2">
              Satardy - Thusday: 10AM - 11PM
            </div>
            <div className="text-gray-400">Friday: Closed</div>
          </div>
        </div>

        {/* Footer with Copyright, Terms, Privacy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm py-7 text-gray-400">
          <div>
            <div>
              COPYRIGHT © {new Date().getFullYear()}
              <b className="text-themeColor"> SpicyMeal</b> 2025 | All Rights
              Reserved
            </div>
            {/* Developer info */}
            <p className="py-2">
              Developed by: <b> Md Julhas</b>
            </p>
          </div>
          <div className="flex gap-5 justify-start md:justify-end">
            <div>
              <Link to={""} className="hover:text-themeColor">
                Terms & Condition
              </Link>
            </div>
            <div>
              <Link to={""} className="hover:text-themeColor">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
