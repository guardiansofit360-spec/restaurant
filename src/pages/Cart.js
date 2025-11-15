import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import './Cart.css';
import AvatarPopup from '../components/AvatarPopup';
import orderCompleteAnimation from '../img/Order completed.json';
import notFoundAnimation from '../img/Not Found.json';
import useActiveOrdersCount from '../hooks/useActiveOrdersCount';

const Cart = ({ cart, updateQuantity, removeFromCart, clearCart, user }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [activeOrdersCount, setActiveOrdersCount] = useState(0);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  // Checkout form state
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Auto-fill checkout form with user profile data
  useEffect(() => {
    if (user) {
      console.log('Auto-filling checkout form with user data:', user);
      setCheckoutData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  // Get active orders count
  // Get active orders count using hook
  const activeOrdersCountFromHook = useActiveOrdersCount(user?.id);
  
  useEffect(() => {
    setActiveOrdersCount(activeOrdersCountFromHook);
  }, [activeOrdersCountFromHook]);

  const playSuccessSound = () => {
    // Create success sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // First note (higher)
    const oscillator1 = audioContext.createOscillator();
    const gainNode1 = audioContext.createGain();
    oscillator1.connect(gainNode1);
    gainNode1.connect(audioContext.destination);
    oscillator1.frequency.value = 800;
    oscillator1.type = 'sine';
    gainNode1.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    oscillator1.start(audioContext.currentTime);
    oscillator1.stop(audioContext.currentTime + 0.3);
    
    // Second note (lower, delayed)
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();
    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);
    oscillator2.frequency.value = 600;
    oscillator2.type = 'sine';
    gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime + 0.15);
    gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    oscillator2.start(audioContext.currentTime + 0.15);
    oscillator2.stop(audioContext.currentTime + 0.5);
  };

  const handleCheckoutClick = () => {
    if (cart.length > 0 && user) {
      setShowCheckoutForm(true);
    }
  };

  const handleCheckoutFormChange = (e) => {
    setCheckoutData({
      ...checkoutData,
      [e.target.name]: e.target.value
    });
  };

  const handleConfirmOrder = async () => {
    // Prevent multiple submissions
    if (isPlacingOrder) {
      return;
    }

    console.log('🔔 handleConfirmOrder called!');
    console.log('Cart length:', cart.length);
    console.log('User:', user);
    console.log('Checkout data:', checkoutData);
    
    // Validate form
    if (!checkoutData.name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!checkoutData.phone.trim()) {
      alert('Please enter your phone number');
      return;
    }
    if (!checkoutData.address.trim()) {
      alert('Please enter your delivery address');
      return;
    }

    if (cart.length > 0 && user) {
      setIsPlacingOrder(true);
      
      // Check internet connection
      if (!navigator.onLine) {
        alert('No internet connection. Please check your network and try again.');
        setIsPlacingOrder(false);
        return;
      }
      
      try {
        // Create new order with timestamp
        const orderDate = new Date();
        const orderData = {
          user_id: user.id,
          customer_name: checkoutData.name,
          customer_email: user.email || '',
          customer_phone: checkoutData.phone,
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
          subtotal: total,
          delivery_fee: 5.00,
          total: total + 5.00, // Include delivery fee
          delivery_address: checkoutData.address,
          payment_method: 'Cash on Delivery',
          status: 'pending'
        };

        // Save to Firestore directly (API database doesn't support customer fields yet)
        console.log('💾 Saving order to Firestore...');
        const firestoreDataService = require('../services/firestoreDataService').default;
        const newOrder = {
          userId: String(user.id || user.userId),
          customerName: checkoutData.name,
          customerEmail: user.email || '',
          customerPhone: checkoutData.phone,
          items: orderData.items,
          subtotal: total,
          deliveryFee: 5.00,
          total: orderData.total,
          status: 'pending',
          address: checkoutData.address,
          paymentMethod: orderData.payment_method
        };
        console.log('=== ORDER DEBUG ===');
        console.log('User object:', user);
        console.log('Checkout form data:', checkoutData);
        console.log('Creating order with data:', newOrder);
        console.log('==================');
        
        try {
          const createdOrder = await firestoreDataService.createOrder(newOrder);
          console.log('✅ Order created successfully:', createdOrder);
        } catch (firestoreError) {
          console.error('❌ Firestore error details:', firestoreError);
          console.error('Error code:', firestoreError.code);
          console.error('Error message:', firestoreError.message);
          throw new Error(`Failed to save order: ${firestoreError.message}`);
        }

        // Update active orders count
        try {
          const activeCount = await firestoreDataService.getActiveOrdersCount();
          setActiveOrdersCount(activeCount);
        } catch (countError) {
          console.warn('Could not update active orders count:', countError);
          // Don't fail the order if count update fails
        }

        // Play success sound
        playSuccessSound();

        // Clear cart and show success message
        clearCart();
        setOrderPlaced(true);
        setIsPlacingOrder(false);
        // Don't auto-hide - let user navigate away naturally
      } catch (error) {
        console.error('❌ Checkout error:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          stack: error.stack
        });
        
        // Show more specific error message
        let errorMessage = 'Failed to place order. ';
        if (error.message.includes('permission-denied')) {
          errorMessage += 'Permission denied. Please check your internet connection and try again.';
        } else if (error.message.includes('network')) {
          errorMessage += 'Network error. Please check your internet connection.';
        } else if (error.message) {
          errorMessage += error.message;
        } else {
          errorMessage += 'Please try again.';
        }
        
        alert(errorMessage);
        setIsPlacingOrder(false);
      }
    }
  };

  // Food quotes related to Turkish cuisine and restaurant categories
  const foodQuotes = [
    { quote: "Turkish kebabs are grilled to perfection, combining centuries of culinary tradition with bold, smoky flavors.", icon: "🍢" },
    { quote: "Did you know? Döner kebab was invented in Turkey in the 19th century and has become a global favorite!", icon: "🥙" },
    { quote: "Turkish tea is more than a drink - it's a symbol of hospitality and friendship in Turkish culture.", icon: "🍵" },
    { quote: "Baklava, with its 40 layers of phyllo dough, represents the pinnacle of Turkish dessert craftsmanship.", icon: "🥮" },
    { quote: "Turkish pizza (Lahmacun) is so thin and crispy, it's meant to be rolled up and eaten by hand!", icon: "🍕" },
    { quote: "Ayran, the traditional yogurt drink, has been refreshing people in Turkey for over 1000 years.", icon: "🥛" },
    { quote: "Turkish cuisine is one of the world's three great cuisines, alongside French and Chinese.", icon: "🍽️" },
    { quote: "The secret to perfect kebabs? Marinating the meat for at least 24 hours with Turkish spices!", icon: "🔥" },
    { quote: "Turkish coffee is so strong and flavorful, UNESCO added it to the Intangible Cultural Heritage list.", icon: "☕" },
    { quote: "Hummus and mezze platters are the perfect way to start any Turkish feast - sharing is caring!", icon: "🫘" }
  ];

  const getRandomQuote = () => {
    return foodQuotes[Math.floor(Math.random() * foodQuotes.length)];
  };

  const [randomQuote] = React.useState(getRandomQuote());

  if (orderPlaced) {
    return (
      <div className="cart-page">
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
        <div className="success-message">
          <div className="success-animation-container">
            <Lottie 
              animationData={orderCompleteAnimation} 
              loop={true}
              className="success-lottie"
            />
          </div>
          <h2>Order Placed Successfully!</h2>
          <p>Your delicious food will be delivered in 30 minutes</p>
          <div className="food-quote-card">
            <div className="quote-icon-wrapper">
              <svg className="quote-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8V11C6 13.2091 7.79086 15 10 15V17C7.79086 17 6 15.2091 6 13V8C6 5.79086 7.79086 4 10 4C12.2091 4 14 5.79086 14 8V9H10V8Z" fill="currentColor"/>
                <path d="M20 8C20 6.89543 19.1046 6 18 6C16.8954 6 16 6.89543 16 8V11C16 13.2091 17.7909 15 20 15V17C17.7909 17 16 15.2091 16 13V8C16 5.79086 17.7909 4 20 4C22.2091 4 24 5.79086 24 8V9H20V8Z" fill="currentColor"/>
              </svg>
            </div>
            <p className="quote-text">{randomQuote.quote}</p>
          </div>
        </div>
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
          <Link to="/cart" className="nav-item cart-nav-item active">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>{cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}<span className="nav-label">Cart</span>
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
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page">
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
        <div className="empty-cart">
          <div className="empty-cart-animation">
            <Lottie 
              animationData={notFoundAnimation} 
              loop={true}
              className="empty-cart-lottie"
            />
          </div>
          <h3>Your cart is empty</h3>
          <p>Add some delicious items to get started!</p>
          <Link to="/menu" className="btn-primary">Browse Menu</Link>
        </div>
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
          <Link to="/cart" className="nav-item cart-nav-item active">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>{cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}<span className="nav-label">Cart</span>
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
  }

  return (
    <div className="cart-page">
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
      
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-image" style={{ backgroundColor: item.bgColor || '#FEF3C7' }}>
              {item.image && item.image.startsWith('data:image') ? (
                <img src={item.image} alt={item.name} className="cart-product-image" />
              ) : (
                <span className="cart-item-emoji">{item.image || '🍽️'}</span>
              )}
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-price">€{item.price}</p>
            </div>
            <div className="item-actions">
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Order Summary</h2>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>€{total.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Delivery Fee</span>
          <span>€5.00</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>€{(total + 5).toFixed(2)}</span>
        </div>
        <button className="checkout-btn" onClick={handleCheckoutClick}>
          Proceed to Checkout
        </button>
      </div>

      {/* Checkout Form Modal */}
      {showCheckoutForm && (
        <div className="checkout-modal-overlay" onClick={() => setShowCheckoutForm(false)}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Order Details</h2>
            <p className="checkout-subtitle">Please verify your information</p>
            
            <form className="checkout-form" onSubmit={(e) => { e.preventDefault(); handleConfirmOrder(); }}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={checkoutData.name}
                  onChange={handleCheckoutFormChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={checkoutData.phone}
                  onChange={handleCheckoutFormChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Delivery Address *</label>
                <textarea
                  name="address"
                  value={checkoutData.address}
                  onChange={handleCheckoutFormChange}
                  placeholder="Enter your complete delivery address"
                  rows="3"
                  required
                />
              </div>

              <div className="checkout-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee:</span>
                  <span>€5.00</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>€{(total + 5).toFixed(2)}</span>
                </div>
              </div>

              <div className="checkout-actions">
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={() => setShowCheckoutForm(false)}
                  disabled={isPlacingOrder}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="confirm-btn"
                  disabled={isPlacingOrder}
                >
                  {isPlacingOrder ? 'Placing Order...' : 'Confirm & Place Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
        <Link to="/cart" className="nav-item cart-nav-item active">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>{cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}<span className="nav-label">Cart</span>
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

export default Cart;




