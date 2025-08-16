import React from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import CarCard from "./CarCard";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion"; // Corrected import
import { assets } from "../assets/assets";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();

  // Variants for staggering the car card animations
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }} // Animation triggers only once
      >
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for your next adventure."
        />
      </motion.div>

      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }} // Animation triggers only once
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18"
      >
        {cars.slice(0, 6).map((car) => (
          <motion.div key={car._id} variants={cardVariants}>
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }} // Animation triggers only once
        onClick={() => {
          navigate("/cars");
          window.scrollTo(0, 0); // Use window.scrollTo
        }}
        className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer transition-colors duration-200"
      >
        Explore all cars
        <img src={assets.arrow_icon} alt="arrow" />
      </motion.button>
    </div>
  );
};

export default FeaturedSection;
