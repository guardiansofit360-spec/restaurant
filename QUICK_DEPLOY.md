# ⚡ Quick Deploy - 10 Minutes

## 🚀 Deploy Your API Backend in 3 Steps

---

## Step 1: Create Render Account (2 min)

1. Go to: **https://render.com/**
2. Click **"Get Started for Free"**
3. Sign up with **GitHub**
4. ✅ Done!

---

## Step 2: Create Database (3 min)

1. In Render Dashboard: **"New +"** → **"PostgreSQL"**
2. Settings:
   - Name: `restaurant-db`
   - Plan: **Free**
3. Click **"Create Database"**
4. **Copy the "Internal Database URL"** (you'll need this!)
5. ✅ Database created!

---

## Step 3: Deploy API (5 min)

1. In Render Dashboard: **"New +"** → **"Web Service"**
2. Connect repository: `guardiansofit360-spec/turkish-restaurant-app`
3. Settings:
   - Name: `restaurant-api`
   - Root Directory: `api`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: **Free**

4. **Add Environment Variables:**
   ```
   PORT = 3001
   NODE_ENV = production
   FRONTEND_URL = https://your-vercel-app.vercel.app
   DATABASE_URL = [Paste Internal Database URL from Step 2]
   ```

5. Click **"Create Web Service"**
6. Wait 3-5 minutes for deployment
7. ✅ API deployed!

---

## Step 4: Initialize Database (1 min)

1. In your Web Service, click **"Shell"** tab
2. Run:
   ```bash
   node init-db.js
   ```
3. You should see: "✅ Database initialized successfully!"
4. ✅ Database ready!

---

## Step 5: Test Your API (1 min)

1. Copy your API URL (e.g., `https://restaurant-api.onrender.com`)
2. Visit in browser:
   ```
   https://restaurant-api.onrender.com/api/health
   ```
3. Should see:
   ```json
   {"status":"OK","message":"Restaurant API is running"}
   ```
4. ✅ API working!

---

## Step 6: Update Frontend (2 min)

1. Go to **Vercel Dashboard**
2. Your project → **Settings** → **Environment Variables**
3. Update `REACT_APP_API_URL`:
   ```
   REACT_APP_API_URL = https://restaurant-api.onrender.com/api
   ```
4. **Redeploy** your frontend
5. ✅ Connected!

---

## 🎉 Done!

Your API is now live and orders will sync across all devices!

**Total Time**: ~10-15 minutes

---

## 📝 Your URLs

After deployment, save these:

```
API URL: https://restaurant-api.onrender.com
Database: restaurant-db (on Render)
Frontend: https://your-app.vercel.app
```

---

## 🧪 Quick Test

1. Open your app on mobile
2. Login and create an order
3. Open your app on desktop
4. Login as admin
5. ✅ See the order from mobile!

---

## 🆘 Troubleshooting

**API not working?**
- Check Render logs for errors
- Verify DATABASE_URL is set
- Ensure init-db.js ran successfully

**Orders not syncing?**
- Verify REACT_APP_API_URL in Vercel
- Check API health endpoint
- Redeploy frontend after changing env vars

**Database connection failed?**
- Copy the correct Internal Database URL
- Paste it exactly in DATABASE_URL
- Redeploy API service

---

## 📚 Full Guide

For detailed instructions, see: `API_DEPLOYMENT_GUIDE.md`

---

**Repository**: https://github.com/guardiansofit360-spec/turkish-restaurant-app

**Ready to deploy!** 🚀
