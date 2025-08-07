import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets.js";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${
        location.pathname === "/" && "bg-light"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex-shrink-0 z-10">
        <img src={assets.logo} alt="logo" className="h-8" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-8 flex-1 justify-center">
        {menuLinks.map((link, index) => (
          <Link 
            key={index} 
            to={link.path} 
            className="hover:text-gray-900 transition-colors duration-200 font-medium"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden lg:flex items-center text-sm gap-3 border border-borderColor px-4 py-2 rounded-full max-w-64 mx-4">
        <input
          type="text"
          className="w-full bg-transparent outline-none placeholder-gray-400 text-gray-700"
          placeholder="Search cars..."
        />
        <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-60" />
      </div>

      {/* Desktop Action Buttons */}
      <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
        <button 
          onClick={() => navigate("/owner")} 
          className="px-4 py-2 hover:text-gray-900 transition-colors duration-200 font-medium"
        >
          Dashboard
        </button>
        <button
          onClick={() => setShowLogin(true)}
          className="px-6 py-2.5 bg-primary hover:bg-primary-dull transition-all duration-200 text-white rounded-lg font-medium shadow-sm hover:shadow-md"
        >
          Login
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`sm:hidden fixed inset-0 top-16 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        } ${location.pathname === "/" ? "bg-light" : "bg-white"}`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Navigation Links */}
          <div className="flex flex-col px-6 py-8 space-y-6">
            {menuLinks.map((link, index) => (
              <Link 
                key={index} 
                to={link.path}
                className="text-lg font-medium hover:text-gray-900 transition-colors duration-200 py-2 border-b border-gray-100 last:border-b-0"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
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
              <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-60" />
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="px-6 space-y-4 mt-auto mb-8">
            <button 
              onClick={() => {navigate("/owner"); setOpen(false);}} 
              className="w-full text-left text-lg font-medium hover:text-gray-900 transition-colors duration-200 py-3 border border-gray-200 rounded-lg px-4 bg-gray-50"
            >
              Dashboard
            </button>
            <button
              onClick={() => {setShowLogin(true); setOpen(false);}}
              className="w-full px-6 py-3 bg-primary hover:bg-primary-dull transition-all duration-200 text-white rounded-lg font-medium shadow-sm"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="sm:hidden p-2 z-50 relative" 
        aria-label="Toggle menu" 
        onClick={() => setOpen(!open)}
      >
        <img 
          src={open ? assets.close_icon : assets.menu_icon} 
          alt="menu" 
          className="w-6 h-6 transition-transform duration-200"
        />
      </button>

      {/* Mobile Overlay */}
      {open && (
        <div 
          className="sm:hidden fixed inset-0 bg-black bg-opacity-20 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
