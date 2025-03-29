import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/loginmain.jpg";
import bgVideo from "../assets/bgvideo1.mp4";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateUser } = useUser();

  // Mock credentials for demo purposes
  const mockUser = {
    email: "test@example.com",
    password: "password123",
    name: "Test User",
    username: "testuser",
    role: {
      renter: true,
      owner: false
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    // Check if the email and password match our mock data
    if (email === mockUser.email && password === mockUser.password) {
      console.log("Login successful!");
      
      // Update user context with mock user data
      updateUser({
        ...mockUser,
        isLoggedIn: true,
        memberSince: new Date().getFullYear().toString(),
        bio: "",
        ratings: {
          average: 4.5,
          count: 10,
          distribution: [
            { stars: 5, percentage: 70 },
            { stars: 4, percentage: 20 },
            { stars: 3, percentage: 10 },
            { stars: 2, percentage: 0 },
            { stars: 1, percentage: 0 }
          ]
        },
        trustScore: 85,
        data: {
          listings: 5,
          transactions: 12,
          bookings: 8,
          favorites: 3
        }
      });
      
      // Redirect to success page on successful login
      navigate("/success");
    } else {
      // Show error message on failed login
      setError("Invalid email or password. Try using test@example.com / password123");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Initialize Google Sign-In
      const googleAuth = window.gapi.auth2.getAuthInstance();
      const user = await googleAuth.signIn();
      
      if (user) {
        const profile = user.getBasicProfile();
        
        // Update user context with Google user data
        updateUser({
          name: profile.getName(),
          email: profile.getEmail(),
          username: profile.getName().toLowerCase().replace(/\s+/g, ''),
          profileImage: profile.getImageUrl(),
          isLoggedIn: true,
          role: {
            renter: true,
            owner: false
          },
          memberSince: new Date().getFullYear().toString(),
          bio: "",
          ratings: {
            average: 0,
            count: 0,
            distribution: [
              { stars: 5, percentage: 0 },
              { stars: 4, percentage: 0 },
              { stars: 3, percentage: 0 },
              { stars: 2, percentage: 0 },
              { stars: 1, percentage: 0 }
            ]
          },
          trustScore: 50,
          data: {
            listings: 0,
            transactions: 0,
            bookings: 0,
            favorites: 0
          }
        });
        
        navigate("/success");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      setError("Google login failed. Please try again.");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // Initialize Facebook Login
      window.FB.login(function(response) {
        if (response.authResponse) {
          console.log("Facebook Login successful!", response);
          window.FB.api('/me', { fields: 'email,name' }, function(response) {
            console.log("User info:", response);
            navigate("/success");
          });
        } else {
          setError("Facebook login failed. Please try again.");
        }
      }, { scope: 'email,public_profile' });
    } catch (error) {
      console.error("Facebook Login Error:", error);
      setError("Facebook login failed. Please try again.");
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      // LinkedIn OAuth URL
      const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin + '/linkedin-callback')}&scope=r_liteprofile%20r_emailaddress`;
      
      // Open LinkedIn login in a popup
      const width = 450;
      const height = 730;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      
      window.open(
        linkedInAuthUrl,
        'LinkedIn Login',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      // Handle the response in your LinkedIn callback route
      window.addEventListener('message', function(event) {
        if (event.data.type === 'linkedInLogin' && event.data.success) {
          console.log("LinkedIn Login successful!", event.data);
          navigate("/success");
        }
      });
    } catch (error) {
      console.error("LinkedIn Login Error:", error);
      setError("LinkedIn login failed. Please try again.");
    }
  };

  const goToSignup = () => {
    navigate("/signup");
  };
  
  const goToForgetPassword = () => {
    navigate("/forgetpass");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen pt-16">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to make content more visible */}
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

      <div className="relative w-full max-w-3xl flex bg-white rounded-lg shadow-lg overflow-hidden mx-4 z-20 my-6">
        
        {/* Left Side - Illustration */}
        <div className="hidden md:block w-1/2 bg-cover bg-center relative">
          <img
            src={loginImage}
            alt="Illustration"
            className="w-full h-full object-cover object-right"
            style={{ maxHeight: '600px' }}
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-gray-900 text-center">Log In</h2>
          <p className="text-gray-500 text-center text-sm mb-4">Enter your email and password</p>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded mb-4">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label className="text-gray-700 text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring focus:ring-gray-400 text-sm"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="text-gray-700 text-sm">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring focus:ring-gray-400 text-sm"
                  placeholder="Enter your password"
                  required
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1.5 text-gray-500 cursor-pointer"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button 
                type="button"
                onClick={goToForgetPassword}
                className="text-red-500 text-xs"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
            >
              LOGIN
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mt-3 text-sm">
            Don't have an account?{" "}
            <button 
              onClick={goToSignup}
              className="text-orange-600 font-semibold"
            >
              Sign up
            </button>
          </p>

          {/* Social Logins */}
          <div className="mt-4">
            <p className="text-center text-gray-500 text-xs">Log In with</p>
            <div className="flex justify-center space-x-4 mt-2">
              <button 
                onClick={handleGoogleLogin}
                className="bg-white border border-gray-300 p-1.5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="w-5 h-5">
                  <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                </svg>
              </button>
              <button 
                onClick={handleFacebookLogin}
                className="bg-white border border-gray-300 p-1.5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-5 h-5">
                  <path fill="#1877F2" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                </svg>
              </button>
              <button 
                onClick={handleLinkedInLogin}
                className="bg-white border border-gray-300 p-1.5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5">
                  <path fill="#0A66C2" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
