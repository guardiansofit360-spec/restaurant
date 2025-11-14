# 🔐 Google OAuth Setup Guide

This guide will help you set up Google Sign-In for your restaurant website in just 5 minutes.

## 📋 Prerequisites

- A Google account
- Your app running locally (http://localhost:3000)

## 🚀 Step-by-Step Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Enter project name: `Restaurant App`
4. Click **"Create"**

### 2. Enable Google+ API

1. In the left sidebar, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google+ API"**
3. Click on it and press **"Enable"**

### 3. Configure OAuth Consent Screen

1. Go to **"APIs & Services"** → **"OAuth consent screen"**
2. Select **"External"** (for testing with any Google account)
3. Click **"Create"**
4. Fill in required fields:
   - **App name**: `Restaurant Website`
   - **User support email**: Your email
   - **Developer contact**: Your email
5. Click **"Save and Continue"**
6. Skip **"Scopes"** → Click **"Save and Continue"**
7. Add test users (optional) → Click **"Save and Continue"**
8. Click **"Back to Dashboard"**

### 4. Create OAuth Client ID

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. Choose **"Web application"**
4. Configure:
   - **Name**: `Restaurant Web Client`
   - **Authorized JavaScript origins**:
     - `http://localhost:3000`
     - `http://localhost:3001` (for API)
   - **Authorized redirect URIs**:
     - `http://localhost:3000`
5. Click **"Create"**
6. **Copy the Client ID** (you'll need this!)

### 5. Configure Your App

#### Frontend Configuration

Edit `restaurant-website/.env`:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
```

Replace `YOUR_CLIENT_ID_HERE` with the Client ID you copied.

#### Backend Configuration

Edit `restaurant-website/api/.env`:

```env
PORT=3001
FRONTEND_URL=http://localhost:3000
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
```

Replace `YOUR_CLIENT_ID_HERE` with the same Client ID.

### 6. Restart Your Servers

```bash
# Stop both servers (Ctrl+C)

# Terminal 1 - Restart API
cd api
npm start

# Terminal 2 - Restart Frontend
npm start
```

## ✅ Test Google Login

1. Go to http://localhost:3000/login
2. Click the **"Sign in with Google"** button
3. Choose your Google account
4. You should be logged in automatically!

## 🌐 Production Setup

When deploying to production (e.g., Vercel):

### 1. Update Google Cloud Console

1. Go to **"Credentials"** → Edit your OAuth client
2. Add production URLs to **Authorized JavaScript origins**:
   - `https://your-app.vercel.app`
3. Add to **Authorized redirect URIs**:
   - `https://your-app.vercel.app`
4. Save changes

### 2. Update Environment Variables

In Vercel dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add:
   - `REACT_APP_GOOGLE_CLIENT_ID` = Your Client ID
   - `REACT_APP_API_URL` = Your API URL

In your API hosting (Heroku/Railway/Render):

1. Add environment variable:
   - `GOOGLE_CLIENT_ID` = Your Client ID
   - `FRONTEND_URL` = Your frontend URL

## 🔧 Troubleshooting

### "Google Sign-In button not showing"

- Check that `REACT_APP_GOOGLE_CLIENT_ID` is set in `.env`
- Restart the frontend server
- Clear browser cache

### "Invalid Client ID"

- Verify the Client ID is correct in both `.env` files
- Make sure there are no extra spaces
- Check that the Client ID matches in Google Cloud Console

### "Redirect URI mismatch"

- Ensure `http://localhost:3000` is added to Authorized redirect URIs
- Check that you're accessing the app from the exact URL

### "Access blocked: This app's request is invalid"

- Complete the OAuth consent screen configuration
- Add your email as a test user
- Make sure Google+ API is enabled

## 📝 Security Notes

- ✅ Never commit `.env` files to Git
- ✅ Use different Client IDs for development and production
- ✅ Keep your Client Secret secure (not needed for this setup)
- ✅ Regularly review authorized users in Google Cloud Console

## 🎉 You're Done!

Your users can now sign in with Google! The app will:
- Automatically create an account for new Google users
- Log in existing users
- Store user info securely
- Sync orders across devices

---

**Need help?** Open an issue on GitHub or check the [Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2)
