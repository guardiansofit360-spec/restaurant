# Firebase Storage Setup Guide

## Issue: Profile Picture Upload Stuck at "Uploading..."

This happens when Firebase Storage is not enabled or configured properly.

## Solution: Enable Firebase Storage

### Step 1: Enable Storage in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **Storage** in the left sidebar (under "Build")
4. Click **Get Started** button
5. Click **Next** on the security rules dialog
6. Select a Cloud Storage location (choose closest to your users)
7. Click **Done**

### Step 2: Set Storage Rules (Development Mode)

1. In Firebase Console → Storage → Rules tab
2. Replace the rules with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click **Publish**

**⚠️ WARNING:** These rules allow anyone to read/write. For production, use proper authentication rules.

### Step 3: Verify Storage Bucket

1. Check that your `.env` file has:
```
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
```

2. Verify in Vercel environment variables (if deployed)

### Step 4: Test Upload

1. Refresh your app
2. Go to Profile page
3. Click "📷 Change Photo"
4. Select an image
5. Check browser console (F12) for logs:
   - "File selected: ..."
   - "Starting upload process..."
   - "Upload complete: ..."
   - "Download URL obtained: ..."

## Troubleshooting

### Error: "storage/unauthorized"

**Cause:** Storage rules don't allow upload

**Solution:**
1. Go to Firebase Console → Storage → Rules
2. Make sure rules allow write access
3. Publish the rules
4. Wait 1-2 minutes for rules to propagate

### Error: "Firebase Storage is not initialized"

**Cause:** Storage bucket not configured

**Solution:**
1. Check `.env` file has `REACT_APP_FIREBASE_STORAGE_BUCKET`
2. Restart development server
3. For Vercel: Add environment variable and redeploy

### Upload Stuck at "Uploading..."

**Causes:**
1. Storage not enabled in Firebase
2. Storage rules blocking upload
3. Network issue
4. Large file size

**Solutions:**
1. Enable Storage (see Step 1 above)
2. Check Storage rules (see Step 2 above)
3. Check internet connection
4. Try smaller image (< 1MB)
5. Check browser console for errors

### Error: "storage/unknown"

**Cause:** Storage not enabled or misconfigured

**Solution:**
1. Enable Firebase Storage (Step 1)
2. Wait a few minutes for setup to complete
3. Try again

## Production Storage Rules (Recommended)

For production, use authenticated rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Profile pictures - users can only upload to their own folder
    match /profile-pictures/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Limit file size to 5MB
    match /profile-pictures/{userId}/{fileName} {
      allow write: if request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

## Checking Browser Console

Open browser console (F12) and look for:

**Success logs:**
```
File selected: photo.jpg image/jpeg 123456
Starting upload process...
Storage path: profile-pictures/123/1234567890_photo.jpg
Storage reference created
Uploading file to Firebase Storage...
Upload complete: {...}
Getting download URL...
Download URL obtained: https://...
```

**Error logs:**
```
❌ Error uploading profile picture: FirebaseError: ...
Error code: storage/unauthorized
Error message: ...
```

## Quick Checklist

- [ ] Firebase Storage enabled in Firebase Console
- [ ] Storage rules published (allow read, write: if true)
- [ ] Storage bucket in environment variables
- [ ] App restarted after env changes
- [ ] Browser console shows detailed logs
- [ ] Internet connection working
- [ ] Image file < 5MB

## Still Not Working?

1. **Check Firebase Console → Storage:**
   - Is Storage enabled?
   - Can you see the "Files" tab?
   - Are rules published?

2. **Check Browser Console:**
   - Any red error messages?
   - What's the error code?
   - Share the error message

3. **Try Manual Upload:**
   - Go to Firebase Console → Storage
   - Try uploading a file manually
   - If this fails, Storage isn't properly enabled

4. **Verify Environment:**
   - Check all Firebase env variables are set
   - Restart dev server
   - Clear browser cache
   - Try incognito mode

## Contact Support

If still stuck, provide:
- Browser console screenshot
- Error message
- Firebase project ID
- Whether Storage is enabled in Firebase Console
