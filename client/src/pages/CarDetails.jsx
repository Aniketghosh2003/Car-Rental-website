import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/appContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const CarDetails = () => {
  const { id } = useParams();

  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate } =
    useAppContext();

  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCar(cars.find((car) => car._id === id));
  }, [cars, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/bookings/create", {
        car: id,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        toast.success(data.message);
        // Clear the booking dates after successful booking
        setPickupDate("");
        setReturnDate("");
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to create booking");
    }
  };

  const specs = car
    ? [
        { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
        { icon: assets.fuel_icon, text: car.fuel_type },
        { icon: assets.car_icon, text: car.transmission },
        { icon: assets.location_icon, text: car.location },
      ]
    : [];

  return car ? (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 py-12"
    >
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 text-gray-500 cursor-pointer hover:text-gray-800"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all cars
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
      >
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="lg:col-span-2"
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto object-cover rounded-xl shadow-lg"
          />

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8"
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {car.brand} {car.model}
            </h1>
            <p className="text-lg text-gray-500 mt-2">
              {car.category} • {car.year}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          >
            {specs.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + (index * 0.1) }}
                className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center"
              >
                <img src={spec.icon} alt="" className="h-8 w-8 text-gray-600" />
                <span className="mt-2 font-medium text-gray-800">
                  {spec.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <hr className="my-8 border-t border-gray-200" />

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Description
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {car.description}
            </p>
          </div>

          <hr className="my-8 border-t border-gray-200" />

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Features</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {[
                `${car.seating_capacity} Seater Vehicle`,
                `${car.fuel_type} Engine`,
                `${car.transmission} Transmission`,
                `${car.year} Model`,
                car.isAvaliable
                  ? "Available for Booking"
                  : "Currently Unavailable",
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <img
                    src={assets.check_icon}
                    alt="check"
                    className="h-5 w-5 mr-3"
                  />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
          className="h-fit lg:sticky lg:top-12"
        >
          <div className="border border-gray-200 rounded-lg shadow-xl p-6 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-baseline justify-between"
            >
              <p>
                <span className="text-4xl font-bold text-gray-900">
                  Rs {car.pricePerDay}
                </span>
              </p>
              <p className="text-gray-500">per day</p>
            </motion.div>

            <motion.form 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              onSubmit={handleSubmit} 
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="pickup-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pickup Date
                </label>
                <input
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  type="date"
                  id="pickup-date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="return-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Return Date
                </label>
                <input
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  type="date"
                  id="return-date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Book Now
              </button>
            </motion.form>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="text-center text-xs text-gray-500"
            >
              No credit card required to reserve
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  ) : (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center h-screen"
    >
      <p>Loading...</p>
    </motion.div>
  );
};

export default CarDetails;
