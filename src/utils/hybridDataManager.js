// Hybrid Data Manager - Uses API when available, localStorage as fallback
// Provides seamless fallback between API and localStorage
import { apiService } from '../services/apiService';
import ordersData from '../data/ordersData.json';

// Load orders from localStorage
const loadLocalOrders = () => {
  const stored = localStorage.getItem('restaurant_orders');
  return stored ? JSON.parse(stored) : [...ordersData];
};

// Save orders to localStorage
const saveLocalOrders = (orders) => {
  localStorage.setItem('restaurant_orders', JSON.stringify(orders));
};

// ============ ORDER MANAGEMENT ============
export const hybridOrderManager = {
  async getAllOrders() {
    try {
      // Try API first
      const orders = await apiService.getAllOrders();
      return orders.sort((a, b) => {
        const dateA = new Date(a.timestamp || a.date || 0);
        const dateB = new Date(b.timestamp || b.date || 0);
        return dateB - dateA;
      });
    } catch (error) {
      console.log('API unavailable, using localStorage');
      // Fallback to localStorage
      return loadLocalOrders().sort((a, b) => {
        const dateA = new Date(a.timestamp || a.date || 0);
        const dateB = new Date(b.timestamp || b.date || 0);
        return dateB - dateA;
      });
    }
  },

  async getUserOrders(userId) {
    try {
      // Try API first
      const orders = await apiService.getUserOrders(userId);
      return orders.sort((a, b) => {
        const dateA = new Date(a.timestamp || a.date || 0);
        const dateB = new Date(b.timestamp || b.date || 0);
        return dateB - dateA;
      });
    } catch (error) {
      console.log('API unavailable, using localStorage');
      // Fallback to localStorage
      return loadLocalOrders()
        .filter(o => o.userId === userId)
        .sort((a, b) => {
          const dateA = new Date(a.timestamp || a.date || 0);
          const dateB = new Date(b.timestamp || b.date || 0);
          return dateB - dateA;
        });
    }
  },

  async createOrder(orderData) {
    const now = new Date();
    const newOrder = {
      ...orderData,
      id: orderData.id || Date.now(),
      timestamp: orderData.timestamp || now.toISOString(),
      date: orderData.date || now.toISOString().split('T')[0],
      time: orderData.time || now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      status: orderData.status || 'Pending'
    };

    try {
      // Try API first
      const createdOrder = await apiService.createOrder(newOrder);
      return createdOrder;
    } catch (error) {
      console.log('API unavailable, using localStorage');
      // Fallback to localStorage
      const orders = loadLocalOrders();
      orders.unshift(newOrder);
      saveLocalOrders(orders);
      return newOrder;
    }
  },

  async updateOrderStatus(orderId, status) {
    try {
      // Try API first
      const updatedOrder = await apiService.updateOrderStatus(orderId, status);
      return updatedOrder;
    } catch (error) {
      console.log('API unavailable, using localStorage');
      // Fallback to localStorage
      const orders = loadLocalOrders();
      const index = orders.findIndex(o => o.id === orderId);
      if (index !== -1) {
        orders[index].status = status;
        saveLocalOrders(orders);
        return orders[index];
      }
      return null;
    }
  },

  async getActiveOrdersCount() {
    const orders = await this.getAllOrders();
    return orders.filter(order => {
      const status = order.status.toLowerCase();
      return status !== 'delivered' && status !== 'completed';
    }).length;
  }
};
