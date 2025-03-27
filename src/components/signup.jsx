import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImage from "../assets/signupmain.jpg";
import bgVideo from "../assets/bgvideo1.mp4";
import { useUser } from "../context/UserContext";

const Signup = () => {
  const { updateUser } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    role: "",
    email: "",
    password: "",
    walletAddress: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    // Simple validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    // If all validations pass, proceed with signup
    console.log("Signup successful with:", formData);
    
    // Set up user role object based on selection
    const userRole = {
      renter: formData.role === 'renter',
      owner: formData.role === 'lender',
      admin: formData.role === 'admin'
    };
    
    // Update user context with form data
    updateUser({
      name: formData.name,
      username: formData.username,
      email: formData.email,
      role: userRole,
      bio: "",
      memberSince: new Date().getFullYear().toString(),
      trustScore: 50, // Default trust score for new users
      walletAddress: formData.walletAddress,
      data: {
        listings: 0,
        transactions: 0,
        bookings: 0,
        favorites: 0
      }
    });
    
    // Navigate to success page
    navigate("/success");
  };
  
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to make content more visible */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

      <div className="relative w-full max-w-4xl flex flex-row-reverse bg-white rounded-lg shadow-lg overflow-hidden mx-4 z-20">
        
        {/* Right Side - Illustration (was left side before) */}
        <div className="hidden md:block w-1/2 bg-cover bg-center relative">
          <img
            src={signupImage}
            alt="Illustration"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Left Side - Signup Form (was right side before) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">Sign Up</h2>
          <p className="text-gray-500 text-center mb-6">Create your account</p>
           
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label className="text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-400"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Username Input */}
            <div>
              <label className="text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-400"
                placeholder="Username"
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="text-gray-700">Select Role</label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-400 appearance-none"
                  required
                >
                  <option value="" disabled>Select Role</option>
                  <option value="lender">Lender</option>
                  <option value="admin">Admin</option>
                  <option value="renter">Renter</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-400"
                placeholder="Email"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-400"
                  placeholder="Password"
                  required
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Blockchain Wallet Address Input */}
            <div>
              <label className="text-gray-700">Wallet Address</label>
              <input
                type="text"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-400"
                placeholder="Enter your blockchain wallet address"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Supported networks: Ethereum, Bitcoin, Solana, and others
              </p>
            </div>

            {/* Signup Button */}
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition mt-6"
            >
              CREATE
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <button 
              onClick={goToLogin}
              className="text-orange-600 font-semibold"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup; 