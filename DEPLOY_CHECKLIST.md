# 🚀 Deployment Checklist

Use this checklist to deploy your restaurant app step by step.

## Pre-Deployment

### Local Testing
- [ ] Run `npm install` in root directory
- [ ] Run `npm install` in api directory
- [ ] Test frontend: `npm start` (should open on localhost:3000)
- [ ] Test backend: `cd api && node server.js` (should run on localhost:3001)
- [ ] Test build: `npm run build` (should complete without errors)
- [ ] Check all pages work locally
- [ ] Test user registration and login
- [ ] Test order placement
- [ ] Test admin panel

### Code Preparation
- [ ] All sensitive data in `.env` files
- [ ] `.env` files listed in `.gitignore`
- [ ] No hardcoded API URLs in code
- [ ] All console.logs removed or minimal
- [ ] Error handling in place
- [ ] Loading states implemented

### Git & GitHub
- [ ] Code committed to Git
- [ ] Pushed to GitHub repository
- [ ] Repository is accessible
- [ ] README.md is up to date

---

## Backend Deployment (Railway)

### Step 1: Create Railway Account
- [ ] Go to https://railway.app
- [ ] Sign up with GitHub
- [ ] Verify email

### Step 2: Create New Project
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Choose your repository
- [ ] Wait for detection

### Step 3: Add MySQL Database
- [ ] Click "New" → "Database" → "Add MySQL"
- [ ] Wait for database to provision
- [ ] Note down connection details

### Step 4: Configure Service
- [ ] Click on your service
- [ ] Settings → Root Directory: `api`
- [ ] Settings → Start Command: `node server.js`
- [ ] Settings → Build Command: `npm install`

### Step 5: Set Environment Variables
Add these in Railway dashboard:

```
DB_HOST=<from Railway MySQL Variables>
DB_USER=<from Railway MySQL Variables>
DB_PASSWORD=<from Railway MySQL Variables>
DB_NAME=<from Railway MySQL Variables>
DB_PORT=<from Railway MySQL Variables>
JWT_SECRET=<generate-random-string-here>
PORT=3001
NODE_ENV=production
FRONTEND_URL=<will add after Vercel deployment>
```

### Step 6: Import Database
- [ ] Click MySQL service → Data tab
- [ ] Run schema: Copy from `api/config/schema.sql`
- [ ] Run sample data: Copy from `api/config/sample_data.sql`
- [ ] Verify tables created

### Step 7: Deploy & Test
- [ ] Click "Deploy"
- [ ] Wait for deployment
- [ ] Copy your Railway URL
- [ ] Test: `https://your-app.railway.app/api/health`
- [ ] Should return: `{"status":"OK"}`

---

## Frontend Deployment (Vercel)

### Step 1: Create Vercel Account
- [ ] Go to https://vercel.com
- [ ] Sign up with GitHub
- [ ] Authorize Vercel

### Step 2: Import Project
- [ ] Click "Add New..." → "Project"
- [ ] Find your repository
- [ ] Click "Import"

### Step 3: Configure Build
- [ ] Framework: Create React App (auto-detected)
- [ ] Root Directory: `./`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `build`
- [ ] Install Command: `npm install`

### Step 4: Add Environment Variable
- [ ] Name: `REACT_APP_API_URL`
- [ ] Value: `https://your-app.railway.app` (from Railway)
- [ ] Apply to: Production, Preview, Development

### Step 5: Deploy
- [ ] Click "Deploy"
- [ ] Wait 2-3 minutes
- [ ] Copy your Vercel URL

### Step 6: Update Backend CORS
- [ ] Go back to Railway
- [ ] Add environment variable:
  - Name: `FRONTEND_URL`
  - Value: `https://your-app.vercel.app`
- [ ] Redeploy backend

---

## Post-Deployment Testing

### Frontend Tests
- [ ] Visit your Vercel URL
- [ ] Homepage loads correctly
- [ ] Menu page displays items
- [ ] Images load properly
- [ ] Navigation works
- [ ] Responsive on mobile

### Backend Tests
- [ ] API health check works
- [ ] User registration works
- [ ] User login works
- [ ] Menu items load from database
- [ ] Orders can be placed
- [ ] Admin panel accessible

