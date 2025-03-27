import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useItems } from '../context/ItemContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById } = useItems();
  const { addToCart } = useCart();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // Load item data
    try {
      const itemData = getItemById(id);
      if (itemData) {
        setItem(itemData);
      } else {
        setError('Item not found');
      }
    } catch (err) {
      console.error('Error loading item:', err);
      setError('Error loading item details');
    } finally {
      setLoading(false);
    }
  }, [id, getItemById]);

  const handleAddToCart = () => {
    if (item) {
      addToCart(item);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
            <p className="text-gray-700 mb-6">{error || 'Item not found'}</p>
            <Link
              to="/listings"
              className="inline-block bg-emerald-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-emerald-600 transition duration-300"
            >
              Back to Listings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Breadcrumb */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center text-sm">
              <Link to="/" className="text-gray-500 hover:text-emerald-500">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link to="/listings" className="text-gray-500 hover:text-emerald-500">Listings</Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-emerald-500">{item.name}</span>
            </div>
          </div>

          <div className="md:flex">
            {/* Left Column - Images */}
            <div className="md:w-1/2 p-6">
              <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden">
                {item.photos && item.photos.length > 0 ? (
                  <img
                    src={item.photos[selectedImage]}
                    alt={item.name}
                    className="w-full h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
              </div>
              
              {/* Thumbnail gallery */}
              {item.photos && item.photos.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  {item.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-emerald-500 scale-105'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`${item.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="md:w-1/2 p-6">
              <div className="mb-2">
                <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h1>
              
              <div className="flex items-center mb-4">
                <p className="text-2xl font-bold text-emerald-600 mr-2">₹{item.price}</p>
                <span className="text-gray-500">{item.duration}</span>
              </div>

              {item.advancedPayment > 0 && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <span className="font-semibold">Deposit Required:</span> ₹{item.advancedPayment}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{item.description || "No description provided."}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Details</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Delivery Method: {item.deliveryMethod}</span>
                  </li>
                  {item.location && (
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Location: {item.location}</span>
                    </li>
                  )}
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Listed: {new Date(item.createdAt).toLocaleDateString()}</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-300 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
                <Link
                  to="/cart"
                  className="flex-1 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-3 px-6 rounded-lg font-semibold transition duration-300 flex items-center justify-center"
                >
                  Rent Now
                </Link>
              </div>

              {added && (
                <div className="mt-4 p-3 bg-emerald-100 text-emerald-700 rounded-lg text-center">
                  Item added to cart!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail; 