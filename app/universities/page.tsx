import React from 'react';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Top Pakistani Universities | Assignment Help',
  description: 'Get expert assignment help for students from top Pakistani universities including NUST, Quaid-i-Azam University, Punjab University, LUMS, and more.',
  keywords: 'Pakistani universities, NUST, Quaid-i-Azam University, Punjab University, LUMS, COMSATS, assignment help Pakistan',
};

export default function UniversitiesPage() {
  const universities = [
    {
      name: "National University of Sciences and Technology (NUST)",
      description: "Known for its strong focus on STEM fields, particularly engineering and technology. NUST is consistently ranked as one of the top universities in Pakistan and has a reputation for academic excellence and research.",
      location: "Islamabad",
      established: "1991",
      programs: ["Engineering", "Computer Science", "Business Administration", "Natural Sciences", "Medicine"],
      website: "https://nust.edu.pk/"
    },
    {
      name: "Quaid-i-Azam University",
      description: "A public research university with a strong reputation in various disciplines. It is known for its rigorous academic programs and research contributions, particularly in natural sciences and social sciences.",
      location: "Islamabad",
      established: "1967",
      programs: ["Natural Sciences", "Social Sciences", "Biological Sciences", "Medical Sciences", "Engineering"],
      website: "https://qau.edu.pk/"
    },
    {
      name: "University of the Punjab",
      description: "One of the oldest and largest universities in Pakistan, with a wide range of programs. It has a rich history and has produced numerous notable alumni who have contributed significantly to various fields.",
      location: "Lahore",
      established: "1882",
      programs: ["Arts and Humanities", "Sciences", "Commerce", "Law", "Engineering", "Medicine"],
      website: "https://pu.edu.pk/"
    },
    {
      name: "Lahore University of Management Sciences (LUMS)",
      description: "A leading private university known for its business and management programs. LUMS is renowned for its quality education, innovative teaching methods, and strong industry connections.",
      location: "Lahore",
      established: "1985",
      programs: ["Business Administration", "Computer Science", "Engineering", "Law", "Humanities and Social Sciences"],
      website: "https://lums.edu.pk/"
    },
    {
      name: "COMSATS University Islamabad (CUI)",
      description: "A public university known for its focus on science, technology, and engineering. CUI has multiple campuses across Pakistan and offers a wide range of undergraduate and graduate programs.",
      location: "Islamabad (Main Campus)",
      established: "2000",
      programs: ["Computer Science", "Engineering", "Business Administration", "Mathematics", "Biosciences"],
      website: "https://www.comsats.edu.pk/"
    },
    {
      name: "University of Agriculture Faisalabad",
      description: "A leading agricultural university in Pakistan. It specializes in agricultural sciences and related fields, contributing significantly to agricultural research and development in the country.",
      location: "Faisalabad",
      established: "1961",
      programs: ["Agriculture", "Veterinary Sciences", "Food Sciences", "Agricultural Engineering", "Biotechnology"],
      website: "https://www.uaf.edu.pk/"
    },
    {
      name: "The University of Lahore",
      description: "A private university with a diverse range of programs. It offers education in various disciplines and has modern facilities to support teaching and learning.",
      location: "Lahore",
      established: "1999",
      programs: ["Medicine", "Engineering", "Business", "Arts and Social Sciences", "Computer Science"],
      website: "https://www.uol.edu.pk/"
    },
    {
      name: "Aga Khan University",
      description: "Known for its medical and nursing programs. AKU is a private, not-for-profit university that promotes human welfare through research, teaching, and community service.",
      location: "Karachi",
      established: "1983",
      programs: ["Medicine", "Nursing", "Education", "Islamic Studies", "Media and Communications"],
      website: "https://www.aku.edu/"
    },
    {
      name: "University of Peshawar",
      description: "A public university located in the province of Khyber Pakhtunkhwa. It is one of the oldest universities in Pakistan and offers a wide range of academic programs.",
      location: "Peshawar",
      established: "1950",
      programs: ["Arts and Humanities", "Sciences", "Management Studies", "Law", "Pharmacy"],
      website: "https://www.uop.edu.pk/"
    }
  ];

  return (
    <main>
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">Top Universities in Pakistan</h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto">
            Expert assignment help for students from Pakistan&apos;s most prestigious educational institutions
          </p>
        </div>
      </section>
      
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              We Support Students From All Major Pakistani Universities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our team of experts understands the specific requirements and academic standards of each institution, 
              ensuring that your assignments meet the highest quality expectations.
            </p>
          </div>
          
          <div className="space-y-12">
            {universities.map((university, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-blue-700 mb-3">{university.name}</h3>
                <p className="text-gray-700 mb-4">{university.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">Location</h4>
                    <p>{university.location}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Established</h4>
                    <p>{university.established}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Website</h4>
                    <a 
                      href={university.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Visit Official Site
                    </a>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Popular Programs</h4>
                  <div className="flex flex-wrap gap-2">
                    {university.programs.map((program, idx) => (
                      <span 
                        key={idx} 
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <a 
                    href="/upload" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                  >
                    Get Assignment Help
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Our Assignment Help for Pakistani University Students?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>University-Specific Expertise:</strong> Our experts are familiar with the specific requirements, formatting guidelines, and academic standards of all major Pakistani universities.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Subject Matter Specialists:</strong> We have experts in all major fields of study offered by Pakistani universities, from engineering and computer science to business and humanities.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Plagiarism-Free Work:</strong> All assignments are original and pass through strict plagiarism checks to ensure they meet the academic integrity standards of Pakistani universities.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Timely Delivery:</strong> We understand the strict deadlines of Pakistani universities and ensure that all assignments are delivered on time.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>24/7 Support:</strong> Our customer support team is available round the clock to assist Pakistani students with any queries or concerns.</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="/upload" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-flex items-center"
            >
              Upload Your Assignment Now
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
            
            <div className="mt-6">
              <a 
                href="https://wa.me/923236229684" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition duration-300"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Get Free Consultance on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 