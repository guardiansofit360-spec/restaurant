import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
// Replace these values with your actual Firebase project credentials
const firebaseConfig = {
   apiKey: "AIzaSyCOm8t78AWkWNR1ik8qaNWAzQ8j5qrIFRQ",
  authDomain: "restaurant-app-54ff6.firebaseapp.com",
  projectId: "restaurant-app-54ff6",
  storageBucket: "restaurant-app-54ff6.firebasestorage.app",
  messagingSenderId: "975202975421",
  appId: "1:975202975421:web:0d5a84f054f97e71aa01d4",
  measurementId: "G-44JL1JW829"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
