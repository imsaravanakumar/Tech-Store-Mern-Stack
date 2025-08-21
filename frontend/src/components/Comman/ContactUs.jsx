import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Message sent! We will get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 max-w-3xl w-full border border-gray-200 dark:border-gray-700">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Contact <span className="text-green-600">Us</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-5 text-gray-700 dark:text-gray-300 text-base">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-green-600 text-lg" />
              <span>saravana03tmg@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-green-600 text-lg" />
              <span>+91 9655617827</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-green-600 text-lg" />
              <span>Thirumangalam, Madurai</span>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows="4"
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-sm"
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-transform transform hover:scale-105 shadow-sm text-sm"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
