const fs = require('fs').promises;
const path = require('path');
const { connectDB, getDB, COLLECTIONS, closeDB } = require('../config/database');

const DATA_DIR = path.join(__dirname, '../../src/data');

async function migrateData() {
  try {
    console.log('🚀 Starting data migration to MongoDB...\n');
    
    // Connect to MongoDB
    await connectDB();
    const db = await getDB();

    // Migrate Orders
    console.log('📦 Migrating orders...');
    const ordersData = JSON.parse(
      await fs.readFile(path.join(DATA_DIR, 'ordersData.json'), 'utf8')
    );
    if (ordersData.length > 0) {
      await db.collection(COLLECTIONS.ORDERS).deleteMany({});
      await db.collection(COLLECTIONS.ORDERS).insertMany(ordersData);
      console.log(`✅ Migrated ${ordersData.length} orders`);
    }

    // Migrate Users
    console.log('👥 Migrating users...');
    const usersData = JSON.parse(
      await fs.readFile(path.join(DATA_DIR, 'usersData.json'), 'utf8')
    );
    if (usersData.length > 0) {
      await db.collection(COLLECTIONS.USERS).deleteMany({});
      await db.collection(COLLECTIONS.USERS).insertMany(usersData);
      console.log(`✅ Migrated ${usersData.length} users`);
    }

    // Migrate Inventory
    console.log('📊 Migrating inventory...');
    const inventoryData = JSON.parse(
      await fs.readFile(path.join(DATA_DIR, 'inventoryData.json'), 'utf8')
    );
    if (inventoryData.length > 0) {
      await db.collection(COLLECTIONS.INVENTORY).deleteMany({});
      await db.collection(COLLECTIONS.INVENTORY).insertMany(inventoryData);
      console.log(`✅ Migrated ${inventoryData.length} inventory items`);
    }

    // Migrate Offers
    console.log('🎁 Migrating offers...');
    const offersData = JSON.parse(
      await fs.readFile(path.join(DATA_DIR, 'offersData.json'), 'utf8')
    );
    if (offersData.length > 0) {
      await db.collection(COLLECTIONS.OFFERS).deleteMany({});
      await db.collection(COLLECTIONS.OFFERS).insertMany(offersData);
      console.log(`✅ Migrated ${offersData.length} offers`);
    }

    // Migrate Menu
    console.log('🍽️  Migrating menu...');
    const menuData = JSON.parse(
      await fs.readFile(path.join(DATA_DIR, 'menuData.json'), 'utf8')
    );
    if (menuData.length > 0) {
      await db.collection(COLLECTIONS.MENU).deleteMany({});
      await db.collection(COLLECTIONS.MENU).insertMany(menuData);
      console.log(`✅ Migrated ${menuData.length} menu items`);
    }

    // Migrate Categories
    console.log('📂 Migrating categories...');
    const categoriesData = JSON.parse(
      await fs.readFile(path.join(DATA_DIR, 'categoriesData.json'), 'utf8')
    );
    if (categoriesData.length > 0) {
      await db.collection(COLLECTIONS.CATEGORIES).deleteMany({});
      await db.collection(COLLECTIONS.CATEGORIES).insertMany(categoriesData);
      console.log(`✅ Migrated ${categoriesData.length} categories`);
    }

    console.log('\n✨ Data migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await closeDB();
  }
}

// Run migration
migrateData();
