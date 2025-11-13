import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Orders.css';
import AvatarPopup from '../components/AvatarPopup';
import { orderManager } from '../utils/dataManager';
import apiService from '../services/apiService';

const Orders = ({ user, cart = [] }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load orders from API or localStorage
    const loadOrders = async () => {
      try {
        // Try to load from API first
        const apiOrders = await apiService.getUserOrders(user.id);
        if (apiOrders && !apiOrders.error) {
          // Format API orders to match expected structure
          const formattedOrders = apiOrders.map(order => ({
            id: order.id,
            userId: order.user_id,
            customerName: user.name,
            customerEmail: user.email,
            items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items,
            total: parseFloat(order.total),
            status: order.status || 'Pending',
            date: new Date(order.created_at).toISOString().split('T')[0],
            time: new Date(order.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
            timestamp: order.created_at,
            address: order.delivery_address || 'Not provided'
          }));
          setOrders(formattedOrders);
          return;
        }
      } catch (error) {
        console.log('API not available, using localStorage:', error);
      }
      
      // Fallback to localStorage
      const userOrders = orderManager.getUserOrders(user.id);
      setOrders(userOrders);
    };

    loadOrders();
  }, [user, navigate]);

  const handleReorder = (order) => {
    // Add all items from the order to cart
    const cart = JSON.parse(localStorage.getItem('restaurant_cart') || '[]');
    
    order.items.forEach(item => {
      const existingItem = cart.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        cart.push({ ...item });
      }
    });
    
    localStorage.setItem('restaurant_cart', JSON.stringify(cart));
    navigate('/cart');
  };

  if (!user) {
    return null;
  }

  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'delivered':
      case 'completed':
        return '#10B981'; // Green
      case 'shipped':
        return '#F59E0B'; // Orange
      case 'processing':
        return '#3B82F6'; // Blue
      case 'pending':
        return '#6B7280'; // Gray
      default:
        return '#6B7280';
    }
  };

  const getStatusBackground = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'delivered':
      case 'completed':
        return '#D1FAE5'; // Light Green
      case 'shipped':
        return '#FEF3C7'; // Light Orange
      case 'processing':
        return '#DBEAFE'; // Light Blue
      case 'pending':
        return '#F3F4F6'; // Light Gray
      default:
        return '#F3F4F6';
    }
  };

  const getStatusIcon = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'delivered':
      case 'completed':
        return '✓';
      case 'shipped':
        return '🚚';
      case 'processing':
        return '⏳';
      case 'pending':
        return '⏱';
      default:
        return '📦';
    }
  };

  return (
    <div className="orders-page">
      {/* User Header */}
      <div className="user-header">
        {user ? (
          <>
            <div className="user-info">
              <h1>Hi, {user.name}</h1>
              <p>Food Lover & Explorer</p>
            </div>
            <div className="user-actions">
              <Link to="/support" className="support-btn">
                <span>💬</span>
              </Link>
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
      <div className="orders-title-section">
        <h2>My Orders</h2>
        <p>{orders.length} orders placed</p>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">
                    {new Date(order.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                    {order.time && <span className="order-time"> • {order.time}</span>}
                  </p>
                </div>
                <div 
                  className="order-status"
                  style={{ 
                    backgroundColor: getStatusBackground(order.status), 
                    color: getStatusColor(order.status),
                    border: `2px solid ${getStatusColor(order.status)}`
                  }}
                >
                  {getStatusIcon(order.status)}
                  {order.status}
                </div>
              </div>
              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <div className="item-image">
                      {item.image ? (
                        item.image.startsWith('data:') ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <span className="item-emoji">{item.image}</span>
                        )
                      ) : (
                        <span className="item-emoji">🍽️</span>
                      )}
                    </div>
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-meta">
                        <span className="item-quantity">Qty: {item.quantity}</span>
                        <span className="item-price">€{item.price} each</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-total-section">
                <span className="order-total-label">Total Amount</span>
                <span className="order-total">€{order.total.toFixed(2)}</span>
              </div>
              <div className="order-footer">
                <button className="reorder-btn" onClick={() => handleReorder(order)}>
                  🔄 Reorder
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-orders">
            <div className="no-orders-icon">📦</div>
            <h3>No orders yet</h3>
            <p>Start ordering delicious Turkish food!</p>
            <Link to="/menu" className="browse-menu-btn">
              Browse Menu
            </Link>
          </div>
        )}
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
        <Link to="/cart" className="nav-item cart-nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
          <span className="nav-label">Cart</span>
        </Link>
        <Link to="/orders" className="nav-item active">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {(() => {
            const activeOrders = orders.filter(order => 
              order.status.toLowerCase() !== 'delivered' && order.status.toLowerCase() !== 'completed'
            );
            return activeOrders.length > 0 ? <span className="orders-count-badge">{activeOrders.length}</span> : null;
          })()}
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

export default Orders;
