# Quick Setup for Shared Hosting (cPanel/phpMyAdmin)

**For database**: `turkish-313037e008`

## ✅ Step-by-Step Instructions

### Step 1: Open phpMyAdmin
1. Login to your hosting control panel
2. Find and click **phpMyAdmin**
3. You should see your database `turkish-313037e008` in the left sidebar

### Step 2: Select Your Database
1. Click on `turkish-313037e008` in the left sidebar
2. The database should now be highlighted/selected

### Step 3: Create Tables
1. Click the **SQL** tab at the top
2. Open file: `api/config/schema_no_db.sql`
3. Copy ALL the contents
4. Paste into the SQL text box
5. Click **Go** button
6. Wait for success message: "Database schema created successfully!"

### Step 4: Import Sample Data
1. Still in the **SQL** tab
2. Clear the text box
3. Open file: `api/config/sample_data_fresh.sql`
4. Copy ALL the contents
5. Paste into the SQL text box
6. Click **Go** button
7. Wait for success message: "Sample data imported successfully!"

### Step 5: Verify Import
1. Look at the left sidebar
2. You should now see these tables:
   - users
   - categories
   - menu_items
   - orders
   - order_items
   - offers
   - inventory

3. Click on `users` table
4. Click **Browse** tab
5. You should see 5 users including admin@admin.com

## ✅ Done!

You now have:
- ✅ 7 tables created
- ✅ 5 users (1 admin, 4 customers)
- ✅ 6 categories
- ✅ 30 menu items
- ✅ 6 promotional offers
- ✅ 5 sample orders

## 🔑 Login Credentials

**Admin:**
- Email: admin@admin.com
- Password: admin123

**Customer:**
- Email: john@example.com
- Password: password123

## 🎯 Files You Need

1. **`api/config/schema_no_db.sql`** - Creates tables (Step 3)
2. **`api/config/sample_data_fresh.sql`** - Adds data (Step 4)

## ⚠️ Common Issues

### "Table doesn't exist"
- Make sure you completed Step 3 first
- Check that tables appear in left sidebar

### "Access denied"
- Make sure you selected your database first (Step 2)
- Database name should be highlighted in left sidebar

### "Duplicate entry"
- You already imported the data
- Skip Step 4 or use `sample_data_no_db.sql` instead

## 🔄 Need to Start Over?

1. In phpMyAdmin, select your database
2. Click **Operations** tab
3. Scroll down to "Remove database"
4. Or manually drop all tables
5. Then repeat Steps 3 and 4

## 📞 Next Steps

After successful import:
1. Update `api/.env` with your database credentials
2. Start your API server
3. Test the endpoints
4. Start your frontend
5. Login and test the app!

---

**Quick Summary**: 
1. Select database → 2. Run schema_no_db.sql → 3. Run sample_data_fresh.sql → Done! ✅
