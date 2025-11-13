# Backend API Setup Guide

Your restaurant app now has a Node.js backend API that stores data in JSON files!

## Quick Start (2 minutes)

### Step 1: Install API Dependencies

```bash
cd api
npm install
```

### Step 2: Start the API Server

```bash
npm start
```

You should see:
```
🚀 Restaurant API server running on http://localhost:3001
📁 Data directory: /path/to/src/data
```

### Step 3: Start the Frontend (New Terminal)

Open a new terminal:

```bash
npm start
```

### Step 4: Test It!

1. **Customer**: Place an order
2. **Admin**: Open admin panel
3. **Result**: Order appears instantly!

## How It Works

### Before (localStorage):
- ❌ Orders stored in browser only
- ❌ Admin can't see customer orders
- ❌ Data lost on browser clear

### After (Node.js API):
- ✅ Orders stored in JSON files on server
- ✅ All users see the same data
- ✅ Data persists across sessions
- ✅ Real-time sync

## Architecture

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   React     │  HTTP   │   Node.js   │  Read/  │    JSON     │
│  Frontend   │ ──────> │   API       │  Write  │    Files    │
│ (Port 3000) │ <────── │ (Port 3001) │ ──────> │  (src/data) │
└─────────────┘         └─────────────┘         └─────────────┘
```

## API Endpoints

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id` - Update order

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user

### Inventory
- `GET /api/inventory` - Get inventory
- `PATCH /api/inventory/:id` - Update item

## Running Both Servers

### Option 1: Two Terminals (Recommended)

**Terminal 1 - API:**
```bash
cd api
npm start
```

**Terminal 2 - Frontend:**
```bash
npm start
```

### Option 2: Single Command (Install concurrently first)

```bash
npm install -g concurrently
npm run start:all
```

## Environment Variables

Your `.env` file should have:

```
REACT_APP_API_URL=http://localhost:3001/api
```

## Deployment

### Deploy API to Vercel

1. Create `vercel.json` in `/api`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

2. Deploy:
```bash
cd api
vercel
```

3. Update frontend `.env`:
```
REACT_APP_API_URL=https://your-api.vercel.app/api
```

### Deploy API to Railway

1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select your repo
4. Set root directory: `/api`
5. Deploy!

6. Update frontend `.env` with Railway URL

## Data Files

All data is stored in `src/data/`:
- `ordersData.json` - All orders
- `usersData.json` - User accounts
- `inventoryData.json` - Menu items
- `offersData.json` - Promotions

## Troubleshooting

### API not starting?

Check if port 3001 is available:
```bash
lsof -i :3001  # Mac/Linux
netstat -ano | findstr :3001  # Windows
```

### Frontend can't connect to API?

1. Check API is running: http://localhost:3001/api/health
2. Check `.env` has correct API_URL
3. Restart frontend after changing `.env`

### Orders not syncing?

1. Check browser console for errors
2. Verify API is running
3. Check CORS is enabled in API

## Benefits

✅ **Real-time sync** - All users see same data
✅ **Data persistence** - Survives browser refresh
✅ **Multi-user** - Works across devices
✅ **Simple** - No database setup needed
✅ **Free** - Can deploy on free tiers

## Next Steps

1. ✅ Start API server
2. ✅ Start frontend
3. ✅ Test order creation
4. ✅ Deploy to production

Your restaurant app now has a real backend! 🎉
