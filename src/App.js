import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Support from './pages/Support';
import AdminDashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/Orders';
import AdminInventory from './pages/admin/Inventory';
import Preloader from './components/Preloader';
import userSessionService from './services/userSessionService';
import './App.css';

function AppContent({ user, cart, addToCart, updateQuantity, removeFromCart, clearCart, setUser }) {
  // Hide header on all pages (each page will have its own header)
  const hideHeader = true;

  return (
    <div className="App">
      {!hideHeader && <Header user={user} cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />}
      <Routes>
        <Route path="/" element={<Home user={user} addToCart={addToCart} cart={cart} />} />
        <Route path="/menu" element={<Menu addToCart={addToCart} user={user} cart={cart} />} />
        <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        <Route path="/orders" element={<Orders user={user} cart={cart} />} />
        <Route path="/support" element={<Support user={user} />} />
        <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin/orders" element={user?.role === 'admin' ? <AdminOrders /> : <Navigate to="/login" />} />
        <Route path="/admin/inventory" element={user?.role === 'admin' ? <AdminInventory /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user and cart from Firestore on app start
  useEffect(() => {
    const loadUserSession = async () => {
      try {
        const session = await userSessionService.getUserSession();
        if (session) {
          setUser({
            id: session.userId,
            name: session.name,
            email: session.email,
            role: session.role,
            phone: session.phone,
            address: session.address,
          });
          
          // Load user's cart from Firestore
          const savedCart = await userSessionService.getCart(session.userId);
          setCart(savedCart);
        }
      } catch (error) {
        console.error('Error loading user session:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserSession();
  }, []);

  // Save cart to Firestore whenever it changes
  useEffect(() => {
    const saveCartToFirestore = async () => {
      if (user && !loading) {
        try {
          await userSessionService.saveCart(user.id, cart);
        } catch (error) {
          console.error('Error saving cart:', error);
        }
      }
    };

    saveCartToFirestore();
  }, [cart, user, loading]);

  const addToCart = (item) => {
    let newCart;
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      newCart = cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }
    setCart(newCart);
  };

  const removeFromCart = (itemId) => {
    const newCart = cart.filter(i => i.id !== itemId);
    setCart(newCart);
  };

  const updateQuantity = (itemId, quantity) => {
    let newCart;
    if (quantity <= 0) {
      newCart = cart.filter(i => i.id !== itemId);
    } else {
      newCart = cart.map(i => i.id === itemId ? { ...i, quantity } : i);
    }
    setCart(newCart);
  };

  const clearCart = async () => {
    setCart([]);
    if (user) {
      try {
        await userSessionService.clearCart(user.id);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  // Show loading state while checking session
  if (loading) {
    return <Preloader />;
  }

  return (
    <Router>
      <AppContent 
        user={user} 
        cart={cart} 
        addToCart={addToCart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        setUser={setUser}
      />
    </Router>
  );
}

export default App;
