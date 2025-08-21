// src/components/Checkout/AddressForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartProvider";
import { FaAddressCard, FaArrowRight, FaUser, FaPhone, FaHome, FaCity, FaMailBulk } from "react-icons/fa";

const AddressForm = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cart]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "shippingData",
      JSON.stringify({ ...formData, totalAmount })
    );
    navigate("/payment");
  };

  if (loading) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 animate-pulse">
        <div className="h-6 w-40 bg-orange-200 rounded-lg mb-6"></div>
        <div className="h-12 w-full bg-orange-200 rounded-lg mb-4"></div>
        <div className="h-12 w-full bg-orange-200 rounded-lg mb-4"></div>
        <div className="h-20 w-full bg-orange-200 rounded-lg mb-4"></div>
        <div className="h-12 w-full bg-orange-200 rounded-lg mb-4"></div>
        <div className="h-12 w-full bg-orange-200 rounded-lg mb-4"></div>
        <div className="h-12 w-full bg-orange-300 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-gradient-to-br from-orange-50 via-white to-orange-100 rounded-2xl shadow-lg border border-orange-300 animate-fadeIn">
      <h2 className="text-2xl flex justify-center items-center gap-3 font-bold mb-4 text-center text-orange-700">
        Shipping Address <FaAddressCard />
      </h2>

      <div className="mb-4 p-4 border border-orange-300 rounded-lg bg-orange-50 text-lg font-semibold text-orange-600 text-center shadow-sm">
        Total Amount: ₹{totalAmount.toFixed(2)}
      </div>

    <form onSubmit={handleSubmit} className="space-y-4">

  <label className="relative block text-orange-700 font-medium">
    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none" />
    <input
      type="text"
      name="name"
      placeholder="Full Name"
      value={formData.name}
      onChange={handleChange}
      className="w-full border border-orange-300 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
      required
    />
  </label>

  <label className="relative block text-orange-700 font-medium">
    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none" />
    <input
      type="tel"
      name="phone"
      placeholder="Phone Number"
      value={formData.phone}
      onChange={handleChange}
      className="w-full border border-orange-300 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
      required
    />
  </label>

  <label className="relative block text-orange-700 font-medium">
    <FaHome className="absolute left-3 top-3 text-orange-500 pointer-events-none" />
    <textarea
      name="address"
      placeholder="Address"
      value={formData.address}
      onChange={handleChange}
      className="w-full border border-orange-300 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
      rows="3"
      required
    />
  </label>

  <label className="relative block text-orange-700 font-medium">
    <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none" />
    <input
      type="text"
      name="city"
      placeholder="City"
      value={formData.city}
      onChange={handleChange}
      className="w-full border border-orange-300 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
      required
    />
  </label>

  <label className="relative block text-orange-700 font-medium">
    <FaMailBulk className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none" />
    <input
      type="text"
      name="pincode"
      placeholder="Pincode"
      value={formData.pincode}
      onChange={handleChange}
      className="w-full border border-orange-300 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
      required
    />
  </label>

  <button
    type="submit"
    className="flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 transition-all duration-200 text-white font-semibold py-3 px-4 rounded-lg w-full shadow-md hover:shadow-lg"
  >
    Next <FaArrowRight />
  </button>
</form>

    </div>
  );
};

export default AddressForm;
