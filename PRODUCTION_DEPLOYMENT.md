# 🚀 Production Deployment Guide

Complete guide to deploy your Turkish Restaurant App to production.

## Architecture Overview

Your app has two parts:
1. **Frontend (React)** → Deploy to Vercel (Free)
2. **Backend (Node.js + MySQL)** → Deploy to Railway/Render/DigitalOcean

---

## Option 1: Quick Deploy (Recommended)

### Frontend to Vercel + Backend to Railway

**Total Time**: 15 minutes  
**Cost**: Free tier available

---

## Part A: Deploy Frontend to Vercel

### Step 1: Test Build Locally

```bash
cd restaurant-website
npm install
npm run build
```

Make sure it builds successfully!

### Step 2: Push to GitHub (if not done)

```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### Step 3: Deploy to Vercel

1. Go to https://vercel.com/signup
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select your repository: `turkish-restaurant-app`
5. Click "Import"

**Configuration:**
- Framework Preset: Create React App
- Root Directory: `./`
- Build Command: `npm run build`
- Output Directory: `build`

6. Click "Deploy"

### Step 4: Add Environment Variables (After Backend is Ready)

In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add: `REACT_APP_API_URL` = `https://your-backend-url.railway.app`

---

## Part B: Deploy Backend to Railway

### Step 1: Sign Up for Railway


1. Go to https://railway.app
2. Click "Login with GitHub"
3. Authorize Railway

### Step 2: Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Railway will detect Node.js automatically

### Step 3: Configure Backend

1. Click on your service
2. Go to "Settings"
3. Set Root Directory: `api`
4. Set Start Command: `node server.js`

### Step 4: Add MySQL Database

1. Click "New" → "Database" → "Add MySQL"
2. Railway creates a MySQL instance automatically
3. Copy the connection details

### Step 5: Set Environment Variables

In Railway dashboard, add these variables:

```
DB_HOST=<from Railway MySQL>
DB_USER=<from Railway MySQL>
DB_PASSWORD=<from Railway MySQL>
DB_NAME=<from Railway MySQL>
DB_PORT=<from Railway MySQL>
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=3001
NODE_ENV=production
```

### Step 6: Import Database Schema

1. Click on MySQL service
2. Go to "Data" tab
3. Click "Query"
4. Copy content from `api/config/schema.sql`
5. Run the query
6. Then run `api/config/sample_data.sql`

### Step 7: Deploy

Railway automatically deploys! Your backend URL will be:
`https://your-app-name.railway.app`

---

## Part C: Connect Frontend to Backend

### Update Frontend Environment Variable

1. Go to Vercel dashboard
2. Settings → Environment Variables
3. Add/Update:
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.railway.app`
4. Redeploy frontend

---

## Option 2: Alternative Hosting Options

### Backend Alternatives

**Render.com** (Free tier)
- Similar to Railway
- Free MySQL database
- Easy deployment

**DigitalOcean App Platform** ($5/month)
- More reliable
- Better performance
- Includes database

**Heroku** (No longer free)
- $7/month minimum
- Reliable platform

### Frontend Alternatives

**Netlify** (Free)
- Similar to Vercel
- Easy deployment
- Great performance

**GitHub Pages** (Free)
- Good for static sites
- Limited features

---

## Part D: Post-Deployment Checklist

### Test Everything

- [ ] Visit your Vercel URL
- [ ] Test user registration
- [ ] Test login
- [ ] Test menu browsing
- [ ] Test cart functionality
- [ ] Test order placement
- [ ] Test admin panel
- [ ] Test on mobile device

### Security

- [ ] All `.env` files in `.gitignore`
- [ ] Strong JWT_SECRET set
- [ ] CORS configured correctly
- [ ] HTTPS enabled (automatic on Vercel/Railway)

### Performance

- [ ] Images optimized
- [ ] Build size reasonable
- [ ] API responses fast
- [ ] Database indexed properly

---

## Part E: Custom Domain (Optional)

### For Frontend (Vercel)

1. Buy domain from Namecheap/GoDaddy
2. In Vercel: Settings → Domains
3. Add your domain
4. Update DNS records as shown

### For Backend (Railway)

1. In Railway: Settings → Domains
2. Add custom domain
3. Update DNS with CNAME record

---

## Monitoring & Maintenance

### Vercel Dashboard

- View deployment logs
- Monitor performance
- Check analytics
- View error logs

### Railway Dashboard

- Monitor database usage
- Check API logs
- View resource usage
- Set up alerts

---

## Troubleshooting

### Build Fails on Vercel

**Error**: Module not found

**Solution**:
```bash
# Test locally first
npm install
npm run build
```

### Backend Connection Issues

**Error**: Cannot connect to database

**Solution**:
1. Check environment variables
2. Verify database is running
3. Check connection string format
4. Review Railway logs

### CORS Errors

**Error**: Access blocked by CORS

**Solution**: Update `api/server.js`:
```javascript
app.use(cors({
  origin: 'https://your-vercel-app.vercel.app',
  credentials: true
}));
```

---

## Costs Summary

### Free Tier (Perfect for Starting)

**Vercel**: Free
- Unlimited deployments
- 100GB bandwidth/month
- Custom domain
- HTTPS included

**Railway**: Free
- $5 credit/month
- Enough for small apps
- MySQL included

**Total**: $0/month (with Railway free tier)

### Paid Tier (For Growth)

**Vercel Pro**: $20/month
**Railway**: ~$10-20/month
**Total**: $30-40/month

---

## Quick Commands Reference

### Local Development
```bash
# Frontend
npm start

# Backend
cd api
npm start
```

### Deployment
```bash
# Push to GitHub (auto-deploys)
git add .
git commit -m "Update"
git push
```

### Database
```bash
# Connect to Railway MySQL
railway connect mysql

# Run migrations
node api/scripts/migrate.js
```

---

## Success! 🎉

Your restaurant app is now live!

**Frontend URL**: https://your-app.vercel.app  
**Backend URL**: https://your-app.railway.app  
**Admin Panel**: https://your-app.vercel.app/admin

Share with customers and start taking orders!

---

## Next Steps

1. **Set up monitoring** - Track errors and performance
2. **Add payment gateway** - Stripe or PayPal integration
3. **Email notifications** - Order confirmations
4. **SMS alerts** - Real-time order updates
5. **Analytics** - Google Analytics integration
6. **SEO optimization** - Improve search rankings
7. **Mobile app** - React Native version

Need help with any of these? Just ask! 🚀
