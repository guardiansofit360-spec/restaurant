const express = require('express');
const cors = require('cors');
require('dotenv').config();

const memoryDb = require('./memory-db');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

console.log('🚀 Starting Restaurant API server...');

// ============ USER ROUTES ============
app.get('/api/users', async (req, res) => {
  try {
    const users = await memoryDb.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await memoryDb.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await memoryDb.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await memoryDb.loginUser(email, password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/users/:id', async (req, res) => {
  try {
    const user = await memoryDb.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ ORDER ROUTES ============
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await memoryDb.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/user/:userId', async (req, res) => {
  try {
    const orders = await memoryDb.getUserOrders(req.params.userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/stats/active', async (req, res) => {
  try {
    const count = await memoryDb.getActiveOrdersCount();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const order = await memoryDb.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await memoryDb.updateOrderStatus(req.params.id, status);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ MENU ITEM ROUTES ============
app.get('/api/menu', async (req, res) => {
  try {
    const items = await memoryDb.getMenuItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/menu/:id', async (req, res) => {
  try {
    const item = await memoryDb.getMenuItem(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/menu', async (req, res) => {
  try {
    const item = await memoryDb.createMenuItem(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/menu/:id', async (req, res) => {
  try {
    const item = await memoryDb.updateMenuItem(req.params.id, req.body);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/menu/:id', async (req, res) => {
  try {
    const deleted = await memoryDb.deleteMenuItem(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ CATEGORY ROUTES ============
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await memoryDb.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const category = await memoryDb.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ OFFER ROUTES ============
app.get('/api/offers', async (req, res) => {
  try {
    const offers = await memoryDb.getOffers();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/offers/active', async (req, res) => {
  try {
    const offers = await memoryDb.getActiveOffers();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/offers', async (req, res) => {
  try {
    const offer = await memoryDb.createOffer(req.body);
    res.status(201).json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/offers/:id', async (req, res) => {
  try {
    const offer = await memoryDb.updateOffer(req.params.id, req.body);
    if (!offer) return res.status(404).json({ error: 'Offer not found' });
    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/offers/:id', async (req, res) => {
  try {
    const deleted = await memoryDb.deleteOffer(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Offer not found' });
    res.json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ HEALTH CHECK ============
app.get('/api/health', async (req, res) => {
  try {
    const health = await memoryDb.healthCheck();
    res.json({ 
      status: 'OK', 
      message: 'Restaurant API is running',
      database: 'In-Memory',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Server error',
      error: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints: /api/*`);
  console.log(`💾 Database: In-Memory (data resets on restart)\n`);
});
