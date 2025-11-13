# Google OAuth Setup Guide

## Your Client ID
```
749572594280-kl6eg7aie0vtvh0b7avq80cnadh5gc7s.apps.googleusercontent.com
```

## Important: Configure Authorized Domains

For Google Sign-In to work properly, you MUST add your domains to the Google Cloud Console:

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/apis/credentials

### 2. Select Your OAuth 2.0 Client ID
Click on your OAuth client: `749572594280-kl6eg7aie0vtvh0b7avq80cnadh5gc7s.apps.googleusercontent.com`

### 3. Add Authorized JavaScript Origins
Add these URLs:
- `http://localhost:3000` (for local development)
- `https://your-vercel-app.vercel.app` (your Vercel deployment URL)

### 4. Add Authorized Redirect URIs
Add these URLs:
- `http://localhost:3000` (for local development)
- `https://your-vercel-app.vercel.app` (your Vercel deployment URL)

### 5. Save Changes
Click "Save" at the bottom of the page.

## Testing Locally

1. Make sure your `.env` file has the Client ID:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=749572594280-kl6eg7aie0vtvh0b7avq80cnadh5gc7s.apps.googleusercontent.com
   ```

2. Restart your development server:
   ```bash
   npm start
   ```

3. Go to `http://localhost:3000/login`

4. Click "Continue with Google"

5. The Google account selection popup should appear

## Deploying to Vercel

1. Add the environment variable in Vercel:
   - Go to your Vercel project dashboard
   - Settings → Environment Variables
   - Add: `REACT_APP_GOOGLE_CLIENT_ID` = `749572594280-kl6eg7aie0vtvh0b7avq80cnadh5gc7s.apps.googleusercontent.com`

2. Redeploy your app

3. Update Google Cloud Console with your Vercel URL (see step 3 above)

## Troubleshooting

### Popup Not Showing
- Check browser console for errors
- Verify the Client ID is correct in `.env`
- Make sure you added your domain to Google Cloud Console
- Clear browser cache and cookies
- Try in incognito mode

### "Popup Blocked" Error
- Allow popups for your domain in browser settings
- The popup might be blocked by browser extensions

### "Invalid Client" Error
- Double-check the Client ID matches exactly
- Verify the domain is authorized in Google Cloud Console
- Make sure you're using HTTPS in production (Vercel provides this automatically)

### "Access Blocked" Error
- Your app might need to be verified by Google if you're using sensitive scopes
- For basic profile info, verification is not required
- Make sure your OAuth consent screen is configured

## Current Implementation

The app uses Google's One Tap sign-in with the following features:
- ✅ Automatic initialization when page loads
- ✅ Retry mechanism if script loads slowly
- ✅ Proper error handling
- ✅ User data extraction from JWT token
- ✅ Session management
- ✅ Fallback to demo mode if not configured

## Security Notes

- Never commit `.env` file to Git (it's in `.gitignore`)
- The Client ID is safe to expose in frontend code
- Keep your Client Secret secure (not used in this app)
- Use HTTPS in production (Vercel provides this)
