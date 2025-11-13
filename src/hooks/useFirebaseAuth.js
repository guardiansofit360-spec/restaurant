import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export const useFirebaseAuth = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Extract user data
      const userData = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        picture: user.photoURL,
        role: 'customer',
        phone: user.phoneNumber || '',
        address: '',
        provider: 'google'
      };
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      
      // Handle specific error cases
      if (error.code === 'auth/popup-closed-by-user') {
        return { success: false, error: 'Sign-in cancelled' };
      } else if (error.code === 'auth/popup-blocked') {
        return { success: false, error: 'Popup blocked by browser. Please allow popups for this site.' };
      } else {
        return { success: false, error: error.message };
      }
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Sign-Out Error:', error);
      return { success: false, error: error.message };
    }
  };

  return { signInWithGoogle, signOutUser };
};
