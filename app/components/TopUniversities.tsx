import React from 'react';

const TopUniversities = () => {
  const universities = [
    {
      name: "National University of Sciences and Technology (NUST)",
      description: "Known for its strong focus on STEM fields, particularly engineering and technology.",
      logo: "/universities/nust-logo.png",
      website: "https://nust.edu.pk/"
    },
    {
      name: "Quaid-i-Azam University",
      description: "A public research university with a strong reputation in various disciplines.",
      logo: "/universities/qau-logo.png",
      website: "https://qau.edu.pk/"
    },
    {
      name: "University of the Punjab",
      description: "One of the oldest and largest universities in Pakistan, with a wide range of programs.",
      logo: "/universities/pu-logo.png",
      website: "https://pu.edu.pk/"
    },
    {
      name: "Lahore University of Management Sciences (LUMS)",
      description: "A leading private university known for its business and management programs.",
      logo: "/universities/lums-logo.png",
      website: "https://lums.edu.pk/"
    },
    {
      name: "COMSATS University Islamabad (CUI)",
      description: "A public university known for its focus on science, technology, and engineering.",
      logo: "/universities/comsats-logo.png",
      website: "https://www.comsats.edu.pk/"
    },
    {
      name: "University of Agriculture Faisalabad",
      description: "A leading agricultural university in Pakistan.",
      logo: "/universities/uaf-logo.png",
      website: "https://www.uaf.edu.pk/"
    },
    {
      name: "The University of Lahore",
      description: "A private university with a diverse range of programs.",
      logo: "/universities/uol-logo.png",
      website: "https://www.uol.edu.pk/"
    },
    {
      name: "Aga Khan University",
      description: "Known for its medical and nursing programs.",
      logo: "/universities/aku-logo.png",
      website: "https://www.aku.edu/"
    },
    {
      name: "University of Peshawar",
      description: "A public university located in the province of Khyber Pakhtunkhwa.",
      logo: "/universities/uop-logo.png",
      website: "https://www.uop.edu.pk/"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Top Universities in Pakistan</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide assignment help and academic support for students from Pakistan&apos;s most prestigious universities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {universities.map((university, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {/* Placeholder for university logo */}
                <span className="text-blue-600 font-bold text-xl">{university.name.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{university.name}</h3>
              <p className="text-gray-600 text-center mb-4">{university.description}</p>
              <div className="text-center">
                <a 
                  href={university.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Visit Website
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-6">
            Our expert team provides specialized assignment help for students from all major Pakistani universities, 
            ensuring compliance with each institution&apos;s specific requirements and academic standards.
          </p>
          <a 
            href="/upload" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-flex items-center"
          >
            Get Help With Your Assignment
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
        <p>Don&apos;t see your university? Contact us to add it.</p>
        <p>We&apos;re here to help you succeed.</p>
      </div>
    </section>
  );
};

export default TopUniversities; 