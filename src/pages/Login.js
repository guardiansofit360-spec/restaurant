import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithRedirect, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import './Auth.css';
import apiService from '../services/apiService';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle redirect result on component mount
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          await processGoogleUser(result.user);
        }
      } catch (error) {
        console.error('Redirect result error:', error);
        setError('Authentication failed. Please try again.');
      }
    };
    handleRedirectResult();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setError('');
      
      // Try popup first, fallback to redirect if it fails
      try {
        const result = await signInWithPopup(auth, googleProvider);
        await processGoogleUser(result.user);
      } catch (popupError) {
        // If popup is blocked, use redirect
        if (popupError.code === 'auth/popup-blocked' || popupError.code === 'auth/popup-closed-by-user') {
          await signInWithRedirect(auth, googleProvider);
        } else {
          throw popupError;
        }
      }
    } catch (error) {
      console.error('Google login error:', error);
      setError('Google login failed. Please try again.');
    }
  };

  const processGoogleUser = async (user) => {
    try {
      // Create or get user from backend
      const userData = {
        name: user.displayName,
        email: user.email,
        password: 'firebase-auth',
        phone: user.phoneNumber || '',
        address: '',
        role: 'customer',
        avatar: user.photoURL
      };

      // Try to login first
      let finalUser;
      try {
        const response = await apiService.loginUser(user.email, 'firebase-auth');
        if (response.error || !response.id) {
          // User doesn't exist, create new
          const newUser = await apiService.createUser(userData);
          finalUser = newUser;
        } else {
          finalUser = response;
        }
      } catch (apiError) {
        console.error('API Error:', apiError);
        // If API fails, still allow login with Firebase data
        finalUser = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          role: 'customer',
          phone: user.phoneNumber || '',
          address: '',
          avatar: user.photoURL
        };
      }

      const userSession = {
        id: finalUser.id,
        name: finalUser.name,
        email: finalUser.email,
        role: finalUser.role,
        phone: finalUser.phone || '',
        address: finalUser.address || '',
        avatar: finalUser.avatar || user.photoURL
      };

      setUser(userSession);
      sessionStorage.setItem('currentUser', JSON.stringify(userSession));
      
      if (finalUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/menu');
      }
    } catch (error) {
      console.error('Process user error:', error);
      throw error;
    }
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        }
      });
    }
  };

  const handlePhoneLogin = async () => {
    try {
      setError('');
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setError('Verification code sent to your phone!');
    } catch (error) {
      console.error('Phone login error:', error);
      setError('Failed to send verification code. Please check your phone number.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      setError('');
      const result = await confirmationResult.confirm(verificationCode);
      const user = result.user;

      // Create or get user from backend
      const userData = {
        name: user.phoneNumber,
        email: `${user.phoneNumber}@phone.user`,
        password: 'firebase-auth',
        phone: user.phoneNumber,
        address: '',
        role: 'customer',
        avatar: ''
      };

      const response = await apiService.loginUser(userData.email, 'firebase-auth');
      
      let finalUser;
      if (response.error) {
        const newUser = await apiService.createUser(userData);
        finalUser = newUser;
      } else {
        finalUser = response;
      }

      const userSession = {
        id: finalUser.id,
        name: finalUser.name,
        email: finalUser.email,
        role: finalUser.role,
        phone: finalUser.phone || user.phoneNumber,
        address: finalUser.address || '',
        avatar: finalUser.avatar || ''
      };

      setUser(userSession);
      sessionStorage.setItem('currentUser', JSON.stringify(userSession));
      navigate('/menu');
    } catch (error) {
      console.error('Verification error:', error);
      setError('Invalid verification code. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Call API to login
      const response = await apiService.loginUser(email, password);
      
      if (response.error) {
        setError('Invalid email or password');
        return;
      }
      
      if (response.id) {
        const userData = { 
          id: response.id,
          name: response.name, 
          email: response.email, 
          role: response.role,
          phone: response.phone || '',
          address: response.address || ''
        };
        setUser(userData);
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
        
        if (response.role === 'admin') {
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
          {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
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
            <button type="submit">Login</button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <div className="social-login-buttons">
            <button className="social-btn google-btn" onClick={handleGoogleLogin}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button 
              className="social-btn phone-btn" 
              onClick={() => setShowPhoneLogin(!showPhoneLogin)}
            >
              <span style={{ fontSize: '20px' }}>📱</span>
              Continue with Phone
            </button>
          </div>

          {showPhoneLogin && (
            <div className="phone-login-section">
              {!confirmationResult ? (
                <>
                  <input
                    type="tel"
                    placeholder="Phone Number (e.g., +1234567890)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <button onClick={handlePhoneLogin} className="verify-btn">
                    Send Verification Code
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength="6"
                  />
                  <button onClick={handleVerifyCode} className="verify-btn">
                    Verify Code
                  </button>
                </>
              )}
            </div>
          )}

          <div id="recaptcha-container"></div>

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
