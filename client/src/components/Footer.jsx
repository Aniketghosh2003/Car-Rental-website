import React from 'react'
import { assets } from '../assets/assets';
import { motion } from "motion/react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16 text-sm text-gray-500"
    >
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-80"
        >
          <img src={assets.logo} alt="logo" className="h-8 md:h-9" />
          <p className="max-w-80 mt-3">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <span>
              <img
                src={assets.instagram_logo}
                alt="Instagram"
                className="w-5 h-5"
              />
            </span>
            <span>
              <img
                src={assets.facebook_logo}
                alt="Facebook"
                className="w-5 h-5"
              />
            </span>
            <span>
              <img
                src={assets.twitter_logo}
                alt="Twitter"
                className="w-5 h-5"
              />
            </span>
            <span>
              <img src={assets.gmail_logo} alt="Gmail" className="w-5 h-5" />
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Quick Links
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <Link to="/" className="hover:text-gray-700 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/cars" className="hover:text-gray-700 transition-colors">Browse Cars</Link>
            </li>
            <li>
              <Link to="/my-bookings" className="hover:text-gray-700 transition-colors">My Bookings</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-700 transition-colors">About Us</Link>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Resources
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <Link to="/help-center" className="hover:text-gray-700 transition-colors">Help Center</Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:text-gray-700 transition-colors">Terms of Service</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <a 
                href="https://www.icicilombard.com/motor-insurance" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-700 transition-colors"
              >
                Car Insurance
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Contact
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <span className="block">📍 123 MG Road, Connaught Place</span>
              <span className="block ml-4">New Delhi - 110001</span>
            </li>
            <li>
              <a href="tel:+910000000000" className="hover:text-gray-700">
                📞 +91 00000 00000
              </a>
            </li>
            <li>
              <a
                href="mailto:info@carrental.com"
                className="hover:text-gray-700"
              >
                ✉️ info@carrental.com
              </a>
            </li>
            <li>
              <span className="block">🕒 Mon - Sun: 7:00 AM - 10:00 PM</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5"
      >
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-medium">CarRental India</span>. All rights
          reserved.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <span>Privacy</span>
            <span> | </span>
          </li>
          <li>
            <span>Terms</span>
            <span> | </span>
          </li>
          <li>
            <span>Cookies</span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default Footer
