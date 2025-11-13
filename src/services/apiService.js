const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  // ============ USER METHODS ============
  async getUsers() {
    const response = await fetch(`${API_URL}/users`);
    return response.json();
  }

  async getUserById(userId) {
    const response = await fetch(`${API_URL}/users/${userId}`);
    return response.json();
  }

  async createUser(userData) {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  }

  async loginUser(email, password) {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  }

  async updateUser(userId, userData) {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  }

  // ============ ORDER METHODS ============
  async getAllOrders() {
    const response = await fetch(`${API_URL}/orders`);
    return response.json();
  }

  async getUserOrders(userId) {
    const response = await fetch(`${API_URL}/orders/user/${userId}`);
    return response.json();
  }

  async getActiveOrdersCount() {
    const response = await fetch(`${API_URL}/orders/stats/active`);
    const data = await response.json();
    return data.count;
  }

  async createOrder(orderData) {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return response.json();
  }

  async updateOrderStatus(orderId, status) {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response.json();
  }

  // ============ MENU METHODS ============
  async getMenuItems() {
    const response = await fetch(`${API_URL}/menu`);
    return response.json();
  }

  async getMenuItem(itemId) {
    const response = await fetch(`${API_URL}/menu/${itemId}`);
    return response.json();
  }

  async createMenuItem(itemData) {
    const response = await fetch(`${API_URL}/menu`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData)
    });
    return response.json();
  }

  async updateMenuItem(itemId, itemData) {
    const response = await fetch(`${API_URL}/menu/${itemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData)
    });
    return response.json();
  }

  async deleteMenuItem(itemId) {
    const response = await fetch(`${API_URL}/menu/${itemId}`, {
      method: 'DELETE'
    });
    return response.json();
  }

  // ============ CATEGORY METHODS ============
  async getCategories() {
    const response = await fetch(`${API_URL}/categories`);
    return response.json();
  }

  async createCategory(categoryData) {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData)
    });
    return response.json();
  }

  // ============ OFFER METHODS ============
  async getOffers() {
    const response = await fetch(`${API_URL}/offers`);
    return response.json();
  }

  async getActiveOffers() {
    const response = await fetch(`${API_URL}/offers/active`);
    return response.json();
  }

  async createOffer(offerData) {
    const response = await fetch(`${API_URL}/offers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offerData)
    });
    return response.json();
  }

  async updateOffer(offerId, offerData) {
    const response = await fetch(`${API_URL}/offers/${offerId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offerData)
    });
    return response.json();
  }

  async deleteOffer(offerId) {
    const response = await fetch(`${API_URL}/offers/${offerId}`, {
      method: 'DELETE'
    });
    return response.json();
  }

  // ============ HEALTH CHECK ============
  async healthCheck() {
    try {
      const response = await fetch(`${API_URL}/health`);
      return response.json();
    } catch (error) {
      return { status: 'ERROR', message: error.message };
    }
  }
}

export default new ApiService();
