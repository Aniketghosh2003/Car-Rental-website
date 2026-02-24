import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import {motion} from "motion/react";
import toast from "react-hot-toast";

const Navbar = () => {

  const {setShowLogin,user, logout, isOwner, axios, setIsOwner} = useAppContext();

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

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

      {/* Desktop Navigation - centered */}
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const term = searchTerm.trim();
              if (term) {
                navigate(`/cars?q=${encodeURIComponent(term)}`);
              } else {
                navigate("/cars");
              }
            }
          }}
          className="w-full bg-transparent outline-none placeholder-gray-400 text-gray-700"
          placeholder="Search cars..."
        />
        <img
          src={assets.search_icon}
          alt="search"
          className="w-4 h-4 opacity-60 cursor-pointer"
          onClick={() => {
            const term = searchTerm.trim();
            if (term) {
              navigate(`/cars?q=${encodeURIComponent(term)}`);
            } else {
              navigate("/cars");
            }
          }}
        />
      </div>

      {/* Desktop Action Buttons */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="hidden sm:flex items-center gap-4 flex-shrink-0"
      >
        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (isOwner ? navigate("/owner") : changeRole())}
          className="hover:text-gray-900 transition-colors duration-200 font-medium"
        >
          {isOwner ? "Dashboard" : "List cars"}
        </motion.button> */}
        {user ? (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              <img
                src={user.image || assets.user_profile}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </motion.button>

            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg text-sm z-50"
              >
                {isOwner && (
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/owner");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    Dashboard
                  </button>
                )}
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/my-bookings");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50"
                >
                  My Bookings
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLogin(true)}
            className="px-6 py-2.5 bg-primary hover:bg-primary-dull transition-all duration-200 text-white rounded-lg font-medium shadow-sm hover:shadow-md"
          >
            Login
          </motion.button>
        )}
      </motion.div>

      {/* Mobile Profile in Header (no hamburger) */}
      <div className="sm:hidden flex items-center gap-3 z-50">
        {user ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden"
          >
            <img
              src={user.image || assets.user_profile}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowLogin(true)}
            className="text-sm font-medium text-primary"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Navigation Menu (slides in on profile click) */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="sm:hidden fixed inset-0 z-50 bg-white"
      >
        <div className="flex flex-col h-full px-6 py-8 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-700">Account</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <img
                src={assets.close_icon}
                alt="close menu"
                className="w-4 h-4"
              />
            </button>
          </div>

          {isOwner && (
            <button
              onClick={() => {
                navigate("/owner");
                setOpen(false);
              }}
              className="w-full text-left text-base font-medium py-3 border-b border-gray-100"
            >
              Dashboard
            </button>
          )}

          <button
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
            className="w-full text-left text-base font-medium py-3 border-b border-gray-100"
          >
            Profile
          </button>

          <button
            onClick={() => {
              navigate("/my-bookings");
              setOpen(false);
            }}
            className="w-full text-left text-base font-medium py-3 border-b border-gray-100"
          >
            My Bookings
          </button>

          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full text-left text-base font-medium py-3 text-red-600"
          >
            Logout
          </button>
        </div>
      </motion.div>

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
