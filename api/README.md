# Restaurant API - MySQL Backend

Node.js REST API with MySQL database for the restaurant application.

## Quick Start

### 1. Install Dependencies
```bash
cd api
npm install
```

### 2. Configure Database
Update `api/.env` with your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=restaurant_db
```

### 3. Run Migration
```bash
node scripts/migrate.js
```

### 4. Start Server
```bash
npm start
```

API runs on `http://localhost:3001`

## Features

- ✅ RESTful API endpoints
- ✅ MySQL database with connection pooling
- ✅ CORS enabled
- ✅ Transaction support for orders
- ✅ Sample data migration
- ✅ Error handling

## Tech Stack

- Express.js - Web framework
- MySQL2 - MySQL client with Promise support
- CORS - Cross-origin resource sharing
- dotenv - Environment configuration

## Project Structure

```
api/
├── config/
│   ├── database.js      # MySQL connection pool
│   └── schema.sql       # Database schema
├── models/
│   ├── User.js          # User model
│   ├── Order.js         # Order model
│   ├── MenuItem.js      # Menu item model
│   ├── Category.js      # Category model
│   └── Offer.js         # Offer model
├── scripts/
│   └── migrate.js       # Database migration
├── server.js            # Express server
├── package.json
└── .env                 # Environment variables
```

## Scripts

- `npm start` - Start server
- `npm run dev` - Start with nodemon (auto-reload)
- `node scripts/migrate.js` - Run database migration

## Environment Variables

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=restaurant_db
DB_PORT=3306
PORT=3001
NODE_ENV=development
```

## API Documentation

See [MYSQL_SETUP.md](../MYSQL_SETUP.md) for complete API documentation.
