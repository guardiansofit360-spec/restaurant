const pool = require('./db');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Initializing database...');

    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        address TEXT,
        role VARCHAR(50) DEFAULT 'customer',
        avatar VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        icon VARCHAR(50)
      );

      CREATE TABLE IF NOT EXISTS menu_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(255),
        description TEXT,
        time VARCHAR(50),
        difficulty VARCHAR(50),
        bg_color VARCHAR(50),
        available BOOLEAN DEFAULT true
      );

      CREATE TABLE IF NOT EXISTS offers (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        discount INTEGER,
        code VARCHAR(50) UNIQUE,
        start_date DATE,
        end_date DATE,
        is_active BOOLEAN DEFAULT true,
        image VARCHAR(255)
      );

      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        items JSONB NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        delivery_address TEXT,
        payment_method VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
      CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
      CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
    `);

    console.log('✅ Tables created successfully');

    // Check if data already exists
    const userCount = await client.query('SELECT COUNT(*) FROM users');
    
    if (parseInt(userCount.rows[0].count) === 0) {
      console.log('🔄 Importing initial data...');

      // Import users
      const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/usersData.json'), 'utf8'));
      for (const user of usersData) {
        await client.query(
          'INSERT INTO users (id, name, email, password, phone, address, role, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (email) DO NOTHING',
          [user.id, user.name, user.email, user.password, user.phone, user.address, user.role, user.avatar]
        );
      }

      // Import categories
      const categoriesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/categoriesData.json'), 'utf8'));
      for (const category of categoriesData) {
        await client.query(
          'INSERT INTO categories (id, name, icon) VALUES ($1, $2, $3)',
          [category.id, category.name, category.icon]
        );
      }

      // Import menu items
      const menuData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/menuData.json'), 'utf8'));
      for (const item of menuData) {
        await client.query(
          'INSERT INTO menu_items (id, name, category, price, image, description, time, difficulty, bg_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
          [item.id, item.name, item.category, item.price, item.image, item.description, item.time, item.difficulty, item.bgColor]
        );
      }

      // Import offers
      const offersData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/offersData.json'), 'utf8'));
      for (const offer of offersData) {
        await client.query(
          'INSERT INTO offers (id, title, description, discount, code, start_date, end_date, is_active, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
          [offer.id, offer.title, offer.description, offer.discount, offer.code, offer.startDate, offer.endDate, offer.isActive, offer.image]
        );
      }

      // Import orders
      const ordersData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/ordersData.json'), 'utf8'));
      for (const order of ordersData) {
        await client.query(
          'INSERT INTO orders (id, user_id, items, total, status, delivery_address, payment_method, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [order.id, order.userId, JSON.stringify(order.items), order.total, order.status, order.deliveryAddress, order.paymentMethod, order.createdAt]
        );
      }

      console.log('✅ Initial data imported successfully');
    } else {
      console.log('ℹ️  Database already contains data, skipping import');
    }

    console.log('🎉 Database initialization complete!');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run if called directly
if (require.main === module) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = initializeDatabase;
