import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from 'firebase/auth';

// Firebase configuration
// Note: These values are safe to expose in client-side code
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCOm8t78AWkWNR1ik8qaNWAzQ8j5qrIFRQ",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "restaurant-app-54ff6.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "restaurant-app-54ff6",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "restaurant-app-54ff6.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "975202975421",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:975202975421:web:0d5a84f054f97e71aa01d4",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-44JL1JW829"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, RecaptchaVerifier };
