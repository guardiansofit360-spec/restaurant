// Firestore database for persistent cross-device storage
const admin = require('firebase-admin');

// Initialize Firebase Admin
let db;

try {
  // Try to initialize with service account (production)
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else if (process.env.FIREBASE_PROJECT_ID) {
    // Initialize with project ID (development)
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID
    });
  } else {
    throw new Error('Firebase configuration not found');
  }
  
  db = admin.firestore();
  console.log('✅ Firestore connected successfully');
} catch (error) {
  console.error('❌ Firestore initialization failed:', error.message);
  console.log('📝 Falling back to in-memory database');
  // Fall back to memory database
  db = null;
}

const firestoreDb = {
  // Users
  async getUsers() {
    if (!db) return [];
    const snapshot = await db.collection('users').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getUserById(id) {
    if (!db) return null;
    const doc = await db.collection('users').doc(id.toString()).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  async createUser(userData) {
    if (!db) return { id: Date.now(), ...userData };
    const docRef = await db.collection('users').add({
      ...userData,
      created_at: admin.firestore.FieldValue.serverTimestamp()
    });
    const doc = await docRef.get();
    return { id: docRef.id, ...doc.data() };
  },

  async loginUser(email, password) {
    if (!db) return null;
    const snapshot = await db.collection('users')
      .where('email', '==', email)
      .where('password', '==', password)
      .limit(1)
      .get();
    
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  },

  async updateUser(id, userData) {
    if (!db) return null;
    await db.collection('users').doc(id.toString()).update(userData);
    const doc = await db.collection('users').doc(id.toString()).get();
    return { id: doc.id, ...doc.data() };
  },

  // Orders
  async getAllOrders() {
    if (!db) return [];
    const snapshot = await db.collection('orders')
      .orderBy('created_at', 'desc')
      .get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate().toISOString()
    }));
  },

  async getUserOrders(userId) {
    if (!db) return [];
    const snapshot = await db.collection('orders')
      .where('user_id', '==', userId.toString())
      .orderBy('created_at', 'desc')
      .get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate().toISOString()
    }));
  },

  async getActiveOrdersCount() {
    if (!db) return 0;
    const snapshot = await db.collection('orders')
      .where('status', 'in', ['pending', 'preparing', 'ready'])
      .get();
    return snapshot.size;
  },

  async createOrder(orderData) {
    if (!db) return { id: Date.now(), ...orderData };
    
    const docRef = await db.collection('orders').add({
      user_id: orderData.userId?.toString(),
      items: typeof orderData.items === 'string' ? orderData.items : JSON.stringify(orderData.items),
      total: orderData.total,
      delivery_address: orderData.deliveryAddress,
      payment_method: orderData.paymentMethod,
      status: 'pending',
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp()
    });
    
    const doc = await docRef.get();
    console.log('✅ Order created in Firestore:', docRef.id);
    return {
      id: docRef.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate().toISOString()
    };
  },

  async updateOrderStatus(id, status) {
    if (!db) return null;
    await db.collection('orders').doc(id.toString()).update({
      status: status,
      updated_at: admin.firestore.FieldValue.serverTimestamp()
    });
    const doc = await db.collection('orders').doc(id.toString()).get();
    console.log('✅ Order updated in Firestore:', id, '→', status);
    return {
      id: doc.id,
      ...doc.data(),
      updated_at: doc.data().updated_at?.toDate().toISOString()
    };
  },

  // Menu Items
  async getMenuItems() {
    if (!db) return [];
    const snapshot = await db.collection('menu_items').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getMenuItem(id) {
    if (!db) return null;
    const doc = await db.collection('menu_items').doc(id.toString()).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  async createMenuItem(itemData) {
    if (!db) return { id: Date.now(), ...itemData };
    const docRef = await db.collection('menu_items').add({
      ...itemData,
      created_at: admin.firestore.FieldValue.serverTimestamp()
    });
    const doc = await docRef.get();
    return { id: docRef.id, ...doc.data() };
  },

  async updateMenuItem(id, itemData) {
    if (!db) return null;
    await db.collection('menu_items').doc(id.toString()).update(itemData);
    const doc = await db.collection('menu_items').doc(id.toString()).get();
    return { id: doc.id, ...doc.data() };
  },

  async deleteMenuItem(id) {
    if (!db) return false;
    await db.collection('menu_items').doc(id.toString()).delete();
    return true;
  },

  // Categories
  async getCategories() {
    if (!db) return [];
    const snapshot = await db.collection('categories').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async createCategory(categoryData) {
    if (!db) return { id: Date.now(), ...categoryData };
    const docRef = await db.collection('categories').add(categoryData);
    const doc = await docRef.get();
    return { id: docRef.id, ...doc.data() };
  },

  // Offers
  async getOffers() {
    if (!db) return [];
    const snapshot = await db.collection('offers').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getActiveOffers() {
    if (!db) return [];
    const today = new Date();
    const snapshot = await db.collection('offers')
      .where('is_active', '==', true)
      .where('start_date', '<=', today)
      .where('end_date', '>=', today)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async createOffer(offerData) {
    if (!db) return { id: Date.now(), ...offerData };
    const docRef = await db.collection('offers').add({
      ...offerData,
      created_at: admin.firestore.FieldValue.serverTimestamp()
    });
    const doc = await docRef.get();
    return { id: docRef.id, ...doc.data() };
  },

  async updateOffer(id, offerData) {
    if (!db) return null;
    await db.collection('offers').doc(id.toString()).update(offerData);
    const doc = await db.collection('offers').doc(id.toString()).get();
    return { id: doc.id, ...doc.data() };
  },

  async deleteOffer(id) {
    if (!db) return false;
    await db.collection('offers').doc(id.toString()).delete();
    return true;
  },

  // Health check
  async healthCheck() {
    return { 
      status: 'OK', 
      database: db ? 'Firestore' : 'In-Memory (Firestore not configured)' 
    };
  },

  // Initialize default admin user
  async initializeDefaultData() {
    if (!db) return;
    
    try {
      // Check if admin user exists
      const adminSnapshot = await db.collection('users')
        .where('email', '==', 'admin@admin.com')
        .limit(1)
        .get();
      
      if (adminSnapshot.empty) {
        // Create default admin user
        await db.collection('users').add({
          name: 'Admin User',
          email: 'admin@admin.com',
          password: 'admin123',
          phone: '',
          address: '',
          role: 'admin',
          avatar: null,
          created_at: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ Default admin user created');
      }
    } catch (error) {
      console.error('Error initializing default data:', error);
    }
  }
};

// Initialize default data
if (db) {
  firestoreDb.initializeDefaultData().catch(console.error);
}

module.exports = firestoreDb;
