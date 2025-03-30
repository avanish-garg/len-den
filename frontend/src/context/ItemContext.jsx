import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const ItemContext = createContext();

// Provider component
export const ItemProvider = ({ children }) => {
  // Get saved items from localStorage on initial load
  const [items, setItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem('items');
      const parsedItems = savedItems ? JSON.parse(savedItems) : [];
      console.log("Loaded items from localStorage:", parsedItems);
      return parsedItems;
    } catch (error) {
      console.error("Error loading items from localStorage:", error);
      return [];
    }
  });

  // Save to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem('items', JSON.stringify(items));
      console.log("Saved items to localStorage:", items);
    } catch (error) {
      console.error("Error saving items to localStorage:", error);
    }
  }, [items]);

  // Add a new item
  const addItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setItems(prevItems => [...prevItems, itemWithId]);
    console.log("Added new item:", itemWithId);
    return itemWithId;
  };

  // Get all items
  const getAllItems = () => {
    return items;
  };

  // Get item by id
  const getItemById = (id) => {
    return items.find(item => item.id === id);
  };

  // Update an item
  const updateItem = (id, updatedItem) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { 
              ...item, 
              ...updatedItem, 
              updatedAt: new Date().toISOString() 
            } 
          : item
      )
    );
  };

  // Delete an item
  const deleteItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Get items by category
  const getItemsByCategory = (category) => {
    console.log("Getting items by category:", category);
    console.log("All items:", items);
    // Case-insensitive comparison to improve matching
    const filteredItems = items.filter(item => 
      item.category && item.category.toLowerCase() === category.toLowerCase()
    );
    console.log("Filtered items:", filteredItems);
    return filteredItems;
  };

  // Get items by user
  const getItemsByUser = (userId) => {
    return items.filter(item => item.userId === userId);
  };

  return (
    <ItemContext.Provider value={{ 
      items, 
      addItem, 
      getAllItems, 
      getItemById, 
      updateItem, 
      deleteItem,
      getItemsByCategory,
      getItemsByUser
    }}>
      {children}
    </ItemContext.Provider>
  );
};

// Custom hook for using the context
export const useItems = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
}; 