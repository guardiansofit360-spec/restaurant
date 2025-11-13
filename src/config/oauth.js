// Google OAuth Configuration
// To get your Google Client ID:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select existing
// 3. Enable Google+ API
// 4. Go to Credentials > Create Credentials > OAuth client ID
// 5. Choose "Web application"
// 6. Add authorized JavaScript origins: http://localhost:3000
// 7. Add authorized redirect URIs: http://localhost:3000
// 8. Copy the Client ID

export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE';
