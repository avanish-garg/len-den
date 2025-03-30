import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Create context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const { user: authUser, isAuthenticated } = useAuth();
  
  // Get saved user from localStorage on initial load
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      isLoggedIn: false,
      name: '',
      username: '',
      email: '',
      role: '',
      walletAddress: '',
      memberSince: new Date().getFullYear().toString(),
      bio: '',
      kyc: {
        verified: false,
        idNumber: '',
        idType: '',
        idDocument: null,
        submissionDate: null,
        verificationDate: null,
        status: 'not_submitted' // not_submitted, pending, verified, rejected
      },
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
      trustScore: 0,
      data: {
        listings: 0,
        transactions: 0,
        bookings: 0,
        favorites: 0
      }
    };
  });

  // Update user when auth user changes
  useEffect(() => {
    if (authUser && isAuthenticated) {
      setUser(prevUser => ({
        ...prevUser,
        ...authUser,
        isLoggedIn: true
      }));
    } else {
      setUser(prevUser => ({
        ...prevUser,
        isLoggedIn: false
      }));
    }
  }, [authUser, isAuthenticated]);

  // Save to localStorage whenever user changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // Update user info
  const updateUser = (newUserData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...newUserData,
      isLoggedIn: true
    }));
  };

  // Logout function
  const logout = () => {
    setUser({
      isLoggedIn: false,
      name: '',
      username: '',
      email: '',
      role: '',
      walletAddress: '',
      memberSince: new Date().getFullYear().toString(),
      bio: '',
      kyc: {
        verified: false,
        idNumber: '',
        idType: '',
        idDocument: null,
        submissionDate: null,
        verificationDate: null,
        status: 'not_submitted'
      },
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
      trustScore: 0,
      data: {
        listings: 0,
        transactions: 0,
        bookings: 0,
        favorites: 0
      }
    });
  };

  const value = {
    user,
    updateUser,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 