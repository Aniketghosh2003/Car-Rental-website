import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const { axios, user } = useAppContext();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message || "Failed to fetch bookings");
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch bookings");
    }
  };

  useEffect(() => {
    user && fetchBookings();
  }, [user]);

  const handleOpenFeedback = (booking) => {
    setSelectedBooking(booking);
    setRating(5);
    setComment("");
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!selectedBooking) return;

    try {
      setSubmitting(true);
      const { data } = await axios.post("/api/reviews", {
        carId: selectedBooking.car._id,
        bookingId: selectedBooking._id,
        rating,
        comment,
      });

      if (data.success) {
        toast.success("Feedback submitted successfully");
        setShowFeedbackModal(false);
        setSelectedBooking(null);
        await fetchBookings();
      } else {
        toast.error(data.message || "Failed to submit feedback");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayment = async (bookingId) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const { data } = await axios.post("/api/payment/create-order", { bookingId });

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      const { amount, id: order_id, currency } = data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency: currency,
        name: "Car Rental",
        description: "Booking Payment",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            bookingId: bookingId
          };

          try {
            const result = await axios.post("/api/payment/verify-payment", data);

            if (result.data.success) {
              toast.success("Payment Successful");
              fetchBookings();
            } else {
              toast.error("Payment Verification Failed");
            }
          } catch (error) {
            console.log(error);
            toast.error("Payment Verification Failed");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Mobile-only Back button */}
      <div className="sm:hidden mb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <span className="text-lg leading-none">&#8592;</span>
          <span>Back</span>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mb-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-3xl font-bold tracking-tight text-gray-900"
        >
          My Bookings
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mt-1 text-lg text-gray-600"
        >
          View and manage your car bookings
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="space-y-6"
      >
        {bookings.map((booking, index) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3 + (index * 0.1),
              ease: "easeOut"
            }}
            whileHover={{ y: -5, scale: 1.01 }}
            className="flex flex-col md:flex-row gap-6 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
              className="w-full md:w-1/3"
            >
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
                {booking.hasReviewed && (
                  <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Feedback submitted
                  </span>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + (index * 0.1) }}
              className="w-full md:w-2/3 flex flex-col"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium text-gray-800">
                    Booking #{index + 1}
                  </p>
                  <span
                    className={`capitalize inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === "pending"
                      ? "bg-red-400/15 text-red-600"
                      : "bg-green-400/15 text-green-600"
                      }`}
                  >
                    {booking.status}
                  </span>
                  {booking.paymentStatus && booking.status !== "cancelled" && (
                    <span
                      className={`capitalize inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.paymentStatus === "Paid"
                        ? "bg-green-400/15 text-green-600"
                        : "bg-yellow-400/15 text-yellow-600"
                        }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  )}
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
                      {new Date(booking.pickupDate).toLocaleDateString()} -{" "}
                      {new Date(booking.returnDate).toLocaleDateString()}
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

              {/* Payment Button */}
              {booking.status === 'confirmed' && booking.paymentStatus !== 'Paid' && new Date() < new Date(booking.pickupDate) && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handlePayment(booking._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Pay Now
                  </button>
                </div>
              )}
              {booking.paymentStatus === 'Paid' && (
                <div className="mt-4 flex justify-end">
                  <button
                    disabled
                    className="bg-green-600 text-white px-4 py-2 rounded-lg  font-medium text-sm shadow-md cursor-not-allowed opacity-90"
                  >
                    Paid Successfully
                  </button>
                </div>
              )}
              {booking.status === 'confirmed' && booking.paymentStatus !== 'Paid' && new Date() >= new Date(booking.pickupDate) && (
                <div className="mt-4 flex justify-end">
                  <button
                    disabled
                    className="bg-red-500 text-white px-4 py-2 rounded-lg  font-medium text-sm shadow-md cursor-not-allowed opacity-90"
                  >
                    Booking Expired / Cancelled
                  </button>
                </div>
              )}

              {/* Feedback Button: confirmed booking whose return date has passed and not yet reviewed */}
              {booking.canReview && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleOpenFeedback(booking)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium text-sm shadow-md hover:shadow-lg focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    Write a feedback
                  </button>
                </div>
              )}

            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Write a feedback</h2>
            <p className="text-sm text-gray-600 mb-4">
              {selectedBooking.car.brand} {selectedBooking.car.model} • Rental ended on {" "}
              {new Date(selectedBooking.returnDate).toLocaleDateString()}
            </p>
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm font-medium ${
                        star <= rating
                          ? "bg-yellow-400 border-yellow-500 text-white"
                          : "bg-white border-gray-300 text-gray-500"
                      }`}
                    >
                      {star}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[80px]"
                  placeholder="Share your experience with this car and service"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setSelectedBooking(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Add payment handler
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export default MyBookings;
