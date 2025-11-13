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
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore Database
export const db = getFirestore(app);

export default app;
