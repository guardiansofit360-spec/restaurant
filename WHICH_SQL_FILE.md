# Which SQL File Should I Use?

Quick guide to choose the right SQL file for your situation.

## 📁 Available SQL Files

### 1. `schema.sql` 
**Purpose**: Create database tables
**When**: ALWAYS run this first
**Contains**: Table structure, relationships, indexes

### 2. `sample_data_fresh.sql` ⭐ RECOMMENDED
**Purpose**: Import sample data into NEW/EMPTY tables
**When**: First time setup, fresh database
**Contains**: Sample data WITHOUT TRUNCATE commands
**Best for**: Shared hosting, cPanel, phpMyAdmin

### 3. `sample_data_no_db.sql`
**Purpose**: Import data without database selection
**When**: Existing database with data to replace
**Contains**: Sample data WITH TRUNCATE commands
**Best for**: Re-importing data, clearing old data

### 4. `sample_data.sql`
**Purpose**: Complete import with database creation
**When**: Local MySQL with full permissions
**Contains**: USE database + TRUNCATE + sample data
**Best for**: Local development, root access

## 🎯 Quick Decision Tree

### Are you using shared hosting (cPanel/Hostinger)?
**YES** → Use `sample_data_fresh.sql`

### Do you have root/admin access to MySQL?
**YES** → Use `sample_data.sql`
**NO** → Use `sample_data_fresh.sql`

### Are your tables empty (newly created)?
**YES** → Use `sample_data_fresh.sql`
**NO** → Use `sample_data_no_db.sql`

### Do you want to clear existing data?
**YES** → Use `sample_data_no_db.sql`
**NO** → Use `sample_data_fresh.sql`

## 📋 Step-by-Step Guide

### For Shared Hosting (cPanel/phpMyAdmin)

```
Step 1: Create database in control panel
Step 2: Import schema.sql (creates tables)
Step 3: Import sample_data_fresh.sql (adds data)
```

### For Local Development

```
Step 1: Import schema.sql
Step 2: Import sample_data.sql
```

Or use the migration script:
```bash
cd api
npm run import
```

## 🔧 Import Methods

### Method 1: phpMyAdmin (Shared Hosting)
1. Select your database
2. Click **SQL** tab
3. Copy/paste file contents
4. Click **Go**

### Method 2: MySQL Command Line (Local)
```bash
mysql -u root -p < api/config/schema.sql
mysql -u root -p your_db_name < api/config/sample_data_fresh.sql
```

### Method 3: NPM Script (Local)
```bash
cd api
npm run import
```

## ⚠️ Common Errors

### Error: Table doesn't exist
**Solution**: Run `schema.sql` first to create tables

### Error: Access denied to database
**Solution**: Use `sample_data_fresh.sql` instead of `sample_data.sql`

### Error: Duplicate entry
**Solution**: Use `sample_data_no_db.sql` to clear existing data first

### Error: Unknown database
**Solution**: Create database in control panel first

## ✅ Verification

After import, run this query:

```sql
SELECT COUNT(*) FROM users;      -- Should be 5
SELECT COUNT(*) FROM categories; -- Should be 6
SELECT COUNT(*) FROM menu_items; -- Should be 30
SELECT COUNT(*) FROM offers;     -- Should be 6
SELECT COUNT(*) FROM orders;     -- Should be 5
```

## 📚 File Comparison

| File | Database Creation | TRUNCATE Tables | Best For |
|------|------------------|-----------------|----------|
| `schema.sql` | ✅ Yes | ❌ No | Creating tables |
| `sample_data.sql` | ❌ No (uses USE) | ✅ Yes | Local with permissions |
| `sample_data_no_db.sql` | ❌ No | ✅ Yes | Shared hosting (re-import) |
| `sample_data_fresh.sql` | ❌ No | ❌ No | Shared hosting (first time) ⭐ |

## 🎯 Recommended Workflow

### First Time Setup (Shared Hosting)
```
1. schema.sql           → Creates tables
2. sample_data_fresh.sql → Adds sample data
```

### Re-importing Data
```
1. sample_data_no_db.sql → Clears and re-imports
```

### Local Development
```
1. npm run import → Does everything automatically
```

## 💡 Pro Tips

- **Always backup** before importing
- **Test locally** before production
- **Use fresh file** for new databases
- **Use no_db file** to replace data
- **Check permissions** if errors occur

## 🆘 Still Having Issues?

1. Check you created the database first
2. Verify you have proper permissions
3. Make sure tables are created (schema.sql)
4. Use the correct SQL file for your situation
5. Check the error message carefully

---

**Quick Answer**: Use `sample_data_fresh.sql` for shared hosting! 🎉
