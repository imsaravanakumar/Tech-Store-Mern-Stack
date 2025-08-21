// src/components/Products/ProductCard.jsx
import React, { useState, useEffect } from "react";
import { useCart } from "../Cart/CartProvider";
import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [alertMsg, setAlertMsg] = useState("");

  const handleAddToCart = async (item) => {
    addToCart(item);
    setAlertMsg(`${item.name}${item.color ? ` (${item.color})` : ""} added to cart`);

    try {
      const res = await fetch("https://tech-store-mern-stack.onrender.com/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) {
        console.error("❌ Failed to save to MongoDB");
      }
    } catch (err) {
      console.error("MongoDB error:", err);
    }
  };

  useEffect(() => {
    if (alertMsg) {
      const timer = setTimeout(() => setAlertMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMsg]);

  return (
    <div className="relative bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* ✅ Alert Notification */}
      {alertMsg && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg animate-bounce">
            {alertMsg}
          </div>
        </div>
      )}

      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-contain"
        />
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          New
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          ₹{product.price}
        </p>
        <button
          onClick={() => handleAddToCart(product)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium shadow-md transition-colors duration-300"
        >
          <FaCartPlus className="text-lg" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
