import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import firestoreDataService from '../services/firestoreDataService';
import userSessionService from '../services/userSessionService';
import usersData from '../data/usersData.json';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
          address: user.address || ''
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
