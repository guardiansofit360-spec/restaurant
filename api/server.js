const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/database');
const User = require('./models/User');
const Order = require('./models/Order');
const MenuItem = require('./models/MenuItem');
const Category = require('./models/Category');
const Offer = require('./models/Offer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection on startup
testConnection();

// ============ USER ROUTES ============
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/users/:id', async (req, res) => {
  try {
    const user = await User.update(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ ORDER ROUTES ============
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/user/:userId', async (req, res) => {
  try {
    const orders = await Order.findByUserId(req.params.userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/stats/active', async (req, res) => {
  try {
    const count = await Order.getActiveCount();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.updateStatus(req.params.id, status);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ MENU ITEM ROUTES ============
app.get('/api/menu', async (req, res) => {
  try {
    const items = await MenuItem.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/menu/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/menu', async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/menu/:id', async (req, res) => {
  try {
    const item = await MenuItem.update(req.params.id, req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/menu/:id', async (req, res) => {
  try {
    await MenuItem.delete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ CATEGORY ROUTES ============
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ OFFER ROUTES ============
app.get('/api/offers', async (req, res) => {
  try {
    const offers = await Offer.findAll();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/offers/active', async (req, res) => {
  try {
    const offers = await Offer.findActive();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/offers', async (req, res) => {
  try {
    const offer = await Offer.create(req.body);
    res.status(201).json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/offers/:id', async (req, res) => {
  try {
    const offer = await Offer.update(req.params.id, req.body);
    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/offers/:id', async (req, res) => {
  try {
    await Offer.delete(req.params.id);
    res.json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ HEALTH CHECK ============
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Restaurant API with MySQL is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at /api/*`);
});
