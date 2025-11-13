# Turkish Restaurant Website

A mobile-responsive restaurant website built with React for ordering food online with admin management features.

## Features

### Customer Features
- 🏠 Home page with hero banner and features
- 🍽️ Browse menu with category filters
- 🛒 Shopping cart with quantity management
- 👤 User registration and login
- 📦 Place orders with delivery

### Admin Features
- 📊 Dashboard with statistics
- 📋 Order management (view and update order status)
- 📦 Inventory management (add/edit menu items)
- 🎁 Offers management (create and manage promo codes)

## Data Storage

The application uses MySQL database for persistent data storage:
- Users and authentication
- Menu items and categories
- Orders and order history
- Promotional offers
- Inventory management

### Backend API
A Node.js/Express API connects the frontend to MySQL database. See [MYSQL_SETUP.md](./MYSQL_SETUP.md) for setup instructions.

## Demo Credentials

**Admin Access:**
- Email: admin@admin.com
- Password: admin123

**Customer Access:**
- Email: john@example.com
- Password: password123
- Or any email/password for demo

## Installation

### Frontend Setup
```bash
cd restaurant-website
npm install
```

### Backend Setup
```bash
cd api
npm install
```

See [MYSQL_SETUP.md](./MYSQL_SETUP.md) for complete database setup.

## Running the App

### Start Backend API (Terminal 1)
```bash
cd api
npm start
```
API runs on http://localhost:3001

### Start Frontend (Terminal 2)
```bash
npm start
```
App opens at http://localhost:3000

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header
│   └── Header.css
├── data/                  # JSON data files
│   ├── menuData.json
│   ├── ordersData.json
│   ├── inventoryData.json
│   ├── offersData.json
│   ├── usersData.json
│   └── categoriesData.json
├── pages/
│   ├── Home.js            # Landing page
│   ├── Menu.js            # Menu with categories
│   ├── Cart.js            # Shopping cart
│   ├── Login.js           # Login page
│   ├── Register.js        # Registration page
│   └── admin/
│       ├── Dashboard.js   # Admin dashboard
│       ├── Orders.js      # Order management
│       ├── Inventory.js   # Menu inventory
│       └── Offers.js      # Promo offers
├── utils/
│   └── dataManager.js     # LocalStorage utilities
├── App.js                 # Main app with routing
└── index.js               # Entry point
```

## Technologies

### Frontend
- React 19
- React Router v7
- CSS3 (Mobile-first responsive design)
- Lottie animations

### Backend
- Node.js with Express
- MySQL database
- mysql2 (Promise-based MySQL client)
- CORS enabled
- RESTful API architecture

## Data Management

The app uses MySQL database for persistent storage:

1. Backend API handles all database operations
2. Frontend communicates via REST API
3. Transaction support for complex operations
4. Connection pooling for performance

### API Endpoints

- `/api/users` - User management
- `/api/orders` - Order processing
- `/api/menu` - Menu items
- `/api/categories` - Food categories
- `/api/offers` - Promotional offers

See [MYSQL_SETUP.md](./MYSQL_SETUP.md) for complete API documentation.

## Deployment

The app can be deployed to Vercel or any static hosting service. See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for deployment instructions.

## Quick Start

See [QUICKSTART.md](./QUICKSTART.md) for a 5-minute setup guide!

## Documentation

- [QUICKSTART.md](./QUICKSTART.md) - Get started in 5 minutes
- [MYSQL_SETUP.md](./MYSQL_SETUP.md) - Complete MySQL setup guide
- [api/README.md](./api/README.md) - Backend API documentation
- [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) - Deploy to production

## Next Steps

To enhance the app:
- Add payment gateway integration (Stripe/PayPal)
- Add email notifications
- Add SMS notifications
- Implement real-time order tracking
- Add customer reviews and ratings
- Multi-language support
- Mobile app version
