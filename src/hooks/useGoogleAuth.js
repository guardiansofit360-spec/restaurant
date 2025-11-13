import { useEffect, useCallback } from 'react';
import { GOOGLE_CLIENT_ID } from '../config/oauth';

export const useGoogleAuth = (onSuccess, onError) => {
  useEffect(() => {
    // Initialize Google Sign-In
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
    }
  }, [handleCredentialResponse]);

  const handleCredentialResponse = useCallback((response) => {
    try {
      // Decode JWT token to get user info
      const userObject = parseJwt(response.credential);
      
      const userData = {
        id: userObject.sub,
        name: userObject.name,
        email: userObject.email,
        picture: userObject.picture,
        provider: 'google'
      };
      
      onSuccess(userData);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      onError(error);
    }
  }, [onSuccess, onError]);

  const signIn = useCallback(() => {
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      console.error('Google Sign-In not loaded');
      onError(new Error('Google Sign-In not available'));
    }
  }, [onError]);

  return { signIn };
};

// Helper function to decode JWT
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
}
