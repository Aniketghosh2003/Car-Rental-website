import React, { useState } from "react";
import { assets, cityList } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import { motion } from "motion/react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");

  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate
    );
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center"
    >
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-semibold"
      >
        Luxury cars on Rent
      </motion.h1>

      <motion.form
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
      >
        <motion.div 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-start gap-2"
          >
            <motion.select
              whileFocus={{ scale: 1.02 }}
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="bg-transparent outline-none text-gray-700 px-4 py-2"
            >
              <option value="">Pickup Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </motion.select>
            <motion.p 
              animate={{ opacity: pickupLocation ? 1 : 0.7 }}
              className="px-5 text-sm text-gray-500"
            >
              {pickupLocation ? pickupLocation : "Please select location"}
            </motion.p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-start gap-2"
          >
            <label htmlFor="pickup-date">Pick-up Date</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="date"
              id="pickup-date"
              min={today}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="text-sm text-gray-500"
              required
            />
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-start gap-2"
          >
            <label htmlFor="return-date">Return Date</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="date"
              id="return-date"
              min={pickupDate || today} // Dynamically set min date
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="text-sm text-gray-500"
              required
            />
          </motion.div>
        </motion.div>

        <motion.button 
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer"
        >
          <motion.img
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            src={assets.search_icon}
            alt="search"
            className="brightness-300"
          />
          Search
        </motion.button>
      </motion.form>

      <motion.img 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        src={assets.main_car} 
        alt="car" 
        className="max-h-74" 
      />
    </motion.div>
  );
};

export default Hero;
