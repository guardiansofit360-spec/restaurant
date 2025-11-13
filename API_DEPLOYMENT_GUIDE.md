# 🚀 API Backend Deployment Guide

## Complete Step-by-Step Guide to Deploy Your Restaurant API

---

## 📋 What You'll Deploy

- **Backend API**: Node.js/Express server
- **Database**: PostgreSQL
- **Platform**: Render.com (Free tier available)

---

## 🎯 Option 1: Deploy to Render (Recommended - Free)

### Step 1: Create Render Account

1. Go to: https://render.com/
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended)
4. Authorize Render to access your GitHub repositories

### Step 2: Create PostgreSQL Database

1. In Render Dashboard, click **"New +"** → **"PostgreSQL"**
2. Configure database:
   - **Name**: `restaurant-db`
   - **Database**: `restaurant_db`
   - **User**: `restaurant_user` (auto-generated)
   - **Region**: Choose closest to you
   - **Plan**: **Free** (0.1 GB storage, enough for testing)
3. Click **"Create Database"**
4. Wait 2-3 minutes for database to be created
5. **IMPORTANT**: Copy these values (you'll need them):
   - **Internal Database URL** (starts with `postgresql://`)
   - **External Database URL** (for local testing)

### Step 3: Create Web Service for API

1. In Render Dashboard, click **"New +"** → **"Web Service"**
2. Click **"Connect a repository"**
3. Find and select: `guardiansofit360-spec/turkish-restaurant-app`
4. Click **"Connect"**

### Step 4: Configure Web Service

Fill in these settings:

**Basic Settings:**
- **Name**: `restaurant-api` (or any name you like)
- **Region**: Same as your database
- **Branch**: `main`
- **Root Directory**: `api`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Plan:**
- Select **"Free"** (512 MB RAM, spins down after inactivity)

### Step 5: Add Environment Variables

Scroll down to **"Environment Variables"** section and add these:

Click **"Add Environment Variable"** for each:

```
Key: PORT
Value: 3001

Key: NODE_ENV
Value: production

Key: FRONTEND_URL
Value: https://your-vercel-app.vercel.app
(Replace with your actual Vercel URL after deploying frontend)

Key: DATABASE_URL
Value: [Paste the Internal Database URL from Step 2]
```

**Example DATABASE_URL:**
```
postgresql://restaurant_user:password123@dpg-xxxxx.oregon-postgres.render.com/restaurant_db
```

### Step 6: Deploy!

1. Click **"Create Web Service"**
2. Render will:
   - Clone your repository
   - Install dependencies
   - Start your API
   - Provide a URL (e.g., `https://restaurant-api.onrender.com`)
3. Wait 3-5 minutes for deployment
4. Check logs for any errors

### Step 7: Initialize Database

After deployment, you need to create tables:

**Option A: Using Render Shell (Recommended)**

1. In your Web Service dashboard, click **"Shell"** tab
2. Run this command:
```bash
node init-db.js
```
3. You should see: "✅ Database initialized successfully!"

**Option B: Using Local Connection**

1. Copy the **External Database URL** from your database
2. On your local machine:
```bash
cd restaurant-website/api
# Set the database URL temporarily
$env:DATABASE_URL="your-external-database-url"
node init-db.js
```

### Step 8: Test Your API

1. Copy your API URL (e.g., `https://restaurant-api.onrender.com`)
2. Test in browser:
   - Visit: `https://restaurant-api.onrender.com/api/health`
   - You should see: `{"status":"OK","message":"Restaurant API is running"}`

3. Test endpoints:
   - `GET /api/menu` - Should return menu items
   - `GET /api/categories` - Should return categories
   - `GET /api/users` - Should return users

### Step 9: Update Frontend

1. Go to your Vercel project
2. Settings → Environment Variables
3. Update `REACT_APP_API_URL`:
```
REACT_APP_API_URL=https://restaurant-api.onrender.com/api
```
4. Redeploy frontend

---

## 🎯 Option 2: Deploy to Railway (Alternative)

### Step 1: Create Railway Account

1. Go to: https://railway.app/
2. Sign up with GitHub
3. Authorize Railway

### Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose: `guardiansofit360-spec/turkish-restaurant-app`

### Step 3: Add PostgreSQL Database

1. Click **"+ New"** → **"Database"** → **"PostgreSQL"**
2. Database will be created automatically
3. Copy the **DATABASE_URL** from Variables tab

### Step 4: Configure API Service

1. Click on your service
2. Go to **"Settings"**
3. Set **Root Directory**: `api`
4. Set **Start Command**: `npm start`

### Step 5: Add Environment Variables

In **"Variables"** tab, add:

```
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
DATABASE_URL=[Auto-filled by Railway]
```

### Step 6: Deploy

Railway will automatically deploy. Check logs for status.

---

## 🎯 Option 3: Deploy to Heroku

### Step 1: Install Heroku CLI

Download from: https://devcenter.heroku.com/articles/heroku-cli

### Step 2: Login to Heroku

```bash
heroku login
```

### Step 3: Create Heroku App

```bash
cd restaurant-website
heroku create restaurant-api-yourname
```

### Step 4: Add PostgreSQL

```bash
heroku addons:create heroku-postgresql:mini
```

### Step 5: Set Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Step 6: Deploy

```bash
git subtree push --prefix api heroku main
```

---

## 🧪 Testing Your Deployed API

### Test Health Endpoint

```bash
curl https://your-api-url.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Restaurant API is running",
  "database": "Connected",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Test Menu Endpoint

```bash
curl https://your-api-url.com/api/menu
```

Should return array of menu items.

### Test Create Order

```bash
curl -X POST https://your-api-url.com/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "items": [{"id": 1, "name": "Pizza", "price": 12.99, "quantity": 1}],
    "total": 17.99,
    "deliveryAddress": "123 Main St",
    "paymentMethod": "Cash"
  }'
