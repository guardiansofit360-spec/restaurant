# Google Sign-In Setup Guide

## ✅ Implementation Complete

Google Sign-In with Firebase Authentication is now integrated into your restaurant app!

## Features

- 🔐 **Secure Authentication** - Uses Firebase Authentication
- 👤 **Auto User Creation** - Creates Firestore user on first sign-in
- 💾 **Session Management** - Saves session to Firestore
- 🎨 **Beautiful UI** - Google-branded button with proper styling
- ⚡ **Fast & Easy** - One-click sign-in for users

## Firebase Console Setup Required

### Step 1: Enable Google Sign-In in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **Authentication** in the left sidebar
4. Click **Sign-in method** tab
5. Click **Google** provider
6. Toggle **Enable**
7. Add your **Project support email** (required)
8. Click **Save**

### Step 2: Add Authorized Domains

1. In Authentication → Settings → Authorized domains
2. Add your domains:
   - `localhost` (already there)
   - Your Vercel domain: `your-app.vercel.app`
   - Any custom domains

### Step 3: Configure OAuth Consent Screen (if needed)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Go to **APIs & Services** → **OAuth consent screen**
4. Fill in required information:
   - App name
   - User support email
   - Developer contact email
5. Add scopes (email and profile are default)
6. Save and continue

## How It Works

### User Flow:

1. **User clicks "Continue with Google"**
2. **Google popup opens** for account selection
3. **User selects Google account**
4. **App checks Firestore** for existing user by Google ID
5. **If new user:**
   - Creates user in Firestore `users` collection
   - Saves: name, email, Google ID, photo URL
   - Assigns 'customer' role
6. **If existing user:**
   - Loads user data from Firestore
7. **Session saved** to Firestore
8. **User redirected** to menu (or admin dashboard if admin)

### Data Stored in Firestore:

```javascript
{
  googleId: "google-user-id",
  name: "User Name",
  email: "user@gmail.com",
  phone: "",
  address: "",
  role: "customer",
  photoURL: "https://...",
  createdAt: "2024-01-01T00:00:00.000Z"
}
```

## Testing

### Local Testing:

1. Run your app: `npm start`
2. Go to Login page
3. Click "Continue with Google"
4. Select a Google account
5. Should redirect to menu page
6. Check Firestore Console → users collection for new user

### Vercel Testing:

1. Deploy to Vercel
2. Make sure Vercel domain is in Firebase Authorized domains
3. Test Google Sign-In on production URL

## Troubleshooting

### Issue: "Popup blocked"
**Solution:** Allow popups for your site in browser settings

### Issue: "auth/unauthorized-domain"
**Solution:** Add your domain to Firebase Authorized domains

### Issue: "auth/popup-closed-by-user"
**Solution:** User closed popup - this is normal, just try again

### Issue: Google Sign-In button not working
**Solution:** 
- Check Firebase Authentication is enabled
- Check Google provider is enabled
- Check browser console for errors
- Verify Firebase config environment variables

### Issue: User created but can't login again
**Solution:**
- Check Firestore rules allow read/write
- Verify user document was created in Firestore
- Check browser console for errors

## Security Notes

### Current Setup (Development):
- Firestore rules allow all read/write access
- No email verification required
- Anyone with Google account can sign up

### For Production:
Consider implementing:
- Email verification
- Admin approval for new users
- Proper Firestore security rules
- Rate limiting
- User role management

## Files Modified

1. **src/firebase.js** - Added auth and Google provider
2. **src/services/firestoreDataService.js** - Added Google user methods
3. **src/pages/Login.js** - Added Google Sign-In button and handler
4. **src/pages/Auth.css** - Added Google button styles

## Environment Variables

No additional environment variables needed! Uses existing Firebase config:
- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_PROJECT_ID`
- etc.

## Next Steps

1. ✅ Enable Google Sign-In in Firebase Console
2. ✅ Add authorized domains
3. ✅ Test locally
4. ✅ Deploy to Vercel
5. ✅ Test on production
6. 🎉 Users can now sign in with Google!

## Benefits for Users

- ✅ No password to remember
- ✅ Faster sign-up process
- ✅ Secure authentication
- ✅ Auto-fill name and email
- ✅ Profile picture from Google account

## Support

If users face issues:
1. Check browser allows popups
2. Try different browser
3. Clear browser cache
4. Check internet connection
5. Contact support with error message
