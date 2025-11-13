const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');

async function importSQL() {
  try {
    console.log('🚀 Starting SQL import...\n');
    
    // Read SQL files
    const schemaPath = path.join(__dirname, '../config/schema.sql');
    const dataPath = path.join(__dirname, '../config/sample_data.sql');
    
    console.log('📄 Reading SQL files...');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    const sampleData = fs.readFileSync(dataPath, 'utf8');
    
    // Execute schema
    console.log('📊 Creating database schema...');
    const schemaStatements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    for (const statement of schemaStatements) {
      try {
        await pool.query(statement);
      } catch (error) {
        // Ignore "database exists" errors
        if (!error.message.includes('database exists')) {
          console.warn('Warning:', error.message.substring(0, 100));
        }
      }
    }
    console.log('✅ Schema created\n');
    
    // Execute sample data
    console.log('📦 Importing sample data...');
    const dataStatements = sampleData
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    for (const statement of dataStatements) {
      try {
        await pool.query(statement);
      } catch (error) {
        console.warn('Warning:', error.message.substring(0, 100));
      }
    }
    console.log('✅ Sample data imported\n');
    
    // Verify import
    console.log('🔍 Verifying import...\n');
    
    const tables = [
      'users',
      'categories', 
      'menu_items',
      'offers',
      'orders',
      'order_items',
      'inventory'
    ];
    
    for (const table of tables) {
      const [rows] = await pool.query(`SELECT COUNT(*) as count FROM ${table}`);
      console.log(`  ${table.padEnd(15)} : ${rows[0].count} records`);
    }
    
    console.log('\n🎉 Import completed successfully!');
    console.log('\n📝 Default credentials:');
    console.log('   Admin: admin@admin.com / admin123');
    console.log('   Customer: john@example.com / password123\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check MySQL is running');
    console.error('2. Verify credentials in api/.env');
    console.error('3. Ensure user has CREATE DATABASE permission\n');
    process.exit(1);
  }
}

importSQL();
