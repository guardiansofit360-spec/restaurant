# Simple Deployment Guide (No Database Required!)

Your app now uses JSON files for storage - no database needed!

## Deploy Backend to Railway (Free)

### 1. Sign Up
- Go to https://railway.app
- Sign up with GitHub

### 2. Deploy
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `guardiansofit360-spec/turkish-restaurant-app`
4. Railway will auto-detect and deploy

### 3. Configure Environment Variables
In Railway project settings, add:
- `PORT` = `3001`
- `NODE_ENV` = `production`
- `FRONTEND_URL` = `https://turkish-restaurant-app.vercel.app`

### 4. Get Your API URL
- Click "Settings" → "Networking"
- Click "Generate Domain"
- Copy the URL (e.g., `https://your-app.up.railway.app`)

### 5. Update Vercel
1. Go to https://vercel.com → Your Project
2. Settings → Environment Variables
3. Add: `REACT_APP_API_URL` = `https://your-app.up.railway.app/api`
4. Go to Deployments → Click "..." → Redeploy

### 6. Test
Visit: `https://your-app.up.railway.app/api/health`

Should see:
```json
{
  "status": "OK",
  "message": "Restaurant API is running",
  "timestamp": "..."
}
```

## Alternative: Deploy to Render

### 1. Sign Up
- Go to https://render.com
- Sign up with GitHub

### 2. Deploy
1. Click "New +" → "Web Service"
2. Connect your GitHub repo
3. Configure:
   - **Root Directory**: `api`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

### 3. Environment Variables
- `PORT` = `3001`
- `NODE_ENV` = `production`
- `FRONTEND_URL` = `https://turkish-restaurant-app.vercel.app`

### 4. Get URL and Update Vercel
Same as Railway steps 4-6

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
