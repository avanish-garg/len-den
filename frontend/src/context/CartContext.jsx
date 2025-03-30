import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const { isAuthenticated } = useAuth();

  const addToCart = (item) => {
    if (!isAuthenticated) {
      throw new Error('User must be authenticated to add items to cart');
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = (item.rentAmount + item.deposit) * item.quantity;
      return total + itemTotal;
    }, 0);
  };

  const processCheckout = async () => {
    if (!isAuthenticated) {
      throw new Error('User must be authenticated to checkout');
    }

    setLoading(true);
    setError(null);

    try {
      // Get wallet address from Petra or user context
      let walletAddress;
      if (window.petra) {
        const response = await window.petra.connect();
        walletAddress = response.address;
      } else {
        walletAddress = user.address;
      }

      if (!walletAddress) {
        throw new Error('No wallet address found');
      }

      // Process each item in the cart
      for (const item of cartItems) {
        // Calculate total amount (rent + deposit) for this item
        const totalAmount = (item.rentAmount + item.deposit) * item.quantity;

        // Book the rental
        const response = await fetch('http://localhost:5000/api/rentals/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            rentalId: item.id,
            quantity: item.quantity,
            startDate: item.startDate,
            endDate: item.endDate,
            walletAddress
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to process rental');
        }

        const result = await response.json();
        console.log('Rental booked:', result);
      }

      // Clear cart after successful checkout
      clearCart();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    processCheckout
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 