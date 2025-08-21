import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Load cart from backend on first load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("https://tech-store-mern-stack.onrender.com/api/cart");
        setCart(res.data); // Assuming backend returns cart array
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, []);

  // ✅ Add item to cart
  const addToCart = async (item) => {
    const existingItem = cart.find((i) => i._id === item._id);
    if (existingItem) {
      await increaseQty(item._id);
    } else {
      try {
        const res = await axios.post("https://tech-store-mern-stack.onrender.com/api/cart/add", {
          name: item.name,
          color: item.color,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        });

        const savedItem = res.data.item;

        if (savedItem && savedItem._id) {
          setCart((prev) => [...prev, savedItem]);
        } else {
          console.error("Invalid response from backend:", res.data);
        }
      } catch (err) {
        console.error("Error adding to cart:", err);
      }
    }
  };

  // ✅ Increase quantity
  const increaseQty = async (id) => {
    try {
      await axios.put(`https://tech-store-mern-stack.onrender.com/api/cart/increase/${id}`);
      setCart((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      );
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  };

  // ✅ Decrease quantity (and remove if 0)
  const decreaseQty = async (id) => {
    try {
      await axios.put(`https://tech-store-mern-stack.onrender.com/api/cart/decrease/${id}`);
      setCart((prev) =>
        prev
          .map((item) =>
            item._id === id
              ? { ...item, quantity: (item.quantity || 1) - 1 }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    } catch (err) {
      console.error("Error decreasing quantity:", err);
    }
  };

  // ✅ Get total cart item count
  const getCartCount = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  // ✅ Clear entire cart (backend + state)
  const clearCart = async () => {
    try {
      await axios.delete("https://tech-store-mern-stack.onrender.com/api/cart/clear"); // <-- backend route to clear cart
      setCart([]); // Clear state
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        getCartCount,
        clearCart, // ✅ added here
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
