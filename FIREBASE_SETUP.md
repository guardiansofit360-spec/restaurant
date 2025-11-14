# 🔥 Firebase Authentication Setup Guide

## Overview

Your restaurant website now uses Firebase Authentication for:
- ✅ Google Sign-In
- ✅ Phone Number Authentication (SMS)

---

## 📋 Step 1: Create Firebase Project (5 minutes)

### 1.1 Go to Firebase Console
Visit: https://console.firebase.google.com/

### 1.2 Create New Project
1. Click "Add project"
2. Enter project name (e.g., "Restaurant Website")
3. Enable/disable Google Analytics (optional)
4. Click "Create project"

---

## 🔐 Step 2: Enable Authentication Methods

### 2.1 Navigate to Authentication
1. In Firebase Console, click "Authentication" in left sidebar
2. Click "Get started"

### 2.2 Enable Google Sign-In
1. Click "Sign-in method" tab
2. Click "Google"
3. Toggle "Enable"
4. Enter support email
5. Click "Save"

### 2.3 Enable Phone Authentication
1. Still in "Sign-in method" tab
2. Click "Phone"
3. Toggle "Enable"
4. Click "Save"

**Note**: Phone authentication requires reCAPTCHA verification (handled automatically)

---

## 🌐 Step 3: Register Your Web App

### 3.1 Add Web App
1. In Project Overview, click the web icon `</>`
2. Enter app nickname (e.g., "Restaurant Web")
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"

### 3.2 Copy Firebase Config
You'll see something like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

**Copy these values** - you'll need them next!

---

## ⚙️ Step 4: Configure Environment Variables

### 4.1 Frontend (.env)
Open `restaurant-website/.env` and add:

```env
REACT_APP_API_URL=http://localhost:3001/api

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### 4.2 Backend (api/.env)
The backend doesn't need Firebase config for basic auth, but if you want to verify tokens:

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Optional: Firebase Admin SDK
# FIREBASE_PROJECT_ID=your-project-id
```

---

## 🚀 Step 5: Install Dependencies

### 5.1 Frontend
```bash
cd restaurant-website
npm install
```

This installs `firebase` package (already added to package.json)

### 5.2 Backend
```bash
cd restaurant-website/api
npm install
```

---

## 🧪 Step 6: Test Locally

### 6.1 Start API Server
```bash
cd restaurant-website/api
npm start
```

Should see: `🚀 Server running on http://localhost:3001`

### 6.2 Start Frontend
```bash
cd restaurant-website
npm start
```

Should open: `http://localhost:3000`

### 6.3 Test Google Login
1. Navigate to http://localhost:3000/login
2. Click "Continue with Google"
3. Select your Google account
4. Should redirect to menu page
5. Check if your name/avatar appears in header

### 6.4 Test Phone Login
1. On login page, click "Continue with Phone"
2. Enter phone number with country code (e.g., +1234567890)
3. Click "Send Verification Code"
4. Check your phone for SMS code
5. Enter the 6-digit code
6. Click "Verify Code"
7. Should redirect to menu page

---

## 🌍 Step 7: Configure Authorized Domains

### 7.1 For Local Development
Firebase automatically allows `localhost`

### 7.2 For Production (Vercel)
1. In Firebase Console, go to Authentication → Settings
2. Scroll to "Authorized domains"
3. Click "Add domain"
4. Add your Vercel domain: `your-app.vercel.app`
5. Click "Add"

---

## 📱 Step 8: Phone Authentication Setup

### 8.1 Test Phone Numbers (Optional)
For testing without sending real SMS:

1. In Firebase Console, go to Authentication → Sign-in method
2. Click "Phone" provider
3. Scroll to "Phone numbers for testing"
4. Add test numbers:
   - Phone: `+1234567890`
   - Code: `123456`
5. Click "Add"

Now you can test with this number without receiving SMS!

### 8.2 Production Phone Auth
For production, Firebase automatically sends real SMS messages.

**Pricing**: Firebase has a free tier, then charges per SMS sent.
- Check current pricing: https://firebase.google.com/pricing

---

## 🔒 Step 9: Security Rules (Optional)

