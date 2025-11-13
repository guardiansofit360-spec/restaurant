// API Service for communicating with Node.js backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

export const apiService = {
  // ============ ORDERS ============
  async getAllOrders() {
    return await apiCall('/orders');
  },

  async getUserOrders(userId) {
    return await apiCall(`/orders/user/${userId}`);
  },

  async createOrder(orderData) {
    return await apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  async updateOrderStatus(orderId, status) {
    return await apiCall(`/orders/${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // ============ USERS ============
  async getAllUsers() {
    return await apiCall('/users');
  },

  async createUser(userData) {
    return await apiCall('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // ============ INVENTORY ============
  async getInventory() {
    return await apiCall('/inventory');
  },

  async updateInventoryItem(itemId, itemData) {
    return await apiCall(`/inventory/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(itemData),
    });
  },

  // ============ OFFERS ============
  async getOffers() {
    return await apiCall('/offers');
  },

  // ============ HEALTH CHECK ============
  async healthCheck() {
    return await apiCall('/health');
  },
};
