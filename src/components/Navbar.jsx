import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

// Color themes matching the Home page
const themes = [
  { 
    primary: "#f97316", // orange-500
    primaryHover: "#ea580c", // orange-600
  },
  { 
    primary: "#3b82f6", // blue-500
    primaryHover: "#2563eb", // blue-600
  },
  { 
    primary: "#22c55e", // green-500
    primaryHover: "#16a34a", // green-600
  }
];

const Navbar = ({ fixedTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const { user, logout } = useUser();
  const { cartItems } = useCart();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[language].nav;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
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

  const handleSignupClick = () => {
    navigate("/signup");
    setIsMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

  const goToProfile = () => {
    navigate("/profile");
    setIsMobileMenuOpen(false);
  };

  // Use fixed theme (green) or default to the third theme
  const currentTheme = fixedTheme || themes[2];

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav
      className={`${
        isScrolled ? "bg-black bg-opacity-90 shadow-lg" : "bg-transparent"
      } fixed w-full z-50 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-white">
                <span 
                  style={{ 
                    color: currentTheme.primary
                  }}
                >
                  Apto
                </span>
                rent
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link to="/categories" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
              Listings
            </Link>
            <Link to="/about" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
              About
            </Link>
            <Link to="/contact" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user.isLoggedIn && (
              <Link to="/cart" className="relative text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={connectWallet}
              className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              {walletAddress 
                ? `${walletAddress.substring(0,6)}...${walletAddress.substring(walletAddress.length-4)}` 
                : "Connect Petra Wallet"}
            </button>
            
            {user.isLoggedIn ? (
              <>
                <button
                  onClick={goToProfile}
                  className="flex items-center text-white px-3 py-2 text-sm font-medium hover:text-emerald-400 transition-colors duration-200"
                  title="View Profile"
                >
                  {user.username}
                </button>
                <button
                  onClick={handleLogoutClick}
                  className="text-white border border-white hover:bg-white hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="text-white border border-white hover:bg-white hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Log In
                </button>
                <button
                  onClick={handleSignupClick}
                  className="text-white font-medium px-4 py-2 rounded-lg text-sm"
                  style={{ 
                    backgroundColor: currentTheme.primary
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = currentTheme.primaryHover}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = currentTheme.primary}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {user.isLoggedIn && (
              <>
                <Link to="/cart" className="relative text-gray-300 hover:text-white mr-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={goToProfile}
                  className="text-white text-sm font-medium hover:text-emerald-400 transition-colors duration-200"
                  title="View Profile"
                >
                  {user.username}
                </button>
              </>
            )}
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
              style={{ color: "white" }}
              aria-label="Toggle menu"
            >
              {!isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="text-white hover:text-gray-300 block px-3 py-2 text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="text-white hover:text-gray-300 block px-3 py-2 text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Listings
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-gray-300 block px-3 py-2 text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-gray-300 block px-3 py-2 text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Mobile Auth Links */}
            <div className="border-t border-gray-700 mt-4 pt-4">
              {user.isLoggedIn ? (
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left text-white hover:text-gray-300 block px-3 py-2 text-base font-medium"
                >
                  Log Out
                </button>
              ) : (
                <>
                  <button
                    onClick={handleLoginClick}
                    className="w-full text-left text-white hover:text-gray-300 block px-3 py-2 text-base font-medium"
                  >
                    Log In
                  </button>
                  <button
                    onClick={handleSignupClick}
                    className="w-full text-left text-white hover:text-gray-300 block px-3 py-2 text-base font-medium"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
