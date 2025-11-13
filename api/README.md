# Restaurant API - JSON Storage Backend

Simple Node.js REST API with JSON file storage for the restaurant application.

## Quick Start

### 1. Install Dependencies
```bash
cd api
npm install
```

### 2. Configure Environment (Optional)
Update `api/.env` if needed:
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Start Server
```bash
npm start
```

API runs on `http://localhost:3001`

## Features

- ✅ RESTful API endpoints
- ✅ JSON file storage (no database required)
- ✅ CORS enabled
- ✅ Simple and fast deployment
- ✅ Pre-populated sample data
- ✅ Error handling

## Tech Stack

- Express.js - Web framework
- CORS - Cross-origin resource sharing
- dotenv - Environment configuration
- Node.js fs module - File system operations

## Project Structure

```
api/
├── server.js            # Express server with all routes
├── package.json
└── .env                 # Environment variables
```

Data is stored in:
```
src/data/
├── usersData.json
├── ordersData.json
├── menuData.json
├── categoriesData.json
└── offersData.json
```

## Scripts

- `npm start` - Start server
- `npm run dev` - Start with nodemon (auto-reload)

## Environment Variables

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `POST /api/users/login` - Login user
- `PATCH /api/users/:id` - Update user

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/user/:userId` - Get orders by user
- `GET /api/orders/stats/active` - Get active orders count
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id` - Update order status

### Menu Items
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get menu item by ID
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

## Deployment

See [SIMPLE_DEPLOYMENT.md](../SIMPLE_DEPLOYMENT.md) for deployment instructions.

## Notes

- Data persists in JSON files during runtime
- Changes are saved immediately to files
- Data resets to initial state on redeployment
- Perfect for demos, prototypes, and small applications
