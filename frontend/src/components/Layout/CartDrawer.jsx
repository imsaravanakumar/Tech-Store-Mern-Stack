import { MdClose } from "react-icons/md";
import Cart from "../Cart/Cart";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartProvider"; // ✅ Import cart context

const CartDrawer = ({ drawerOpen, ocDrawer }) => {
  const navigate = useNavigate();
  const { cart } = useCart(); // ✅ Get cart items from context

  const isCartEmpty = cart.length === 0;

  return (
    <div
      className={`fixed top-0 right-0 w-full h-full bg-white shadow-lg 
      transform transition-transform duration-300 flex flex-col z-50 
      ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-end p-4">
        <button onClick={ocDrawer}>
          <MdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="p-4 flex-grow overflow-y-auto flex flex-col items-center">
        <h1 className="text-xl font-semibold mb-4">Your Cart</h1>
        <Cart />
      </div>

      <div className="sticky bottom-0 p-4 bg-white flex flex-col items-center">
        {!isCartEmpty && ( // ✅ Show button only if cart has items
          <button
            onClick={() => navigate("/checkout/address")}
            className="bg-amber-500 py-2 px-4 w-1/2 rounded-lg text-xl text-white hover:bg-amber-600 hover:cursor-pointer"
          >
            Place Order
          </button>
        )}
        {isCartEmpty && (
          <p className="text-gray-500 text-sm">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
