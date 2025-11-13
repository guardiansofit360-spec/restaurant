# Complete Vercel Deployment Guide

## Prerequisites

- ✅ GitHub account (free)
- ✅ Vercel account (free) - https://vercel.com
- ✅ Your restaurant app ready
- ✅ Google OAuth Client ID (from Google Cloud Console)

---

## Part 1: Prepare Your App for Deployment

### Step 1.1: Create vercel.json Configuration

Create a file `vercel.json` in your project root with:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Step 1.2: Update package.json

Add this to your `package.json` scripts:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "vercel-build": "react-scripts build"
}
```

### Step 1.3: Test Build Locally

```bash
npm run build
```

Make sure it builds without errors!

---

## Part 2: Push to GitHub

### Step 2.1: Initialize Git (if not already done)

```bash
cd restaurant-website
git init
```

### Step 2.2: Create .gitignore

Make sure `.gitignore` includes:

```
node_modules/
build/
.env
.env.local
.DS_Store
```

### Step 2.3: Commit Your Code

```bash
git add .
git commit -m "Initial commit - Restaurant app ready for deployment"
```

### Step 2.4: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `turkish-restaurant-app`
3. Description: "Turkish Restaurant Online Ordering System"
4. Choose: Public or Private
5. **DON'T** initialize with README (you already have one)
6. Click "Create repository"

### Step 2.5: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/turkish-restaurant-app.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Part 3: Deploy to Vercel

### Step 3.1: Sign Up for Vercel

1. Go to https://vercel.com/signup
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub

### Step 3.2: Import Your Project

1. Click "Add New..." → "Project"
2. Find your repository: `turkish-restaurant-app`
3. Click "Import"

### Step 3.3: Configure Project Settings

**Framework Preset**: Create React App (auto-detected)

**Root Directory**: `./` (leave as is)

**Build Command**: `npm run build`

**Output Directory**: `build`

**Install Command**: `npm install`

### Step 3.4: Add Environment Variables

Click "Environment Variables" and add:

```
Name: REACT_APP_GOOGLE_CLIENT_ID
Value: 749572594280-kl6eg7aie0vtvh0b7avq80cnadh5gc7s.apps.googleusercontent.com
```

⚠️ **Important**: Use your actual Client ID!

### Step 3.5: Deploy

Click "Deploy" button!

Wait 2-3 minutes for deployment to complete.

---

## Part 4: Configure Google OAuth for Production

### Step 4.1: Get Your Vercel URL

After deployment, you'll get a URL like:
```
https://turkish-restaurant-app.vercel.app
```

Copy this URL!

### Step 4.2: Update Google Cloud Console

1. Go to https://console.cloud.google.com/apis/credentials
2. Click on your OAuth 2.0 Client ID
3. Add to **Authorized JavaScript origins**:
   - `https://turkish-restaurant-app.vercel.app`
   - `https://turkish-restaurant-app-git-main-yourname.vercel.app`
   - `https://turkish-restaurant-app-yourname.vercel.app`

4. Add to **Authorized redirect URIs**:
   - `https://turkish-restaurant-app.vercel.app`
   - `https://turkish-restaurant-app-git-main-yourname.vercel.app`
   - `https://turkish-restaurant-app-yourname.vercel.app`

5. Click "SAVE"

### Step 4.3: Test Your Live App

1. Visit your Vercel URL
2. Go to Login page
3. Click "Continue with Google"
4. ✅ Should work!

---

## Part 5: Custom Domain (Optional)

### Step 5.1: Buy a Domain

Buy from:
- Namecheap: https://www.namecheap.com
- GoDaddy: https://www.godaddy.com
- Google Domains: https://domains.google

Example: `turkishrestaurant.com`

### Step 5.2: Add Domain to Vercel

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Enter your domain: `turkishrestaurant.com`
4. Click "Add"

### Step 5.3: Configure DNS

Vercel will show you DNS records to add:

**For Namecheap/GoDaddy:**
1. Go to your domain's DNS settings
2. Add these records:

```
Type: A
Host: @
Value: 76.76.21.21

Type: CNAME
Host: www
Value: cname.vercel-dns.com
```

### Step 5.4: Wait for DNS Propagation

- Takes 5 minutes to 48 hours
- Usually works in 10-30 minutes
- Check status: https://dnschecker.org

### Step 5.5: Update Google OAuth Again

