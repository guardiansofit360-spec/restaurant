const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');

async function runMigration() {
  try {
    console.log('🚀 Starting database migration...\n');
    
    // Read SQL schema file
    const schemaPath = path.join(__dirname, '../config/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    for (const statement of statements) {
      await pool.query(statement);
    }
    
    console.log('✅ Database schema created successfully\n');
    
    // Import sample data from JSON files
    console.log('📦 Importing sample data...\n');
    
    // Import categories
    const categoriesData = require('../../src/data/categoriesData.json');
    for (const cat of categoriesData) {
      await pool.query(
        'INSERT INTO categories (name, color, icon) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=name',
        [cat.name, cat.color, cat.icon]
      );
    }
    console.log('✅ Categories imported');
    
    // Import menu items
    const menuData = require('../../src/data/menuData.json');
    for (const item of menuData) {
      // Find category ID
      const [catRows] = await pool.query('SELECT id FROM categories WHERE name = ?', [item.category]);
      const categoryId = catRows.length > 0 ? catRows[0].id : null;
      
      await pool.query(
        'INSERT INTO menu_items (name, description, price, category_id, image, bg_color) VALUES (?, ?, ?, ?, ?, ?)',
        [item.name, item.description, item.price, categoryId, item.image, item.bgColor]
      );
    }
    console.log('✅ Menu items imported');
    
    // Import offers
    const offersData = require('../../src/data/offersData.json');
    for (const offer of offersData) {
      await pool.query(
        'INSERT INTO offers (title, description, discount_percentage, code, valid_from, valid_until, active) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [offer.title, offer.description, offer.discount, offer.code, offer.validFrom, offer.validUntil, offer.active]
      );
    }
    console.log('✅ Offers imported');
    
    // Import users
    const usersData = require('../../src/data/usersData.json');
    for (const user of usersData) {
      await pool.query(
        'INSERT INTO users (name, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=name',
        [user.name, user.email, user.password, user.phone || '', user.address || '', user.role]
      );
    }
    console.log('✅ Users imported');
    
    console.log('\n🎉 Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runMigration();
