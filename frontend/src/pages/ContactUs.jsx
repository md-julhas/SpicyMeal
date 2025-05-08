import React, { useState, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"

import { StoreContext } from "../context/StoreContext"
import { Helmet } from "react-helmet"

const ContactUs = () => {
  const inputStyles =
    "w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-1 focus:ring-themeColor"

  const { url } = useContext(StoreContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    messageType: "inquiry",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post(`${url}/api/contact-us/create`, formData)
      toast.success("Message sent successfully!")
      setFormData({
        name: "",
        email: "",
        phone: "",
        messageType: "inquiry",
        message: "",
      })
    } catch (err) {
      toast.error(err.response?.data?.message)
    }
    setLoading(false)
  }

  return (
    <div className="section-container py-10 bg-gray-100">
      <div className="inner-container shadow-custom rounded-md p-8 max-w-lg w-full bg-white">
        <Helmet>
          <title>Contact Us | SpicyMeal</title>
          <meta
            name="description"
            content="Have questions or need support? Reach out to SpicyMeal through our Contact Us page. We're here to assist with any inquiries about our food delivery services and orders."
          />
          <meta
            name="keywords"
            content="SpicyMeal, contact us, customer support, food delivery, order assistance, spicy meal inquiries, customer service, contact page"
          />
        </Helmet>

        <h2 className="text-3xl font-bold text-center mb-2">Let's Talk</h2>
        <p className="text-center mb-6 text-gray-400">
          You can contact us for inquiries, complaints, feedback, catering
          services, or any other concerns. We're here to assist you!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className={inputStyles}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            className={inputStyles}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            className={inputStyles}
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone (Optional)"
          />
          <select
            className={inputStyles}
            name="messageType"
            value={formData.messageType}
            onChange={handleChange}
            required
          >
            <option value="inquiry">Inquiry</option>
            <option value="complaint">Complaint</option>
            <option value="feedback">Feedback</option>
            <option value="catering">Catering</option>
            <option value="other">Other</option>
          </select>
          <textarea
            className={inputStyles}
            rows={3}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            required
          />
          <button
            className="w-full bg-themeColor text-gray-100 py-2 rounded-sm"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactUs
