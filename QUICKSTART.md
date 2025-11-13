# Quick Start Guide - MySQL Backend

Get your restaurant app running with MySQL in 5 minutes!

## Prerequisites

- Node.js installed
- MySQL Server installed and running

## Step 1: Install MySQL (if not installed)

### Windows
Download and install from: https://dev.mysql.com/downloads/installer/

### macOS
```bash
brew install mysql
brew services start mysql
```

### Linux
```bash
sudo apt install mysql-server
sudo systemctl start mysql
```

## Step 2: Clone and Setup

```bash
# Navigate to project
cd restaurant-website

# Install frontend dependencies
npm install

# Install backend dependencies
cd api
npm install
```

## Step 3: Configure Database

Edit `api/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=restaurant_db
```

## Step 4: Create Database and Import Data

```bash
# From api folder
node scripts/migrate.js
```

You should see:
```
✅ Database schema created successfully
✅ Categories imported
✅ Menu items imported
✅ Offers imported
✅ Users imported
🎉 Migration completed successfully!
```

## Step 5: Start the Application

### Terminal 1 - Start Backend
```bash
cd api
npm start
```

Output:
```
✅ MySQL Database connected successfully
🚀 Server running on http://localhost:3001
📡 API endpoints available at /api/*
```

### Terminal 2 - Start Frontend
```bash
# From restaurant-website folder
npm start
```

App opens at http://localhost:3000

## Step 6: Test It Out

1. Open http://localhost:3000
2. Login with:
   - Email: admin@admin.com
   - Password: admin123
3. Browse menu, add items to cart, place orders!

## Verify Backend Connection

Test API health:
```bash
curl http://localhost:3001/api/health
```

Response:
```json
{
  "status": "OK",
  "message": "Restaurant API with MySQL is running"
}
```

## Default Credentials

**Admin:**
- Email: admin@admin.com
- Password: admin123

**Customer:**
- Email: john@example.com
- Password: password123

## Troubleshooting

### MySQL Connection Failed
- Check MySQL is running
- Verify credentials in `api/.env`
- Check MySQL port (default: 3306)

### Port Already in Use
- Change PORT in `api/.env`
- Or stop process using port 3001

### Migration Failed
- Ensure MySQL is running
- Check database credentials
- Verify you have CREATE DATABASE permissions

## What's Next?

- Customize menu items in MySQL database
- Add more users
- Configure for production deployment
- Set up automated backups

## Sample Data

The import includes:
- 5 users (1 admin, 4 customers)
- 6 categories
- 30 menu items
- 6 promotional offers
- 5 sample orders

See [SQL_IMPORT_README.md](./SQL_IMPORT_README.md) for details.

## Need Help?

See detailed guides:
- [SQL_IMPORT_README.md](./SQL_IMPORT_README.md) - SQL import guide
- [MYSQL_SETUP.md](./MYSQL_SETUP.md) - Complete MySQL setup
- [api/README.md](./api/README.md) - API documentation
- [README.md](./README.md) - Full project documentation
