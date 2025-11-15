// User session management with Firestore
import { addDocument, getDocById, updateDocById, setDocById, deleteDocById } from '../lib/firestoreService';

const SESSION_COLLECTION = 'userSessions';
const CART_COLLECTION = 'userCarts';

class UserSessionService {
  /**
   * Save user session to Firestore
   */
  async saveUserSession(userData) {
    try {
      // Ensure user ID is a string
      const userId = String(userData.id);
      
      // Store session with user ID as document ID
      const sessionData = {
        userId: userId,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        phone: userData.phone || '',
        address: userData.address || '',
        lastActive: new Date().toISOString(),
      };

      // Use setDocById which creates or updates
      await setDocById(SESSION_COLLECTION, userId, sessionData);

      // Also store in sessionStorage as backup for quick access
      sessionStorage.setItem('currentUserId', userId);
      
      return sessionData;
    } catch (error) {
      console.error('Error saving user session:', error);
      throw error;
    }
  }

  /**
   * Get user session from Firestore
   */
  async getUserSession() {
    try {
      const userId = sessionStorage.getItem('currentUserId');
      if (!userId) return null;

      const session = await getDocById(SESSION_COLLECTION, userId);
      console.log('Loaded session from Firestore:', session); // Debug log
      return session;
    } catch (error) {
      console.error('Error getting user session:', error);
      return null;
    }
  }

  /**
   * Clear user session
   */
  async clearUserSession() {
    try {
      const userId = sessionStorage.getItem('currentUserId');
      if (userId) {
        await deleteDocById(SESSION_COLLECTION, userId);
      }
      sessionStorage.removeItem('currentUserId');
    } catch (error) {
      console.error('Error clearing user session:', error);
    }
  }

  /**
   * Save user cart to Firestore
   */
  async saveCart(userId, cartItems) {
    try {
      // Ensure user ID is a string
      const userIdStr = String(userId);
      
      const cartData = {
        userId: userIdStr,
        items: cartItems,
        updatedAt: new Date().toISOString(),
      };

      // Use setDocById which creates or updates
      await setDocById(CART_COLLECTION, userIdStr, cartData);
    } catch (error) {
      console.error('Error saving cart:', error);
      throw error;
    }
  }

  /**
   * Get user cart from Firestore
   */
  async getCart(userId) {
    try {
      if (!userId) return [];

      const cartDoc = await getDocById(CART_COLLECTION, userId);
      return cartDoc?.items || [];
    } catch (error) {
      console.error('Error getting cart:', error);
      return [];
    }
  }

  /**
   * Clear user cart
   */
  async clearCart(userId) {
    try {
      if (!userId) return;

      // Ensure user ID is a string
      const userIdStr = String(userId);

      await updateDocById(CART_COLLECTION, userIdStr, {
        items: [],
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
}

const userSessionService = new UserSessionService();
export default userSessionService;
