import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import apiService from '../services/apiService';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Create new user via API
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address || '',
        role: 'customer'
      };

      console.log('Sending registration request:', newUser);

      // Call API to create user
      const response = await apiService.createUser(newUser);

      console.log('Registration response:', response);

      if (response.error) {
        setError(response.error);
        return;
      }

      alert('Registration successful! Please login with your credentials.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error details:', error);
      setError(`Registration failed: ${error.message || 'Please check if API server is running'}`);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-header">
        <h1>Sign Up</h1>
        <div className="auth-header-actions">
          <Link to="/support" className="auth-support-btn">
            <span>💬</span>
          </Link>
          <Link to="/login" className="auth-profile-btn">
            <span>👤</span>
          </Link>
        </div>
      </div>

      <div className="auth-container">
        <div className="auth-logo">
          <div className="auth-logo-icon">🍽️</div>
          <h2>Create Account</h2>
          <p>Join us and start ordering delicious food</p>
        </div>

        <div className="auth-form">
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Delivery Address (Optional)"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
            <button type="submit">Create Account</button>
          </form>

          <p className="auth-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
