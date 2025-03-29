import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [purchaseHistory, setPurchaseHistory] = useState(() => {
    const savedHistory = localStorage.getItem('purchaseHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
  }, [purchaseHistory]);

  const addToCart = (item) => {
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
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const completePurchase = () => {
    // Create a single order with multiple items
    const orderItems = cartItems.map(item => ({
      ...item,
      status: 'active',
      purchaseDate: new Date().toISOString(),
      rentalEndDate: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString() // 30 days rental
    }));

    const newOrder = {
      id: `order-${Date.now()}`,
      items: orderItems,
      status: 'active',
      purchaseDate: new Date().toISOString(),
      totalAmount: getCartTotal()
    };

    setPurchaseHistory(prevHistory => [...prevHistory, newOrder]);
    clearCart();
  };

  const cancelOrder = (orderId) => {
    setPurchaseHistory(prevHistory => 
      prevHistory.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status: 'cancelled',
              cancellationDate: new Date().toISOString(),
              items: order.items.map(item => ({
                ...item,
                status: 'cancelled'
              }))
            }
          : order
      )
    );
  };

  const value = {
    cartItems,
    purchaseHistory,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    completePurchase,
    cancelOrder
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 