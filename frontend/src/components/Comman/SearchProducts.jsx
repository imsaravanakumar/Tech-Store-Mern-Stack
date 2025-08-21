import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../Cart/CartProvider";
import { FaCartPlus } from "react-icons/fa";

const SearchProducts = ({ products }) => {
  const { query } = useParams();
  const decodedQuery = decodeURIComponent(query);
  const { addToCart } = useCart();

  // For alert message on add to cart
  const [alertMsg, setAlertMsg] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(decodedQuery.toLowerCase())
  );

  // Show alert for 2 seconds
  const handleAddToCart = (product) => {
    addToCart(product);
    setAlertMsg(`${product.name} added to cart!`);
    setTimeout(() => setAlertMsg(""), 2000);
  };

  return (
    <div className="p-6 mt-10">
      {/* Alert Notification */}
      {alertMsg && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg animate-bounce">
            {alertMsg}
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">
        Search Results for "{decodedQuery}"
      </h2>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="relative bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-contain bg-white"
                />
                {/* Example "New" badge, optionally render based on some product property */}
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    New
                  </span>
                )}
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
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchProducts;