Add your custom domain to Google Cloud Console:
- `https://turkishrestaurant.com`
- `https://www.turkishrestaurant.com`

---

## Part 6: Continuous Deployment

### Automatic Deployments

Every time you push to GitHub, Vercel automatically deploys!

```bash
# Make changes to your code
git add .
git commit -m "Added new feature"
git push

# Vercel automatically deploys! 🚀
```

### Preview Deployments

- Every branch gets its own preview URL
- Perfect for testing before going live
- Share preview links with team

---

## Part 7: Vercel Dashboard Features

### Analytics

- View page views
- See user locations
- Track performance

### Logs

- Real-time logs
- Error tracking
- Debug issues

### Environment Variables

- Add/edit variables
- Different values for production/preview
- Secure storage

---

## Troubleshooting

### Build Fails

**Error**: `npm ERR! code ELIFECYCLE`

**Solution**:
```bash
# Test locally first
npm run build

# Fix any errors
# Then push again
```

### Google OAuth Not Working

**Error**: `redirect_uri_mismatch`

**Solution**:
- Add ALL Vercel URLs to Google Console
- Include preview URLs
- Wait 5 minutes after saving

### Environment Variables Not Working

**Solution**:
1. Check spelling: `REACT_APP_GOOGLE_CLIENT_ID`
2. Must start with `REACT_APP_`
3. Redeploy after adding variables

### 404 Errors on Refresh

**Solution**: Already fixed with `vercel.json` routing!

---

## Performance Optimization

### Enable Vercel Speed Insights

1. Go to project settings
2. Click "Speed Insights"
3. Enable it
4. Get real performance data!

### Enable Vercel Analytics

1. Go to project settings
2. Click "Analytics"
3. Enable it
4. Track visitors!

---

## Security Checklist

✅ **Before Going Live:**

- [ ] `.env` file is in `.gitignore`
- [ ] No API keys in code
- [ ] Google OAuth configured for production domain
- [ ] Test all features on live site
- [ ] Check mobile responsiveness
- [ ] Test payment flow (if added)
- [ ] Add privacy policy page
- [ ] Add terms of service page

---

## Costs

### Vercel Free Tier Includes:

- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Preview deployments
- ✅ Analytics (basic)

**Perfect for your restaurant app!**

### When to Upgrade:

- More than 100GB bandwidth
- Need team collaboration
- Want advanced analytics
- Need priority support

**Pro Plan**: $20/month

---

## Post-Deployment Checklist

### Day 1:
- [ ] Test all pages
- [ ] Test Google login
- [ ] Test ordering flow
- [ ] Test admin panel
- [ ] Check mobile view
- [ ] Share with friends for testing

### Week 1:
- [ ] Monitor analytics
- [ ] Check for errors in logs
- [ ] Gather user feedback
- [ ] Fix any bugs
- [ ] Add improvements

### Month 1:
- [ ] Review performance
- [ ] Optimize slow pages
- [ ] Add new features
- [ ] Update menu items
- [ ] Marketing push!

---

## Useful Commands

### Local Development
```bash
npm start                 # Run locally
npm run build            # Test build
npm test                 # Run tests
```

### Git Commands
```bash
git status               # Check changes
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push                 # Deploy to Vercel
```

### Vercel CLI (Optional)
```bash
npm i -g vercel          # Install Vercel CLI
vercel                   # Deploy from terminal
vercel --prod            # Deploy to production
vercel logs              # View logs
```

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Discord**: https://vercel.com/discord
- **React Docs**: https://react.dev
- **Google OAuth**: https://developers.google.com/identity

---

## Quick Reference

### Your URLs:
- **Local**: http://localhost:3000
- **Vercel**: https://your-app.vercel.app
- **Custom**: https://yourdomain.com

### Important Files:
- `vercel.json` - Vercel configuration
- `.env` - Environment variables (local)
- `.gitignore` - Files to ignore
- `package.json` - Dependencies

### Key Commands:
```bash
npm start        # Local dev
npm run build    # Build for production
git push         # Deploy to Vercel
```

---

## Success! 🎉

Your restaurant app is now live on the internet!

Share your URL with customers and start taking orders!

**Next Steps:**
1. Add payment integration (Stripe/PayPal)
2. Set up email notifications
3. Add SMS notifications
4. Create mobile app version
5. Add delivery tracking
6. Implement loyalty program

Good luck with your restaurant! 🍕🥙🍕
