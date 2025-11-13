# Enable Firestore for Real-Time Orders

Your app now uses **Firebase Firestore** for storing orders in the cloud. This means orders created by customers will be visible to all admins in real-time!

## Quick Setup (5 minutes)

### 1. Go to Firebase Console
Visit: https://console.firebase.google.com/project/restaurant-app-54ff6

### 2. Enable Firestore Database
- Click **"Firestore Database"** in the left menu
- Click **"Create database"**
- Choose **"Start in test mode"** (for development)
- Select a location (choose closest to you)
- Click **"Enable"**

### 3. Set Security Rules (Important!)
After creating the database, go to the **"Rules"** tab and paste this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to orders collection
    match /orders/{orderId} {
      allow read, write: if true;
    }
  }
}
```

Click **"Publish"**

### 4. Done!
That's it! Your app will now automatically use Firestore for orders.

## How It Works

### Automatic Fallback
- **If Firestore is enabled**: Orders sync across all users in real-time
- **If Firestore is not enabled**: Orders use localStorage (local only)

### What Gets Synced
- ✅ Customer orders
- ✅ Order status updates
- ✅ Real-time updates (5-second refresh)

### Testing
1. **Customer**: Place an order on one device
2. **Admin**: Open admin panel on another device
3. **Result**: Order appears within 5 seconds!

## Production Security Rules

For production, use these more secure rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      // Allow users to read their own orders
      allow read: if request.auth != null && 
                  (resource.data.userId == request.auth.uid || 
                   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      
      // Allow authenticated users to create orders
      allow create: if request.auth != null;
      
      // Only admins can update orders
      allow update: if request.auth != null && 
                    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Troubleshooting

### Orders not syncing?
- Check if Firestore is enabled in Firebase Console
- Verify security rules are published
- Check browser console for errors

### "Missing or insufficient permissions" error?
- Update security rules to allow read/write
- Make sure rules are published

### Still using localStorage?
- Firestore will be used automatically once enabled
- No code changes needed!

## Benefits

✅ **Real-time sync** - Orders appear instantly for all users
✅ **No data loss** - Orders stored in cloud, not browser
✅ **Multi-device** - Access orders from any device
✅ **Scalable** - Handles thousands of orders
✅ **Free tier** - 50K reads + 20K writes per day

## Current Status

Your Firebase project: **restaurant-app-54ff6**
- ✅ Authentication: Enabled
- ⏳ Firestore: Needs to be enabled (follow steps above)

Once you enable Firestore, orders will automatically sync across all users!