### Integration Tests
- [ ] Register new user
- [ ] Login with new user
- [ ] Add items to cart
- [ ] Place an order
- [ ] Check order in admin panel
- [ ] Update order status
- [ ] Verify order updates in user profile

### Browser Tests
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## Optional: Custom Domain

### Buy Domain
- [ ] Purchase from Namecheap/GoDaddy
- [ ] Example: `turkishrestaurant.com`

### Configure Vercel Domain
- [ ] Vercel → Settings → Domains
- [ ] Add your domain
- [ ] Follow DNS instructions
- [ ] Wait for DNS propagation (10-30 mins)

### Configure Railway Domain (Optional)
- [ ] Railway → Settings → Domains
- [ ] Add custom domain for API
- [ ] Update DNS CNAME record
- [ ] Update FRONTEND_URL in Railway
- [ ] Update REACT_APP_API_URL in Vercel

---

## Monitoring Setup

### Vercel Analytics
- [ ] Enable in Vercel dashboard
- [ ] Check visitor stats
- [ ] Monitor performance

### Railway Logs
- [ ] Check deployment logs
- [ ] Monitor error logs
- [ ] Set up alerts

### Error Tracking (Optional)
- [ ] Sign up for Sentry.io
- [ ] Add to frontend
- [ ] Add to backend
- [ ] Configure alerts

---

## Security Checklist

- [ ] All `.env` files in `.gitignore`
- [ ] No API keys in code
- [ ] Strong JWT_SECRET (32+ characters)
- [ ] HTTPS enabled (automatic)
- [ ] CORS configured correctly
- [ ] SQL injection protection (using parameterized queries)
- [ ] Password hashing enabled
- [ ] Rate limiting considered

---

## Performance Optimization

- [ ] Images optimized (compressed)
- [ ] Lazy loading implemented
- [ ] Database indexes added
- [ ] API responses cached where appropriate
- [ ] Build size under 2MB
- [ ] Lighthouse score > 80

---

## Documentation

- [ ] README.md updated with live URLs
- [ ] API documentation complete
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] Troubleshooting guide available

---

## Launch Preparation

### Before Going Live
- [ ] Test all features thoroughly
- [ ] Fix any bugs found
- [ ] Optimize performance
- [ ] Add privacy policy page
- [ ] Add terms of service page
- [ ] Set up contact email
- [ ] Prepare social media accounts

### Marketing Materials
- [ ] Screenshots of app
- [ ] Demo video
- [ ] Feature list
- [ ] Pricing information
- [ ] Contact information

---

## Success Metrics

### Week 1
- [ ] Monitor error rates
- [ ] Check page load times
- [ ] Gather user feedback
- [ ] Fix critical bugs

### Month 1
- [ ] Track user registrations
- [ ] Monitor order volume
- [ ] Analyze popular menu items
- [ ] Review performance metrics

---

## Troubleshooting

### Build Fails
**Problem**: Vercel build fails  
**Solution**: Run `npm run build` locally, fix errors, push again

### API Not Connecting
**Problem**: Frontend can't reach backend  
**Solution**: Check REACT_APP_API_URL in Vercel, verify Railway is running

### Database Connection Error
**Problem**: Backend can't connect to MySQL  
**Solution**: Verify DB credentials in Railway, check MySQL service is running

### CORS Error
**Problem**: Browser blocks API requests  
**Solution**: Update FRONTEND_URL in Railway, redeploy backend

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **React Docs**: https://react.dev
- **Express Docs**: https://expressjs.com
- **MySQL Docs**: https://dev.mysql.com/doc

---

## 🎉 Congratulations!

Your restaurant app is now live in production!

**Your URLs:**
- Frontend: https://your-app.vercel.app
- Backend: https://your-app.railway.app
- Admin: https://your-app.vercel.app/admin

Share with the world and start taking orders! 🍕

---

## Next Steps

1. Set up payment processing (Stripe/PayPal)
2. Add email notifications
3. Implement SMS alerts
4. Create mobile app
5. Add delivery tracking
6. Implement loyalty program
7. Set up analytics
8. Add customer reviews
9. Create marketing campaigns
10. Scale as you grow!

Need help? Check the documentation or ask for assistance! 🚀
