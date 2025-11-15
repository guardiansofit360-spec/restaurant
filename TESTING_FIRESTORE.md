# Testing Firestore Migration

## 🧪 Test Your Firestore Integration

Your app now uses Firebase Firestore instead of localStorage/sessionStorage for user sessions and shopping carts!

### Prerequisites
✅ Firebase project created
✅ Firestore database enabled
✅ Environment variables configured in `.env`
✅ Dev server running at `http://localhost:3000`

## Test Scenarios

### Test 1: User Login & Session Persistence

1. **Login to your app**
   - Go to http://localhost:3000/login
   - Login with: `admin@admin.com` / `admin123`
   - You should be redirected to /menu

2. **Check Firestore Console**
   - Go to [Firebase Console → Firestore](https://console.firebase.google.com/project/restaurant-9114a/firestore/data)
   - You should see a new collection: `userSessions`
   - Click on it to see your user session document

3. **Test Session Persistence**
   - Refresh the browser (F5)
   - You should still be logged in
   - No need to login again!

4. **Test Across Tabs**
   - Open a new tab with the same URL
   - You should automatically be logged in

### Test 2: Shopping Cart Persistence

1. **Add items to cart**
   - Go to /menu
   - Add 2-3 items to your cart
   - Go to /cart to verify items are there

2. **Check Firestore Console**
   - Go to Firestore Console
   - You should see a new collection: `userCarts`
   - Click on it to see your cart document with all items

3. **Test Cart Persistence**
   - Refresh the browser (F5)
   - Go to /cart
   - All your items should still be there!

4. **Test Real-time Sync**
   - Open Firestore Console in another window
   - Add an item to cart in your app
   - Watch the Firestore Console - it updates in real-time!

### Test 3: Profile Updates

1. **Update your profile**
   - Go to /profile
   - Click "Edit"
   - Change your name, phone, or address
   - Click "Save Changes"

2. **Check Firestore Console**
   - Go to `userSessions` collection
   - Your user document should show the updated information

3. **Test Persistence**
   - Refresh the browser
   - Go to /profile
   - Your changes should still be there

### Test 4: Logout

1. **Logout**
   - Click on your avatar (top right)
   - Click "Logout" button
   - You should be redirected to /login

2. **Check Firestore Console**
   - Go to `userSessions` collection
   - Your session document should be deleted

3. **Test Session Cleared**
   - Try to go to /profile or /menu
   - You should be redirected to /login

### Test 5: Multiple Users

1. **Login as User 1**
   - Login with `admin@admin.com`
   - Add items to cart
   - Note the items

2. **Logout and Login as User 2**
   - Logout
   - Register a new user or login with different credentials
   - Check cart - it should be empty (different user)

3. **Check Firestore Console**
   - You should see 2 documents in `userCarts`
   - Each user has their own cart

4. **Switch back to User 1**
   - Logout
   - Login as `admin@admin.com` again
   - Your original cart items should still be there!

## 🔍 Debugging

### Check Browser Console
Press F12 and look for:
- ✅ "Firestore initialized"
- ✅ "Document added with ID: ..."
- ❌ Any red error messages

### Common Issues

**Issue: "Firebase Status: Not Configured"**
- Solution: Restart dev server after adding .env variables

**Issue: "Permission denied" errors**
- Solution: Check Firestore rules in Firebase Console
- Make sure rules allow read/write (test mode)

**Issue: Cart not saving**
- Solution: Check browser console for errors
- Verify Firestore is enabled in Firebase Console

**Issue: Session not persisting**
- Solution: Check if `userSessions` collection exists
- Verify user ID is being stored in sessionStorage

## 📊 What to Look For in Firestore Console

### userSessions Collection
```
userSessions/
  └── {userId}/
      ├── userId: "abc123"
      ├── name: "John Doe"
      ├── email: "john@example.com"
      ├── role: "customer"
      ├── phone: "+1234567890"
      ├── address: "123 Main St"
      └── lastActive: "2024-01-15T10:30:00Z"
```

### userCarts Collection
```
userCarts/
  └── {userId}/
      ├── userId: "abc123"
      ├── items: [
      │   {
      │     id: "item1",
      │     name: "Pizza",
      │     price: 12.99,
      │     quantity: 2
      │   }
      │ ]
      └── updatedAt: "2024-01-15T10:35:00Z"
```

## ✅ Success Criteria

- [ ] User can login and session is saved to Firestore
- [ ] Session persists after browser refresh
- [ ] Cart items are saved to Firestore
- [ ] Cart persists after browser refresh
- [ ] Profile updates save to Firestore
- [ ] Logout clears Firestore session
- [ ] Multiple users have separate sessions and carts
- [ ] No console errors

## 🎉 Next Steps

Once all tests pass:
1. Review `FIRESTORE_MIGRATION.md` for what was changed
2. Consider migrating other features (orders, inventory, etc.)
3. Update Firestore security rules for production
4. Deploy your app!

## 📝 Notes

- sessionStorage still stores user ID for quick access
- Backend API is still used for authentication
- Orders and admin features still use API/localStorage
- You can migrate those features later if needed
