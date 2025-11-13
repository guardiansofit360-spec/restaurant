# SQL Sample Data Import

Complete guide for importing sample data into your MySQL database.

## 📁 Files Created

1. **api/config/sample_data.sql** - Complete sample data (30 menu items, 5 users, 5 orders, etc.)
2. **api/config/IMPORT_GUIDE.md** - Detailed import instructions
3. **api/scripts/import-sql.js** - Automated import script

## 🚀 Quick Import (3 Methods)

### Method 1: Using NPM Script (Easiest)

```bash
cd api
npm run import
```

This will:
- Create database schema
- Import all sample data
- Verify the import
- Show record counts

### Method 2: Using MySQL Command Line

```bash
# Import schema and data
mysql -u root -p < api/config/schema.sql
mysql -u root -p restaurant_db < api/config/sample_data.sql
```

### Method 3: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your server
3. File → Run SQL Script
4. Select `api/config/schema.sql` → Run
5. Select `api/config/sample_data.sql` → Run

## 📊 What Gets Imported

### Users (5)
| Email | Password | Role |
|-------|----------|------|
| admin@admin.com | admin123 | admin |
| john@example.com | password123 | customer |
| jane@example.com | password123 | customer |
| mike@example.com | password123 | customer |
| sarah@example.com | password123 | customer |

### Categories (6)
- All
- Pizzas
- Kebabs & Grill
- Burgers & Wrap
- Sides & Snacks
- Beverages

### Menu Items (30)
- **5 Pizzas** - Margherita, Pepperoni, BBQ Chicken, Vegetarian, Hawaiian
- **6 Kebabs** - Döner, Adana, Lamb Shish, Chicken Wings, Mixed Grill, Chicken Shish
- **6 Burgers & Wraps** - Classic Burger, Chicken Burger, Shawarma, Falafel, Double Cheese, Veggie
- **6 Sides** - Fries, Onion Rings, Hummus, Mozzarella Sticks, Garlic Bread, Nuggets
- **7 Beverages** - Coca Cola, Orange Juice, Turkish Tea, Ayran, Iced Coffee, Lemonade, Water

### Offers (6)
- 20% Off on Kebabs (KEBAB20)
- Free Delivery (FREEDEL)
- Buy 2 Get 1 Free (B2G1)
- Weekend Special (WEEKEND15)
- First Order Discount (FIRST25)
- Student Discount (STUDENT10)

### Sample Orders (5)
- Orders from different customers
- Various statuses: Pending, Processing, Shipped, Delivered
- Realistic order items and totals

### Inventory (30)
- Stock quantities for all menu items
- Low stock thresholds configured

## ✅ Verification

After import, verify with:

```bash
# Using Node.js
cd api
npm run import

# Or using MySQL
mysql -u root -p restaurant_db -e "
SELECT 'Users' as Table_Name, COUNT(*) as Count FROM users
UNION ALL SELECT 'Categories', COUNT(*) FROM categories
UNION ALL SELECT 'Menu Items', COUNT(*) FROM menu_items
UNION ALL SELECT 'Offers', COUNT(*) FROM offers
UNION ALL SELECT 'Orders', COUNT(*) FROM orders;
"
```

Expected output:
```
Users: 5
Categories: 6
Menu Items: 30
Offers: 6
Orders: 5
Order Items: 20
Inventory: 30
```

## 🔧 Configuration

Before importing, ensure your `api/.env` is configured:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=restaurant_db
DB_PORT=3306
```

## 📝 Sample Data Details

### Menu Items with Prices (₹)
```
Pizzas:
- Margherita: ₹299
- Pepperoni: ₹349
- BBQ Chicken: ₹399
- Vegetarian: ₹329
- Hawaiian: ₹359

Kebabs:
- Döner Kebab: ₹329
- Adana Kebab: ₹349
- Lamb Shish: ₹399
- Chicken Wings: ₹249
- Mixed Grill: ₹599
- Chicken Shish: ₹329

Burgers & Wraps:
- Classic Burger: ₹279
- Chicken Burger: ₹259
- Shawarma Wrap: ₹249
- Falafel Wrap: ₹199
- Double Cheese: ₹349
- Veggie Burger: ₹239

