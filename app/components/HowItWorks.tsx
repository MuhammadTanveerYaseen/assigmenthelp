'use client';

import React from 'react';
import Link from 'next/link';

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting expert help with your assignments and projects is simple and straightforward
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center transition-transform hover:scale-105">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-blue-600 text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Upload Your Assignment</h3>
            <p className="text-gray-600">
              Share your assignment details, requirements, and deadline through our simple upload form 📤
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center transition-transform hover:scale-105">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-blue-600 text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Get a Price Quote</h3>
            <p className="text-gray-600">
              Receive a personalized price quote and expert consultation about your project 💬
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center transition-transform hover:scale-105">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-blue-600 text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Receive Your Solution</h3>
            <p className="text-gray-600">
              Get a ready-to-submit, high-quality solution before your deadline 🎯
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/upload"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg inline-flex items-center justify-center"
          >
            Start Your Project Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 