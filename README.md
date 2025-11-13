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

The application uses JSON file storage for data persistence:
- Users and authentication
- Menu items and categories
- Orders and order history
- Promotional offers
- Inventory management

### Backend API
A simple Node.js/Express API with JSON storage. No database required!

## Demo Credentials

**Admin Access:**
- Email: admin@admin.com
- Password: admin123

**Customer Access:**
- Email: john@example.com
- Password: password123

## Installation

### Frontend Setup
```bash
npm install
```

### Backend Setup
```bash
cd api
npm install
```

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
├── services/
│   └── apiService.js      # API client
├── utils/
│   └── dataManager.js     # LocalStorage utilities
├── App.js                 # Main app with routing
└── index.js               # Entry point

api/
├── server.js              # Express server with all routes
├── package.json
└── .env                   # Environment variables
```

## Technologies

### Frontend
- React 19
- React Router v7
- CSS3 (Mobile-first responsive design)
- Lottie animations

### Backend
- Node.js with Express
- JSON file storage
- CORS enabled
- RESTful API architecture

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/users` - User management
- `POST /api/users/login` - User login
- `GET /api/orders` - Order processing
- `GET /api/menu` - Menu items
- `GET /api/categories` - Food categories
- `GET /api/offers` - Promotional offers

See [api/README.md](./api/README.md) for complete API documentation.

## Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import to Vercel
3. Set environment variable: `REACT_APP_API_URL=<your-api-url>/api`
4. Deploy

### Backend (Railway/Render)
See [SIMPLE_DEPLOYMENT.md](./SIMPLE_DEPLOYMENT.md) for step-by-step deployment guide.

## Quick Start

See [QUICKSTART.md](./QUICKSTART.md) for a 5-minute setup guide!

## Documentation

- [QUICKSTART.md](./QUICKSTART.md) - Get started in 5 minutes
- [api/README.md](./api/README.md) - Backend API documentation
- [SIMPLE_DEPLOYMENT.md](./SIMPLE_DEPLOYMENT.md) - Deploy to production

## Next Steps

To enhance the app:
- Add payment gateway integration (Stripe/PayPal)
- Add email notifications
- Add SMS notifications
- Implement real-time order tracking
- Add customer reviews and ratings
- Multi-language support
- Mobile app version
- Upgrade to a real database (PostgreSQL/MongoDB) for production
