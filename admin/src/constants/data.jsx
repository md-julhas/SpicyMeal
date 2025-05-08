import { FaBorderAll, FaList, FaMessage, FaUpload } from "react-icons/fa6"
import { BsCheckSquareFill } from "react-icons/bs"
import { PiUsersFourLight } from "react-icons/pi"

export const navLinks = [
  {
    name: "inbox",
    path: "/",
    icon: <FaMessage />,
  },
  {
    name: "Food List",
    path: "/food-list",
    icon: <FaList />,
  },
  {
    name: "food orders",
    path: "/food-orders",
    icon: <FaBorderAll />,
  },
  {
    name: "table orders",
    path: "/table-orders",
    icon: <BsCheckSquareFill />,
  },
  {
    name: "users",
    path: "/users",
    icon: <PiUsersFourLight />,
  },
  {
    name: "upload food",
    path: "/upload-food",
    icon: <FaUpload />,
  },
]
