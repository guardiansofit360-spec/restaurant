# Deploy API to Vercel

Your restaurant app needs TWO deployments on Vercel:
1. **Frontend** (React app) - Already deployed
2. **Backend API** (Node.js) - Need to deploy

## Quick Deploy (5 minutes)

### Step 1: Deploy API to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI if you haven't
npm install -g vercel

# Navigate to API folder
cd api

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? restaurant-api (or any name)
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. **Important**: Set root directory to `api`
4. Click "Deploy"

### Step 2: Get Your API URL

After deployment, Vercel will give you a URL like:
```
https://restaurant-api-xyz123.vercel.app
```

### Step 3: Update Frontend Environment Variable

1. Go to your **frontend** Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add new variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://restaurant-api-xyz123.vercel.app/api`
4. Click **Save**

### Step 4: Redeploy Frontend

```bash
# Trigger a new deployment
git commit --allow-empty -m "Update API URL"
git push
```

Or in Vercel dashboard: **Deployments** → **Redeploy**

## Architecture

```
┌─────────────────────────────────────────┐
│  Frontend (Vercel)                      │
│  https://your-app.vercel.app            │
│  - React App                            │
│  - Serves UI                            │
└──────────────┬──────────────────────────┘
               │ HTTP Requests
               ↓
┌─────────────────────────────────────────┐
│  Backend API (Vercel)                   │
│  https://restaurant-api.vercel.app      │
│  - Node.js Express                      │
│  - JSON file storage                    │
└─────────────────────────────────────────┘
```

## Important Notes

### JSON File Storage on Vercel

⚠️ **Vercel serverless functions are stateless!**

This means:
- JSON files are **read-only** in production
- Data **won't persist** between requests
- Orders will be **lost** after function timeout

### Solutions:

#### Option 1: Use Vercel KV (Recommended)
```bash
# Install Vercel KV
npm install @vercel/kv

# Update server.js to use KV instead of JSON files
```

#### Option 2: Use Firebase Firestore
- We already set this up!
- Just enable Firestore in Firebase Console
- Orders will persist in cloud database

#### Option 3: Deploy API to Railway/Render
- These platforms support persistent file storage
- See below for instructions

## Alternative: Deploy API to Railway

Railway supports persistent file storage!

### Step 1: Create Railway Account
Go to https://railway.app and sign up

### Step 2: Deploy from GitHub

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository
4. Set **Root Directory**: `/api`
5. Click **"Deploy"**

### Step 3: Get Railway URL

Railway will give you a URL like:
```
https://restaurant-api-production.up.railway.app
```

### Step 4: Update Frontend

Add to Vercel environment variables:
```
REACT_APP_API_URL=https://restaurant-api-production.up.railway.app/api
```

## Alternative: Deploy API to Render

### Step 1: Create Render Account
Go to https://render.com and sign up

### Step 2: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Settings:
   - **Name**: restaurant-api
   - **Root Directory**: api
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Click **"Create Web Service"**

### Step 3: Get Render URL

Render will give you a URL like:
```
https://restaurant-api.onrender.com
```

### Step 4: Update Frontend

Add to Vercel environment variables:
```
REACT_APP_API_URL=https://restaurant-api.onrender.com/api
```

## Recommended Setup for Production

### For Demo/Testing:
- ✅ Use Firebase Firestore (already set up)
- ✅ No API deployment needed
- ✅ Free tier available

### For Production with JSON Storage:
- ✅ Deploy API to Railway or Render
- ✅ Persistent file storage
- ✅ Real-time data sync

### For Scalable Production:
- ✅ Use Firebase Firestore
- ✅ Or migrate to PostgreSQL/MongoDB
- ✅ Deploy API to Vercel with database

## Testing Your Deployment

### 1. Test API Health
```bash
curl https://your-api-url.vercel.app/api/health
```

Should return:
```json
{"status":"OK","message":"Restaurant API is running"}
```

### 2. Test Frontend Connection

1. Open your frontend: https://your-app.vercel.app
2. Place an order as customer
3. Check admin panel
4. Order should appear!

## Troubleshooting

### API not responding?
- Check Vercel function logs
- Verify API URL in environment variables
- Check CORS settings

### Orders not persisting?
- Vercel serverless functions don't support file writes
- Use Firebase Firestore or Railway instead

### CORS errors?
- Make sure API has CORS enabled
- Check API URL is correct in frontend

## Summary

**Two Options:**

1. **Easy**: Enable Firebase Firestore (no API deployment needed)
2. **JSON Storage**: Deploy API to Railway/Render for persistent files

Choose based on your needs! 🚀
