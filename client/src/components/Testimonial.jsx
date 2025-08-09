import React, { useState, useRef } from "react";
import Title from "./Title";
import { assets } from "../assets/assets";

const Testimonial = () => {
    const [tooltip, setTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });
    const cardRefs = useRef([]);

    const handleMouseMove = (e, index) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({
            visible: true,
            text: testimonials[index].name,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, text: "", x: 0, y: 0 });
    };

    const testimonials = [
      {
        name: "Priya Sharma",
        location: "Mumbai, India",
        image: assets.testimonial_image_1,
        message: "I've rented cars from various companies, but the experience with CarRental was exceptional. The service was top-notch!",
        title: "Travel Enthusiast",
        rating: 5
      },
      {
        name: "Arjun Patel",
        location: "Delhi, India",
        image: assets.testimonial_image_2,
        message: "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!",
        title: "Business Executive",
        rating: 5
      },
      {
        name: "Ananya Reddy",
        location: "Bangalore, India",
        image: assets.testimonial_image_1,
        message: "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service.",
        title: "Software Engineer",
        rating: 4
      },
    ];
  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="What Our Customers Say"
        subTitle="Discover why travelers across India choose our car rental service for their reliable and comfortable journeys."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={handleMouseLeave}
            className="relative border border-gray-200 rounded-lg overflow-hidden max-w-sm shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer bg-white"
          >
            {tooltip.visible && tooltip.text === testimonial.name && (
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
              {/* Profile Image at Top */}
              <div className="flex justify-center pt-6 pb-4">
                <img
                  className="rounded-full w-16 h-16 object-cover border-4 border-gray-100"
                  src={testimonial.image}
                  alt={`${testimonial.name} profile`}
                />
              </div>
              
              {/* Content Section */}
              <div className="px-6 pb-6 text-center">
                {/* Star Rating */}
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={assets.star_icon}
                      alt="star"
                      className={`w-4 h-4 ${
                        i < testimonial.rating ? 'opacity-100' : 'opacity-30'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <div className="mb-4 text-gray-600">
                  <p className="text-sm leading-relaxed line-clamp-3 italic">
                    "{testimonial.message}"
                  </p>
                </div>
                
                {/* Customer Info */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">{testimonial.title}</p>
                  <p className="text-xs text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
