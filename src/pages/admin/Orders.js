import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import AvatarPopup from '../../components/AvatarPopup';
import { orderManager } from '../../utils/dataManager';
import apiService from '../../services/apiService';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [useApi, setUseApi] = useState(true);
  
  // Get user from sessionStorage
  const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

  // Load orders from API or localStorage on mount and refresh periodically
  React.useEffect(() => {
    const loadOrders = async () => {
      try {
        // Try to load from API first
        const apiOrders = await apiService.getAllOrders();
        if (apiOrders && !apiOrders.error) {
          // Format API orders to match expected structure
          const formattedOrders = apiOrders.map(order => ({
            id: order.id,
            userId: order.user_id,
            customerName: order.customer_name || 'Customer',
            customerEmail: order.customer_email || '',
            items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items,
            total: parseFloat(order.total),
            status: order.status || 'Pending',
            date: new Date(order.created_at).toISOString().split('T')[0],
            time: new Date(order.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
            timestamp: order.created_at,
            address: order.delivery_address || 'Not provided'
          }));
          setOrders(formattedOrders);
          setUseApi(true);
          return;
        }
      } catch (error) {
        console.log('API not available, using localStorage:', error);
      }
      
      // Fallback to localStorage
      const loadedOrders = orderManager.getAllOrders();
      setOrders(loadedOrders);
      setUseApi(false);
    };

    // Initial load
    loadOrders();

    // Refresh orders every 5 seconds to catch new orders
    const interval = setInterval(loadOrders, 5000);

    return () => clearInterval(interval);
  }, []);

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      'Pending': 'Processing',
      'pending': 'Processing',
      'Processing': 'Shipped',
      'processing': 'Shipped',
      'Shipped': 'Delivered',
      'shipped': 'Delivered'
    };
    return statusFlow[currentStatus] || null;
  };

  const updateStatus = async (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const nextStatus = getNextStatus(order.status);
    if (!nextStatus) return;

    try {
      if (useApi) {
        // Update via API
        await apiService.updateOrderStatus(orderId, nextStatus);
      } else {
        // Fallback to localStorage
        orderManager.updateOrderStatus(orderId, nextStatus);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      // Fallback to localStorage
      orderManager.updateOrderStatus(orderId, nextStatus);
    }
    
    // Refresh orders list
    const updatedOrders = orderManager.getAllOrders();
    setOrders(updatedOrders);
  };

  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'delivered':
      case 'completed':
        return '#10B981';
      case 'shipped':
        return '#F59E0B';
      case 'processing':
        return '#3B82F6';
      case 'pending':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const getStatusBackground = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'delivered':
      case 'completed':
        return '#D1FAE5';
      case 'shipped':
        return '#FEF3C7';
      case 'processing':
        return '#DBEAFE';
      case 'pending':
        return '#F3F4F6';
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
    <div className="admin-page">
      {/* User Header */}
      <div className="user-header">
        <div className="user-info">
          <h1>Hi, {user.name || 'Admin'}</h1>
          <p>Administrator</p>
        </div>
        <div className="user-actions">
          <div className="user-avatar" onClick={() => setShowAvatarPopup(true)}>
            <span>👤</span>
          </div>
        </div>
      </div>

      <div className="admin-header-section">
        <h1>Order Management</h1>
        <p className="admin-subtitle">Manage and track all orders</p>
      </div>

      <div className="admin-orders-list">
        {orders.map(order => (
          <div key={order.id} className="admin-order-card">
            <div className="admin-order-header">
              <div>
                <h3>Order #{order.id}</h3>
                <p className="admin-order-customer">{order.customerName || order.customer}</p>
                <p className="admin-order-date">
                  {new Date(order.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                  {order.time && <span className="admin-order-time"> • {order.time}</span>}
                </p>
              </div>
              <div 
                className="admin-order-status"
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
            <div className="admin-order-items">
              {Array.isArray(order.items) ? (
                order.items.map((item, idx) => (
                  <div key={idx} className="admin-order-item">
                    <div className="admin-item-image">
                      {item.image ? (
                        item.image.startsWith('data:') ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <span className="admin-item-emoji">{item.image}</span>
                        )
                      ) : (
                        <span className="admin-item-emoji">🍽️</span>
                      )}
                    </div>
                    <div className="admin-item-info">
                      <div className="admin-item-name">{item.name}</div>
                      <div className="admin-item-meta">
                        <span className="admin-item-quantity">Qty: {item.quantity}</span>
                        <span className="admin-item-price">€{item.price} each</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p><strong>Items:</strong> {order.items}</p>
              )}
              {order.address && (
                <p className="admin-order-address">
                  <strong>📍 Delivery Address:</strong> {order.address}
                </p>
              )}
            </div>
            <div className="admin-order-footer">
              <span className="admin-order-total">€{typeof order.total === 'number' ? order.total.toFixed(2) : order.total}</span>
              <div className="admin-order-action">
                {(order.status.toLowerCase() === 'pending') && (
                  <button 
                    className="status-btn status-btn-processing"
                    onClick={() => updateStatus(order.id)}
                  >
                    Mark as Processing
                  </button>
                )}
                {(order.status.toLowerCase() === 'processing') && (
                  <button 
                    className="status-btn status-btn-shipped"
                    onClick={() => updateStatus(order.id)}
                  >
                    Mark as Shipped
                  </button>
                )}
                {(order.status.toLowerCase() === 'shipped') && (
                  <button 
                    className="status-btn status-btn-delivered"
                    onClick={() => updateStatus(order.id)}
                  >
                    Mark as Delivered
                  </button>
                )}
                {(order.status.toLowerCase() === 'delivered' || order.status.toLowerCase() === 'completed') && (
                  <span className="status-completed">✓ Completed</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <Link to="/admin" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-label">Home</span>
        </Link>
        <Link to="/admin/orders" className="nav-item active">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {orders.filter(order => {
            const status = order.status.toLowerCase();
            return status !== 'delivered' && status !== 'completed';
          }).length > 0 && <span className="orders-count-badge">{orders.filter(order => {
            const status = order.status.toLowerCase();
            return status !== 'delivered' && status !== 'completed';
          }).length}</span>}
          <span className="nav-label">Orders</span>
        </Link>
        <Link to="/admin/inventory" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-label">Inventory</span>
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
