import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext.jsx";
import {motion} from "motion/react";
import toast from "react-hot-toast";

const Navbar = () => {

  const {setShowLogin,user, logout, isOwner, axios, setIsOwner} = useAppContext();

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change role");
    }
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${
        location.pathname === "/" && "bg-light"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex-shrink-0 z-10">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          src={assets.logo} 
          alt="logo" 
          className="h-8" 
        />
      </Link>

      {/* Desktop Navigation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="hidden sm:flex items-center gap-8 flex-1 justify-center"
      >
        {menuLinks.map((link, index) => (
          <motion.div
            key={index}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            whileHover={{ y: -2 }}
          >
            <Link
              to={link.path}
              className="hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              {link.name}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Desktop Search Bar */}
      <div className="hidden lg:flex items-center text-sm gap-3 border border-borderColor px-4 py-2 rounded-full max-w-64 mx-4">
        <input
          type="text"
          className="w-full bg-transparent outline-none placeholder-gray-400 text-gray-700"
          placeholder="Search cars..."
        />
        <img
          src={assets.search_icon}
          alt="search"
          className="w-4 h-4 opacity-60"
        />
      </div>

      {/* Desktop Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="hidden sm:flex items-center gap-4 flex-shrink-0"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (isOwner ? navigate("/owner") : changeRole())}
          className="hover:text-gray-900 transition-colors duration-200 font-medium"
        >
          {isOwner ? "Dashboard" : "List cars"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            user ? logout() : setShowLogin(true);
          }}
          className="px-6 py-2.5 bg-primary hover:bg-primary-dull transition-all duration-200 text-white rounded-lg font-medium shadow-sm hover:shadow-md"
        >
          {user ? "Logout" : "Login"}
        </motion.button>
      </motion.div>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className={`sm:hidden fixed inset-0 top-16 bg-white z-40 ${
          location.pathname === "/" ? "bg-light" : "bg-white"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Navigation Links */}
          <div className="flex flex-col px-6 py-8 space-y-6">
            {menuLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: open ? 0 : 50, opacity: open ? 1 : 0 }}
                transition={{ delay: open ? 0.1 * index : 0, duration: 0.3 }}
              >
                <Link
                  to={link.path}
                  className="text-lg font-medium hover:text-gray-900 transition-colors duration-200 py-2 border-b border-gray-100 last:border-b-0"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Search Bar */}
          <div className="px-6 mb-8">
            <div className="flex items-center gap-3 border border-borderColor px-4 py-3 rounded-lg bg-gray-50">
              <input
                type="text"
                className="w-full bg-transparent outline-none placeholder-gray-400 text-gray-700"
                placeholder="Search cars..."
              />
              <img
                src={assets.search_icon}
                alt="search"
                className="w-4 h-4 opacity-60"
              />
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="px-6 space-y-4 mt-auto mb-8">
            <button
              onClick={() => {
                isOwner ? navigate("/owner") : changeRole();
                setOpen(false);
              }}
              className="w-full text-left text-lg font-medium hover:text-gray-900 transition-colors duration-200 py-3 border border-gray-200 rounded-lg px-4 bg-gray-50"
            >
              {isOwner ? "Dashboard" : "List cars"}
            </button>
            <button
              onClick={() => {
                user ? logout() : setShowLogin(true);
                setOpen(false);
              }}
              className="w-full px-6 py-3 bg-primary hover:bg-primary-dull transition-all duration-200 text-white rounded-lg font-medium shadow-sm"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="sm:hidden p-2 z-50 relative"
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
      >
        <motion.img
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          className="w-6 h-6 transition-transform duration-200"
        />
      </motion.button>

      {/* Mobile Overlay */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="sm:hidden fixed inset-0 bg-black bg-opacity-20 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </motion.div>
  );
};

export default Navbar;
