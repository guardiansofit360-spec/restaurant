# MongoDB Quick Start

## 🚀 Fastest Way to Get Started

### 1. Use MongoDB Atlas (Cloud - No Installation Required)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up (free)
3. Create a FREE cluster (M0)
4. Create database user:
   - Username: `restaurant_admin`
   - Password: (create a strong password)
5. Add IP: Click "Allow Access from Anywhere" (for development)
6. Get connection string: Click "Connect" → "Connect your application"
7. Copy the connection string

### 2. Configure Your App

Edit `api/.env`:
```env
MONGODB_URI=mongodb+srv://restaurant_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
DB_NAME=restaurant_db
PORT=3001
```

Replace:
- `YOUR_PASSWORD` with your actual password
- `cluster0.xxxxx` with your actual cluster address

### 3. Migrate Data

```bash
cd api
npm run migrate
```

### 4. Start Server

```bash
npm start
```

### 5. Test

Open browser: http://localhost:3001/api/health

You should see: `{"status":"OK","message":"Restaurant API is running"}`

## ✅ Done!

Your restaurant app is now using MongoDB!

## 🔍 View Your Data

1. Go to MongoDB Atlas dashboard
2. Click "Browse Collections"
3. See your data: orders, users, inventory, offers, menu, categories

## 🆘 Need Help?

See full guide: [MONGODB_SETUP.md](./MONGODB_SETUP.md)