Sides:
- French Fries: ₹99
- Onion Rings: ₹119
- Hummus Platter: ₹129
- Mozzarella Sticks: ₹149
- Garlic Bread: ₹89
- Chicken Nuggets: ₹159

Beverages:
- Coca Cola: ₹49
- Orange Juice: ₹79
- Turkish Tea: ₹29
- Ayran: ₹39
- Iced Coffee: ₹89
- Lemonade: ₹69
- Mineral Water: ₹39
```

## 🎯 Testing After Import

### 1. Start the API
```bash
cd api
npm start
```

### 2. Test Endpoints
```bash
# Health check
curl http://localhost:3001/api/health

# Get all menu items
curl http://localhost:3001/api/menu

# Get categories
curl http://localhost:3001/api/categories

# Login
curl -X POST http://localhost:3001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","password":"admin123"}'
```

### 3. Test in Browser
1. Start frontend: `npm start`
2. Open http://localhost:3000
3. Login with: admin@admin.com / admin123
4. Browse menu items
5. Place test order

## 🔄 Re-importing Data

To re-import (clears existing data):

```bash
# Method 1: Using script
cd api
npm run import

# Method 2: Using MySQL
mysql -u root -p restaurant_db < api/config/sample_data.sql
```

The script automatically:
- Disables foreign key checks
- Truncates all tables
- Imports fresh data
- Re-enables foreign key checks

## 🛠️ Customization

### Add Your Own Menu Items

Edit `api/config/sample_data.sql`:

```sql
INSERT INTO menu_items (name, description, price, category_id, image, bg_color) VALUES
('Your Item', 'Description', 299.00, 2, '🍕', '#FEF3C7');
```

Then re-import:
```bash
npm run import
```

### Modify Existing Data

```sql
-- Update price
UPDATE menu_items SET price = 399.00 WHERE name = 'Margherita Pizza';

-- Add new category
INSERT INTO categories (name, color, icon) VALUES ('Desserts', '#EC4899', '🍰');

-- Add new user
INSERT INTO users (name, email, password, role) VALUES 
('New User', 'user@example.com', 'password', 'customer');
```

## 📦 Backup Before Import

Always backup before importing:

```bash
# Create backup
mysqldump -u root -p restaurant_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore if needed
mysql -u root -p restaurant_db < backup_20240116_143022.sql
```

## 🐛 Troubleshooting

### Error: Access Denied
```bash
# Check MySQL credentials in api/.env
# Ensure user has proper permissions
mysql -u root -p -e "GRANT ALL PRIVILEGES ON restaurant_db.* TO 'root'@'localhost';"
```

### Error: Database Doesn't Exist
```bash
# Create database first
mysql -u root -p -e "CREATE DATABASE restaurant_db;"
```

### Error: Table Already Exists
```bash
# Drop and recreate
mysql -u root -p -e "DROP DATABASE IF EXISTS restaurant_db; CREATE DATABASE restaurant_db;"
# Then re-import
npm run import
```

### Error: Foreign Key Constraint
The script handles this automatically by disabling foreign key checks during import.

## 📚 Additional Resources

- **Full Setup Guide**: [MYSQL_SETUP.md](./MYSQL_SETUP.md)
- **Import Details**: [api/config/IMPORT_GUIDE.md](./api/config/IMPORT_GUIDE.md)
- **Quick Start**: [QUICKSTART.md](./QUICKSTART.md)
- **API Documentation**: [api/README.md](./api/README.md)

## 🎉 Success!

After successful import, you'll have:
- ✅ 5 users (1 admin, 4 customers)
- ✅ 6 categories
- ✅ 30 menu items with prices
- ✅ 6 promotional offers
- ✅ 5 sample orders
- ✅ 30 inventory records

Ready to start your restaurant app! 🚀

## 💡 Next Steps

1. Import the data: `npm run import`
2. Start API: `npm start`
3. Start frontend: `npm start` (in root folder)
4. Login and test the app
5. Customize menu items and prices
6. Add your restaurant's branding
7. Deploy to production!
