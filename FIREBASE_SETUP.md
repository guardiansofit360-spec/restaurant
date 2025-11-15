# Firebase Firestore Integration Guide

## 📦 Installation

Firebase has been installed with:
```bash
npm install firebase
```

## 🔧 Firebase Project Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "restaurant-app")
4. (Optional) Enable Google Analytics
5. Click "Create project"

### 2. Register Your Web App

1. In your Firebase project, click the **Web icon** (`</>`) to add a web app
2. Register your app with a nickname (e.g., "Restaurant Web App")
3. (Optional) Set up Firebase Hosting
4. Click "Register app"

### 3. Get Your Firebase Configuration

After registering, you'll see your Firebase configuration object:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 4. Enable Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose **Start in test mode** (for development)
4. Select a Cloud Firestore location (choose closest to your users)
5. Click "Enable"

### 5. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` and add your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

3. **Important:** Never commit `.env` to version control!

## 🚀 Running the App

### Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

### Test Firebase Demo

To test the Firebase integration, temporarily change your `src/index.js`:

```javascript
import FirebaseDemo from './App-firebase-demo';

// Replace App with FirebaseDemo
root.render(
  <React.StrictMode>
    <FirebaseDemo />
  </React.StrictMode>
);
```

Then restart the dev server.

## 🧪 Testing CRUD Operations

### 1. Add a Note
- Type text in the input field
- Click "Add Note"
- Note appears in the list immediately (real-time)

### 2. Update a Note
- Click "Edit" on any note
- Modify the text
- Click "Save"
- Changes appear immediately

### 3. Complete/Uncomplete a Note
- Click "Complete" to mark as done (strikethrough)
- Click "Undo" to mark as incomplete

### 4. Get Note by ID
- Click "Get by ID" on any note
- Note details appear in a separate box below
- Demonstrates single document fetch

### 5. Delete a Note
- Click "Delete" on any note
- Confirm the deletion
- Note is removed immediately

### 6. Manual Fetch
- Click "Fetch All Notes Manually"
- Demonstrates non-realtime fetching
- Shows all notes in a separate list

## 📁 Project Structure

```
src/
├── firebase.js                 # Firebase initialization
├── lib/
│   └── firestoreService.js    # Firestore CRUD operations
├── hooks/
│   └── useCollection.js       # Real-time collection hook
├── App.js                     # Your main restaurant app (unchanged)
└── App-firebase-demo.js       # Firebase demo app
```

## 🔐 Firestore Security Rules

### Development Rules (Current)

The current rules in `firestore.rules` allow all read/write access:

```javascript
match /{document=**} {
  allow read, write: if true;
}
```

**⚠️ WARNING:** These rules are for development only!

### Deploying Rules to Firebase

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init firestore
   ```
   - Select your Firebase project
   - Accept default file names

4. Deploy rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

### Production Rules

For production, implement proper security rules. Examples in `firestore.rules`:

**Authenticated users only:**
```javascript
match /notes/{noteId} {
  allow read, write: if request.auth != null;
}
```

**User-specific data:**
```javascript
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

**Role-based access:**
```javascript
match /admin/{document=**} {
  allow read, write: if request.auth != null && 
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

## 📚 API Reference

### firestoreService.js Functions

```javascript
// Initialize (already done in firebase.js)
init()

// Add document
addDocument(collectionName, data) → Promise<docId>

// Get all documents
getDocuments(collectionName) → Promise<Array>

// Get single document
getDocById(collectionName, id) → Promise<object|null>

// Update document
updateDocById(collectionName, id, data) → Promise<void>

// Delete document
deleteDocById(collectionName, id) → Promise<void>

// Real-time listener
onCollectionSnapshot(collectionName, callback) → unsubscribe function
```

### useCollection Hook

```javascript
const { items, loading, error } = useCollection('collectionName');
```

Returns:
- `items`: Array of documents with real-time updates
- `loading`: Boolean indicating loading state
- `error`: Error object if any

## 🔄 Integrating with Your Restaurant App

To use Firestore in your restaurant app:

1. **Store menu items:**
   ```javascript
   import { addDocument } from './lib/firestoreService';
   
   await addDocument('menuItems', {
     name: 'Pizza',
     price: 12.99,
     category: 'Main Course'
   });
   ```

2. **Real-time menu updates:**
   ```javascript
   import useCollection from './hooks/useCollection';
   
   function Menu() {
     const { items: menuItems, loading } = useCollection('menuItems');
     // menuItems updates automatically
   }
   ```

3. **Store orders:**
   ```javascript
   await addDocument('orders', {
     userId: user.id,
     items: cart,
     total: calculateTotal(cart),
     status: 'pending'
   });
   ```

## 🐛 Troubleshooting

### "Firebase not configured" error
- Check that all `REACT_APP_FIREBASE_*` variables are set in `.env`
- Restart the dev server after changing `.env`

### "Permission denied" error
- Check Firestore security rules in Firebase Console
- Ensure rules allow the operation you're trying to perform

### Real-time updates not working
- Check browser console for errors
- Verify Firestore is enabled in Firebase Console
- Check network tab for WebSocket connections

## 📖 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)

## ✅ Next Steps

1. ✅ Firebase installed
2. ✅ Configuration files created
3. ✅ Service functions implemented
4. ✅ React hook created
5. ✅ Demo app created
6. ⬜ Create Firebase project
7. ⬜ Configure environment variables
8. ⬜ Test the demo app
9. ⬜ Integrate with your restaurant app
10. ⬜ Set up production security rules
