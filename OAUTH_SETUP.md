# OAuth Setup Guide

## Google Sign-In Setup

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "Restaurant App"
4. Click "Create"

### Step 2: Enable Google+ API
1. Go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click "Enable"

### Step 3: Create OAuth Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure OAuth consent screen:
   - User Type: External
   - App name: "Turkish Restaurant"
   - User support email: your email
   - Developer contact: your email
   - Click "Save and Continue"
4. Choose "Web application"
5. Name: "Restaurant Web App"
6. Authorized JavaScript origins:
   - `http://localhost:3000`
   - `http://localhost:3001` (if needed)
7. Authorized redirect URIs:
   - `http://localhost:3000`
8. Click "Create"
9. **Copy the Client ID**

### Step 4: Add Client ID to Your App
1. Create `.env` file in project root:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
   ```
2. Restart your development server

### Step 5: Test
1. Go to Login page
2. Click "Continue with Google"
3. Select your Google account
4. You should be logged in!

---

## Apple Sign In Setup (Advanced)

### Requirements:
- Apple Developer Account ($99/year)
- Domain name (for production)
- Backend server for token verification

### Step 1: Create App ID
1. Go to [Apple Developer](https://developer.apple.com/)
2. Certificates, Identifiers & Profiles
3. Identifiers → App IDs
4. Click "+" to create new
5. Select "App IDs"
6. Description: "Restaurant App"
7. Bundle ID: com.yourcompany.restaurant
8. Enable "Sign In with Apple"
9. Click "Continue" → "Register"

### Step 2: Create Service ID
1. Identifiers → Services IDs
2. Click "+" to create new
3. Description: "Restaurant Web"
4. Identifier: com.yourcompany.restaurant.web
5. Enable "Sign In with Apple"
6. Click "Configure"
7. Primary App ID: Select your App ID
8. Domains: `yourdomain.com`
9. Return URLs: `https://yourdomain.com/auth/apple/callback`
10. Click "Save" → "Continue" → "Register"

### Step 3: Create Key
1. Keys → Click "+"
2. Key Name: "Restaurant Sign In Key"
3. Enable "Sign In with Apple"
4. Click "Configure"
5. Select your Primary App ID
6. Click "Save" → "Continue" → "Register"
7. **Download the key file** (you can only download once!)

### Step 4: Backend Setup
Apple Sign In requires server-side token verification. You need:
- Backend endpoint to receive Apple's authorization code
- Verify the token with Apple's servers
- Create user session

Example backend (Node.js):
```javascript
const appleSignin = require('apple-signin-auth');

app.post('/auth/apple', async (req, res) => {
  const { code } = req.body;
  
  try {
    const response = await appleSignin.verifyIdToken(code, {
      audience: 'com.yourcompany.restaurant.web',
      ignoreExpiration: false,
    });
    
    // Create user session
    const user = {
      id: response.sub,
      email: response.email,
      provider: 'apple'
    };
    
    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});
```

---

## Testing OAuth

### Google (Works Immediately):
1. Add Client ID to `.env`
2. Restart server
3. Click "Continue with Google"
4. Select account
5. ✅ Logged in!

### Apple (Requires Full Setup):
- Needs Apple Developer account
- Requires backend server
- For demo: Uses simulated login

---

## Security Notes

### Production Checklist:
- [ ] Use HTTPS only
- [ ] Add production domain to authorized origins
- [ ] Implement CSRF protection
- [ ] Validate tokens on backend
- [ ] Store tokens securely
- [ ] Implement token refresh
- [ ] Add rate limiting
- [ ] Log authentication attempts

### Environment Variables:
Never commit `.env` file to git!
Add to `.gitignore`:
```
.env
.env.local
```

---

## Troubleshooting

### Google Sign-In Not Working:
1. Check Client ID is correct
2. Verify authorized origins include `http://localhost:3000`
3. Clear browser cache
4. Check browser console for errors
5. Ensure Google script is loaded (check Network tab)

### "redirect_uri_mismatch" Error:
- Add exact URL to authorized redirect URIs in Google Console
- Include protocol (http/https)
- Match port number exactly

### "idpiframe_initialization_failed" Error:
- Check if third-party cookies are enabled
- Try in incognito mode
- Verify Client ID is correct

---

## Support

For issues:
- Google OAuth: https://developers.google.com/identity/gsi/web
- Apple Sign In: https://developer.apple.com/sign-in-with-apple/
