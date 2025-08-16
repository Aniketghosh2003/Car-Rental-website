import React from 'react';
import { motion } from "motion/react";

const TermsOfService = () => {
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
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="prose prose-lg max-w-none"
      >
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 mb-4">
            By accessing and using CarRental India's services, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Rental Agreement</h2>
          <p className="text-gray-600 mb-4">
            All car rentals are subject to availability and confirmation. The rental period begins at the time specified in your booking confirmation.
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Valid driving license required for all drivers</li>
            <li>Minimum age requirement of 21 years</li>
            <li>Security deposit required at time of pickup</li>
            <li>Fuel policy: Return with same fuel level</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Payment Terms</h2>
          <p className="text-gray-600 mb-4">
            Payment is required at the time of booking. We accept major credit cards and digital payment methods.
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Full payment due at booking confirmation</li>
            <li>Additional charges may apply for extras</li>
            <li>Security deposit is refundable upon return</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Cancellation Policy</h2>
          <p className="text-gray-600 mb-4">
            Cancellations made 24 hours before pickup time are eligible for full refund. Cancellations within 24 hours may incur charges.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Insurance Coverage</h2>
          <p className="text-gray-600 mb-4">
            All vehicles come with basic insurance coverage. Additional comprehensive insurance is available at booking.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Liability and Damages</h2>
          <p className="text-gray-600 mb-4">
            Renters are responsible for any damage to the vehicle during the rental period. Traffic violations and fines are the responsibility of the renter.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Prohibited Uses</h2>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Using the vehicle for illegal activities</li>
            <li>Subletting or transferring the rental to third parties</li>
            <li>Driving under the influence of alcohol or drugs</li>
            <li>Off-road driving unless specifically permitted</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Information</h2>
          <p className="text-gray-600 mb-4">
            For questions about these Terms of Service, please contact us at:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700">Email: info@carrental.com</p>
            <p className="text-gray-700">Phone: +91 00000 00000</p>
            <p className="text-gray-700">Address: 123 MG Road, Connaught Place, New Delhi - 110001</p>
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
};

export default TermsOfService;
