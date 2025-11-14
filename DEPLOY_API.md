# 🚀 Deploy API to Vercel

Your frontend is already deployed at: https://turkish-restaurant-app.vercel.app

Now let's deploy the API so they can communicate!

## Option 1: Deploy API to Vercel (Recommended - Same Platform)

### Step 1: Create vercel.json for API

The file is already created at `api/vercel.json`:

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

### Step 2: Deploy API to Vercel

```bash
cd api
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **turkish-restaurant-api**
- Directory? **./api** (or just press Enter)
- Override settings? **N**

### Step 3: Set Environment Variables in Vercel

After deployment, go to your API project in Vercel dashboard:

1. Go to: https://vercel.com/dashboard
2. Select **turkish-restaurant-api** project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
PORT = 3001
NODE_ENV = production
FRONTEND_URL = https://turkish-restaurant-app.vercel.app
FIREBASE_PROJECT_ID = restaurant-app-54ff6
```

For Firestore (if enabled):
```
GOOGLE_APPLICATION_CREDENTIALS = (paste service account JSON content)
```

Or use:
```
FIREBASE_SERVICE_ACCOUNT = {"type":"service_account","project_id":"restaurant-app-54ff6",...}
```

### Step 4: Get Your API URL

After deployment, Vercel will give you a URL like:
```
https://turkish-restaurant-api.vercel.app
```

### Step 5: Update Frontend Environment Variable

1. Go to your frontend project: https://vercel.com/dashboard
2. Select **turkish-restaurant-app**
3. Go to **Settings** → **Environment Variables**
4. Add or update:

```
REACT_APP_API_URL = https://turkish-restaurant-api.vercel.app/api
```

### Step 6: Redeploy Frontend

```bash
# In restaurant-website directory
vercel --prod
```

Or trigger a redeploy from Vercel dashboard.

---

## Option 2: Deploy API to Render (Alternative)

### Step 1: Create Render Account

1. Go to: https://render.com/
2. Sign up with GitHub

### Step 2: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `turkish-restaurant-api`
   - **Root Directory**: `api`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Add Environment Variables

```
PORT = 3001
NODE_ENV = production
FRONTEND_URL = https://turkish-restaurant-app.vercel.app
FIREBASE_PROJECT_ID = restaurant-app-54ff6
```

### Step 4: Deploy

Render will automatically deploy. You'll get a URL like:
```
https://turkish-restaurant-api.onrender.com
```

### Step 5: Update Frontend

In Vercel dashboard, update:
```
REACT_APP_API_URL = https://turkish-restaurant-api.onrender.com/api
```

---

## Option 3: Use Vercel Serverless Functions (Advanced)

Convert your API to Vercel serverless functions. This keeps everything in one project.

### Step 1: Create api folder in root

```
restaurant-website/
├── api/
│   └── [...all routes].js
```

### Step 2: Convert routes to serverless functions

Each route becomes a file in `api/` folder.

Example `api/health.js`:
```javascript
module.exports = (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Restaurant API is running',
    timestamp: new Date().toISOString()
  });
};
```

---

## 🎯 Recommended Setup

**For Production:**
- Frontend: Vercel (already done ✅)
- API: Vercel or Render
- Database: Firestore

**Current Status:**
- Frontend: ✅ https://turkish-restaurant-app.vercel.app
- API: ⏳ Needs deployment
- Database: ⏳ Firestore (optional)

---

## 🔧 Quick Commands

### Deploy API to Vercel:
```bash
cd api
vercel
```

### Deploy Frontend to Vercel:
```bash
vercel --prod
```

### Check Deployments:
```bash
vercel ls
```

---

## 📝 After Deployment Checklist

- [ ] API deployed and running
- [ ] Environment variables set in API
- [ ] Frontend environment variable updated with API URL
- [ ] Frontend redeployed
- [ ] CORS configured (FRONTEND_URL set)
- [ ] Test: Create order on mobile
- [ ] Test: View order on desktop
- [ ] ✅ Cross-device orders working!

---

## 🆘 Troubleshooting

### CORS Errors

Make sure `FRONTEND_URL` in API matches your Vercel frontend URL exactly:
```
FRONTEND_URL=https://turkish-restaurant-app.vercel.app
```

### API Not Responding

Check:
1. API is deployed and running
2. Environment variables are set
3. Frontend has correct API URL

### Orders Not Syncing

Verify:
1. API URL is correct in frontend
2. Firestore is configured (or using in-memory)
3. Both frontend and API are using same database

---

**Next Step**: Deploy your API using Option 1 (Vercel) for easiest setup! 🚀
