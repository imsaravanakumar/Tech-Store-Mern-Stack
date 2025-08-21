import React, { useState, useEffect } from "react";
import { useCart } from "../components/Cart/CartProvider";
import ProductDetails from "../components/Products/ProductDetails";
import LaptopCarousel from "../components/Layout/LaptopCarousel";
import ProductDetailModal from "../components/Products/ProductDetailModel";
import { FaCartPlus, FaEye } from "react-icons/fa";

// ⭐ Render star ratings
const renderStars = (count) => {
  return [...Array(5)].map((_, i) => (
    <span key={i} className={i < count ? "text-yellow-400" : "text-gray-500"}>
      ★
    </span>
  ));
};

// 💻 Laptop card component
const LaptopCard = ({ laptop, onAddToCart, onView }) => (
  <div className="relative bg-gray-900 text-white rounded-xl p-4 shadow-lg border border-gray-700 w-full flex flex-col">
      <div className="flex-1">
        <img
          src={laptop.image}
          alt={laptop.name}
          className="rounded-lg mb-4 object-contain h-48 w-full bg-white"
        />
        <h3 className="font-semibold text-xl line-clamp-1">{laptop.name}</h3>
        <p className="text-sm text-gray-300 mb-1">{laptop.ram} RAM | {laptop.storage} | {laptop.color}</p>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-green-400 font-bold text-lg">₹{laptop.price}</p>
          <p className="line-through text-gray-500 text-sm">₹{laptop.originalPrice}</p>
        </div>
        <div className="text-yellow-400 mb-2">{renderStars(laptop.rating)}</div>
        <p className="text-sm text-gray-400 mb-4">Delivery: {laptop.delivery}</p>
      </div>
  
      <div className="mt-auto flex gap-3">
        <button
          onClick={() => onAddToCart(laptop)}
          className="flex items-center justify-center gap-2 w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-2 rounded-lg shadow-md transition-colors duration-300"
        >
          <FaCartPlus className="text-lg" /> Add to Cart
        </button>
  
        <button
          onClick={() => onView(laptop)}
          className="flex items-center justify-center gap-2 w-1/2 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 py-2 rounded-lg shadow-md transition-colors duration-300"
        >
          <FaEye className="text-lg" /> View
        </button>
      </div>
    </div>
);

const Laptops = () => {
  const { addToCart } = useCart();
  const [alertMsg, setAlertMsg] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleAddToCart = async (laptop) => {
    try {
      await addToCart(laptop); // useCart handles backend post
      setAlertMsg(`${laptop.name} (${laptop.color}) added to cart`);
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };
   const handleView = (laptop) => {
    // ensure product has `images` array before setting
    setSelectedProduct(laptop);
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
      <LaptopCarousel />
      <div className="min-h-screen p-6 relative">
        {alertMsg && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="animate-slide-up bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg">
              {alertMsg}
            </div>
          </div>
        )}

        <h1 className="text-2xl font-bold mb-6 text-center">Laptops</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ProductDetails.Laptops.map((laptop, index) => (
            <LaptopCard
              key={index}
              laptop={laptop}
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

export default Laptops;
