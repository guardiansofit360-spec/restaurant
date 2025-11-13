# ✅ SQL Sample Data Files Created!

Complete SQL sample data files have been created for easy database import.

## 📁 Files Created

### 1. Main SQL File
**`api/config/sample_data.sql`** (Complete sample data)
- 5 users (1 admin, 4 customers)
- 6 food categories
- 30 menu items with prices
- 6 promotional offers
- 5 sample orders with items
- 30 inventory records

### 2. Import Script
**`api/scripts/import-sql.js`** (Automated import)
- Reads SQL files
- Executes statements
- Verifies import
- Shows record counts

### 3. Documentation
**`api/config/IMPORT_GUIDE.md`** (Detailed instructions)
**`SQL_IMPORT_README.md`** (Quick reference)

## 🚀 How to Import

### Quick Import (Easiest)
```bash
cd api
npm run import
```

### Using MySQL Command Line
```bash
mysql -u root -p < api/config/schema.sql
mysql -u root -p restaurant_db < api/config/sample_data.sql
```

### Using MySQL Workbench
1. Open MySQL Workbench
2. File → Run SQL Script
3. Select `api/config/sample_data.sql`
4. Execute

## 📊 Sample Data Included

### Users
```
Admin:
- Email: admin@admin.com
- Password: admin123
- Role: admin

Customers:
- john@example.com / password123
- jane@example.com / password123
- mike@example.com / password123
- sarah@example.com / password123
```

### Menu Items (30 total)

**Pizzas (5)**
- Margherita Pizza - ₹299
- Pepperoni Pizza - ₹349
- BBQ Chicken Pizza - ₹399
- Vegetarian Pizza - ₹329
- Hawaiian Pizza - ₹359

**Kebabs & Grill (6)**
- Döner Kebab - ₹329
- Adana Kebab - ₹349
- Lamb Shish Kebab - ₹399
- Chicken Wings - ₹249
- Mixed Grill Platter - ₹599
- Chicken Shish Kebab - ₹329

**Burgers & Wraps (6)**
- Classic Burger - ₹279
- Chicken Burger - ₹259
- Chicken Shawarma Wrap - ₹249
- Falafel Wrap - ₹199
- Double Cheese Burger - ₹349
- Veggie Burger - ₹239

**Sides & Snacks (6)**
- French Fries - ₹99
- Onion Rings - ₹119
- Hummus Platter - ₹129
- Mozzarella Sticks - ₹149
- Garlic Bread - ₹89
- Chicken Nuggets - ₹159

**Beverages (7)**
- Coca Cola - ₹49
- Fresh Orange Juice - ₹79
- Turkish Tea - ₹29
- Ayran - ₹39
- Iced Coffee - ₹89
- Lemonade - ₹69
- Mineral Water - ₹39

### Categories (6)
- All (🍽️)
- Pizzas (🍕)
- Kebabs & Grill (🍢)
- Burgers & Wrap (🍔)
- Sides & Snacks (🍟)
- Beverages (🥤)

### Promotional Offers (6)
- 20% Off on Kebabs (KEBAB20)
- Free Delivery (FREEDEL)
- Buy 2 Get 1 Free (B2G1)
- Weekend Special (WEEKEND15)
- First Order Discount (FIRST25)
- Student Discount (STUDENT10)

### Sample Orders (5)
- Order #1: John Doe - Delivered (₹653)
- Order #2: Jane Smith - Processing (₹932)
- Order #3: Mike Johnson - Shipped (₹1202)
- Order #4: Sarah Williams - Pending (₹542)
- Order #5: John Doe - Processing (₹811)

### Inventory
- Stock quantities for all 30 menu items
- Low stock thresholds configured
- Ready for inventory management

## ✅ Verification

After import, verify with:

```bash
cd api
npm run import
```

Expected output:
```
users           : 5 records
categories      : 6 records
menu_items      : 30 records
offers          : 6 records
orders          : 5 records
order_items     : 20 records
inventory       : 30 records
```

## 🎯 Testing

### 1. Import Data
```bash
cd api
npm run import
```

### 2. Start API
```bash
npm start
```

