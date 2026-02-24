import React, { useEffect, useState, useRef } from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext";

const Testimonial = () => {
  const { axios } = useAppContext();
  const [tooltip, setTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });
  const [reviews, setReviews] = useState([]);
  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const review = reviews[index];
    setTooltip({
      visible: !!review,
      text: review ? review.name : "",
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, text: "", x: 0, y: 0 });
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("/api/reviews");
        if (data.success && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error("Failed to load reviews", error);
      }
    };

    fetchReviews();
  }, [axios]);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="py-20 px-6 md:px-16 lg:px-24 xl:px-44"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Title
          title="What Our Customers Say"
          subTitle="Discover why travelers across India choose our car rental service for their reliable and comfortable journeys."
        />
      </motion.div>

      {reviews.length === 0 ? (
        <p className="mt-10 text-center text-gray-500 text-sm">
          No reviews yet. Complete a booking and be the first to share your experience.
        </p>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18"
        >
          {reviews.map((item, index) => {
            const avatar =
              (item.user && item.user.image) || assets.user_profile;
            const name = item.name;
            const rating = item.rating || 5;
            const message = item.comment || item.message;
            const title = item.car ? `${item.car.brand} ${item.car.model}` : "Verified Customer";
            const location = item.car && item.car.location ? item.car.location : "";

            return (
              <motion.div
                key={item._id || index}
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative border border-gray-200 rounded-lg overflow-hidden max-w-sm shadow-md hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer bg-white"
              >
                {tooltip.visible && tooltip.text === name && (
                  <span
                    className="absolute px-2.5 py-1 text-sm rounded text-nowrap bg-indigo-500 text-white pointer-events-none transition-all duration-300"
                    style={{
                      top: tooltip.y + 8,
                      left: tooltip.x + 8,
                      transition: "all 0.3s ease-out",
                      animationDelay: "0.2s",
                    }}
                  >
                    {tooltip.text}
                  </span>
                )}

                <div className="flex flex-col">
                  <div className="flex justify-center pt-6 pb-4">
                    <img
                      className="rounded-full w-16 h-16 object-cover border-4 border-gray-100"
                      src={avatar}
                      alt={`${name} profile`}
                    />
                  </div>
                  
                  <div className="px-6 pb-6 text-center">
                    <div className="flex justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <img
                          key={i}
                          src={assets.star_icon}
                          alt="star"
                          className={`w-4 h-4 ${
                            i < rating ? 'opacity-100' : 'opacity-30'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <div className="mb-4 text-gray-600">
                      <p className="text-sm leading-relaxed line-clamp-3 italic">
                        "{message}"
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-1">{title}</p>
                      <p className="text-xs text-gray-400">{location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Testimonial;
