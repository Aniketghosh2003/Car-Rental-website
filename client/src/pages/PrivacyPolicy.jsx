import React from 'react';
import { motion } from "motion/react";

const PrivacyPolicy = () => {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="prose prose-lg max-w-none"
      >
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We collect information you provide directly to us, such as when you create an account, make a reservation, or contact us.
          </p>
          <h3 className="text-xl font-medium text-gray-700 mb-2">Personal Information:</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Name, email address, and phone number</li>
            <li>Driving license information</li>
            <li>Payment information</li>
            <li>Rental history and preferences</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">
            We use the information we collect to provide, maintain, and improve our services.
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Process and manage your car rental bookings</li>
            <li>Communicate with you about your reservations</li>
            <li>Provide customer support</li>
            <li>Send promotional materials (with your consent)</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Information Sharing</h2>
          <p className="text-gray-600 mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>With your consent</li>
            <li>For legal compliance</li>
            <li>To protect our rights and safety</li>
            <li>With service providers who assist our operations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
          <p className="text-gray-600 mb-4">
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>SSL encryption for data transmission</li>
            <li>Secure payment processing</li>
            <li>Regular security audits</li>
            <li>Access controls and authentication</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Cookies and Tracking</h2>
          <p className="text-gray-600 mb-4">
            We use cookies and similar technologies to enhance your experience on our website.
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Essential cookies for website functionality</li>
            <li>Analytics cookies to improve our services</li>
            <li>Preference cookies to remember your settings</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
          <p className="text-gray-600 mb-4">
            You have certain rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Access and update your information</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Data Retention</h2>
          <p className="text-gray-600 mb-4">
            We retain your personal information for as long as necessary to provide our services and comply with legal obligations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Changes to This Policy</h2>
          <p className="text-gray-600 mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700">Email: privacy@carrental.com</p>
            <p className="text-gray-700">Phone: +91 00000 00000</p>
            <p className="text-gray-700">Address: 123 MG Road, Connaught Place, New Delhi - 110001</p>
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyPolicy;
