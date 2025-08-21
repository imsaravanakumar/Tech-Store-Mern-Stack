import React from "react";
import { FaLaptopCode, FaUsers, FaShoppingCart } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 max-w-3xl text-center border border-gray-200 dark:border-gray-700">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          About <span className="text-blue-600">TechStore</span>
        </h1>

        {/* Intro */}
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm leading-relaxed">
          At <strong>TechStore</strong>, we’re passionate about bringing you the
          latest in technology. From laptops to accessories, our mission is to
          make tech shopping simple, reliable, and enjoyable.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-xl shadow-md bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition">
            <FaLaptopCode className="text-3xl text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-1">
              Latest Tech
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              We provide only the newest gadgets and accessories to keep you ahead.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl shadow-md bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition">
            <FaUsers className="text-3xl text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-1">
              Customer First
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Your satisfaction is our priority. We’re here to support you 24/7.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-xl shadow-md bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition">
            <FaShoppingCart className="text-3xl text-pink-600 mx-auto mb-3" />
            <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-1">
              Easy Shopping
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Fast delivery, secure payments, and a smooth shopping journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
