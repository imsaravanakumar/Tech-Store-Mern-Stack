import React, { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CgProfile, CgShoppingCart } from "react-icons/cg";
import Searchbar from "./Searchbar";
import CartDrawer from "../Layout/CartDrawer";
import { useCart } from "../Cart/CartProvider";
import ProductDetails from "../Products/ProductDetails";
import { BiUser } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { getCartCount } = useCart();

  const ocDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleMobileNav = () => setMobileNavOpen(!mobileNavOpen);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full flex items-center justify-between px-6 py-3 
        bg-gradient-to-r from-gray-900 via-gray-800 to-black
        text-white shadow-lg fixed top-0 left-0 z-50 backdrop-blur-lg">
        
        {/* Logo */}
        <Link to="/" className="text-xl md:text-3xl font-extrabold tracking-wide">
          Tech<span className="text-amber-400">Store</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {["/", "/phones", "/laptops", "/watches"].map((path, i) => (
            <Link
              key={i}
              to={path}
              className={`uppercase tracking-wide text-sm font-semibold transition-all relative 
                ${isActive(path) ? "text-amber-400" : "text-gray-300 hover:text-white"}`}
            >
              {path === "/" ? "Home" : path.replace("/", "")}
              {isActive(path) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-5">
          {/* Cart */}
          <button onClick={ocDrawer} className="relative">
            <CgShoppingCart className="h-6 w-6 text-amber-400 hover:scale-110 transition" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-400 text-black font-bold text-xs rounded-full px-1.5 py-0.5">
                {getCartCount()}
              </span>
            )}
          </button>

          {/* Search */}
          <div className="hidden md:block">
            <Searchbar
              products={[
                ...ProductDetails.Phones,
                ...ProductDetails.Laptops,
                ...ProductDetails.Watches,
              ]}
            />
          </div>

          {/* Auth */}
          {token ? (
            <>
              <Link to="/profile" className="hidden md:block">
                <CgProfile className="h-6 w-6 text-gray-300 hover:text-amber-400 transition" />
              </Link>
              <button
                onClick={logout}
                className="hidden md:flex py-1 px-5 rounded bg-red-600 hover:bg-red-700 text-sm  items-center gap-1"
              >
               <FaSignOutAlt/>Logout
              </button>
            </>
          ) : (
            <div className="hidden md:flex space-x-2">
              <Link
                to="/login"
                className="px-5 py-1 bg-amber-400 rounded flex items-center gap-1"
              >
                <BiUser/>Login
              </Link>
              
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileNav}
            className="md:hidden hover:scale-110 transition"
          >
            {mobileNavOpen ? (
              <FaXmark className="h-6 w-6 text-amber-400" />
            ) : (
              <FaBars className="h-6 w-6 text-gray-300" />
            )}
          </button>
        </div>
      </nav>

      {/* CART DRAWER */}
      <CartDrawer drawerOpen={drawerOpen} ocDrawer={ocDrawer} />

      {/* MOBILE NAV */}
      <div
        className={`fixed flex flex-col md:hidden top-0 left-0 h-full w-3/5 sm:w-1/2 
          bg-gray-900 text-white shadow-lg transform transition-transform duration-300 z-40 
          ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Links */}
        <div className="flex flex-col space-y-4 mt-16 px-6">
          {["/", "/phones", "/laptops", "/watches"].map((path, i) => (
            <Link
              key={i}
              to={path}
              onClick={toggleMobileNav}
              className={`uppercase py-2 text-lg font-semibold 
                ${isActive(path) ? "text-amber-400" : "text-gray-300 hover:text-white"}`}
            >
              {path === "/" ? "Home" : path.replace("/", "")}
            </Link>
          ))}
        </div>

        {/* Auth (mobile) */}
        <div className="mt-auto p-6 border-t border-gray-700">
          {token ? (
            <button
              onClick={() => {
                logout();
                toggleMobileNav();
              }}
              className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-full"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link
                to="/login"
                onClick={toggleMobileNav}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={toggleMobileNav}
                className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-full text-center"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
