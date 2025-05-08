import React from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import FoodOrders from "./pages/FoodOrders"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { useStateContext } from "./contexts/ContextProvider"
import UploadFood from "./pages/UploadFood"
import FoodList from "./pages/FoodList"
import Inbox from "./pages/Inbox"
import TableOrders from "./pages/TableOrders"
import Users from "./pages/Users"
import MyProfile from "./pages/MyProfile"
import NotFound from "./pages/NotFound"

const App = () => {
  const { token } = useStateContext()

  return (
    <div>
      <ToastContainer
        className="md:mt-12"
        theme="dark"
        position="top-right"
        autoClose={3000}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/*" element={token ? <Home /> : <Login />}>
            <Route index element={<Inbox />} />
            <Route path="food-list" element={<FoodList />} />
            <Route path="food-orders" element={<FoodOrders />} />
            <Route path="table-orders" element={<TableOrders />} />
            <Route path="users" element={<Users />} />
            <Route path="upload-food" element={<UploadFood />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
