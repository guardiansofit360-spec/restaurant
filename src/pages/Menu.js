import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import categoriesData from '../data/categoriesData.json';
import AvatarPopup from '../components/AvatarPopup';
import firestoreDataService from '../services/firestoreDataService';
import useActiveOrdersCount from '../hooks/useActiveOrdersCount';
import inventoryDataJson from '../data/inventoryData.json';

const Menu = ({ addToCart, user, cart = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [flyingItem, setFlyingItem] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Calculate cart count from prop
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Get active orders count
  const activeOrdersCount = useActiveOrdersCount(user?.id);

  // Load menu items from Firestore
  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        let menuItems = await firestoreDataService.getMenuItems();
        
        // Initialize with default data if empty
        if (menuItems.length === 0) {
          console.log('Initializing menu from JSON...');
          await firestoreDataService.initializeCollections({
            menuItems: inventoryDataJson,
            categories: categoriesData,
          });
          menuItems = await firestoreDataService.getMenuItems();
        }
        
        setMenuData(menuItems);
      } catch (error) {
        console.error('Error loading menu:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  // Real-time listener for menu updates
  useEffect(() => {
    const unsubscribe = firestoreDataService.onMenuItemsChange((updatedItems) => {
      setMenuData(updatedItems);
    });

    return () => unsubscribe && unsubscribe();
  }, []);



  // Filter and sort menu - Best Deals (with offerPrice) first
  const filteredMenu = (selectedCategory === 'All' 
    ? menuData 
    : menuData.filter(item => item.category === selectedCategory)
  ).sort((a, b) => {
    // Products with offerPrice come first
    if (a.offerPrice && !b.offerPrice) return -1;
    if (!a.offerPrice && b.offerPrice) return 1;
    return 0;
  });

  const handleAddToCart = (item, event) => {
    // Get the clicked element position
    const rect = event.currentTarget.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    // Create flying animation
    setFlyingItem({
      image: item.image,
      startX,
      startY,
      id: Date.now()
    });

    // Add to cart
    addToCart(item);

    // Remove flying item after animation
    setTimeout(() => {
      setFlyingItem(null);
    }, 800);
  };

  return (
    <div className="menu-page">
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
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.name} className="avatar-img" />
                ) : (
                  <span>👤</span>
                )}
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
      
      <div className="category-filter">
        {categoriesData.map(cat => (
          <button
            key={cat.name}
            className={`filter-btn ${selectedCategory === cat.name ? 'active' : ''}`}
            style={{ backgroundColor: selectedCategory === cat.name ? cat.color : '#E5E7EB' }}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredMenu.map((item, index) => (
          <div key={item.id || `menu-item-${index}`} className="menu-card">
            {item.offerPrice && (
              <div className="best-deal-badge">
                <span>🏆 Best Deal</span>
              </div>
            )}
            <div className="menu-image-container" style={{ backgroundColor: item.bgColor }}>
              <div className="menu-image">
                {item.image && item.image.startsWith('data:image') ? (
                  <img src={item.image} alt={item.name} className="product-image" />
                ) : (
                  item.image
                )}
              </div>
              <div className="heart-icon">💗</div>
            </div>
            <div className="menu-card-content">
              <h3>{item.name}</h3>
              <div className="menu-meta">
                <span className="meta-item">
                  <span className="meta-icon">⏱</span> {item.time || '25-30 mins'}
                </span>
              </div>
              <div className="menu-price-section">
                {item.offerPrice ? (
                  <>
                    <span className="original-price">€{item.price}</span>
                    <span className="offer-price">€{item.offerPrice}</span>
                  </>
                ) : (
                  <span className="regular-price">€{item.price}</span>
                )}
              </div>
            </div>
            <button 
              className="menu-add-btn" 
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(item, e);
              }}
            >
              +
            </button>
          </div>
        ))}
      </div>

      {/* Flying Item Animation */}
      {flyingItem && (
        <div 
          className="flying-item"
          style={{
            left: `${flyingItem.startX}px`,
            top: `${flyingItem.startY}px`
          }}
        >
          {flyingItem.image}
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-label">Home</span>
        </Link>
        <Link to="/menu" className="nav-item active">
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
        <Link to="/orders" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {activeOrdersCount > 0 && <span className="orders-count-badge">{activeOrdersCount}</span>}
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

export default Menu;
