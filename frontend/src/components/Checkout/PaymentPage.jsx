import React, { useState, useEffect } from "react";
import { FaCheck, FaLocationPin, FaPhone } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartProvider";
import { FaCreditCard } from "react-icons/fa";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [totalAmount, setTotalAmount] = useState(0);
  const [address, setAddress] = useState({});
  const { clearCart } = useCart();

  // For fade-in animation on mount
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const shippingData = JSON.parse(localStorage.getItem("shippingData"));
    if (shippingData) {
      setTotalAmount(shippingData.totalAmount || 0);
      setAddress({
        name: shippingData.name || "",
        phone: shippingData.phone || "",
        street: shippingData.street || "",
        city: shippingData.city || "",
        pincode: shippingData.pincode || "",
      });
    }
    setIsVisible(true);
  }, []);

  const handlePlaceOrder = () => {
    if (paymentMethod === "razorpay") {
      navigate("/razorpay");
    } else {
      clearCart();
      navigate("/order-success");
    }
  };

  return (
    <div
      className={`p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg border border-gray-100
        transform transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 justify-center items-center gap-3 flex">
        <FaCreditCard className="mt-1"/> Payment
      </h2>

      <div
        className="mb-6 p-4 border border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm
          transition-transform duration-500 ease-out
          hover:scale-[1.02]"
      >
        <h3 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
          <FaLocationPin /> Shipping Address
        </h3>
        <p className="text-gray-900 font-medium">{address.name}</p>
        <p className="text-gray-600 flex items-center gap-2">
          <FaPhone /> {address.phone}
        </p>
        <p className="text-gray-600">{address.street}</p>
        <p className="text-gray-600">
          {address.city} - {address.pincode}
        </p>
      </div>

      {/* Total Amount */}
      <div
        className="mb-6 p-4 border border-orange-200 rounded-xl bg-orange-50 shadow-sm flex justify-between items-center
          transition-transform duration-500 ease-out
          hover:scale-[1.03]"
      >
        <span className="text-lg font-medium text-gray-700">Total Amount:</span>
        <span className="text-xl font-bold text-orange-600">
          ₹{totalAmount.toFixed(2)}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        {[
          { id: "cod", label: "Cash on Delivery" },
          { id: "razorpay", label: "Razorpay" },
        ].map((method) => (
          <label
            key={method.id}
            className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition
              duration-300 ease-in-out transform
              ${
                paymentMethod === method.id
                  ? "border-orange-400 bg-orange-50 scale-105 shadow-md"
                  : "border-gray-200 hover:border-orange-300 hover:scale-105"
              }`}
          >
            <input
              type="radio"
              value={method.id}
              checked={paymentMethod === method.id}
              onChange={() => setPaymentMethod(method.id)}
              className="w-4 h-4"
            />
            <span className="font-medium text-gray-700">{method.label}</span>
          </label>
        ))}
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white font-semibold py-3 px-6 rounded-xl w-full shadow-md hover:shadow-lg flex justify-center items-center gap-1 text-xl
          active:scale-95 active:bg-orange-700"
      >
        <FaCheck className="text-green-400" /> Place Order
      </button>
    </div>
  );
};

export default PaymentPage;
