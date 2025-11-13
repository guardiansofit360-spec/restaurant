// Data Manager Utility - JSON Only
// This file provides functions to manage data using JSON files directly

import usersData from '../data/usersData.json';
import ordersData from '../data/ordersData.json';
import inventoryData from '../data/inventoryData.json';
import offersData from '../data/offersData.json';
import categoriesData from '../data/categoriesData.json';

// Load orders from localStorage or JSON
const loadOrders = () => {
  const stored = localStorage.getItem('restaurant_orders');
  return stored ? JSON.parse(stored) : [...ordersData];
};

// Save orders to localStorage
const saveOrders = (orders) => {
  localStorage.setItem('restaurant_orders', JSON.stringify(orders));
};

// In-memory data store (simulates database)
let dataStore = {
  users: [...usersData],
  orders: loadOrders(),
  inventory: [...inventoryData],
  offers: [...offersData],
  categories: [...categoriesData]
};

// ============ USER MANAGEMENT ============
export const userManager = {
  getAllUsers() {
    return [...dataStore.users];
  },

  getUserById(userId) {
    return dataStore.users.find(u => u.id === userId);
  },

  getUserByEmail(email) {
    return dataStore.users.find(u => u.email === email);
  },

  createUser(userData) {
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    dataStore.users.push(newUser);
    return newUser;
  },

  updateUser(userId, userData) {
    const index = dataStore.users.findIndex(u => u.id === userId);
    if (index !== -1) {
      dataStore.users[index] = { ...dataStore.users[index], ...userData };
      return dataStore.users[index];
    }
    return null;
  },

  loginUser(email, password) {
    return dataStore.users.find(u => u.email === email && u.password === password);
  }
};

// ============ ORDER MANAGEMENT ============
export const orderManager = {
  getAllOrders() {
    return [...dataStore.orders].sort((a, b) => {
      const dateA = new Date(a.timestamp || a.date || 0);
      const dateB = new Date(b.timestamp || b.date || 0);
      return dateB - dateA;
    });
  },

  getUserOrders(userId) {
    return dataStore.orders
      .filter(o => o.userId === userId)
      .sort((a, b) => {
        const dateA = new Date(a.timestamp || a.date || 0);
        const dateB = new Date(b.timestamp || b.date || 0);
        return dateB - dateA;
      });
  },

  getOrderById(orderId) {
    return dataStore.orders.find(o => o.id === orderId);
  },

  createOrder(orderData) {
    const now = new Date();
    const newOrder = {
      ...orderData,
      id: orderData.id || Date.now(),
      timestamp: orderData.timestamp || now.toISOString(),
      date: orderData.date || now.toISOString().split('T')[0],
      time: orderData.time || now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      status: orderData.status || 'Pending'
    };
    dataStore.orders.unshift(newOrder); // Add to beginning for newest first
    saveOrders(dataStore.orders);
    return newOrder;
  },

  updateOrderStatus(orderId, status) {
    const index = dataStore.orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      dataStore.orders[index].status = status;
      saveOrders(dataStore.orders);
      return dataStore.orders[index];
    }
    return null;
  },

  getActiveOrdersCount() {
    return dataStore.orders.filter(order => {
      const status = order.status.toLowerCase();
      return status !== 'delivered' && status !== 'completed';
    }).length;
  }
};

// ============ INVENTORY MANAGEMENT ============
export const inventoryManager = {
  getInventory() {
    return [...dataStore.inventory];
  },

  getItemById(itemId) {
    return dataStore.inventory.find(i => i.id === itemId);
  },

  addItem(itemData) {
    const newItem = {
      id: Date.now().toString(),
      ...itemData
    };
    dataStore.inventory.push(newItem);
    return newItem;
  },

  updateItem(itemId, itemData) {
    const index = dataStore.inventory.findIndex(i => i.id === itemId);
    if (index !== -1) {
      dataStore.inventory[index] = { ...dataStore.inventory[index], ...itemData };
      return dataStore.inventory[index];
    }
    return null;
  },

  deleteItem(itemId) {
    const index = dataStore.inventory.findIndex(i => i.id === itemId);
    if (index !== -1) {
      dataStore.inventory.splice(index, 1);
      return true;
    }
    return false;
  }
};

// ============ CATEGORY MANAGEMENT ============
export const categoryManager = {
  getCategories() {
    return [...dataStore.categories];
  }
};

// ============ OFFERS MANAGEMENT ============
export const offerManager = {
  getOffers() {
    return [...dataStore.offers];
  },

  getOfferById(offerId) {
    return dataStore.offers.find(o => o.id === offerId);
  },

  createOffer(offerData) {
    const newOffer = {
      id: Date.now().toString(),
      ...offerData
    };
    dataStore.offers.push(newOffer);
    return newOffer;
  },

  updateOffer(offerId, offerData) {
    const index = dataStore.offers.findIndex(o => o.id === offerId);
    if (index !== -1) {
      dataStore.offers[index] = { ...dataStore.offers[index], ...offerData };
      return dataStore.offers[index];
    }
    return null;
  },

  deleteOffer(offerId) {
    const index = dataStore.offers.findIndex(o => o.id === offerId);
    if (index !== -1) {
      dataStore.offers.splice(index, 1);
      return true;
    }
    return false;
  }
};

// ============ RESET DATA ============
export const resetData = () => {
  dataStore = {
    users: [...usersData],
    orders: loadOrders(),
    inventory: [...inventoryData],
    offers: [...offersData],
    categories: [...categoriesData]
  };
};
