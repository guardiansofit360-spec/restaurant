import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Orders Collection
const ORDERS_COLLECTION = 'orders';

export const firestoreService = {
  // Create a new order
  async createOrder(orderData) {
    try {
      const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
        ...orderData,
        createdAt: serverTimestamp(),
        timestamp: new Date().toISOString()
      });
      return { success: true, id: docRef.id, ...orderData };
    } catch (error) {
      console.error('Error creating order:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all orders
  async getAllOrders() {
    try {
      const q = query(
        collection(db, ORDERS_COLLECTION),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, orders };
    } catch (error) {
      console.error('Error getting orders:', error);
      return { success: false, orders: [], error: error.message };
    }
  },

  // Get orders for a specific user
  async getUserOrders(userId) {
    try {
      const q = query(
        collection(db, ORDERS_COLLECTION),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, orders };
    } catch (error) {
      console.error('Error getting user orders:', error);
      return { success: false, orders: [], error: error.message };
    }
  },

  // Update order status
  async updateOrderStatus(orderId, status) {
    try {
      const orderRef = doc(db, ORDERS_COLLECTION, orderId);
      await updateDoc(orderRef, {
        status,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating order status:', error);
      return { success: false, error: error.message };
    }
  }
};
