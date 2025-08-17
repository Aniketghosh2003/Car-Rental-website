import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import CarCard from "./CarCard";
import { useAppContext } from "../context/AppContext.jsx";
import { motion } from "motion/react";
import { assets } from "../assets/assets";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars, fetchCars } = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCars = async () => {
      if (cars.length === 0) {
        setLoading(true);
        try {
          await fetchCars();
        } catch (error) {
          console.error("Failed to fetch cars:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadCars();
  }, []);

  return (
    <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="Featured Vehicles"
        subTitle="Explore our selection of premium vehicles available for your next adventure."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading featured vehicles...</p>
          </div>
        ) : cars.length > 0 ? (
          cars.slice(0, 6).map((car) => (
            <CarCard key={car._id} car={car} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No vehicles available at the moment.</p>
            <button
              onClick={() => {
                setLoading(true);
                fetchCars().finally(() => setLoading(false));
              }}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Retry Loading
            </button>
          </div>
        )}
      </div>

      <button
        onClick={() => {
          navigate("/cars");
          window.scrollTo(0, 0);
        }}
        className="flex items-center justify-center gap-2 px-6 py-2 border border-gray-300 hover:bg-gray-50 rounded-md mt-18"
      >
        Explore all cars
        <img src={assets.arrow_icon} alt="arrow" />
      </button>
    </div>
  );
};

export default FeaturedSection;
