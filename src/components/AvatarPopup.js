import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AvatarPopup.css';

const AvatarPopup = ({ user, isOpen, onClose }) => {
  const navigate = useNavigate();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogout = () => {
    // Clear user session but keep cart data
    sessionStorage.removeItem('currentUser');
    onClose();
    navigate('/login');
    window.location.reload();
  };

  const handleProfileClick = () => {
    onClose();
    navigate('/profile');
  };

  if (!isOpen) return null;

  return (
    <div className="avatar-modal-overlay" onClick={onClose}>
      <div className="avatar-modal" onClick={(e) => e.stopPropagation()}>
        <div className="avatar-modal-header">
          <div className="modal-avatar">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.name} className="modal-avatar-img" />
            ) : (
              <span>👤</span>
            )}
          </div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
        <div className="avatar-modal-buttons">
          <button onClick={handleProfileClick} className="modal-btn profile-btn">
            <span className="btn-icon">👤</span>
            <span>Profile</span>
          </button>
          <button onClick={handleLogout} className="modal-btn logout-btn">
            <span className="btn-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarPopup;
