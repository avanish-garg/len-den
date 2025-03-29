import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import contactImage from "../assets/contact.jpg";

// Contact page with enhanced animations and gradient theme
const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language].contact;

  // Animation effects when component mounts
  useEffect(() => {
    // Animate elements with the fade-in class
    const animatedElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      animatedElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background with gradient instead of image */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-700 z-0">
        {/* Animated floating shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-20 animate-blob"></div>
        <div className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-2/3 w-72 h-72 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/3 right-1/3 w-56 h-56 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 opacity-15 animate-blob animation-delay-3000"></div>
      </div>
      
      <Navbar fixedTheme={{ primary: "#3B82F6", primaryHover: "#2563EB" }} />
      
      {/* Main heading */}
      <div className="pt-24 pb-4 text-center relative z-10 fade-in">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 uppercase">{t.title}</h1>
        <div className="w-48 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-2"></div>
      </div>
      
      {/* Contact Image and Intro */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 mb-8 fade-in">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Left side - Image */}
          <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
            <img 
              src={contactImage} 
              alt={t.title} 
              className="w-full h-auto object-cover" 
            />
          </div>
          
          {/* Right side - Text content */}
          <div className="w-full md:w-2/3 bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400">{t.getInTouch}</h2>
            <p className="text-gray-200 mb-4">
              {t.title}
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        {/* Contact Form and Newsletter Section */}
        <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-lg overflow-hidden w-full p-8 shadow-2xl backdrop-blur-sm bg-opacity-80 fade-in">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Content - Contact Form */}
            <div className="w-full lg:w-2/3 fade-in">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl text-white mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                  {t.message}
                </h2>
                
                <form className="space-y-4">
                  <div className="transform transition-all duration-300 hover:translate-x-1">
                    <label className="flex text-white mb-2">
                      {t.name} : 
                      <input 
                        type="text" 
                        className="ml-2 flex-grow px-3 py-2 rounded-md border-0 bg-white bg-opacity-90 focus:bg-opacity-100 focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                      />
                    </label>
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:translate-x-1">
                    <label className="flex text-white mb-2">
                      {t.email} : 
                      <input 
                        type="email" 
                        className="ml-2 flex-grow px-3 py-2 rounded-md border-0 bg-white bg-opacity-90 focus:bg-opacity-100 focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                      />
                    </label>
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:translate-x-1">
                    <label className="flex flex-col text-white mb-2">
                      <span className="mb-2">{t.message} :</span>
                      <textarea 
                        rows="5" 
                        className="w-full px-3 py-2 rounded-md border-0 bg-white bg-opacity-90 focus:bg-opacity-100 focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                      ></textarea>
                    </label>
                  </div>
                  
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="px-8 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-md hover:from-green-500 hover:to-blue-600 transition-all duration-300 uppercase shadow-lg transform hover:-translate-y-1 hover:shadow-xl"
                    >
                      {t.send}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Right Content - Contact Info */}
            <div className="w-full lg:w-1/3 fade-in animation-delay-300">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl text-white mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  {t.getInTouch}
                </h2>
                
                <div className="text-white space-y-4">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>{t.address}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <span>{t.phone}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <span>{t.emailUs}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx="true">{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in.show {
          opacity: 1;
          transform: translateY(0);
        }
        
        .animation-delay-300 {
          transition-delay: 0.3s;
        }
        
        .animation-delay-600 {
          transition-delay: 0.6s;
        }
        
        .animation-delay-900 {
          transition-delay: 0.9s;
        }
        
        .animation-delay-1200 {
          transition-delay: 1.2s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Contact; 