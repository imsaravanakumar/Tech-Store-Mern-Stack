// src/pages/Phones.jsx
import React, { useState, useEffect } from "react";
import { FaCartPlus, FaEye } from "react-icons/fa";
import { useCart } from "../components/Cart/CartProvider";
import ProductDetails from "../components/Products/ProductDetails";
import PhoneCarousel from "../components/Layout/PhoneCarousel";
import ProductDetailModal from "../components/Products/ProductDetailModel";

const renderStars = (count) => {
  return [...Array(5)].map((_, i) => (
    <span key={i} className={i < count ? "text-yellow-400" : "text-gray-500"}>★</span>
  ));
};

const MobileCard = ({ phone, onAddToCart, onView }) => (
  <div className="relative bg-gray-900 text-white rounded-xl p-4 shadow-lg border border-gray-700 w-full flex flex-col">
    <div className="flex-1">
      <img
        src={phone.image}
        alt={phone.name}
        className="rounded-lg mb-4 object-contain h-48 w-full bg-gray-800"
      />
      <h3 className="font-semibold text-xl line-clamp-1">{phone.name}</h3>
      <p className="text-sm text-gray-300 mb-1">{phone.ram} RAM | {phone.storage} | {phone.color}</p>
      <div className="flex items-center gap-2 mb-1">
        <p className="text-green-400 font-bold text-lg">₹{phone.price}</p>
        <p className="line-through text-gray-500 text-sm">₹{phone.originalPrice}</p>
      </div>
      <div className="text-yellow-400 mb-2">{renderStars(phone.rating)}</div>
      <p className="text-sm text-gray-400 mb-4">Delivery: {phone.delivery}</p>
    </div>

    <div className="mt-auto flex gap-3">
      <button
        onClick={() => onAddToCart(phone)}
        className="flex items-center justify-center gap-2 w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-2 rounded-lg shadow-md transition-colors duration-300"
      >
        <FaCartPlus className="text-lg" /> Add to Cart
      </button>

      <button
        onClick={() => onView(phone)}
        className="flex items-center justify-center gap-2 w-1/2 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 py-2 rounded-lg shadow-md transition-colors duration-300"
      >
        <FaEye className="text-lg" /> View
      </button>
    </div>
  </div>
);

const Phones = () => {
  const { addToCart } = useCart();
  const [alertMsg, setAlertMsg] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = async (phone) => {
    addToCart(phone);
    setAlertMsg(`${phone.name} (${phone.color}) added to cart`);
    // optional: persist to your API
  };

  const handleView = (phone) => {
    // ensure product has `images` array before setting
    setSelectedProduct(phone);
  };

  const handleBuyNow = (product) => {
    // implement buy now functionality or navigate to checkout
    console.log("buy now", product);
  };

  useEffect(() => {
    if (alertMsg) {
      const timer = setTimeout(() => setAlertMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMsg]);

  return (
    <>
      <PhoneCarousel />
      <div className="min-h-screen p-6 relative">
        {alertMsg && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg animate-slide-up">
              {alertMsg}
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-6 text-white">Mobiles</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ProductDetails.Phones.map((phone, index) => (
            <MobileCard
              key={index}
              phone={phone}
              onAddToCart={handleAddToCart}
              onView={handleView}
            />
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p) => {
            handleAddToCart(p);
            // optionally close modal: setSelectedProduct(null)
          }}
          onBuyNow={handleBuyNow}
        />
      )}
    </>
  );
};

export default Phones;
