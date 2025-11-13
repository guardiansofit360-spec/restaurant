# 🔥 Your Firebase Configuration

## ✅ Project Details

**Project Name**: restaurant-app-54ff6  
**Project ID**: restaurant-app-54ff6  
**Region**: Default (us-central)

---

## 🔑 Firebase Configuration (Already Applied)

Your Firebase credentials have been configured in:
- ✅ `restaurant-website/.env`
- ✅ `restaurant-website/src/config/firebase.js`
- ✅ `restaurant-website/api/.env`

### Configuration Values:
```javascript
{
  apiKey: "AIzaSyCOm8t78AWkWNR1ik8qaNWAzQ8j5qrIFRQ",
  authDomain: "restaurant-app-54ff6.firebaseapp.com",
  projectId: "restaurant-app-54ff6",
  storageBucket: "restaurant-app-54ff6.firebasestorage.app",
  messagingSenderId: "975202975421",
  appId: "1:975202975421:web:0d5a84f054f97e71aa01d4",
  measurementId: "G-44JL1JW829"
}
```

---

## 🚀 Quick Start

### 1. Enable Authentication in Firebase Console

Visit: https://console.firebase.google.com/project/restaurant-app-54ff6/authentication

**Enable these sign-in methods:**
1. ✅ **Google** - Click "Google" → Toggle "Enable" → Save
2. ✅ **Phone** - Click "Phone" → Toggle "Enable" → Save

### 2. Add Authorized Domains

In Firebase Console → Authentication → Settings → Authorized domains

**Add these domains:**
- ✅ `localhost` (already added by default)
- ✅ Your Vercel domain when you deploy (e.g., `your-app.vercel.app`)

### 3. Start Your App

**Terminal 1 - API Server:**
```bash
cd restaurant-website/api
npm start
```

**Terminal 2 - Frontend:**
```bash
cd restaurant-website
npm start
```

### 4. Test Authentication

Visit: http://localhost:3000/login

**Test Google Login:**
1. Click "Continue with Google"
2. Select your Google account
3. Done! ✅

**Test Phone Login:**
1. Click "Continue with Phone"
2. Enter phone: `+1234567890` (with country code)
3. Click "Send Verification Code"
4. Check your phone for SMS
5. Enter the 6-digit code
6. Done! ✅

---

## 🌐 Firebase Console Links

### Main Dashboard:
https://console.firebase.google.com/project/restaurant-app-54ff6

### Authentication:
https://console.firebase.google.com/project/restaurant-app-54ff6/authentication

### Users:
https://console.firebase.google.com/project/restaurant-app-54ff6/authentication/users

### Settings:
https://console.firebase.google.com/project/restaurant-app-54ff6/settings/general

---

## 📱 Test Phone Numbers (Optional)

To test phone authentication without sending real SMS:

1. Go to: https://console.firebase.google.com/project/restaurant-app-54ff6/authentication/providers
2. Click "Phone" provider
3. Scroll to "Phone numbers for testing"
4. Add test numbers:
   - Phone: `+11234567890`
   - Code: `123456`
5. Click "Add"

Now you can test with `+11234567890` and code `123456` without receiving SMS!

---

## 🔐 Security Notes

### ⚠️ Important:
- Your API key is public (safe for frontend use)
- Never commit service account keys to git
- Use environment variables for sensitive data
- Enable App Check for production (optional)

### ✅ Already Secured:
- Firebase automatically rate-limits authentication
- reCAPTCHA protects phone authentication
- CORS is configured in your API

---

## 🌍 Production Deployment (Vercel)

### Environment Variables to Set in Vercel:

```
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_FIREBASE_API_KEY=AIzaSyCOm8t78AWkWNR1ik8qaNWAzQ8j5qrIFRQ
REACT_APP_FIREBASE_AUTH_DOMAIN=restaurant-app-54ff6.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=restaurant-app-54ff6
REACT_APP_FIREBASE_STORAGE_BUCKET=restaurant-app-54ff6.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=975202975421
REACT_APP_FIREBASE_APP_ID=1:975202975421:web:0d5a84f054f97e71aa01d4
REACT_APP_FIREBASE_MEASUREMENT_ID=G-44JL1JW829
```

### After Deploying:
1. Get your Vercel URL (e.g., `your-app.vercel.app`)
2. Add it to Firebase authorized domains
3. Test authentication on production

---

## 📊 Usage Limits (Free Tier)

### Firebase Spark Plan (Free):
- ✅ Google Sign-In: **Unlimited** (FREE)
- ✅ Phone Auth: **10,000 verifications/month** (FREE)
- ✅ Authentication: **Unlimited users** (FREE)

### If You Need More:
Upgrade to Blaze Plan (pay-as-you-go):
- https://console.firebase.google.com/project/restaurant-app-54ff6/usage

---

## ✅ Setup Status

- ✅ Firebase project created
- ✅ Configuration added to code
- ✅ Dependencies installed
- ✅ Ready to enable authentication methods

### Next Steps:
1. Enable Google & Phone authentication in Firebase Console
2. Start your app
3. Test login features
4. Deploy to Vercel

---

## 🆘 Need Help?

### Firebase Documentation:
- Auth Overview: https://firebase.google.com/docs/auth
- Phone Auth: https://firebase.google.com/docs/auth/web/phone-auth
- Google Sign-In: https://firebase.google.com/docs/auth/web/google-signin

### Your Project Docs:
- Quick Start: `QUICK_START.md`
- Full Setup: `FIREBASE_SETUP.md`
- Visual Guide: `FIREBASE_VISUAL_GUIDE.md`

---

**Status**: ✅ Configuration Complete!

**Next**: Enable authentication methods in Firebase Console

🚀 You're ready to go!
