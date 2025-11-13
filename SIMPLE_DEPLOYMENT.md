# Simple Deployment Guide (No Database Required!)

Your app now uses JSON files for storage - no database needed!

## Deploy Backend to Render (Free - Recommended)

### Step 1: Sign Up for Render
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with your GitHub account
4. Authorize Render to access your repositories

### Step 2: Deploy from GitHub
1. Click "New +" button (top right)
2. Select "Web Service"
3. Click "Connect account" if needed
4. Find and select: `guardiansofit360-spec/turkish-restaurant-app`
5. Click "Connect"

### Step 3: Configure Service
Fill in these settings:
- **Name**: `restaurant-api` (or any name you prefer)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `api`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Instance Type**: `Free`

### Step 4: Add Environment Variables
Scroll down to "Environment Variables" section and add:

| Key | Value |
|-----|-------|
| `PORT` | `3001` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://turkish-restaurant-app.vercel.app` |

Click "Add" for each variable.

### Step 5: Deploy
1. Click "Create Web Service" button at the bottom
2. Wait for deployment (takes 2-3 minutes)
3. Watch the logs - you should see: "🚀 Server running on..."

### Step 6: Get Your API URL
Once deployed, you'll see your service URL at the top:
- Example: `https://restaurant-api.onrender.com`
- Copy this URL

### Step 7: Update Vercel Environment Variable
1. Go to https://vercel.com
2. Open your project: `turkish-restaurant-app`
3. Click "Settings" tab
4. Click "Environment Variables" in sidebar
5. Click "Add New"
6. Enter:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://restaurant-api.onrender.com/api` (use YOUR URL + `/api`)
   - **Environment**: Select all (Production, Preview, Development)
7. Click "Save"

### Step 8: Redeploy Frontend
1. Go to "Deployments" tab
2. Click the "..." menu on the latest deployment
3. Click "Redeploy"
4. Wait for redeployment to complete

### Step 9: Test Your App
1. Visit your API health endpoint:
   - `https://restaurant-api.onrender.com/api/health`
   - Should see: `{"status":"OK","message":"Restaurant API is running",...}`

2. Visit your frontend:
   - `https://turkish-restaurant-app.vercel.app`
   - Try logging in with: `admin@admin.com` / `admin123`

## ✅ Done!

Your app is now fully deployed and working!

## Important Notes

### Data Persistence
- Data is stored in JSON files
- Changes persist during the session
- Data resets on redeployment
- For production, consider adding a real database later

### Free Tier
- Railway: $5 free credit/month
- Render: Free tier with cold starts (30-60s first load)
- Both are perfect for demos and testing

## Quick Test Locally

```bash
cd api
npm install
npm start
```

Visit: http://localhost:3001/api/health


## Important Notes

### Free Tier Limitations
- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds (cold start)
- Perfect for demos, portfolios, and testing
- For production with no cold starts, upgrade to paid tier ($7/month)

### Data Persistence
- Data is stored in JSON files
- Changes persist during the session
- **Data resets on every redeployment**
- For permanent data storage, consider adding a database later

### Troubleshooting

**API not responding:**
- Check Render logs for errors
- Verify environment variables are set correctly
- Make sure `FRONTEND_URL` matches your Vercel URL exactly

**CORS errors:**
- Verify `FRONTEND_URL` in Render matches your Vercel URL
- Include `https://` in the URL
- Redeploy after changing environment variables

**Frontend still showing localhost error:**
- Make sure you added `REACT_APP_API_URL` to Vercel
- Make sure you redeployed the frontend after adding the variable
- Clear browser cache and try again

### Keep Service Awake (Optional)
To avoid cold starts, use a service like:
- UptimeRobot (https://uptimerobot.com) - Free
- Cron-job.org (https://cron-job.org) - Free

Set it to ping your API every 10 minutes:
- URL: `https://your-api.onrender.com/api/health`
- Interval: 10 minutes

## Alternative: Deploy to Railway

If you prefer Railway over Render:

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add same environment variables
6. Get Railway URL and update Vercel

Railway offers $5 free credit per month (no cold starts).

## Quick Test Locally

Before deploying, test locally:

```bash
# Terminal 1 - Start API
cd api
npm install
npm start

# Terminal 2 - Start Frontend
npm install
npm start
```

Visit: http://localhost:3000
