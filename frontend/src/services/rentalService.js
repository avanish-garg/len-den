import api from '../config/api';

export const rentalService = {
  getAllRentals: async () => {
    const response = await api.get('/rentals');
    return response.data;
  },

  getRentalById: async (id) => {
    const response = await api.get(`/rentals/${id}`);
    return response.data;
  },

  createRental: async (rentalData) => {
    const response = await api.post('/rentals', rentalData);
    return response.data;
  },

  updateRental: async (id, rentalData) => {
    const response = await api.put(`/rentals/${id}`, rentalData);
    return response.data;
  },

  deleteRental: async (id) => {
    const response = await api.delete(`/rentals/${id}`);
    return response.data;
  },

  // Cart operations
  addToCart: async (rentalId) => {
    const response = await api.post('/cart/add', { rentalId });
    return response.data;
  },

  removeFromCart: async (rentalId) => {
    const response = await api.delete(`/cart/remove/${rentalId}`);
    return response.data;
  },

  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  // Payment operations
  initiatePayment: async (paymentData) => {
    const response = await api.post('/payments/initiate', paymentData);
    return response.data;
  },

  verifyPayment: async (paymentId) => {
    const response = await api.post('/payments/verify', { paymentId });
    return response.data;
  },

  // KYC operations
  submitKYC: async (kycData) => {
    const response = await api.post('/kyc/submit', kycData);
    return response.data;
  },

  getKYCStatus: async () => {
    const response = await api.get('/kyc/status');
    return response.data;
  }
}; 