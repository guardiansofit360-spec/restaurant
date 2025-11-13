# MySQL Database Setup Guide

This guide will help you set up MySQL database for your restaurant application.

## Prerequisites

- Node.js installed
- MySQL Server installed

## Step 1: Install MySQL

### Windows
1. Download MySQL Installer from: https://dev.mysql.com/downloads/installer/
2. Run the installer and choose "Developer Default"
3. Set root password during installation
4. Complete the installation

### macOS
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

## Step 2: Configure Database Connection

1. Navigate to the API folder:
```bash
cd restaurant-website/api
```

2. Update `.env` file with your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=restaurant_db
DB_PORT=3306
PORT=3001
```

## Step 3: Install Dependencies

```bash
npm install
```

This will install:
- express - Web framework
- mysql2 - MySQL client
- cors - Enable CORS
- dotenv - Environment variables

## Step 4: Create Database and Tables

Run the migration script to create database schema and import sample data:

```bash
node scripts/migrate.js
```

This will:
- Create `restaurant_db` database
- Create all necessary tables (users, orders, menu_items, categories, offers)
- Import sample data from JSON files

## Step 5: Start the API Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The API will run on `http://localhost:3001`

## Step 6: Test the API

Open your browser or use curl:

```bash
# Health check
curl http://localhost:3001/api/health

# Get all menu items
curl http://localhost:3001/api/menu

# Get all categories
curl http://localhost:3001/api/categories
```

## Database Schema

### Tables Created:

1. **users** - User accounts (customers and admins)
2. **categories** - Food categories
3. **menu_items** - Restaurant menu items
4. **orders** - Customer orders
5. **order_items** - Items in each order
6. **offers** - Promotional offers
7. **inventory** - Stock management

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `POST /api/users/login` - User login
- `PATCH /api/users/:id` - Update user

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/stats/active` - Get active orders count
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id` - Update order status

### Menu Items
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get item by ID
- `POST /api/menu` - Create menu item
- `PATCH /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category

### Offers
- `GET /api/offers` - Get all offers
- `GET /api/offers/active` - Get active offers
- `POST /api/offers` - Create offer
- `PATCH /api/offers/:id` - Update offer
- `DELETE /api/offers/:id` - Delete offer

## Troubleshooting

### Connection Error
**Error**: `ER_ACCESS_DENIED_ERROR`
- Check your MySQL username and password in `.env`
- Make sure MySQL server is running

### Database Not Found
**Error**: `ER_BAD_DB_ERROR`
- Run the migration script: `node scripts/migrate.js`

### Port Already in Use
**Error**: `EADDRINUSE`
- Change PORT in `.env` file
- Or stop the process using port 3001

### Cannot Connect to MySQL
```bash
# Check if MySQL is running
# Windows
net start MySQL80

# macOS/Linux
sudo systemctl status mysql
```

## Next Steps

1. Update frontend to use API endpoints
2. Configure CORS for production
3. Add authentication middleware
4. Deploy to cloud (AWS, Heroku, etc.)

## Production Deployment

For production, consider:
- Use environment variables for sensitive data
- Enable SSL/TLS for MySQL connections
- Use connection pooling (already configured)
- Set up database backups
- Use a managed MySQL service (AWS RDS, Google Cloud SQL)

## Backup Database

```bash
# Backup
mysqldump -u root -p restaurant_db > backup.sql

# Restore
mysql -u root -p restaurant_db < backup.sql
```
