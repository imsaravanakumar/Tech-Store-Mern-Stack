import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaSignOutAlt } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br mt-5 from-gray-50 to-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center relative">
        
        {/* Profile Icon */}
        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-amber-400 to-yellow-500 
                        rounded-full flex items-center justify-center shadow-lg -mt-20 mb-4">
          <CgProfile className="text-white text-6xl" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, <span className="text-amber-500">{user.username}</span>
        </h2>

        {/* User Info Card */}
        <div className="space-y-3 text-gray-700 text-left bg-gray-50 p-5 rounded-lg shadow-inner">
          <p className="flex justify-between">
            <span className="font-semibold">Username:</span>
            <span>{user.username}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{user.email}</span>
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center justify-center gap-2 w-full py-3 
                     bg-red-600 hover:bg-red-700 text-white font-semibold 
                     rounded-full shadow-md transition-all duration-200"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
