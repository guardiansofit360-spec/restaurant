# Debug Customer Name Issue

## Steps to Debug

### 1. Check Browser Console
Open browser console (F12) and look for these debug logs:

**When logging in:**
- `Login response:` - Check if `name` field exists
- `User data to save:` - Check if `name` is included
- `Document set:` - Confirms session saved to Firestore

**When loading app:**
- `Loaded session from Firestore:` - Check if `name` field exists

**When placing order:**
- `User data:` - Check if `name` field exists
- `Creating order:` - Check if `customerName` is populated

### 2. Check Firestore Console

**Check User Session:**
1. Go to [Firestore Console](https://console.firebase.google.com/project/restaurant-9114a/firestore/data/userSessions)
2. Click on your user's session document
3. Verify these fields exist:
   - `userId`
   - `name` ← **This should have the user's name**
   - `email`
   - `role`

**Check Order:**
1. Go to [Firestore Console](https://console.firebase.google.com/project/restaurant-9114a/firestore/data/orders)
2. Click on the latest order
3. Verify these fields exist:
   - `customerName` ← **This should have the user's name**
   - `customerEmail`
   - `userId`

### 3. Common Issues

**Issue 1: API Response Missing Name**
- The backend API might not be returning the `name` field
- Check the API response in console logs
- Solution: Update backend API to return user name

**Issue 2: Session Not Saved Properly**
- The session in Firestore might not have the name
- Check Firestore Console → userSessions
- Solution: Re-login to save session with name

**Issue 3: User Object Missing Name**
- The user object in React state might not have name
- Check console logs when placing order
- Solution: Ensure App.js loads name from session

### 4. Quick Fix

**Option A: Re-login**
1. Logout from the app
2. Login again
3. Check Firestore Console → userSessions → your user ID
4. Verify `name` field exists
5. Place a new order

**Option B: Manually Update Session**
1. Go to Firestore Console → userSessions
2. Click on your user's document
3. Add/Update the `name` field with your actual name
4. Refresh the app
5. Place a new order

### 5. Test with New User

1. Register a completely new user
2. Login with that user
3. Place an order
4. Check if customer name shows in admin panel

---

## Expected Console Logs

```
Login response: { id: "123", name: "John Doe", email: "john@example.com", ... }
User data to save: { id: "123", name: "John Doe", email: "john@example.com", ... }
Document set: 123
Loaded session from Firestore: { userId: "123", name: "John Doe", ... }
User data: { id: "123", name: "John Doe", ... }
Creating order: { customerName: "John Doe", ... }
```

If any of these logs show `name: undefined` or `customerName: undefined`, that's where the issue is!
