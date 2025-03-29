import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useUser } from '../context/UserContext';
import { useItems } from '../context/ItemContext';
import { useCart } from '../context/CartContext';

function Orders() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { items, updateItem } = useItems();
  const { purchaseHistory } = useCart();
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter items that are being rented by the current user
  const rentedItems = items.filter(item => 
    item.status === 'rented' && item.rentedBy === user.id
  );

  const handleCancelRental = (item) => {
    setSelectedItem(item);
    setShowCancelPopup(true);
  };

  const confirmCancelRental = () => {
    if (selectedItem) {
      // Update item status back to available
      updateItem(selectedItem.id, {
        ...selectedItem,
        status: 'available',
        rentedBy: null,
        rentalEndDate: null
      });
      
      setShowCancelPopup(false);
      setSelectedItem(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Orders</h1>
          
          {/* Active Rentals Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Active Rentals</h2>
            {rentedItems.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No active rentals.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rentedItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <img
                      src={item.photos[0]}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Rental Price: ₹{item.price}</p>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Duration: {item.duration}</p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">Status: Active</p>
                      <button
                        onClick={() => handleCancelRental(item)}
                        className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Cancel Rental
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Purchase History Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Purchase History</h2>
            {purchaseHistory.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No purchase history.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {purchaseHistory.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <img
                      src={item.photos[0]}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Price: ₹{item.price}</p>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Quantity: {item.quantity}</p>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Total: ₹{item.price * item.quantity}</p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">Purchase Date: {new Date(item.purchaseDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Rental Popup */}
      {showCancelPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Cancel Rental</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to cancel this rental? Your refund will be processed within 7 working days.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={confirmCancelRental}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Confirm Cancel
              </button>
              <button
                onClick={() => setShowCancelPopup(false)}
                className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders; 