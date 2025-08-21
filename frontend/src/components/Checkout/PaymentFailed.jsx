import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-red-50 to-red-100 text-center px-4">
      <div className="mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-red-500 shadow-lg animate-pulse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h2 className="text-4xl font-bold text-red-600">Payment Failed</h2>
      <p className="mt-2 text-lg text-gray-700">
        Your payment could not be completed. Please try again.
      </p>

      <button
        onClick={() => navigate("/payment")}
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
      >
         Retry Payment
      </button>
    </div>
  );
};

export default PaymentFailed;
