import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import firestoreDataService from '../services/firestoreDataService';
import userSessionService from '../services/userSessionService';
import usersData from '../data/usersData.json';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  // Initialize users in Firestore on component mount
  useEffect(() => {
    const initUsers = async () => {
      await firestoreDataService.initializeUsers(usersData);
    };
    initUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Login using Firestore
      const user = await firestoreDataService.loginUser(email, password);

      if (user) {
        console.log('Login successful:', user);
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone || '',
          address: user.address || '',
          photoURL: user.photoURL || '',
          googleId: user.googleId || ''
        };

        // Save session to Firestore
        await userSessionService.saveUserSession(userData);
        setUser(userData);

        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/menu');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);

    try {
      // Sign in with Google popup
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      console.log('Google sign-in successful:', googleUser);

      // Check if user exists in Firestore
      let user = await firestoreDataService.getUserByGoogleId(googleUser.uid);

      if (!user) {
        // Create new user in Firestore
        console.log('Creating new user from Google account');
        const newUser = {
          googleId: googleUser.uid,
          name: googleUser.displayName,
          email: googleUser.email,
          phone: googleUser.phoneNumber || '',
          address: '',
          role: 'customer',
          photoURL: googleUser.photoURL || ''
        };
        user = await firestoreDataService.createGoogleUser(newUser);
      }

      // Save session
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || '',
        address: user.address || '',
        photoURL: user.photoURL || '',
        googleId: user.googleId || ''
      };

      await userSessionService.saveUserSession(userData);
      setUser(userData);

      // Navigate based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/menu');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Popup blocked. Please allow popups for this site.');
      } else {
        setError('Google sign-in failed. Please try again.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-header">
        <h1>Login</h1>
        <div className="auth-header-actions">
          <Link to="/support" className="auth-support-btn">
            <span>💬</span>
          </Link>
          <Link to="/register" className="auth-profile-btn">
            <span>👤</span>
          </Link>
        </div>
      </div>

      <div className="auth-container">
        <div className="auth-logo">
          <div className="auth-logo-icon">🍽️</div>
          <h2>Welcome Back!</h2>
          <p>Login to continue ordering</p>
        </div>

        <div className="auth-form">
          {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button
            className="google-signin-btn"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
              <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853" />
              <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
              <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335" />
            </svg>
            {googleLoading ? 'Signing in...' : 'Continue with Google'}
          </button>

          <p className="auth-link">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>

          <div className="demo-info">
            <p><strong>Demo Credentials:</strong></p>
            <p>Admin: admin@admin.com / admin123</p>
            <p>Customer: any email / any password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
