import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import apiService from '../services/apiService';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
