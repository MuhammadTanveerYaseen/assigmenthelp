import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ahmed Khan",
      university: "National University of Sciences and Technology (NUST)",
      image: "/testimonial1.jpg",
      rating: 5,
      text: "I was struggling with my final year AI project until I found this service. The solution they provided was exceptional and helped me score an A+. Highly recommended!"
    },
    {
      name: "Fatima Zaidi",
      university: "Lahore University of Management Sciences (LUMS)",
      image: "/testimonial2.jpg",
      rating: 5,
      text: "The team delivered my web development assignment before the deadline and the quality was outstanding. My professor was impressed with the clean code and documentation."
    },
    {
      name: "Muhammad Ali",
      university: "COMSATS University Islamabad",
      image: "/testimonial3.jpg",
      rating: 5,
      text: "I had a complex data science project that I couldn't handle. Their expert team not only completed it perfectly but also explained the concepts to me. Amazing service!"
    },
    {
      name: "Ayesha Rahman",
      university: "Quaid-i-Azam University",
      image: "/testimonial4.jpg",
      rating: 4,
      text: "The mobile app they developed for my final year project was exactly what I needed. Professional, responsive, and very helpful throughout the process."
    },
    {
      name: "Omar Farooq",
      university: "University of the Punjab",
      image: "/testimonial5.jpg",
      rating: 5,
      text: "Their assistance with my economics research paper was invaluable. They provided in-depth analysis and well-structured content that earned me excellent grades."
    },
    {
      name: "Zainab Malik",
      university: "University of Agriculture Faisalabad",
      image: "/testimonial6.jpg",
      rating: 5,
      text: "I needed help with a complex agricultural science project. The team's expertise in the field was impressive, and they delivered a comprehensive solution that exceeded my expectations."
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Pakistani Students Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from students across top Pakistani universities who have achieved academic success with our help
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  {/* Placeholder for image */}
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.university}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-700 italic">&ldquo;{testimonial.text}&rdquo;</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-blue-600 text-white p-8 rounded-xl text-center">
          <h3 className="text-2xl font-bold mb-4">Join 5000+ Successful Pakistani Students</h3>
          <p className="text-lg mb-6">Our solutions have helped thousands of students from top Pakistani universities achieve academic excellence</p>
          <a href="/upload" className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition duration-300 text-lg inline-block">
            Upload Your Assignment
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 