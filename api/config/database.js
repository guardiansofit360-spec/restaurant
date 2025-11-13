const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'restaurant_db';

let client = null;
let db = null;

async function connectDB() {
  try {
    if (db) {
      return db;
    }

    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    
    console.log('✅ Connected to MongoDB successfully');
    console.log(`📊 Database: ${DB_NAME}`);
    
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

async function getDB() {
  if (!db) {
    await connectDB();
  }
  return db;
}

async function closeDB() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('🔌 MongoDB connection closed');
  }
}

// Collections
const COLLECTIONS = {
  ORDERS: 'orders',
  USERS: 'users',
  INVENTORY: 'inventory',
  OFFERS: 'offers',
  MENU: 'menu',
  CATEGORIES: 'categories'
};

module.exports = {
  connectDB,
  getDB,
  closeDB,
  COLLECTIONS
};
