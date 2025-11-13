import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      address: user.address || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1>Profile</h1>
        <div></div>
      </div>

      {/* Avatar Section */}
      <div className="profile-avatar-section">
        <div className="profile-avatar-large">
          <span>👤</span>
        </div>
        <h2>{user.name}</h2>
        <p className="profile-role">{user.role === 'admin' ? 'Administrator' : 'Customer'}</p>
      </div>

      {/* Profile Info */}
      <div className="profile-info-section">
        <div className="profile-section-header">
          <h3>Personal Information</h3>
          {!isEditing && (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              ✏️ Edit
            </button>
          )}
        </div>

        <div className="profile-fields">
          <div className="profile-field">
            <label>Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            ) : (
              <div className="field-value">{user.name}</div>
            )}
          </div>

          <div className="profile-field">
            <label>Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            ) : (
              <div className="field-value">{user.email}</div>
            )}
          </div>

          <div className="profile-field">
            <label>Phone</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            ) : (
              <div className="field-value">{user.phone || 'Not provided'}</div>
            )}
          </div>

          <div className="profile-field">
            <label>Default Address</label>
            {isEditing ? (
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your default delivery address"
                rows="3"
              />
            ) : (
              <div className="field-value">{user.address || 'Not provided'}</div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="profile-actions">
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </Link>
        <Link to="/menu" className="nav-item">
          <span className="nav-icon">🔍</span>
          <span className="nav-label">Menu</span>
        </Link>
        <Link to="/cart" className="nav-item cart-nav-item">
          <span className="nav-icon">🛒</span>
          {(() => {
            const cart = JSON.parse(localStorage.getItem('restaurant_cart') || '[]');
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            return count > 0 ? <span className="cart-count-badge">{count}</span> : null;
          })()}
          <span className="nav-label">Cart</span>
        </Link>
        <Link to="/orders" className="nav-item">
          <span className="nav-icon">✓</span>
          <span className="nav-label">Orders</span>
        </Link>
      </nav>
    </div>
  );
};

export default Profile;