### 9.1 reCAPTCHA Configuration
Phone auth uses reCAPTCHA v2 (invisible) by default.

To customize:
1. Go to Authentication → Settings
2. Scroll to "Phone authentication"
3. Configure reCAPTCHA settings

### 9.2 Rate Limiting
Firebase automatically rate-limits authentication attempts.

---

## 🌐 Step 10: Deploy to Vercel

### 10.1 Set Environment Variables in Vercel
1. Go to Vercel project dashboard
2. Settings → Environment Variables
3. Add all Firebase variables:

```
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 10.2 Add Vercel Domain to Firebase
1. In Firebase Console, go to Authentication → Settings
2. Add your Vercel domain to "Authorized domains"

### 10.3 Deploy
```bash
git add .
git commit -m "Add Firebase authentication"
git push
```

Vercel will automatically deploy!

---

## ✨ Features Implemented

### Google Sign-In:
- ✅ One-click authentication
- ✅ Automatic user creation
- ✅ Profile picture import
- ✅ Email verification

### Phone Authentication:
- ✅ SMS verification
- ✅ 6-digit code
- ✅ International numbers
- ✅ Test numbers support

### User Experience:
- ✅ Seamless login flow
- ✅ Error handling
- ✅ Loading states
- ✅ Session management

---

## 🐛 Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
**Solution**: Check that your API key in .env is correct

### "Firebase: Error (auth/unauthorized-domain)"
**Solution**: Add your domain to Firebase authorized domains

### "reCAPTCHA verification failed"
**Solution**: 
- Check if you're on localhost or authorized domain
- Clear browser cache
- Try incognito mode

### Phone verification not working
**Solution**:
- Ensure phone number includes country code (+1, +44, etc.)
- Check Firebase quota limits
- Verify phone auth is enabled in Firebase Console

### "Too many requests"
**Solution**: Firebase rate-limiting kicked in. Wait a few minutes.

---

## 📊 How It Works

### Google Login Flow:
```
User clicks "Continue with Google"
         ↓
Firebase popup opens
         ↓
User signs in with Google
         ↓
Firebase returns user data
         ↓
App creates/updates user in database
         ↓
User redirected to menu
```

### Phone Login Flow:
```
User enters phone number
         ↓
Firebase sends SMS with code
         ↓
User enters verification code
         ↓
Firebase verifies code
         ↓
App creates/updates user in database
         ↓
User redirected to menu
```

---

## 🔐 Security Features

1. **Firebase Authentication**: Industry-standard OAuth 2.0
2. **reCAPTCHA**: Prevents bot attacks
3. **Rate Limiting**: Automatic protection
4. **Secure Tokens**: JWT-based authentication
5. **HTTPS Only**: Production requires HTTPS

---

## 💰 Pricing

### Firebase Free Tier (Spark Plan):
- ✅ Google Sign-In: Unlimited (FREE)
- ✅ Phone Auth: Limited free SMS per month
- ✅ 10K verifications/month

### Paid Tier (Blaze Plan):
- Pay-as-you-go for SMS
- Check pricing: https://firebase.google.com/pricing

---

## 📚 Additional Resources

- Firebase Docs: https://firebase.google.com/docs/auth
- Phone Auth Guide: https://firebase.google.com/docs/auth/web/phone-auth
- Google Sign-In: https://firebase.google.com/docs/auth/web/google-signin

---

## ✅ Setup Checklist

- [ ] Created Firebase project
- [ ] Enabled Google authentication
- [ ] Enabled Phone authentication
- [ ] Registered web app
- [ ] Copied Firebase config
- [ ] Updated .env files
- [ ] Installed dependencies
- [ ] Tested Google login locally
- [ ] Tested phone login locally
- [ ] Added Vercel domain to Firebase
- [ ] Set Vercel environment variables
- [ ] Deployed to production
- [ ] Tested in production

---

## 🎉 You're Done!

Your restaurant website now has professional authentication with:
- Google Sign-In
- Phone Number Authentication
- Secure user management
- Production-ready setup

**Total setup time**: 15-20 minutes

Enjoy! 🚀
