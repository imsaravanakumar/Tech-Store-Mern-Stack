// src/components/Products/ProductDetailModal.jsx
import React, { useState, useEffect } from "react";
import { FaCartPlus, FaBolt, FaTimes } from "react-icons/fa";

const ProductDetailModal = ({ product, onClose, onAddToCart, onBuyNow }) => {
  const [mainImage, setMainImage] = useState(product.images?.[0] || product.image);

  useEffect(() => {
    setMainImage(product.images?.[0] || product.image);
  }, [product]);

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 bg-black bg-opacity-60 overflow-auto w-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-6xl w-full md:flex">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-50 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-full p-2 shadow"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {/* Thumbnails (left) */}
        <div className="hidden md:flex flex-col gap-3 p-4 md:w-20 overflow-auto">
          {product.images?.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={`rounded-lg p-1 transition-shadow duration-150 ${
                mainImage === img ? "ring-2 ring-blue-500" : "hover:ring-1 hover:ring-gray-300"
              }`}
            >
              <img
                src={img}
                alt={`${product.name} thumbnail ${idx + 1}`}
                style={{ width: 64, height: 64, objectFit: "contain" }}
                className="rounded-sm bg-white"
              />
            </button>
          ))}
        </div>

        {/* Main image (center) */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8 border-t md:border-t-0 md:border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <img
            src={mainImage}
            alt={product.name}
            className="max-h-[560px] w-full md:w-auto object-contain rounded-lg"
          />
        </div>

        {/* Info & actions (right) */}
        <div className="md:w-1/3 p-6 flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{product.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{product.subtitle}</p>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">₹{product.price}</div>
            {product.originalPrice && (
              <div className="text-sm line-through text-gray-400">₹{product.originalPrice}</div>
            )}
            {product.discount && (
              <div className="text-sm text-green-600 font-semibold">({product.discount} off)</div>
            )}
          </div>

          {/* ratings / badges */}
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < (product.rating || 0) ? "text-yellow-400" : "text-gray-300"}>★</span>
            ))}
            <span className="text-sm text-gray-500"> {product.reviewsCount ? `${product.reviewsCount} reviews` : ""}</span>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300">{product.description}</p>

          <div className="mt-auto flex gap-3">
            <button
              onClick={() => onAddToCart(product)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-400 hover:from-yellow-600 hover:to-orange-500 text-white py-3 rounded-lg font-semibold shadow"
            >
              <FaCartPlus /> Add to Cart
            </button>
            <button
              onClick={() => onBuyNow ? onBuyNow(product) : onAddToCart(product)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold shadow"
            >
              <FaBolt /> Buy Now
            </button>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 pt-3">
            <p>Secure delivery in 2 days</p>
            {product.charge && <p>Delivery charge: ₹{product.charge}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
