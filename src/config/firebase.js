import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOm8t78AWkWNR1ik8qaNWAzQ8j5qrIFRQ",
  authDomain: "restaurant-app-54ff6.firebaseapp.com",
  projectId: "restaurant-app-54ff6",
  storageBucket: "restaurant-app-54ff6.firebasestorage.app",
  messagingSenderId: "975202975421",
  appId: "1:975202975421:web:0d5a84f054f97e71aa01d4"
};

// Initialize Firebase
let app;
let auth;
let googleProvider;
let db;

try {
  app = initializeApp(firebaseConfig);
  
  // Initialize Firebase Authentication
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  
  // Initialize Firestore Database (optional)
  try {
    db = getFirestore(app);
  } catch (firestoreError) {
    console.log('Firestore not enabled yet');
    db = null;
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export { auth, googleProvider, db };
export default app;
