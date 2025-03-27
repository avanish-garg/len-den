import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import bgImage1 from "../assets/bg1.jpg";
import bgImage2 from "../assets/bg2.jpg";
import bgImage3 from "../assets/bg3.jpg";

// Theme colors - Green theme
const theme = {
  primary: "#10B981", // emerald-500
  secondary: "#059669", // emerald-600
  accent: "#34D399", // emerald-400
  text: "#FFFFFF",
  dark: "#064E3B", // emerald-900
  light: "#A7F3D0", // emerald-200
  overlay: "rgba(6, 78, 59, 0.8)",
};

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const reviewsRef = useRef(null);
  const ctaRef = useRef(null);

  // Animation states
  const [heroVisible, setHeroVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  // Preload background images
  useEffect(() => {
    const backgrounds = [bgImage1, bgImage2, bgImage3];
    const loadImages = async () => {
      const promises = backgrounds.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      });
      
      await Promise.all(promises);
      setIsLoaded(true);
      setTimeout(() => setHeroVisible(true), 300);
    };
    
    loadImages();
  }, []);

  // Background slider
  useEffect(() => {
    if (!isLoaded) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [isLoaded]);

  // Reviews slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % 13); // 13 total reviews (3 visible at a time)
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Scroll animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      if (heroRef.current) {
        const heroTop = heroRef.current.getBoundingClientRect().top;
        setHeroVisible(heroTop < window.innerHeight * 0.8);
      }
      
      if (featuresRef.current) {
        const featuresTop = featuresRef.current.getBoundingClientRect().top;
        setFeaturesVisible(featuresTop < window.innerHeight * 0.8);
      }
      
      if (statsRef.current) {
        const statsTop = statsRef.current.getBoundingClientRect().top;
        setStatsVisible(statsTop < window.innerHeight * 0.8);
      }
      
      if (reviewsRef.current) {
        const reviewsTop = reviewsRef.current.getBoundingClientRect().top;
        setReviewsVisible(reviewsTop < window.innerHeight * 0.8);
      }
      
      if (ctaRef.current) {
        const ctaTop = ctaRef.current.getBoundingClientRect().top;
        setCtaVisible(ctaTop < window.innerHeight * 0.8);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse parallax effect for hero section
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-emerald-900">
        <div className="text-center">
          <div className="mb-6">
            <svg className="animate-spin h-16 w-16 mx-auto text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-2xl font-medium text-white">Loading Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Navbar with custom theme */}
      <Navbar fixedTheme={theme} />
      
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center">
        {/* Background Slider with Parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {[bgImage1, bgImage2, bgImage3].map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1500 ease-in-out ${
                activeIndex === index ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transform: `scale(1.1) translate(${mousePosition.x / 30}px, ${mousePosition.y / 30}px)`,
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
          
          {/* Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)`,
            }}
          />
        </div>
        
        {/* Hero Content */}
        <div 
          className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center md:text-left md:max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-white">Find Your</span>
              <br/>
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 text-transparent bg-clip-text">
                Perfect Rental
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-gray-100 max-w-2xl">
              Discover thousands of high-quality rental items with instant availability and seamless booking experience.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/categories"
                className="px-8 py-4 rounded-full text-white font-medium text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
                style={{
                  background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
                  boxShadow: `0 10px 20px -10px ${theme.primary}`,
                }}
              >
                Browse Rentals
              </Link>
              
              <Link 
                to="/add-item"
                className="px-8 py-4 rounded-full font-medium text-lg border-2 text-white border-white bg-transparent hover:bg-white hover:text-emerald-900 transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
              >
                List Your Items
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-20 bg-gradient-to-b from-emerald-900 to-green-900"
      >
        <div 
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
            featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Why Choose Aptorent</h2>
            <p className="mt-4 text-lg text-emerald-200">Simplified rental experience for both renters and owners</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                title: "Easy Discovery",
                description: "Find the perfect rental items with our powerful search and filtering options."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Verified Listings",
                description: "Every listing is verified for quality and accuracy to ensure a great experience."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Competitive Pricing",
                description: "Get the best value with transparent pricing and no hidden fees."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl`}
                style={{
                  animation: featuresVisible ? `fadeInUp ${0.3 + index * 0.1}s ease-out forwards` : 'none',
                  opacity: 0,
                }}
              >
                <div className="text-emerald-300 mb-5">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-emerald-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-20 bg-emerald-950"
      >
        <div 
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
            statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { number: "15,000+", label: "Available Items" },
              { number: "32,000+", label: "Happy Renters" },
              { number: "99%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-emerald-800/50 to-green-800/50 backdrop-blur-md rounded-2xl p-10 text-center"
                style={{
                  animation: statsVisible ? `fadeInUp ${0.3 + index * 0.1}s ease-out forwards` : 'none',
                  opacity: 0,
                }}
              >
                <div 
                  className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-emerald-300 to-green-300 text-transparent bg-clip-text"
                >
                  {stat.number}
                </div>
                <div className="text-emerald-200 text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <section 
        ref={reviewsRef}
        className="py-20 bg-gradient-to-b from-emerald-950 to-green-900"
      >
        <div 
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
            reviewsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">What Our Users Say</h2>
            <p className="mt-4 text-lg text-emerald-200">Real experiences from our community of renters and owners</p>
          </div>
          
          {/* Reviews Slider */}
          <div className="relative overflow-hidden">
            {/* Review Cards */}
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeReviewIndex * 33.33}%)` }}
            >
              {[
                {
                  name: "Sarah Johnson",
                  role: "Apartment Renter",
                  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                  rating: 5,
                  text: "Finding furniture for my new apartment was so easy with Aptorent. The process was smooth from browsing to delivery, and the quality exceeded my expectations!",
                  animDelay: 0.1
                },
                {
                  name: "Michael Chen",
                  role: "Business Owner",
                  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                  rating: 5,
                  text: "As a business owner, I needed to furnish my office quickly. Aptorent saved me thousands compared to buying new, and the quality was excellent. Highly recommend!",
                  animDelay: 0.2
                },
                {
                  name: "Priya Sharma",
                  role: "Event Planner",
                  avatar: "https://randomuser.me/api/portraits/women/63.jpg",
                  rating: 5,
                  text: "I use Aptorent for all my events now. The selection is amazing, and the delivery is always on time. It's transformed how I approach event planning!",
                  animDelay: 0.3
                },
                {
                  name: "David Wilson",
                  role: "College Student",
                  avatar: "https://randomuser.me/api/portraits/men/75.jpg",
                  rating: 5,
                  text: "As a student, I couldn't afford to buy all the furniture I needed. Aptorent helped me furnish my dorm room affordably, and returning was super easy!",
                  animDelay: 0.1
                },
                {
                  name: "Aisha Patel",
                  role: "Home Stager",
                  avatar: "https://randomuser.me/api/portraits/women/28.jpg",
                  rating: 5,
                  text: "Aptorent is a game-changer for my home staging business. I can access high-quality furniture at a fraction of the cost of buying. My clients are always impressed!",
                  animDelay: 0.2
                },
                {
                  name: "James Rodriguez",
                  role: "Filmmaker",
                  avatar: "https://randomuser.me/api/portraits/men/45.jpg",
                  rating: 5,
                  text: "I used Aptorent to find camera equipment for my independent film. The selection was impressive and the rates were perfect for our tight budget.",
                  animDelay: 0.3
                },
                {
                  name: "Emily Zhang",
                  role: "First-time Renter",
                  avatar: "https://randomuser.me/api/portraits/women/90.jpg",
                  rating: 4,
                  text: "The customer service at Aptorent is exceptional! When I had an issue with my delivery, they resolved it immediately and even offered a discount on my next rental.",
                  animDelay: 0.1
                },
                {
                  name: "Omar Hassan",
                  role: "Wedding Planner",
                  avatar: "https://randomuser.me/api/portraits/men/36.jpg",
                  rating: 5,
                  text: "I've planned over 50 weddings using Aptorent's decor and furniture. Their selection helps me create unique experiences for each couple without breaking their budget.",
                  animDelay: 0.2
                },
                {
                  name: "Sophia Martinez",
                  role: "Interior Designer",
                  avatar: "https://randomuser.me/api/portraits/women/17.jpg",
                  rating: 5,
                  text: "As an interior designer, I appreciate the high-quality options Aptorent offers. It allows me to showcase different styles to clients before they commit to purchases.",
                  animDelay: 0.3
                },
                {
                  name: "Alex Thompson",
                  role: "Remote Worker",
                  avatar: "https://randomuser.me/api/portraits/men/29.jpg",
                  rating: 5,
                  text: "When I started working from home, I needed a proper office setup. Aptorent helped me try different ergonomic chairs and desks before investing in my permanent setup.",
                  animDelay: 0.1
                },
                {
                  name: "Tanvi Gupta",
                  role: "Small Business Owner",
                  avatar: "https://randomuser.me/api/portraits/women/38.jpg",
                  rating: 5,
                  text: "Aptorent helped me furnish my new café without the massive upfront costs. The flexible rental terms were perfect as my business grew and changed.",
                  animDelay: 0.2
                },
                {
                  name: "Lucas Nguyen",
                  role: "Photographer",
                  avatar: "https://randomuser.me/api/portraits/men/55.jpg",
                  rating: 5,
                  text: "The photography equipment on Aptorent is top-notch. I've been able to try different lenses and cameras before making expensive purchases. Such a valuable service!",
                  animDelay: 0.3
                },
                {
                  name: "Nadia Khatri",
                  role: "Home Renovator",
                  avatar: "https://randomuser.me/api/portraits/women/79.jpg",
                  rating: 5,
                  text: "During our home renovation, we used Aptorent for temporary furniture. The process was smooth, and it was much more comfortable than living with just the bare essentials.",
                  animDelay: 0.1
                }
              ].map((review, index) => (
                <div
                  key={index}
                  className="w-full md:w-1/3 flex-shrink-0 p-4"
                >
                  <div 
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 group relative"
                  >
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4 ring-2 ring-emerald-400">
                        <img src={review.avatar} alt={review.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{review.name}</h3>
                        <p className="text-emerald-300 text-sm">{review.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    
                    <div className="relative overflow-hidden">
                      <p className="text-emerald-100 italic mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">"{review.text}"</p>
                    </div>
                    
                    <div className="pt-4 border-t border-emerald-800/30 mt-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-300 text-sm">Verified Renter</span>
                        <span className="text-emerald-300 text-sm">2 weeks ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Slider Controls */}
            <div className="flex justify-center mt-8 space-x-2">
              {[...Array(Math.ceil(13/3))].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReviewIndex(idx * 3)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(activeReviewIndex / 3) === idx 
                      ? 'bg-emerald-400 w-6' 
                      : 'bg-emerald-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            
            {/* View All Reviews Button */}
            <div className="mt-12 text-center">
              <button 
                className="px-6 py-3 rounded-full text-white font-medium transform hover:scale-105 transition-all duration-300 border border-emerald-400/30 hover:border-emerald-400/80 bg-white/5 backdrop-blur-sm"
              >
                View All Reviews
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="py-20 bg-gradient-to-t from-emerald-900 to-green-900"
      >
        <div 
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-r from-emerald-800/40 to-green-800/40 backdrop-blur-lg rounded-3xl p-10 md:p-16 text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to find your perfect rental?</h2>
            <p className="text-lg text-emerald-200 mb-10 max-w-3xl mx-auto">
              Join thousands of happy renters who found their perfect items on Aptorent. Start browsing today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/categories"
                className="px-8 py-4 rounded-full text-white font-medium text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
                style={{
                  background: `linear-gradient(to right, ${theme.primary}, ${theme.accent})`,
                  boxShadow: `0 10px 20px -10px ${theme.primary}`,
                }}
              >
                Start Browsing
              </Link>
              
              <button 
                className="px-8 py-4 rounded-full font-medium text-lg border-2 text-white border-white bg-transparent hover:bg-white hover:text-emerald-900 transform hover:scale-105 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Aptorent</h3>
              <p className="mb-4">The best platform for finding and listing rental items.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/press" className="hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link to="/trust" className="hover:text-white transition-colors">Trust & Safety</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-emerald-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2023 Aptorent. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <select className="bg-emerald-900 text-emerald-200 rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option>English (US)</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
