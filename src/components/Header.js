import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ user, cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (avatarMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [avatarMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setAvatarMenuOpen(false);
    navigate('/login');
    window.location.reload();
  };

  const handleProfileClick = () => {
    setAvatarMenuOpen(false);
    navigate('/profile');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">🍽️ Turkish Delight</Link>
        
        {user && (
          <div className="header-user-info">
            <div className="header-user-text">
              <span className="header-greeting">Hi, {user.name}</span>
              <span className="header-subtitle">
                {user.role === 'admin' ? 'Administrator' : 'Food Lover & Explorer'}
              </span>
            </div>
            <div 
              className="header-user-avatar"
              onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
            >
              <span>👤</span>
            </div>
          </div>
        )}
        
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/menu" onClick={() => setMenuOpen(false)}>Menu</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          {user ? (
            <>
              {user.role === 'admin' && <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>}
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </nav>
      </div>

      {/* Avatar Popup Modal */}
      {avatarMenuOpen && (
        <div className="avatar-modal-overlay" onClick={() => setAvatarMenuOpen(false)}>
          <div className="avatar-modal" onClick={(e) => e.stopPropagation()}>
            <div className="avatar-modal-header">
              <div className="modal-avatar">
                <span>👤</span>
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
      )}
    </header>
  );
};

export default Header;
