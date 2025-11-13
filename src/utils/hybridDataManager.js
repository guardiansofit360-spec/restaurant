// Hybrid Data Manager - Uses Firestore when available, localStorage as fallback
import { firestoreService } from '../services/firestoreService';
import ordersData from '../data/ordersData.json';

// Check if Firebase is configured
const isFirebaseConfigured = () => {
  return process.env.REACT_APP_FIREBASE_API_KEY && 
         process.env.REACT_APP_FIREBASE_API_KEY !== 'YOUR_API_KEY';
};

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
    if (isFirebaseConfigured()) {
      // Use Firestore
      const result = await firestoreService.getAllOrders();
      if (result.success) {
        return result.orders;
      }
    }
    
    // Fallback to localStorage
    return loadLocalOrders().sort((a, b) => {
      const dateA = new Date(a.timestamp || a.date || 0);
      const dateB = new Date(b.timestamp || b.date || 0);
      return dateB - dateA;
    });
  },

  async getUserOrders(userId) {
    if (isFirebaseConfigured()) {
      // Use Firestore
      const result = await firestoreService.getUserOrders(userId);
      if (result.success) {
        return result.orders;
      }
    }
    
    // Fallback to localStorage
    return loadLocalOrders()
      .filter(o => o.userId === userId)
      .sort((a, b) => {
        const dateA = new Date(a.timestamp || a.date || 0);
        const dateB = new Date(b.timestamp || b.date || 0);
        return dateB - dateA;
      });
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

    if (isFirebaseConfigured()) {
      // Use Firestore
      const result = await firestoreService.createOrder(newOrder);
      if (result.success) {
        return result;
      }
    }
    
    // Fallback to localStorage
    const orders = loadLocalOrders();
    orders.unshift(newOrder);
    saveLocalOrders(orders);
    return newOrder;
  },

  async updateOrderStatus(orderId, status) {
    if (isFirebaseConfigured()) {
      // Use Firestore
      const result = await firestoreService.updateOrderStatus(orderId, status);
      if (result.success) {
        return { id: orderId, status };
      }
    }
    
    // Fallback to localStorage
    const orders = loadLocalOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      saveLocalOrders(orders);
      return orders[index];
    }
    return null;
  },

  async getActiveOrdersCount() {
    const orders = await this.getAllOrders();
    return orders.filter(order => {
      const status = order.status.toLowerCase();
      return status !== 'delivered' && status !== 'completed';
    }).length;
  }
};