### 3. Test Endpoints
```bash
# Get menu items
curl http://localhost:3001/api/menu

# Get categories
curl http://localhost:3001/api/categories

# Login
curl -X POST http://localhost:3001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","password":"admin123"}'
```

### 4. Test in App
1. Start frontend: `npm start` (from root)
2. Open http://localhost:3000
3. Login: admin@admin.com / admin123
4. Browse 30 menu items
5. View sample orders
6. Test admin features

## 📝 SQL File Structure

The `sample_data.sql` file includes:

1. **Header Comments** - File description
2. **USE Database** - Selects restaurant_db
3. **Clear Data** - Truncates tables (optional)
4. **INSERT Users** - 5 users with credentials
5. **INSERT Categories** - 6 food categories
6. **INSERT Menu Items** - 30 items with details
7. **INSERT Offers** - 6 promotional offers
8. **INSERT Inventory** - Stock for all items
9. **INSERT Orders** - 5 sample orders
10. **INSERT Order Items** - 20 order line items
11. **Reset Auto Increment** - Set next IDs
12. **Verification Queries** - Check import
13. **Summary** - Record counts

## 🔧 Customization

### Add Your Menu Items

Edit `api/config/sample_data.sql`:

```sql
INSERT INTO menu_items (name, description, price, category_id, image, bg_color) VALUES
('Your Special Dish', 'Delicious description', 399.00, 2, '🍕', '#FEF3C7');
```

### Modify Prices

```sql
UPDATE menu_items SET price = 349.00 WHERE name = 'Margherita Pizza';
```

### Add Categories

```sql
INSERT INTO categories (name, color, icon) VALUES 
('Desserts', '#EC4899', '🍰');
```

Then re-import:
```bash
npm run import
```

## 🔄 Re-importing

To start fresh:

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
- Verifies import

## 📦 Backup

Before importing, backup existing data:

```bash
# Create backup
mysqldump -u root -p restaurant_db > backup_$(date +%Y%m%d).sql

# Restore if needed
mysql -u root -p restaurant_db < backup_20240116.sql
```

## 🎓 Features

✅ **Complete Sample Data** - Ready-to-use restaurant data
✅ **Realistic Prices** - Indian Rupee pricing
✅ **Multiple Categories** - Organized menu structure
✅ **Sample Orders** - Test order processing
✅ **Inventory Tracking** - Stock management ready
✅ **Promotional Offers** - Discount codes included
✅ **Multiple Users** - Admin and customer accounts
✅ **Easy Import** - One command to import all
✅ **Verification** - Automatic record counting
✅ **Documentation** - Complete guides included

## 📚 Documentation

| File | Purpose |
|------|---------|
| [SQL_IMPORT_README.md](./SQL_IMPORT_README.md) | Quick import guide |
| [api/config/IMPORT_GUIDE.md](./api/config/IMPORT_GUIDE.md) | Detailed instructions |
| [MYSQL_SETUP.md](./MYSQL_SETUP.md) | Complete MySQL setup |
| [QUICKSTART.md](./QUICKSTART.md) | 5-minute setup |
| [api/README.md](./api/README.md) | API documentation |

## 🚀 Quick Start Commands

```bash
# 1. Install dependencies
cd api && npm install

# 2. Configure database
# Edit api/.env with your MySQL credentials

# 3. Import data
npm run import

# 4. Start API
npm start

# 5. Start frontend (new terminal)
cd .. && npm start

# 6. Open browser
# http://localhost:3000
# Login: admin@admin.com / admin123
```

## 🎉 Success!

You now have:
- ✅ Complete SQL sample data file
- ✅ Automated import script
- ✅ 30 menu items ready to use
- ✅ 5 users for testing
- ✅ Sample orders and inventory
- ✅ Complete documentation

Your restaurant app is ready with realistic sample data! 🍕🥙🍔

## 💡 Next Steps

1. Import the sample data
2. Start the API and frontend
3. Test with sample credentials
4. Customize menu items
5. Add your branding
6. Deploy to production

---

**Need help?** Check the documentation files above or review the import guide.
