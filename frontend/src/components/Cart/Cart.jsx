import React from "react";
import { useCart } from "./CartProvider";

const Cart = () => {
  const { cart, increaseQty, decreaseQty } = useCart();

  // Calculate total amount
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 min-h-screen flex flex-col md:flex-row gap-6">
      {cart.length === 0 ? (
        <p className="text-center text-lg w-full">No items in cart.</p>
      ) : (
        <>
          {/* Left Side - Cart Items */}
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded shadow p-4 flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-600">{item.color}</p>
                  <p className="text-gray-800 font-medium">
                    ₹{item.price.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Price Details */}
          <div className="w-full md:w-80 bg-white rounded shadow p-4 self-start">
            <h2 className="text-lg font-semibold border-b pb-2 mb-4">
              PRICE DETAILS
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Price ({cart.length} items)</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
