import React from 'react';

const Features = () => {
  const features = [
    {
      icon: "🚀",
      title: "Advanced-Level Solutions",
      description: "AI, Web, Mobile Apps, Data Science & More - we cover all technical domains with expert precision"
    },
    {
      icon: "⏱️",
      title: "Fast Turnaround Time",
      description: "Get your work done before deadlines with our efficient team of experts"
    },
    {
      icon: "👨‍🎓",
      title: "Expert Team",
      description: "Our team consists of professionals from top industries & universities with years of experience"
    },
    {
      icon: "✅",
      title: "100% Original & Quality Work",
      description: "No plagiarism, fully customized solutions tailored to your specific requirements"
    },
    {
      icon: "💬",
      title: "24/7 Support & WhatsApp Assistance",
      description: "Get help anytime with our round-the-clock support team available on WhatsApp"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Key Features & Benefits</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Why thousands of students trust us with their academic success
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="text-4xl mr-4">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-blue-50 p-8 rounded-xl border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">We Support All Academic Disciplines</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Computer Science", "Engineering", "Business", "Mathematics",
              "Data Science", "Marketing", "Finance", "Economics",
              "Psychology", "Education", "Healthcare", "Law"
            ].map((discipline, index) => (
              <div key={index} className="bg-white p-3 rounded-lg text-center shadow-sm">
                <span className="text-gray-700">{discipline}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 