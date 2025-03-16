import React from 'react';
import FileUpload from '../components/FileUpload';
import Footer from '../components/Footer';

export default function UploadPage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Upload Your Assignment</h1>
          <p className="text-xl text-center max-w-3xl mx-auto mb-8">
            Share your assignment details with us and get expert solutions before your deadline
          </p>
        </div>
      </section>
      
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <FileUpload />
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">How It Works</h3>
            <ol className="space-y-4 text-gray-700">
              <li className="flex">
                <span className="bg-blue-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                <div>
                  <p className="font-medium">Upload your assignment</p>
                  <p className="text-gray-600">Fill out the form above and upload your assignment file</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-blue-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                <div>
                  <p className="font-medium">Get a price quote</p>
                  <p className="text-gray-600">Our team will review your assignment and provide a price quote</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-blue-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                <div>
                  <p className="font-medium">Receive your solution</p>
                  <p className="text-gray-600">Once payment is confirmed, our experts will work on your assignment and deliver it before your deadline</p>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="mt-8 bg-blue-600 text-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-3">Need Immediate Assistance?</h3>
            <p className="mb-4">Contact us on WhatsApp for quick responses and real-time updates</p>
            <a
              href="https://wa.me/923236229684"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Get Free Consultance on WhatsApp
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 