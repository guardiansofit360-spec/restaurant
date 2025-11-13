# Restaurant API - Node.js Backend

Simple Node.js backend API that stores data in JSON files.

## Features

- ✅ RESTful API endpoints
- ✅ JSON file storage
- ✅ CORS enabled
- ✅ Real-time data sync across users
- ✅ No database required

## Setup

### 1. Install Dependencies

```bash
cd api
npm install
```

### 2. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The API will run on `http://localhost:3001`

## API Endpoints

### Orders

- `GET /api/orders` - Get all orders
- `GET /api/orders/user/:userId` - Get orders for specific user
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:orderId` - Update order status

### Users

- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

### Inventory

- `GET /api/inventory` - Get all inventory items
- `PATCH /api/inventory/:itemId` - Update inventory item

### Offers

- `GET /api/offers` - Get all offers

### Health Check

- `GET /api/health` - Check if API is running

## How It Works

1. **Data Storage**: All data is stored in JSON files in `src/data/`
2. **Read Operations**: API reads from JSON files
3. **Write Operations**: API writes to JSON files
4. **Sync**: All users see the same data because it's stored on the server

## Running Both Frontend and Backend

### Terminal 1 - Backend API:
```bash
cd api
npm start
```

### Terminal 2 - Frontend React App:
```bash
npm start
```

## Environment Variables

Add to your `.env` file:

```
REACT_APP_API_URL=http://localhost:3001/api
```

## Deployment

### Option 1: Deploy to Vercel (Serverless Functions)

The API can be deployed as Vercel serverless functions. See `VERCEL_API_DEPLOYMENT.md` for details.

### Option 2: Deploy to Heroku

```bash
cd api
heroku create your-restaurant-api
git push heroku main
```

Then update your frontend `.env`:
```
REACT_APP_API_URL=https://your-restaurant-api.herokuapp.com/api
```

### Option 3: Deploy to Railway

1. Go to https://railway.app
2. Create new project
3. Deploy from GitHub
4. Set root directory to `/api`
5. Railway will auto-detect Node.js and deploy

## Data Persistence

- ✅ Data persists across server restarts
- ✅ All users see the same data
- ✅ Orders sync in real-time
- ✅ No database setup required

## Troubleshooting

### Port already in use?

Change the port in `server.js`:
```javascript
const PORT = process.env.PORT || 3002; // Change to 3002
```

### CORS errors?

Make sure the API is running and the frontend `.env` has the correct API URL.

### Data not saving?

Check file permissions on the `src/data/` directory.

## Production Notes

For production, consider:
- Adding authentication/authorization
- Rate limiting
- Input validation
- Error logging
- Database migration (MongoDB, PostgreSQL, etc.)
