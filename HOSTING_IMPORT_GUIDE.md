# Import Guide for Shared Hosting / cPanel

If you're using shared hosting (cPanel, Hostinger, etc.), follow these steps.

## Step 1: Create Database via Control Panel

1. Login to your hosting control panel (cPanel/Plesk/etc.)
2. Go to **MySQL Databases** or **Database Manager**
3. Create a new database (e.g., `your_restaurant_db`)
4. Create a database user
5. Grant ALL privileges to the user
6. Note down:
   - Database name
   - Database user
   - Database password
   - Database host (usually `localhost`)

## Step 2: Create Tables

1. Open **phpMyAdmin** from your control panel
2. Select your database from the left sidebar (e.g., `turkish-313037e008`)
3. Click **SQL** tab at the top
4. Copy and paste the contents of `api/config/schema_no_db.sql` ⭐
5. Click **Go** to execute
6. Wait for "Database schema created successfully!" message

**Important**: Use `schema_no_db.sql` (not `schema.sql`) for shared hosting!

## Step 3: Import Sample Data

1. In **phpMyAdmin**, make sure your database is selected
2. Click **SQL** tab
3. Copy and paste contents of `api/config/sample_data_fresh.sql`
   (Use this for NEW/EMPTY tables!)
4. Click **Go**
5. You should see "Sample data imported successfully!"

**Note**: Use `sample_data_fresh.sql` for new databases (no TRUNCATE commands)

## Step 4: Update Your .env File

Update `api/.env` with your hosting database credentials:

```env
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=3306
PORT=3001
```

## Troubleshooting

### Error: Access Denied
- Make sure you created the database user
- Grant ALL privileges to the user on the database
- Check username and password are correct

### Error: Table already exists
- Drop existing tables first, or
- Use the TRUNCATE statements in the SQL file

### Error: Unknown database
- Make sure you selected the database in phpMyAdmin
- Or add `USE your_database_name;` at the top of the SQL

## Files to Use for Shared Hosting

- **Step 1 - Create tables**: `api/config/schema_no_db.sql` ⭐
- **Step 2 - Import data**: `api/config/sample_data_fresh.sql` ⭐

**All Available SQL Files:**
- `schema_no_db.sql` - Creates tables (for shared hosting) ⭐
- `schema.sql` - Creates database + tables (for local MySQL)
- `sample_data_fresh.sql` - Sample data for NEW tables ⭐
- `sample_data_no_db.sql` - Sample data with TRUNCATE
- `sample_data.sql` - Sample data with USE database

## Verification

After import, run this query in phpMyAdmin SQL tab:

```sql
SELECT 'Users' as Table_Name, COUNT(*) as Count FROM users
UNION ALL SELECT 'Categories', COUNT(*) FROM categories
UNION ALL SELECT 'Menu Items', COUNT(*) FROM menu_items
UNION ALL SELECT 'Offers', COUNT(*) FROM offers
UNION ALL SELECT 'Orders', COUNT(*) FROM orders;
```

Expected:
- Users: 5
- Categories: 6
- Menu Items: 30
- Offers: 6
- Orders: 5
