# 🚀 Quick Start - Firebase Authentication

## What You Get

- ✅ Google Sign-In (one-click login)
- ✅ Phone Authentication (SMS verification)
- ✅ Automatic user creation
- ✅ Profile pictures from Google

---

## ⚡ 5-Minute Setup

### 1. Create Firebase Project
Visit: https://console.firebase.google.com/
- Click "Add project"
- Name it (e.g., "Restaurant")
- Create!

### 2. Enable Authentication
- Click "Authentication" → "Get started"
- Enable "Google" sign-in method
- Enable "Phone" sign-in method

### 3. Register Web App
- Click web icon `</>`
- Name it (e.g., "Restaurant Web")
- Copy the config values

### 4. Update .env File
Open `restaurant-website/.env`:

```env
REACT_APP_API_URL=http://localhost:3001/api

REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 5. Install & Run
```bash
# Install dependencies
cd restaurant-website
npm install

# Start API (Terminal 1)
cd api
npm start

# Start Frontend (Terminal 2)
cd ..
npm start
```

### 6. Test It!
1. Go to http://localhost:3000/login
2. Click "Continue with Google" → Sign in
3. Or click "Continue with Phone" → Enter number → Verify code
4. Done! 🎉

---

## 📱 What Users See

### Login Page:
```
┌─────────────────────────────┐
│  Email/Password Login       │
│                             │
│  ─────── OR ───────         │
│                             │
│  [🔵 Continue with Google]  │
│  [📱 Continue with Phone]   │
└─────────────────────────────┘
```

### Phone Login:
```
1. Click "Continue with Phone"
2. Enter: +1234567890
3. Click "Send Code"
4. Check phone for SMS
5. Enter 6-digit code
6. Logged in!
```

---

## 🌐 Deploy to Vercel

### 1. Set Environment Variables
In Vercel dashboard, add all Firebase variables

### 2. Add Domain to Firebase
In Firebase Console → Authentication → Settings → Authorized domains
- Add: `your-app.vercel.app`

### 3. Deploy
```bash
git add .
git commit -m "Add Firebase auth"
git push
```

---

## 🐛 Common Issues

**"Invalid API key"**
→ Check .env file has correct Firebase config

**"Unauthorized domain"**
→ Add your domain to Firebase authorized domains

**Phone code not received**
→ Check phone number has country code (+1, +44, etc.)

---

## 📚 Full Documentation

See `FIREBASE_SETUP.md` for complete guide

---

**Setup Time**: 5-10 minutes
**Result**: Professional authentication! 🎉
