import React from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-green-50 to-green-100 text-center px-4">
      {/* Animated Checkmark */}
      <div className="mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-green-500 shadow-lg animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-7.07 7.07a1 1 0 01-1.415 0l-3.536-3.536a1 1 0 111.415-1.414l2.828 2.828 6.364-6.364a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-green-700">Order Successful!</h1>
      <p className="mt-2 text-lg text-gray-700">
        Thank you for your purchase. Your order will be processed shortly.
      </p>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
      >
        <FaHome/> Back to Home
      </button>
    </div>
  );
};

export default OrderSuccess;
