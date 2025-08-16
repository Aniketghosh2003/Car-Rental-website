import React, { useState } from 'react';
import { motion } from "motion/react";
import { assets } from '../assets/assets';

const HelpCenter = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: "How do I make a car rental reservation?",
      answer: "You can make a reservation by browsing our available cars, selecting your preferred vehicle, choosing pickup and return dates, and completing the booking process with your payment information."
    },
    {
      question: "What documents do I need to rent a car?",
      answer: "You need a valid driving license, government-issued ID, and a credit card for payment and security deposit."
    },
    {
      question: "Can I cancel or modify my reservation?",
      answer: "Yes, you can cancel or modify your reservation up to 24 hours before pickup time without penalty. Changes within 24 hours may incur additional charges."
    },
    {
      question: "What is included in the rental price?",
      answer: "The rental price includes the vehicle, basic insurance coverage, and unlimited mileage within city limits. Additional services like GPS, child seats, or extended insurance are available for extra cost."
    },
    {
      question: "What happens if I return the car late?",
      answer: "Late returns are subject to additional charges. We offer a 30-minute grace period, after which hourly rates apply."
    },
    {
      question: "Is fuel included in the rental?",
      answer: "No, fuel is not included. You will receive the car with a full tank and should return it with the same fuel level to avoid refueling charges."
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-lg text-gray-600">Find answers to frequently asked questions and get support</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
      >
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 text-xl">📞</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Call Support</h3>
          <p className="text-gray-600 mb-3">Get immediate help from our support team</p>
          <a href="tel:+910000000000" className="text-blue-600 hover:text-blue-700 font-medium">
            +91 00000 00000
          </a>
        </div>

        <div className="bg-green-50 p-6 rounded-lg text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-xl">✉️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Support</h3>
          <p className="text-gray-600 mb-3">Send us your questions via email</p>
          <a href="mailto:support@carrental.com" className="text-green-600 hover:text-green-700 font-medium">
            support@carrental.com
          </a>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <span className={`transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HelpCenter;
