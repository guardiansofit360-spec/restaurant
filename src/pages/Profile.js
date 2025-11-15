import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import userSessionService from '../services/userSessionService';
import firestoreDataService from '../services/firestoreDataService';
import './Profile.css';

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
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

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      // Create a reference to the storage location
      const storageRef = ref(storage, `profile-pictures/${user.id}/${Date.now()}_${file.name}`);
      
      // Upload the file
      console.log('Uploading profile picture...');
      await uploadBytes(storageRef, file);
      
      // Get the download URL
      const photoURL = await getDownloadURL(storageRef);
      console.log('Profile picture uploaded:', photoURL);
      
      // Update user with new photo URL
      const updatedUser = { ...user, photoURL };
      
      // Save to Firestore
      await userSessionService.saveUserSession(updatedUser);
      
      // Update users collection in Firestore
      if (user.id) {
        await firestoreDataService.updateUser(user.id, { photoURL });
      }
      
      setUser(updatedUser);
      alert('Profile picture updated successfully!');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Failed to upload profile picture. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const updatedUser = { ...user, ...formData };
      
      // Save to Firestore
      await userSessionService.saveUserSession(updatedUser);
      
      // Update users collection in Firestore
      if (user.id) {
        await firestoreDataService.updateUser(user.id, formData);
      }
      
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await userSessionService.clearUserSession();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
        <div className="profile-avatar-container">
          <div className="profile-avatar-large">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.name} className="profile-avatar-img" />
            ) : (
              <span>👤</span>
            )}
          </div>
          <label htmlFor="profile-picture-upload" className="profile-picture-upload-btn">
            <input
              type="file"
              id="profile-picture-upload"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              style={{ display: 'none' }}
              disabled={uploading}
            />
            {uploading ? '⏳ Uploading...' : '📷 Change Photo'}
          </label>
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

      {/* Logout Section */}
      <div className="profile-info-section" style={{ marginTop: '20px' }}>
        <button 
          className="save-btn" 
          onClick={handleLogout}
          style={{ 
            width: '100%', 
            backgroundColor: '#dc3545',
            padding: '15px'
          }}
        >
          🚪 Logout
        </button>
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
