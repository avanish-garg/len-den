import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from '../context/CartContext';

const FrontNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const { user, logout } = useUser();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  
  // Theme colors - Emerald/Green
  const theme = {
    primary: "#10B981", // emerald-500
    primaryHover: "#059669", // emerald-600
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Add animation class when component mounts
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Slight delay for better entrance effect
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Navigate functions
  const handleSignupClick = () => navigate("/signup");
  const handleLoginClick = () => navigate("/login");
  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };
  const goToProfile = () => navigate("/profile");

  // Function to connect to Petra Wallet
  const connectWallet = async () => {
    if (window.aptos) {
      try {
        const response = await window.aptos.connect();
        setWalletAddress(response.address);
      } catch (error) {
        console.error("Error connecting to Petra Wallet:", error);
      }
    } else {
      alert("Petra Wallet is not installed. Please install it to use this feature.");
    }
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-black/90 backdrop-blur-md py-2 shadow-lg" 
          : "bg-gradient-to-b from-black/70 to-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo with fade-in animation */}
          <Link 
            to="/" 
            className={`flex items-center group transform transition-all duration-700 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <h1 className="text-3xl font-bold text-white tracking-tight transition-all duration-300 hover:scale-105">
              <span 
                className="text-emerald-400 transition-all duration-300 group-hover:tracking-wider"
                style={{ textShadow: '0 0 15px rgba(16, 185, 129, 0.5)' }}
              >
                Apto
              </span>
              <span className="group-hover:text-gray-300 transition-colors duration-300">rent</span>
            </h1>
          </Link>

          {/* Navigation Links with staggered fade-in */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: "Home", path: "/", delay: 100 },
              { name: "Listings", path: "/categories", delay: 200 },
              { name: "Education", path: "/education", delay: 300 },
              { name: "Contact", path: "/contact", delay: 400 },
              { name: "About", path: "/about", delay: 500 },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-white/90 hover:text-white px-3 py-2 text-sm font-medium relative group transform transition-all duration-700 ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: mounted ? `${item.delay}ms` : '0ms' }}
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions with fade-in animation */}
          <div className={`flex items-center space-x-6 transform transition-all duration-700 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`} style={{ transitionDelay: mounted ? '600ms' : '0ms' }}>
            {/* Cart icon with hover animation */}
            {user.isLoggedIn && (
              <Link to="/cart" className="relative text-white/90 hover:text-white transition-colors duration-200 hover:scale-110 transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            )}
            
            {/* Petra Wallet Button with hover effect */}
            <button
              onClick={connectWallet}
              className="hidden md:flex text-white bg-purple-600/90 hover:bg-purple-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transform"
            >
              {walletAddress 
                ? `${walletAddress.substring(0,6)}...${walletAddress.substring(walletAddress.length-4)}` 
                : "Connect Wallet"}
            </button>
            
            {/* Auth Buttons with hover effects */}
            {user.isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={goToProfile}
                  className="hidden md:flex items-center text-white/90 hover:text-white text-sm font-medium transition-all duration-200 hover:scale-105 transform"
                >
                  <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{user.username}</span>
                </button>
                <button
                  onClick={handleLogoutClick}
                  className="text-white border border-white/70 hover:border-white hover:bg-white/10 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 transform"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLoginClick}
                  className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 hover:scale-105 transform"
                >
                  Log In
                </button>
                <button
                  onClick={handleSignupClick}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5 transform"
                >
                  Sign Up
                </button>
              </div>
            )}
            
            {/* Mobile Menu Button with hover effect */}
            <button className="md:hidden text-white hover:scale-110 transition-transform duration-200 transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Add custom styles for animations */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes menuHover {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </nav>
  );
};

export default FrontNavbar; 