```

---

## 🔧 Troubleshooting

### Issue: "Application Error" or 503

**Solution:**
1. Check Render logs for errors
2. Verify DATABASE_URL is set correctly
3. Ensure `npm install` completed successfully
4. Check that `init-db.js` ran successfully

### Issue: "Database connection failed"

**Solution:**
1. Verify DATABASE_URL format:
   ```
   postgresql://user:password@host:port/database
   ```
2. Check database is running in Render dashboard
3. Ensure database and API are in same region

### Issue: "CORS errors" in frontend

**Solution:**
1. Update FRONTEND_URL in API environment variables
2. Include your Vercel domain
3. Redeploy API after changing environment variables

### Issue: "Cannot find module"

**Solution:**
1. Check `package.json` has all dependencies
2. Verify Build Command is `npm install`
3. Check logs for npm install errors

### Issue: API works but no data

**Solution:**
1. Run `init-db.js` to create tables and seed data
2. Check database has tables:
   - users
   - orders
   - menu_items
   - categories
   - offers

---

## 📊 Monitoring Your API

### Render Dashboard

1. **Logs**: View real-time logs
2. **Metrics**: CPU, Memory usage
3. **Events**: Deployment history

### Health Checks

Set up monitoring:
1. Use UptimeRobot (free): https://uptimerobot.com/
2. Monitor: `https://your-api-url.com/api/health`
3. Get alerts if API goes down

---

## 💰 Cost Breakdown

### Render Free Tier:
- ✅ PostgreSQL: 0.1 GB storage (FREE)
- ✅ Web Service: 512 MB RAM (FREE)
- ⚠️ Spins down after 15 min inactivity
- ⚠️ Cold start: 30-60 seconds

### Render Paid Tier ($7/month):
- ✅ Always on (no spin down)
- ✅ 512 MB RAM
- ✅ Faster performance

### Railway:
- ✅ $5 free credit/month
- ✅ Pay as you go after

### Heroku:
- ✅ Free tier discontinued
- ⚠️ Minimum $7/month

---

## 🔐 Security Checklist

Before going live:

- [ ] DATABASE_URL is set (not hardcoded)
- [ ] FRONTEND_URL is set correctly
- [ ] API is using HTTPS (automatic on Render)
- [ ] Database has strong password
- [ ] Environment variables are not in git
- [ ] CORS is configured properly
- [ ] API endpoints validate user input

---

## 🚀 Quick Start Commands

### For Render:

```bash
# 1. Create database (in Render dashboard)
# 2. Create web service (in Render dashboard)
# 3. Set environment variables
# 4. Deploy (automatic)
# 5. Initialize database:
node init-db.js
```

### For Local Testing:

```bash
cd restaurant-website/api
npm install
# Set DATABASE_URL to your Render database External URL
$env:DATABASE_URL="postgresql://..."
npm start
```

---

## 📝 Post-Deployment Checklist

- [ ] API is deployed and running
- [ ] Database is created and initialized
- [ ] Health endpoint returns OK
- [ ] Menu endpoint returns data
- [ ] Can create orders via API
- [ ] Frontend REACT_APP_API_URL is updated
- [ ] Frontend is redeployed
- [ ] Test order creation from frontend
- [ ] Test admin can see orders
- [ ] Test cross-device functionality

---

## 🎉 Success!

Once deployed, your API will be available at:
```
https://your-api-name.onrender.com
```

Update your frontend `.env`:
```
REACT_APP_API_URL=https://your-api-name.onrender.com/api
```

And you're done! Orders will now sync across all devices! 🎊

---

## 📚 Additional Resources

- **Render Docs**: https://render.com/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Node.js Deployment**: https://nodejs.org/en/docs/guides/

---

## 🆘 Need Help?

If you encounter issues:

1. Check Render logs (most common issues show here)
2. Verify all environment variables are set
3. Test database connection
4. Check `init-db.js` ran successfully
5. Review this guide step-by-step

---

**Your API Code**: Already on GitHub! ✅
**Repository**: https://github.com/guardiansofit360-spec/turkish-restaurant-app

**Ready to deploy!** 🚀
