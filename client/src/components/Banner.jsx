import React from 'react'
import { assets } from '../assets/assets';
import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const { isOwner, axios, setIsOwner, setShowLogin } = useAppContext();
  const navigate = useNavigate();

  const handleListCarClick = async () => {
    if (!isOwner) {
      // If not logged in, open login
      const token = localStorage.getItem("token");
      if (!token) {
        setShowLogin(true);
        return;
      }

      try {
        const { data } = await axios.post("/api/owner/change-role");
        if (data.success) {
          setIsOwner(true);
          navigate("/owner/add-car");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/owner/add-car");
    }
  };
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-white"
      >
        <h2 className="text-3xl font-medium">Do You Own a Luxury Car?</h2>
        <p className="mt-2">
          Monetize your vehicle effortlessly by listing it on CarRental.
        </p>
        <p className="max-w-130">
          We take care of insurance, driver verification and secure payments -
          so you can earn passive income, stress-free.
        </p>

        <button
          onClick={handleListCarClick}
          className="px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer"
        >
          List your car
        </button>
      </motion.div>

      <motion.img 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        src={assets.banner_car_image} 
        alt="car" 
        className="max-h-45 mt-10" 
      />
    </motion.div>
  );
}

export default Banner
