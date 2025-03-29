import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import LanguageModal from './LanguageModal';

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
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || fixedTheme ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-white">
                <span className="text-emerald-500">Apto</span>
                <span className="text-white">rent</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-white hover:text-emerald-400 px-3 py-2 text-base font-medium transition-colors ${
                location.pathname === '/' ? 'text-emerald-400' : ''
              }`}
            >
              {t.home}
            </Link>
            <Link 
              to="/categories" 
              className={`text-white hover:text-emerald-400 px-3 py-2 text-base font-medium transition-colors ${
                location.pathname === '/categories' ? 'text-emerald-400' : ''
              }`}
            >
              {t.listings}
            </Link>
            <Link 
              to="/about" 
              className={`text-white hover:text-emerald-400 px-3 py-2 text-base font-medium transition-colors ${
                location.pathname === '/about' ? 'text-emerald-400' : ''
              }`}
            >
              {t.about}
            </Link>
            <Link 
              to="/contact" 
              className={`text-white hover:text-emerald-400 px-3 py-2 text-base font-medium transition-colors ${
                location.pathname === '/contact' ? 'text-emerald-400' : ''
              }`}
            >
              {t.contact}
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="text-white hover:text-emerald-400 px-3 py-2 text-base font-medium transition-colors"
            >
              {t.language}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="text-white hover:text-emerald-400 px-3 py-2 text-base font-medium transition-colors"
                >
                  {t.profile}
                </Link>
                <button
                  onClick={logout}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-emerald-400 px-3 py-2 text-base font-medium transition-colors"
                >
                  {t.login}
                </Link>
                <Link
                  to="/signup"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors"
                >
                  {t.signup}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-emerald-400 p-2 rounded-lg transition-colors"
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
        <div className="md:hidden bg-black/95 border-t border-gray-800">
          <div className="px-4 pt-2 pb-3 space-y-2">
            <Link
              to="/"
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                location.pathname === '/' ? 'text-emerald-400 bg-emerald-900/50' : 'text-white hover:bg-emerald-900/30'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.home}
            </Link>
            <Link
              to="/categories"
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                location.pathname === '/categories' ? 'text-emerald-400 bg-emerald-900/50' : 'text-white hover:bg-emerald-900/30'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.listings}
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                location.pathname === '/about' ? 'text-emerald-400 bg-emerald-900/50' : 'text-white hover:bg-emerald-900/30'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.about}
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                location.pathname === '/contact' ? 'text-emerald-400 bg-emerald-900/50' : 'text-white hover:bg-emerald-900/30'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.contact}
            </Link>

            <div className="pt-4 border-t border-gray-800">
              <button
                onClick={() => {
                  setIsLanguageModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full px-3 py-2 text-base font-medium text-white hover:bg-emerald-900/30 rounded-lg transition-colors text-left"
              >
                {t.language}
              </button>
              
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-base font-medium text-white hover:bg-emerald-900/30 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.profile}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full px-3 py-2 text-base font-medium text-white hover:bg-emerald-900/30 rounded-lg transition-colors text-left"
                  >
                    {t.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-white hover:bg-emerald-900/30 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.login}
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 text-base font-medium text-white hover:bg-emerald-900/30 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.signup}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Language Modal */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
