# MongoDB Setup Guide

This guide will help you set up MongoDB for your restaurant application.

## Option 1: Local MongoDB (Development)

### Install MongoDB

#### Windows
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. Choose "Complete" installation
4. Install MongoDB as a Service (recommended)
5. MongoDB Compass will be installed automatically (GUI tool)

#### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian)
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Verify Installation
```bash
mongosh
# You should see MongoDB shell prompt
```

## Option 2: MongoDB Atlas (Cloud - Recommended for Production)

### Setup Steps

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your server's specific IP
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Update Environment Variables**
   - Open `api/.env`
   - Replace the MONGODB_URI with your connection string
   - Replace `<username>` and `<password>` with your credentials
   - Example:
   ```
   MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   DB_NAME=restaurant_db
   ```

## Configuration

### Environment Variables

Update `api/.env`:
```env
# For Local MongoDB
MONGODB_URI=mongodb://localhost:27017
DB_NAME=restaurant_db

# For MongoDB Atlas
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
# DB_NAME=restaurant_db

PORT=3001
```

## Data Migration

Migrate your existing JSON data to MongoDB:

```bash
cd api
node scripts/migrateData.js
```

This will:
- Connect to MongoDB
- Create collections (orders, users, inventory, offers, menu, categories)
- Import all data from JSON files
- Display migration progress

## Running the Server

```bash
cd api
npm install
npm start
```

You should see:
```
✅ Connected to MongoDB successfully
📊 Database: restaurant_db
🚀 Restaurant API server running on http://localhost:3001
```

## Testing the API

### Using curl
```bash
# Health check
curl http://localhost:3001/api/health

# Get all orders
curl http://localhost:3001/api/orders

# Get all users
curl http://localhost:3001/api/users
```

### Using MongoDB Compass (GUI)
1. Open MongoDB Compass
2. Connect to your database
3. Browse collections: orders, users, inventory, offers, menu, categories
4. View and edit documents directly

## Collections Structure

### orders
```json
{
  "id": 1234567890,
  "userId": "user123",
  "items": [...],
  "total": 45.99,
  "status": "Pending",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### users
```json
{
  "id": "user123",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### inventory
```json
{
  "id": 1,
  "name": "Tomatoes",
  "stock": 50,
  "unit": "kg",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

## Troubleshooting

### Connection Issues

**Error: MongoServerError: Authentication failed**
- Check your username and password in the connection string
- Verify database user exists in MongoDB Atlas

**Error: connect ECONNREFUSED**
- Make sure MongoDB is running locally
- Check if MongoDB service is started

**Error: MongoNetworkError**
- Check your internet connection (for Atlas)
- Verify IP whitelist in MongoDB Atlas Network Access

### Migration Issues

**Error: Cannot find module**
```bash
cd api
npm install
```

**Error: ENOENT: no such file or directory**
- Make sure you're running the migration from the `api` directory
- Verify JSON files exist in `src/data/`

## Production Deployment

### Vercel
1. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `DB_NAME`: restaurant_db

2. Deploy:
```bash
vercel --prod
```

### Environment Variables for Production
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
DB_NAME=restaurant_db
PORT=3001
```

## Security Best Practices

1. **Never commit .env files** - Already in .gitignore
2. **Use strong passwords** for MongoDB users
3. **Restrict IP access** in production (not 0.0.0.0/0)
4. **Use environment variables** for all sensitive data
5. **Enable MongoDB authentication** in production
6. **Use SSL/TLS** for connections (Atlas does this automatically)

## Backup and Restore

### Backup
```bash
mongodump --uri="mongodb://localhost:27017" --db=restaurant_db --out=./backup
```

### Restore
```bash
mongorestore --uri="mongodb://localhost:27017" --db=restaurant_db ./backup/restaurant_db
```

## Monitoring

### MongoDB Atlas
- Built-in monitoring dashboard
- Real-time metrics
- Performance insights
- Alerts and notifications

### Local MongoDB
Use MongoDB Compass or:
```bash
mongosh
use restaurant_db
db.stats()
db.orders.countDocuments()
```

## Next Steps

1. ✅ Install MongoDB (local or Atlas)
2. ✅ Configure environment variables
3. ✅ Run data migration
4. ✅ Start the API server
5. ✅ Test endpoints
6. 🚀 Deploy to production

## Support

- MongoDB Documentation: https://docs.mongodb.com/
- MongoDB Atlas: https://docs.atlas.mongodb.com/
- MongoDB Community: https://community.mongodb.com/
