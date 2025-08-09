import React, { useEffect, useState } from "react";
import { dummyMyBookingsData, assets } from "../assets/assets";

const MyBookings = () => {
  const [Bookings, setBookings] = useState([]);
  const fetchBookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          My Bookings
        </h1>
        <p className="mt-1 text-lg text-gray-600">
          View and manage your car bookings
        </p>
      </div>

      <div className="space-y-6">
        {Bookings.map((booking, index) => (
          <div
            key={booking._id}
            className="flex flex-col md:flex-row gap-6 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="w-full md:w-1/3">
              <img
                src={booking.car.image}
                alt={booking.car.brand}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="mt-3">
                <h3 className="font-semibold text-lg text-gray-800">
                  {booking.car.brand} {booking.car.model}
                </h3>
                <p className="text-sm text-gray-500">
                  {booking.car.year} • {booking.car.category}
                </p>
              </div>
            </div>

            <div className="w-full md:w-2/3 flex flex-col">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium text-gray-800">
                    Booking #{index + 1}
                  </p>
                  <span className={`capitalize inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    booking.status === 'pending' 
                      ? 'bg-red-400/15 text-red-600' 
                      : 'bg-green-400/15 text-green-600'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="text-2xl font-bold text-gray-900">
                    Rs {booking.price}
                  </p>
                  <p className="text-xs text-gray-400">
                    Booked on {booking.bookedOn}
                  </p>
                </div>
              </div>

              <hr className="my-3 border-t border-gray-200" />

              <div className="space-y-5 flex-grow">
                <div className="flex items-start gap-3">
                  <img 
                    src={assets.calendar_icon_colored} 
                    alt="Calendar" 
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Rental Period</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {new Date(booking.pickupDate).toLocaleDateString()} - {new Date(booking.returnDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <img 
                    src={assets.location_icon_colored} 
                    alt="Location" 
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Pick-up Location</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {booking.car.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <img 
                    src={assets.location_icon_colored} 
                    alt="Location" 
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Return Location</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {booking.car.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
