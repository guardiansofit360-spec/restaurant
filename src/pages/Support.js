import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Support.css';
import AvatarPopup from '../components/AvatarPopup';

const Support = ({ user }) => {
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);

  const supportOptions = [
    {
      icon: '📞',
      title: 'Call Us',
      description: 'Speak with our support team',
      detail: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Send us your queries',
      detail: 'support@turkishfood.com',
      action: 'mailto:support@turkishfood.com'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Chat with us instantly',
      detail: 'Available 24/7',
      action: '#'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      description: 'Come to our restaurant',
      detail: '123 Turkish Street, Food City',
      action: '#'
    }
  ];

  const faqs = [
    {
      question: 'What are your delivery hours?',
      answer: 'We deliver from 10:00 AM to 11:00 PM, 7 days a week.'
    },
    {
      question: 'How long does delivery take?',
      answer: 'Most orders are delivered within 25-30 minutes.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer full refunds for cancelled orders and quality issues.'
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes, you can track your order status in the Orders page.'
    }
  ];

  return (
    <div className="support-page">
      {/* User Header */}
      <div className="user-header">
        {user ? (
          <>
            <div className="user-info">
              <h1>Hi, {user.name}</h1>
              <p>Food Lover & Explorer</p>
            </div>
            <div className="user-actions">
              <div className="user-avatar" onClick={() => setShowAvatarPopup(true)}>
                <span>👤</span>
              </div>
            </div>
          </>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="signup-btn">Sign Up</Link>
          </div>
        )}
      </div>

      {/* Page Title */}
      <div className="support-title-section">
        <h2>Customer Support</h2>
        <p>We're here to help you 24/7</p>
      </div>

      {/* Support Options */}
      <div className="support-options">
        {supportOptions.map((option, index) => (
          <a 
            key={index} 
            href={option.action} 
            className="support-card"
            onClick={(e) => {
              if (option.action === '#') {
                e.preventDefault();
                alert('This feature will be available soon!');
              }
            }}
          >
            <div className="support-icon">{option.icon}</div>
            <div className="support-content">
              <h3>{option.title}</h3>
              <p className="support-description">{option.description}</p>
              <p className="support-detail">{option.detail}</p>
            </div>
          </a>
        ))}
      </div>

      {/* FAQs Section */}
      <div className="faq-section">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-label">Home</span>
        </Link>
        <Link to="/menu" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-label">Menu</span>
        </Link>
        <Link to="/cart" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-label">Cart</span>
        </Link>
        <Link to="/orders" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-label">Orders</span>
        </Link>
      </nav>

      {/* Avatar Popup */}
      {user && (
        <AvatarPopup 
          user={user} 
          isOpen={showAvatarPopup} 
          onClose={() => setShowAvatarPopup(false)} 
        />
      )}
    </div>
  );
};

export default Support;
