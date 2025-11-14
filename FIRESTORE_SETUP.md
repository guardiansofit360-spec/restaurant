# 🔥 Firestore Database Setup

## Why Firestore?

- ✅ **Persistent Storage**: Data survives server restarts
- ✅ **Cross-Device Sync**: Real-time synchronization
- ✅ **No Server Needed**: Serverless database
- ✅ **Free Tier**: Generous free quota
- ✅ **Easy Setup**: 5-minute configuration

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Firebase Project (2 min)

1. Go to: https://console.firebase.google.com/
2. Click **"Add project"**
3. Enter project name: `restaurant-app` (or any name)
4. Disable Google Analytics (optional)
5. Click **"Create project"**

### Step 2: Enable Firestore (1 min)

1. In Firebase Console, click **"Firestore Database"** in left menu
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
4. Choose location closest to you
5. Click **"Enable"**

### Step 3: Get Project ID (1 min)

1. In Firebase Console, click the ⚙️ gear icon → **"Project settings"**
2. Copy your **Project ID** (e.g., `restaurant-app-54ff6`)

### Step 4: Update Backend Configuration (1 min)

Edit `restaurant-website/api/.env`:

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Add your Firebase Project ID
FIREBASE_PROJECT_ID=your-project-id-here
```

### Step 5: Install Dependencies & Start

```bash
# Install backend dependencies
cd restaurant-website/api
npm install

# Start API server
npm start
```

You should see:
```
✅ Firestore connected successfully
✅ Server running on http://localhost:3001
📦 Using Firestore database
```

---

## ✅ That's It!

Your restaurant app now uses Firestore for persistent storage!

### Test It:

1. **Create an order** on one device
2. **View the order** on another device
3. ✅ **Data persists** even after server restart!

---

## 🔒 Security Rules (Production)

For production, update Firestore security rules:

1. Go to Firebase Console → Firestore Database → Rules
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for authenticated requests
    match /{document=**} {
      allow read, write: if true; // Change this for production!
    }
  }
}
```

For better security in production:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Orders
    match /orders/{orderId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
    
    // Menu items (public read, admin write)
    match /menu_items/{itemId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Categories and offers
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 📊 Firestore Collections

Your app uses these collections:

- **users** - User accounts
- **orders** - Customer orders
- **menu_items** - Restaurant menu
- **categories** - Food categories
- **offers** - Promotional offers

---

## 🆓 Free Tier Limits

Firestore free tier includes:
- ✅ 1 GB storage
- ✅ 50,000 reads/day
- ✅ 20,000 writes/day
- ✅ 20,000 deletes/day

Perfect for small to medium restaurants!

---

## 🔧 Troubleshooting

### "Firestore not configured"

**Solution**: Check that `FIREBASE_PROJECT_ID` is set in `api/.env`

### "Permission denied"

**Solution**: 
1. Go to Firestore → Rules
2. Ensure rules allow read/write
3. For development, use test mode

### "Module not found: firebase-admin"

**Solution**:
```bash
cd api
npm install
```

---

## 🚀 Production Deployment

### Option 1: Using Project ID (Recommended for Development)

Set environment variable:
```
FIREBASE_PROJECT_ID=your-project-id
```

### Option 2: Using Service Account (Recommended for Production)

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click **"Generate new private key"**
3. Download the JSON file
4. Set environment variable:
```
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"..."}
```

---

## 💡 Benefits Over In-Memory

### Before (In-Memory):
- ❌ Data lost on restart
- ❌ No real persistence
- ❌ Testing only

### After (Firestore):
- ✅ Data persists forever
- ✅ Real-time sync
- ✅ Production-ready
- ✅ Automatic backups
- ✅ Scalable

---

## 📚 Resources

- **Firestore Docs**: https://firebase.google.com/docs/firestore
- **Security Rules**: https://firebase.google.com/docs/firestore/security/get-started
- **Pricing**: https://firebase.google.com/pricing

---

**Status**: ✅ Firestore enabled!

**Next**: Start using your app with persistent storage! 🎉
