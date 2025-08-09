import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyCarData } from "../assets/assets";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCar(dummyCarData.find((car) => car._id === id));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
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
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 text-gray-500 cursor-pointer hover:text-gray-800"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto object-cover rounded-xl shadow-lg"
          />

          <div className="mt-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {car.brand} {car.model}
            </h1>
            <p className="text-lg text-gray-500 mt-2">
              {car.category} • {car.year}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {specs.map((spec, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center"
              >
                <img src={spec.icon} alt="" className="h-8 w-8 text-gray-600" />
                <span className="mt-2 font-medium text-gray-800">
                  {spec.text}
                </span>
              </div>
            ))}
          </div>

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
                car.isAvaliable ? "Available for Booking" : "Currently Unavailable",
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <img src={assets.check_icon} alt="check" className="h-5 w-5 mr-3" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-fit lg:sticky lg:top-12">
          <div className="border border-gray-200 rounded-lg shadow-xl p-6 space-y-6">
            <div className="flex items-baseline justify-between">
              <p>
                <span className="text-4xl font-bold text-gray-900">
                  Rs {car.pricePerDay}
                </span>
              </p>
              <p className="text-gray-500">per day</p>
            </div>

            <form onClick={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="pickup-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pickup Date
                </label>
                <input
                  type="date"
                  id="pickup-date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
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
                  type="date"
                  id="return-date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Book Now
              </button>
            </form>
            <p className="text-center text-xs text-gray-500">
              No credit card required to reserve
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <p>Loading...</p>
    </div>
  );
};

export default CarDetails;
