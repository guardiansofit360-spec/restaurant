import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import AvatarPopup from '../../components/AvatarPopup';
import Preloader from '../../components/Preloader';
import firestoreDataService from '../../services/firestoreDataService';
import userSessionService from '../../services/userSessionService';

const Dashboard = () => {
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    menuItems: 0,
    revenueToday: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  // Load user session
  useEffect(() => {
    const loadUser = async () => {
      const session = await userSessionService.getUserSession();
      setUser(session);
    };
    loadUser();
  }, []);

  // Load dashboard stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        // Get all orders
        const allOrders = await firestoreDataService.getAllOrders();
        
        // Total orders
        const totalOrders = allOrders.length;
        
        // Pending orders (pending, preparing, ready)
        const pendingOrders = allOrders.filter(order => {
          const status = order.status?.toLowerCase() || 'pending';
          return status === 'pending' || status === 'preparing' || status === 'ready' || status === 'processing';
        }).length;
        
        // Menu items
        const menuItems = await firestoreDataService.getMenuItems();
        const menuItemsCount = menuItems.length;
        
        // Revenue today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayOrders = allOrders.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= today;
        });
        const revenueToday = todayOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        
        setStats({
          totalOrders,
          pendingOrders,
          menuItems: menuItemsCount,
          revenueToday
        });

        // Generate recent activity from latest orders
        const sortedOrders = [...allOrders].sort((a, b) => {
          const dateA = new Date(a.orderDate || 0);
          const dateB = new Date(b.orderDate || 0);
          return dateB - dateA; // Latest first
        });

        const activities = [];
        
        // Get last 5 orders for activity
        sortedOrders.slice(0, 5).forEach(order => {
          const orderDate = new Date(order.orderDate);
          const now = new Date();
          const diffMs = now - orderDate;
          const diffMins = Math.floor(diffMs / 60000);
          const diffHours = Math.floor(diffMs / 3600000);
          const diffDays = Math.floor(diffMs / 86400000);
          
          let timeAgo;
          if (diffMins < 1) {
            timeAgo = 'Just now';
          } else if (diffMins < 60) {
            timeAgo = `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
          } else if (diffHours < 24) {
            timeAgo = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
          } else {
            timeAgo = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
          }

          const status = order.status?.toLowerCase() || 'pending';
          let message = '';
          
          if (status === 'delivered' || status === 'completed') {
            message = `Order #${order.id} completed`;
          } else if (status === 'shipped') {
            message = `Order #${order.id} shipped`;
          } else if (status === 'processing') {
            message = `Order #${order.id} is being prepared`;
          } else {
            message = `New order #${order.id} received`;
          }

          activities.push({ message, timeAgo });
        });

        setRecentActivity(activities);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      }
    };
    
    loadStats();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const statsDisplay = [
    { title: 'Total Orders', value: stats.totalOrders.toString(), icon: '📦' },
    { title: 'Pending Orders', value: stats.pendingOrders.toString(), icon: '⏳' },
    { title: 'Menu Items', value: stats.menuItems.toString(), icon: '🍽️' },
    { title: 'Revenue Today', value: `€${stats.revenueToday.toFixed(2)}`, icon: '💰' },
  ];

  if (!user) {
    return <Preloader />;
  }

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
        <h1>Dashboard</h1>
        <p className="admin-subtitle">Overview of your restaurant</p>
      </div>

      <div className="stats-grid">
        {statsDisplay.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {recentActivity.length === 0 ? (
            <div className="activity-item">
              <span>No recent activity</span>
              <span className="time">-</span>
            </div>
          ) : (
            recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <span>{activity.message}</span>
                <span className="time">{activity.timeAgo}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <Link to="/admin" className="nav-item active">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-label">Home</span>
        </Link>
        <Link to="/admin/orders" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {stats.pendingOrders > 0 && <span className="orders-count-badge">{stats.pendingOrders}</span>}
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

export default Dashboard;
