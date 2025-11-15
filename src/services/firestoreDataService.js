// Comprehensive Firestore data service for all app data
import {
  addDocument,
  getDocuments,
  getDocById,
  updateDocById,
  deleteDocById,
  onCollectionSnapshot,
} from '../lib/firestoreService';

// Collection names
const COLLECTIONS = {
  USERS: 'users',
  ORDERS: 'orders',
  MENU_ITEMS: 'menuItems',
  CATEGORIES: 'categories',
  OFFERS: 'offers',
  INVENTORY: 'inventory',
};

class FirestoreDataService {
  // ============ USER METHODS ============
  
  async loginUser(email, password) {
    try {
      const users = await getDocuments(COLLECTIONS.USERS);
      const user = users.find(u => u.email === email && u.password === password);
      return user || null;
    } catch (error) {
      console.error('Error logging in:', error);
      return null;
    }
  }

  async getUserByEmail(email) {
    try {
      const users = await getDocuments(COLLECTIONS.USERS);
      return users.find(u => u.email === email) || null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  async createUser(userData) {
    try {
      const userId = await addDocument(COLLECTIONS.USERS, userData);
      return { id: userId, ...userData };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async initializeUsers(usersData) {
    try {
      const existingUsers = await getDocuments(COLLECTIONS.USERS);
      if (existingUsers.length === 0) {
        console.log('Initializing users...');
        for (const user of usersData) {
          await this.createUser(user);
        }
      }
    } catch (error) {
      console.error('Error initializing users:', error);
    }
  }

  // ============ ORDER METHODS ============
  
  async createOrder(orderData) {
    try {
      const orderId = await addDocument(COLLECTIONS.ORDERS, {
        ...orderData,
        status: orderData.status || 'pending',
        orderDate: new Date().toISOString(),
      });
      return { id: orderId, ...orderData };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async getAllOrders() {
    try {
      const orders = await getDocuments(COLLECTIONS.ORDERS);
      return orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  }

  async getUserOrders(userId) {
    try {
      const allOrders = await getDocuments(COLLECTIONS.ORDERS);
      return allOrders
        .filter(order => order.userId === userId)
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    } catch (error) {
      console.error('Error getting user orders:', error);
      return [];
    }
  }

  async getOrderById(orderId) {
    try {
      return await getDocById(COLLECTIONS.ORDERS, orderId);
    } catch (error) {
      console.error('Error getting order:', error);
      return null;
    }
  }

  async updateOrderStatus(orderId, status) {
    try {
      await updateDocById(COLLECTIONS.ORDERS, orderId, { status });
      return true;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  async getActiveOrdersCount() {
    try {
      const orders = await getDocuments(COLLECTIONS.ORDERS);
      return orders.filter(order => 
        order.status === 'pending' || 
        order.status === 'preparing' || 
        order.status === 'ready'
      ).length;
    } catch (error) {
      console.error('Error getting active orders count:', error);
      return 0;
    }
  }

  // Real-time order listener
  onOrdersChange(callback) {
    return onCollectionSnapshot(COLLECTIONS.ORDERS, callback);
  }

  // ============ MENU/INVENTORY METHODS ============

  async getMenuItems() {
    try {
      return await getDocuments(COLLECTIONS.MENU_ITEMS);
    } catch (error) {
      console.error('Error getting menu items:', error);
      return [];
    }
  }

  async getMenuItem(itemId) {
    try {
      return await getDocById(COLLECTIONS.MENU_ITEMS, itemId);
    } catch (error) {
      console.error('Error getting menu item:', error);
      return null;
    }
  }

  async createMenuItem(itemData) {
    try {
      const itemId = await addDocument(COLLECTIONS.MENU_ITEMS, itemData);
      return { id: itemId, ...itemData };
    } catch (error) {
      console.error('Error creating menu item:', error);
      throw error;
    }
  }

  async updateMenuItem(itemId, itemData) {
    try {
      await updateDocById(COLLECTIONS.MENU_ITEMS, itemId, itemData);
      return true;
    } catch (error) {
      console.error('Error updating menu item:', error);
      throw error;
    }
  }

  async deleteMenuItem(itemId) {
    try {
      await deleteDocById(COLLECTIONS.MENU_ITEMS, itemId);
      return true;
    } catch (error) {
      console.error('Error deleting menu item:', error);
      throw error;
    }
  }

  // Real-time menu listener
  onMenuItemsChange(callback) {
    return onCollectionSnapshot(COLLECTIONS.MENU_ITEMS, callback);
  }

  // ============ CATEGORY METHODS ============

  async getCategories() {
    try {
      return await getDocuments(COLLECTIONS.CATEGORIES);
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  }

  async createCategory(categoryData) {
    try {
      const categoryId = await addDocument(COLLECTIONS.CATEGORIES, categoryData);
      return { id: categoryId, ...categoryData };
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  // ============ OFFER METHODS ============

  async getOffers() {
    try {
      return await getDocuments(COLLECTIONS.OFFERS);
    } catch (error) {
      console.error('Error getting offers:', error);
      return [];
    }
  }

  async getActiveOffers() {
    try {
      const offers = await getDocuments(COLLECTIONS.OFFERS);
      return offers.filter(offer => offer.active !== false);
    } catch (error) {
      console.error('Error getting active offers:', error);
      return [];
    }
  }

  async createOffer(offerData) {
    try {
      const offerId = await addDocument(COLLECTIONS.OFFERS, {
        ...offerData,
        active: true,
        createdAt: new Date().toISOString(),
      });
      return { id: offerId, ...offerData };
    } catch (error) {
      console.error('Error creating offer:', error);
      throw error;
    }
  }

  async updateOffer(offerId, offerData) {
    try {
      await updateDocById(COLLECTIONS.OFFERS, offerId, offerData);
      return true;
    } catch (error) {
      console.error('Error updating offer:', error);
      throw error;
    }
  }

  async deleteOffer(offerId) {
    try {
      await deleteDocById(COLLECTIONS.OFFERS, offerId);
      return true;
    } catch (error) {
      console.error('Error deleting offer:', error);
      throw error;
    }
  }

  // Real-time offers listener
  onOffersChange(callback) {
    return onCollectionSnapshot(COLLECTIONS.OFFERS, callback);
  }

  // ============ INITIALIZATION METHODS ============

  // Initialize collections with default data if empty
  async initializeCollections(defaultData) {
    try {
      // Check if menu items exist
      const menuItems = await this.getMenuItems();
      if (menuItems.length === 0 && defaultData.menuItems) {
        console.log('Initializing menu items...');
        for (const item of defaultData.menuItems) {
          await this.createMenuItem(item);
        }
      }

      // Check if categories exist
      const categories = await this.getCategories();
      if (categories.length === 0 && defaultData.categories) {
        console.log('Initializing categories...');
        for (const category of defaultData.categories) {
          await this.createCategory(category);
        }
      }

      // Check if offers exist
      const offers = await this.getOffers();
      if (offers.length === 0 && defaultData.offers) {
        console.log('Initializing offers...');
        for (const offer of defaultData.offers) {
          await this.createOffer(offer);
        }
      }

      console.log('Collections initialized successfully');
    } catch (error) {
      console.error('Error initializing collections:', error);
    }
  }
}

const firestoreDataService = new FirestoreDataService();
export default firestoreDataService;
