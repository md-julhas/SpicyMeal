import { TfiFacebook } from "react-icons/tfi"
import { IoLogoTwitter } from "react-icons/io"
import { RiLinkedinBoxFill } from "react-icons/ri"
import { FaSquareInstagram } from "react-icons/fa6"

export const menuList = [
  "All Items",
  "burger",
  "pizza",
  "fried chicken",
  "sandwich",
  "grilled salmon",
  "fries",
  "cheesecake",
  "ice cream",
]

export const navlinks = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "book a table",
    path: "/book-table",
  },
  {
    name: "services",
    path: "/services",
  },
  {
    name: "contact us",
    path: "/contact-us",
  },
]

export const socialLinks = [
  {
    id: "1",
    name: "Facebook",
    url: "https://www.facebook.com/JulhasFacebookAccount/",
    icon: <TfiFacebook />,
  },
  {
    id: "2",
    name: "Twitter",
    url: "https://www.facebook.com/JulhasFacebookAccount/",
    icon: <IoLogoTwitter />,
  },
  {
    id: "3",
    name: "LinkedIn",
    url: "https://www.facebook.com/JulhasFacebookAccount/",
    icon: <RiLinkedinBoxFill />,
  },
  {
    id: "4",
    name: "Instagram",
    url: "https://www.facebook.com/JulhasFacebookAccount/",
    icon: <FaSquareInstagram />,
  },
]
