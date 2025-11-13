import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import usersData from '../data/usersData.json';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Check if Google Client ID is configured
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    
    if (!clientId || clientId === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
      // Demo mode - working Google login simulation
      const googleUser = {
        id: 'google_' + Date.now(),
        name: 'Google User',
        email: 'user@gmail.com',
        picture: '👤',
        role: 'customer',
        phone: '',
        address: '',
        provider: 'google'
      };
      
      setUser(googleUser);
      sessionStorage.setItem('currentUser', JSON.stringify(googleUser));
      navigate('/menu');
      return;
    }

    // Real Google OAuth (when Client ID is configured)
    googleSignIn();
  };

  const handleGoogleSuccess = (userData) => {
    const user = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      picture: userData.picture,
      role: 'customer',
      phone: '',
      address: '',
      provider: 'google'
    };
    
    setUser(user);
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    navigate('/menu');
  };

  const handleGoogleError = (error) => {
    console.error('Google login error:', error);
    alert('Google login failed. Please try again or use email/password login.');
  };

  // Initialize Google Auth hook
  const { signIn: googleSignIn } = useGoogleAuth(handleGoogleSuccess, handleGoogleError);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Load users from localStorage or use JSON data
    const storedUsers = localStorage.getItem('restaurant_users');
    const users = storedUsers ? JSON.parse(storedUsers) : usersData;
    
    // Check against users data
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const userData = { 
        id: user.id,
        name: user.name, 
        email: user.email, 
        role: user.role,
        phone: user.phone,
        address: user.address
      };
      setUser(userData);
      sessionStorage.setItem('currentUser', JSON.stringify(userData));
      
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/menu');
      }
    } else {
      // Allow any login for demo
      const demoUser = { 
        id: Date.now(),
        name: email.split('@')[0], 
        email, 
        role: 'customer',
        phone: '',
        address: ''
      };
      setUser(demoUser);
      sessionStorage.setItem('currentUser', JSON.stringify(demoUser));
      navigate('/menu');
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
            <button className="social-btn google-btn" onClick={(e) => {
              e.preventDefault();
              handleGoogleLogin();
            }}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>
          
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
