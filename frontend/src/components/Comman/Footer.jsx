import React from "react";
import { BiEnvelope, BiPhone, BiTime } from "react-icons/bi";
import { BsGoogle } from "react-icons/bs";
import { FaPaypal } from "react-icons/fa6";
import { SiRazorpay } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-black via-gray-900 to-black text-white pt-12">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-wide">
            Tech <span className="text-amber-400">Store</span>
          </h1>
          <p className="text-gray-400">
            Your one-stop solution for Mobiles, Laptops & Accessories.  
            Quality you trust, prices you love.
          </p>

          {/* Contact */}
          <div className="space-y-2 text-gray-300">
            <div className="flex items-center gap-2 hover:text-amber-400 transition">
              <BiEnvelope className="text-amber-400" /> 
              <p>saravana03tmg@gmail.com</p>
            </div>
            <div className="flex items-center gap-2 hover:text-amber-400 transition">
              <BiPhone className="text-amber-400" /> 
              <p>+91 96556 17827</p>
            </div>
            <div className="flex items-center gap-2 hover:text-amber-400 transition">
              <BiTime className="text-amber-400" /> 
              <p>Mon-Sat 10:00am - 7pm</p>
            </div>
          </div>

          {/* Payments */}
          <div>
            <h3 className="mt-4 text-lg font-semibold border-l-4 border-amber-400 pl-2">
              We Accept
            </h3>
            <div className="flex gap-3 mt-2">
              <div className="flex items-center gap-2 bg-gray-700/50 hover:bg-amber-400 hover:text-black transition py-1 px-3 rounded-lg text-sm">
                <BsGoogle /> <p>GPay</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-700/50 hover:bg-amber-400 hover:text-black transition py-1 px-3 rounded-lg text-sm">
                <FaPaypal /> <p>PayPal</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-700/50 hover:bg-amber-400 hover:text-black transition py-1 px-3 rounded-lg text-sm">
                <SiRazorpay /> <p>Razorpay</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h1 className="text-xl font-semibold mb-4 border-b-2 border-amber-400 w-max pb-1">
            Shop
          </h1>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="#" className="hover:text-amber-400 transition">Mobile Collections</Link></li>
            <li><Link to="#" className="hover:text-amber-400 transition">Laptop Collections</Link></li>
            <li><Link to="#" className="hover:text-amber-400 transition">Watch Collections</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h1 className="text-xl font-semibold mb-4 border-b-2 border-amber-400 w-max pb-1">
            Support
          </h1>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="#" className="hover:text-amber-400 transition">Contact Us</Link></li>
            <li><Link to="#" className="hover:text-amber-400 transition">About Us</Link></li>
            <li><Link to="#" className="hover:text-amber-400 transition">FAQs</Link></li>
            <li><Link to="#" className="hover:text-amber-400 transition">Features</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h1 className="text-xl font-semibold mb-4 border-b-2 border-amber-400 w-max pb-1">
            Newsletter
          </h1>
          <p className="text-gray-400 mb-4">
            Subscribe & get <span className="text-amber-400 font-semibold">25% OFF</span> your first order.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-lg w-full text-black focus:outline-none bg-white"
            />
            <button className="bg-amber-400 text-black font-semibold px-4 rounded-r-lg hover:bg-white transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-700 py-6">
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Tech Store. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
