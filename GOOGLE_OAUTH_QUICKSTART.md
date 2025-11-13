# Google OAuth Quick Start (5 Minutes)

## Step 1: Get Your Google Client ID

### 1.1 Go to Google Cloud Console
🔗 https://console.cloud.google.com/

### 1.2 Create a New Project
- Click "Select a project" (top bar)
- Click "NEW PROJECT"
- Project name: `Restaurant App`
- Click "CREATE"
- Wait for project creation (30 seconds)

### 1.3 Enable Google+ API
- Click "APIs & Services" (left menu)
- Click "Library"
- Search: `Google+ API`
- Click on it
- Click "ENABLE"

### 1.4 Configure OAuth Consent Screen
- Click "APIs & Services" → "OAuth consent screen"
- User Type: Select "External"
- Click "CREATE"
- Fill in:
  - App name: `Turkish Restaurant`
  - User support email: (your email)
  - Developer contact: (your email)
- Click "SAVE AND CONTINUE"
- Skip "Scopes" → Click "SAVE AND CONTINUE"
- Skip "Test users" → Click "SAVE AND CONTINUE"
- Click "BACK TO DASHBOARD"

### 1.5 Create OAuth Credentials
- Click "APIs & Services" → "Credentials"
- Click "+ CREATE CREDENTIALS"
- Select "OAuth client ID"
- Application type: "Web application"
- Name: `Restaurant Web App`
- Authorized JavaScript origins:
  - Click "+ ADD URI"
  - Enter: `http://localhost:3000`
- Authorized redirect URIs:
  - Click "+ ADD URI"
  - Enter: `http://localhost:3000`
- Click "CREATE"

### 1.6 Copy Your Client ID
- A popup will show your credentials
- **Copy the Client ID** (looks like: `123456789-abc123def456.apps.googleusercontent.com`)
- Keep this window open!

---

## Step 2: Add Client ID to Your App

### 2.1 Open the .env file
```bash
# In your project folder: restaurant-website/.env
```

### 2.2 Replace the placeholder
```env
REACT_APP_GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID_HERE
```

Paste your Client ID from Step 1.6

Example:
```env
REACT_APP_GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
```

### 2.3 Save the file

---

## Step 3: Restart Your Server

### 3.1 Stop the current server
Press `Ctrl + C` in your terminal

### 3.2 Start it again
```bash
npm start
```

---

## Step 4: Test Google Login

### 4.1 Go to Login Page
Open: http://localhost:3000/login

### 4.2 Click "Continue with Google"

### 4.3 Select Your Google Account

### 4.4 ✅ You're Logged In!

---

## Troubleshooting

### "redirect_uri_mismatch" Error
- Go back to Google Cloud Console
- Credentials → Edit your OAuth client
- Make sure `http://localhost:3000` is in BOTH:
  - Authorized JavaScript origins
  - Authorized redirect URIs
- Save and try again

### "Google Sign-In is loading..."
- Wait 5 seconds and try again
- Check browser console for errors (F12)
- Make sure the Google script loaded (check Network tab)

### "idpiframe_initialization_failed"
- Enable third-party cookies in browser
- Try in incognito mode
- Clear browser cache

### Still Not Working?
1. Check `.env` file has correct Client ID
2. Restart server after changing `.env`
3. Check browser console (F12) for errors
4. Verify Client ID in Google Cloud Console

---

## Security Notes

✅ **DO:**
- Keep `.env` file private
- Never commit `.env` to git
- Use different Client IDs for dev/production

❌ **DON'T:**
- Share your Client ID publicly
- Commit credentials to GitHub
- Use same credentials across projects

---

## Next Steps

Once working:
- Add more Google scopes (calendar, drive, etc.)
- Implement token refresh
- Add backend token verification
- Deploy to production with HTTPS

---

## Need Help?

- Google OAuth Docs: https://developers.google.com/identity/gsi/web
- Video Tutorial: Search "Google OAuth React" on YouTube
- Check OAUTH_SETUP.md for detailed guide
