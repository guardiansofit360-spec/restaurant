# Sample Data Import Guide

This guide explains how to import sample data into your MySQL database.

## Files

1. **schema.sql** - Database structure (tables, relationships)
2. **sample_data.sql** - Sample data (users, menu items, orders, etc.)

## Method 1: Using MySQL Command Line (Recommended)

### Step 1: Create Database and Schema
```bash
mysql -u root -p < api/config/schema.sql
```

### Step 2: Import Sample Data
```bash
mysql -u root -p restaurant_db < api/config/sample_data.sql
```

### One Command (Both Steps)
```bash
mysql -u root -p < api/config/schema.sql && mysql -u root -p restaurant_db < api/config/sample_data.sql
```

## Method 2: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Go to **File** → **Run SQL Script**
4. Select `api/config/schema.sql` and run
5. Select `api/config/sample_data.sql` and run

## Method 3: Using Node.js Migration Script

```bash
cd api
node scripts/migrate.js
```

This automatically runs both schema and imports data from JSON files.

## Method 4: Manual Import via MySQL CLI

```bash
# Login to MySQL
mysql -u root -p

# Create and use database
CREATE DATABASE IF NOT EXISTS restaurant_db;
USE restaurant_db;

# Run schema file
source api/config/schema.sql;

# Run sample data file
source api/config/sample_data.sql;

# Verify
SHOW TABLES;
SELECT COUNT(*) FROM menu_items;
```

## What Gets Imported

### Users (5 total)
- **Admin**: admin@admin.com / admin123
- **Customers**: john@example.com, jane@example.com, mike@example.com, sarah@example.com
- All customer passwords: password123

### Categories (6 total)
- All
- Pizzas
- Kebabs & Grill
- Burgers & Wrap
- Sides & Snacks
- Beverages

### Menu Items (30 total)
- 5 Pizzas
- 6 Kebabs & Grill items
- 6 Burgers & Wraps
- 6 Sides & Snacks
- 7 Beverages

### Offers (6 total)
- 20% Off on Kebabs (KEBAB20)
- Free Delivery (FREEDEL)
- Buy 2 Get 1 Free (B2G1)
- Weekend Special (WEEKEND15)
- First Order Discount (FIRST25)
- Student Discount (STUDENT10)

### Sample Orders (5 total)
- Various orders from different customers
- Different statuses: Pending, Processing, Shipped, Delivered

### Inventory (30 items)
- Stock quantities for all menu items
- Low stock thresholds configured

## Verification

After import, verify the data:

```sql
-- Check all tables
SHOW TABLES;

-- Count records
SELECT 'Users' as Table_Name, COUNT(*) as Count FROM users
UNION ALL
SELECT 'Categories', COUNT(*) FROM categories
UNION ALL
SELECT 'Menu Items', COUNT(*) FROM menu_items
UNION ALL
SELECT 'Offers', COUNT(*) FROM offers
UNION ALL
SELECT 'Orders', COUNT(*) FROM orders
UNION ALL
SELECT 'Order Items', COUNT(*) FROM order_items
UNION ALL
SELECT 'Inventory', COUNT(*) FROM inventory;

-- View sample data
SELECT * FROM menu_items LIMIT 5;
SELECT * FROM orders;
SELECT * FROM users;
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

## Troubleshooting

### Error: Access Denied
- Check your MySQL username and password
- Ensure user has CREATE DATABASE permission

### Error: Database Already Exists
- The script will use existing database
- To start fresh, drop database first:
  ```sql
  DROP DATABASE IF EXISTS restaurant_db;
  ```

### Error: Foreign Key Constraint
- The script disables foreign key checks during import
- If issues persist, run schema.sql first, then sample_data.sql

### Error: Duplicate Entry
- The script truncates tables before inserting
- If you want to keep existing data, comment out TRUNCATE statements

## Customization

To modify sample data:

1. Edit `sample_data.sql`
2. Change INSERT statements
3. Re-run the import

Or modify directly in database:
```sql
-- Add new menu item
INSERT INTO menu_items (name, description, price, category_id, image, bg_color) 
VALUES ('New Item', 'Description', 299.00, 2, '🍕', '#FEF3C7');

-- Update existing item
UPDATE menu_items SET price = 349.00 WHERE id = 1;

-- Delete item
DELETE FROM menu_items WHERE id = 30;
```

## Backup Before Import

Always backup before importing:

```bash
# Backup existing database
mysqldump -u root -p restaurant_db > backup_$(date +%Y%m%d).sql

# Restore if needed
mysql -u root -p restaurant_db < backup_20240116.sql
```

## Production Use

For production:
- Remove or modify sample orders
- Change default passwords
- Update user information
- Adjust inventory quantities
- Configure real offers

## Next Steps

After importing:
1. Start the API server: `npm start`
2. Test endpoints: `curl http://localhost:3001/api/menu`
3. Login to app with sample credentials
4. Customize data as needed
