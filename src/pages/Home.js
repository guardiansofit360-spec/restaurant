import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import categoriesData from '../data/categoriesData.json';
import AvatarPopup from '../components/AvatarPopup';
import firestoreDataService from '../services/firestoreDataService';
import useActiveOrdersCount from '../hooks/useActiveOrdersCount';
import inventoryDataJson from '../data/inventoryData.json';

const Home = ({ user, addToCart, cart = [] }) => {
  // Calculate cart count from prop
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [offerProducts, setOfferProducts] = useState([]);
  const [flyingItem, setFlyingItem] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Get active orders count
  const activeOrdersCount = useActiveOrdersCount(user?.id);

  // Hero slides data
  const heroSlides = [
    {
      title: ['Discover authentic', 'Turkish flavors', 'made fresh daily'],
      emoji: '🍢',
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)'
    },
    {
      title: ['Experience the taste', 'of traditional', 'Turkish cuisine'],
      emoji: '🥙',
      gradient: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)'
    },
    {
      title: ['Fresh ingredients', 'authentic recipes', 'delivered fast'],
      emoji: '🍕',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    }
  ];

  // Load products with offer prices from Firestore
  useEffect(() => {
    const loadOffers = async () => {
      try {
        let menuItems = await firestoreDataService.getMenuItems();
        
        // Initialize if empty
        if (menuItems.length === 0) {
          await firestoreDataService.initializeCollections({
            menuItems: inventoryDataJson,
            categories: categoriesData,
          });
          menuItems = await firestoreDataService.getMenuItems();
        }
        
        // Filter only products that have offer prices
        const productsWithOffers = menuItems.filter(item => item.offerPrice);
        setOfferProducts(productsWithOffers);
      } catch (error) {
        console.error('Error loading offers:', error);
      }
    };

    loadOffers();
  }, []);

  // Real-time listener for menu updates
  useEffect(() => {
    const unsubscribe = firestoreDataService.onMenuItemsChange((updatedItems) => {
      const productsWithOffers = updatedItems.filter(item => item.offerPrice);
      setOfferProducts(productsWithOffers);
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Get first 4 categories for home page
  const categories = categoriesData.slice(0, 4).map(cat => ({
    ...cat,
    name: cat.name === 'Kebabs & Grill' ? 'Kebabs &\nGrill' : 
          cat.name === 'Burgers & Wrap' ? 'Burgers &\nWrap' : cat.name
  }));

  // Filter and use offer products for featured dishes
  const filteredDishes = selectedCategory === 'All' 
    ? offerProducts 
    : offerProducts.filter(item => item.category === selectedCategory);
  
  const dishes = filteredDishes.slice(0, 2).map(item => ({
    ...item,
    time: '25-30 mins'
  }));

  const handleAddToCart = (item, event) => {
    event.preventDefault();
    event.stopPropagation();
    
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
    <div className="home-page">
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

      {/* Hero Slider */}
      <div className="hero-slider">
        <div className="slider-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {heroSlides.map((slide, index) => (
            <div 
              key={index} 
              className={`hero-slide hero-slide-${index + 1} ${currentSlide === index ? 'active' : ''}`}
              style={{ background: slide.gradient }}
            >
              <div className="banner-text">
                {slide.title.map((line, i) => (
                  <h2 key={i}>{line}</h2>
                ))}
                <div className="banner-underline"></div>
              </div>
              <div className="banner-emoji">
                <span>{slide.emoji}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Dots Indicator */}
        <div className="slider-dots">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Category Section */}
      <div className="category-section">
        <div className="section-header">
          <h3>Category</h3>
          <Link to="/menu" className="see-all">See all</Link>
        </div>
        <div className="category-scroll">
          {categories.map((cat, index) => (
            <button
              key={cat.id || cat.name || `cat-${index}`}
              className={`category-btn ${selectedCategory === cat.name ? 'active' : ''}`}
              style={{ 
                '--category-color': cat.color,
                '--category-color-light': cat.color + 'CC'
              }}
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Special Offers Section Header */}
      <div className="offers-header">
        <div className="offers-title">
          <span className="offers-icon">🔥</span>
          <h3>Special Offers</h3>
        </div>
        <p className="offers-subtitle">Limited time deals on your favorites</p>
      </div>

      {/* Dishes Grid */}
      <div className="dishes-section">
        {dishes.map((dish, index) => (
          <div key={dish.id || `dish-${index}`} className="dish-card">
            <div className="best-deal-badge">
              <span>🏆 Best Deal</span>
            </div>
            <Link to="/menu" className="dish-card-link">
              <div className="dish-icon-container" style={{ backgroundColor: dish.bgColor }}>
                <div className="dish-icon">
                  {dish.image && dish.image.startsWith('data:image') ? (
                    <img src={dish.image} alt={dish.name} className="product-image" />
                  ) : (
                    dish.image
                  )}
                </div>
              </div>
              <div className="dish-card-content">
                <h4>{dish.name}</h4>
                <div className="dish-meta">
                  <span className="meta-item">
                    <span className="meta-icon">⏱</span> {dish.time}
                  </span>
                </div>
                <div className="dish-price">
                  {dish.offerPrice ? (
                    <>
                      <span className="original-price">€{dish.price}</span>
                      <span className="offer-price">€{dish.offerPrice}</span>
                    </>
                  ) : (
                    <span className="regular-price">€{dish.price}</span>
                  )}
                </div>
              </div>
            </Link>
            <button 
              className="dish-add-btn" 
              onClick={(e) => handleAddToCart(dish, e)}
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
          {flyingItem.image && flyingItem.image.startsWith('data:image') ? (
            <img src={flyingItem.image} alt="Flying item" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
          ) : (
            flyingItem.image
          )}
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <Link to="/" className="nav-item active">
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

export default Home;
