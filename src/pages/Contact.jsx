import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import contactImage from "../assets/contact.jpg";

// Contact page with enhanced animations and gradient theme
const Contact = () => {
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
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 uppercase">CONTACT US</h1>
        <div className="w-48 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-2"></div>
      </div>
      
      {/* Contact Image and Intro */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 mb-8 fade-in">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Left side - Image */}
          <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
            <img 
              src={contactImage} 
              alt="Contact Us" 
              className="w-full h-auto object-cover" 
            />
          </div>
          
          {/* Right side - Text content */}
          <div className="w-full md:w-2/3 bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400">Get in Touch</h2>
            <p className="text-gray-200 mb-4">We're here to help with any questions you may have about our rental services. Whether you need assistance with your account, have questions about our properties, or want to discuss your rental options, our team is ready to assist you.</p>
            <p className="text-gray-200">Fill out the form below or use our contact information to reach out directly. We look forward to hearing from you!</p>
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
                  Leave A Message
                </h2>
                
                <form className="space-y-4">
                  <div className="transform transition-all duration-300 hover:translate-x-1">
                    <label className="flex text-white mb-2">
                      Name : 
                      <input 
                        type="text" 
                        className="ml-2 flex-grow px-3 py-2 rounded-md border-0 bg-white bg-opacity-90 focus:bg-opacity-100 focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                      />
                    </label>
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:translate-x-1">
                    <label className="flex text-white mb-2">
                      Email : 
                      <input 
                        type="email" 
                        className="ml-2 flex-grow px-3 py-2 rounded-md border-0 bg-white bg-opacity-90 focus:bg-opacity-100 focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                      />
                    </label>
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:translate-x-1">
                    <label className="flex flex-col text-white mb-2">
                      <span className="mb-2">Message :</span>
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
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Right Content - Newsletter */}
            <div className="w-full lg:w-1/3 fade-in animation-delay-300">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl text-white mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Our Newsletters
                </h2>
                
                <div className="text-white text-sm mb-6">
                  <p>
                    A paragraph is defined as "a group or set that
                    forms graphically, particularly when dealing with
                    paragraph can be just one sentence long.
                  </p>
                </div>
                
                <form className="space-y-4">
                  <div className="transform transition-all duration-300 hover:translate-x-1">
                    <label className="flex text-white mb-2">
                      Email : 
                      <input 
                        type="email" 
                        className="ml-2 flex-grow px-3 py-2 rounded-md border-0 bg-white bg-opacity-90 focus:bg-opacity-100 focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                      />
                    </label>
                  </div>
                  
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="px-6 py-1 bg-gradient-to-r from-gray-800 to-black text-white font-medium rounded-md hover:from-gray-900 hover:to-gray-800 transition-all duration-300 uppercase shadow-md transform hover:-translate-y-1 hover:shadow-lg"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Updates and Social Media */}
              <div className="mt-8 fade-in animation-delay-600">
                <div className="border-t border-gray-600 pt-6 pb-6">
                  <h3 className="text-white text-center mb-4">For More Updates :</h3>
                  
                  <div className="flex justify-center space-x-4">
                    <a href="#" className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    
                    <a href="#" className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    
                    <a href="#" className="bg-gradient-to-br from-blue-600 to-blue-900 p-2 rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </a>
                    
                    <a href="#" className="bg-gradient-to-br from-blue-400 to-cyan-500 p-2 rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="mt-6 mb-8 fade-in animation-delay-900">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 flex items-center justify-center shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <p className="text-white">155556456135154</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 flex items-center justify-center shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <p className="text-white">aptorent@gmail.in</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 flex items-center justify-center shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <div className="text-white">
                  <p>B - 69, Vijaynagar,</p>
                  <p>Indore - 452010</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Image */}
        <div className="mt-8 mb-12 fade-in animation-delay-1200 rounded-lg overflow-hidden shadow-2xl animate-bounce">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Location_map_of_India.svg/1200px-Location_map_of_India.svg.png" 
            alt="India Map" 
            className="w-full h-auto object-contain bg-white p-4"
            onError={(e) => {
              e.target.src = "https://www.mapsofindia.com/maps/india/political-map-of-india.png";
              e.target.alt = "India Map fallback";
            }}
          />
        </div>
        
        {/* Hidden image for SEO purposes */}
        <div className="hidden">
          <img src="contact.jpg" alt="Contact us" />
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