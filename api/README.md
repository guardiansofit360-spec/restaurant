# Restaurant API - MongoDB Backend

Node.js backend API with MongoDB database integration.

## Features

- ✅ RESTful API endpoints
- ✅ MongoDB database storage
- ✅ CORS enabled
- ✅ Real-time data sync
- ✅ Data migration from JSON
- ✅ Cloud-ready (MongoDB Atlas)

## Quick Start

### 1. Install Dependencies

```bash
cd api
npm install
```

### 2. Setup MongoDB

**Option A: MongoDB Atlas (Cloud - Recommended)**
- See [MONGODB_QUICKSTART.md](../MONGODB_QUICKSTART.md)

**Option B: Local MongoDB**
- Install MongoDB locally
- It will run on `mongodb://localhost:27017`

### 3. Configure Environment

Create `api/.env`:
```env
MONGODB_URI=mongodb://localhost:27017
# Or for Atlas: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/
DB_NAME=restaurant_db
PORT=3001
```

### 4. Migrate Data

```bash
npm run migrate
```

### 5. Start Server

```bash
npm start
```

API runs on `http://localhost:3001`

## API Endpoints

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/stats/active` - Get active orders count
- `POST /api/orders` - Create order
- `PATCH /api/orders/:orderId` - Update order

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:userId` - Get user by ID
- `POST /api/users` - Create user
- `PATCH /api/users/:userId` - Update user

### Inventory
- `GET /api/inventory` - Get all inventory
- `GET /api/inventory/:itemId` - Get item by ID
- `POST /api/inventory` - Create item
- `PATCH /api/inventory/:itemId` - Update item

### Offers
- `GET /api/offers` - Get all offers
- `GET /api/offers/active` - Get active offers
- `POST /api/offers` - Create offer
- `PATCH /api/offers/:offerId` - Update offer

### Health
- `GET /api/health` - Health check

## Database Collections

- `orders` - Customer orders
- `users` - User accounts
- `inventory` - Restaurant inventory
- `offers` - Special offers
- `menu` - Menu items
- `categories` - Menu categories

## Scripts

- `npm start` - Start server
- `npm run dev` - Start with auto-reload
- `npm run migrate` - Migrate JSON to MongoDB

## Project Structure

```
api/
├── config/
│   └── database.js       # MongoDB connection
├── models/
│   ├── Order.js          # Order operations
│   ├── User.js           # User operations
│   ├── Inventory.js      # Inventory operations
│   └── Offer.js          # Offer operations
├── scripts/
│   └── migrateData.js    # Data migration
├── server.js             # Main server
├── package.json
└── .env                  # Config (not in git)
```

## Running Full Stack

### Terminal 1 - Backend:
```bash
cd api
npm start
```

### Terminal 2 - Frontend:
```bash
npm start
```

## Deployment

### Vercel

1. Add environment variables:
   ```
   MONGODB_URI=your_atlas_connection_string
   DB_NAME=restaurant_db
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

### Update Frontend

Update `.env`:
```env
REACT_APP_API_URL=https://your-api.vercel.app/api
```

## Documentation

- [MongoDB Setup Guide](../MONGODB_SETUP.md) - Full setup instructions
- [MongoDB Quick Start](../MONGODB_QUICKSTART.md) - Fast setup
- [API Deployment](../API_DEPLOYMENT.md) - Deployment guide

## Troubleshooting

**Connection Error?**
- Check MongoDB is running
- Verify connection string in `.env`
- Check IP whitelist (Atlas)

**Migration Failed?**
- Ensure JSON files exist in `../src/data/`
- Check MongoDB connection
- Run `npm install`

**Port in Use?**
- Change PORT in `.env`
- Kill existing process

## Support

- MongoDB Docs: https://docs.mongodb.com/
- Express Docs: https://expressjs.com/
