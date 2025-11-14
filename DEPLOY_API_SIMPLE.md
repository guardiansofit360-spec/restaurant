# 🚀 Deploy API to Vercel - Super Simple Guide

## Method 1: Deploy via Vercel Dashboard (Easiest - No Commands!)

### Step 1: Go to Vercel Dashboard

1. Open: https://vercel.com/
2. Click **"Login"** (use same account as your frontend)
3. You'll see your dashboard

### Step 2: Import Your API Project

1. Click **"Add New..."** button (top right)
2. Select **"Project"**
3. You'll see "Import Git Repository"
4. Find your repository: **turkish-restaurant-app**
5. Click **"Import"**

### Step 3: Configure the Project

**Important Settings:**

1. **Project Name**: 
   - Change to: `turkish-restaurant-api`
   - (This makes it different from your frontend)

2. **Root Directory**:
   - Click **"Edit"** next to Root Directory
   - Type: `api`
   - Click **"Continue"**

3. **Framework Preset**:
   - Select: **"Other"**

4. **Build Settings**:
   - Build Command: Leave empty or use `npm install`
   - Output Directory: Leave empty
   - Install Command: `npm install`

5. Click **"Deploy"**

### Step 4: Wait for Deployment (2-3 minutes)

You'll see:
- Building...
- Deploying...
- ✅ Success!

Your API URL will be something like:
```
https://turkish-restaurant-api.vercel.app
```

**Copy this URL!** You'll need it.

### Step 5: Add Environment Variables

1. In your API project dashboard, click **"Settings"** (top menu)
2. Click **"Environment Variables"** (left sidebar)
3. Add these variables one by one:

**Variable 1:**
- Key: `PORT`
- Value: `3001`
- Click "Add"

**Variable 2:**
- Key: `NODE_ENV`
- Value: `production`
- Click "Add"

**Variable 3:**
- Key: `FRONTEND_URL`
- Value: `https://turkish-restaurant-app.vercel.app`
- Click "Add"

**Variable 4:**
- Key: `FIREBASE_PROJECT_ID`
- Value: `restaurant-app-54ff6`
- Click "Add"

### Step 6: Redeploy

1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait for it to finish

### Step 7: Test Your API

Open in browser:
```
https://turkish-restaurant-api.vercel.app/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Restaurant API is running",
  "database": "In-Memory",
  "timestamp": "2024-..."
}
```

✅ **API is working!**

### Step 8: Update Frontend to Use API

1. Go back to Vercel dashboard
2. Click on your **frontend project** (turkish-restaurant-app)
3. Go to **"Settings"** → **"Environment Variables"**
4. Add or update:

- Key: `REACT_APP_API_URL`
- Value: `https://turkish-restaurant-api.vercel.app/api`
- Click "Add"

### Step 9: Redeploy Frontend

1. Go to **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for completion

### Step 10: Test Everything!

1. Open: https://turkish-restaurant-app.vercel.app
2. Login as customer
3. Add items to cart
4. Place order
5. Open on another device/browser
6. Login as admin
7. ✅ See the order!

---

## Method 2: Deploy via Command Line (If you prefer terminal)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Enter your email and verify.

### Step 3: Deploy API

```bash
cd restaurant-website/api
vercel
```

**Answer the prompts:**

```
? Set up and deploy "~/restaurant-website/api"? Y
? Which scope? [Select your account]
? Link to existing project? N
? What's your project's name? turkish-restaurant-api
? In which directory is your code located? ./
? Want to override the settings? N
```

Wait for deployment...

You'll get a URL like:
```
https://turkish-restaurant-api-xxx.vercel.app
```

### Step 4: Set Environment Variables

```bash
vercel env add PORT
# Enter: 3001

vercel env add NODE_ENV
# Enter: production

vercel env add FRONTEND_URL
# Enter: https://turkish-restaurant-app.vercel.app

vercel env add FIREBASE_PROJECT_ID
# Enter: restaurant-app-54ff6
```

### Step 5: Deploy to Production

```bash
vercel --prod
```

Your production URL:
```
https://turkish-restaurant-api.vercel.app
```

### Step 6: Update Frontend

Go to your frontend project in Vercel dashboard and add:
```
REACT_APP_API_URL=https://turkish-restaurant-api.vercel.app/api
```

Then redeploy frontend.

---

## 🎯 Quick Checklist

After deployment, verify:

- [ ] API URL works: `https://your-api.vercel.app/api/health`
- [ ] Returns JSON with "status": "OK"
- [ ] Frontend environment variable updated
- [ ] Frontend redeployed
- [ ] Can create order on frontend
- [ ] Order appears in admin panel
- [ ] ✅ Everything working!

---

## 🆘 Common Issues

### Issue: "404 Not Found"

**Solution**: 
- Check Root Directory is set to `api`
- Redeploy after setting environment variables

### Issue: "CORS Error"

**Solution**:
- Verify `FRONTEND_URL` matches your frontend URL exactly
- Include `https://` in the URL
- Redeploy API after adding variable

### Issue: "Module not found"

**Solution**:
- Make sure `package.json` is in the `api` folder
- Redeploy

### Issue: "Orders not syncing"

**Solution**:
- Check frontend has correct `REACT_APP_API_URL`
- Redeploy frontend after updating
- Clear browser cache

---

## 📝 Summary

**What you did:**
1. ✅ Deployed API to Vercel
2. ✅ Set environment variables
3. ✅ Connected frontend to API
4. ✅ Tested everything

**Your URLs:**
- Frontend: https://turkish-restaurant-app.vercel.app
- API: https://turkish-restaurant-api.vercel.app

**Result:**
- ✅ Orders sync across devices
- ✅ Data persists (with Firestore)
- ✅ Production ready!

---

## 🎉 You're Done!

Your restaurant app is now fully deployed and working!

**Need help?** The issue is usually:
1. Root Directory not set to `api`
2. Environment variables not added
3. Frontend not redeployed after API URL update

Double-check these three things and you're good! 🚀
