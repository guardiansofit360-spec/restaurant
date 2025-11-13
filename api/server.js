const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB, closeDB } = require('./config/database');
const OrderModel = require('./models/Order');
const UserModel = require('./models/User');
const InventoryModel = require('./models/Inventory');
const OfferModel = require('./models/Offer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB on startup
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

// ============ ORDERS ENDPOINTS ============

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await OrderModel.findAll();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get orders by user ID
app.get('/api/orders/user/:userId', async (req, res) => {
  try {
    const orders = await OrderModel.findByUserId(req.params.userId);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Failed to fetch user orders' });
  }
});

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = await OrderModel.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update order status
app.patch('/api/orders/:orderId', async (req, res) => {
  try {
    const updatedOrder = await OrderModel.update(req.params.orderId, req.body);
    
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Get active orders count
app.get('/api/orders/stats/active', async (req, res) => {
  try {
    const count = await OrderModel.getActiveOrdersCount();
    res.json({ count });
  } catch (error) {
    console.error('Error getting active orders count:', error);
    res.status(500).json({ error: 'Failed to get active orders count' });
  }
});

// ============ USERS ENDPOINTS ============

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
app.get('/api/users/:userId', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create new user
app.post('/api/users', async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update user
app.patch('/api/users/:userId', async (req, res) => {
  try {
    const updatedUser = await UserModel.update(req.params.userId, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// ============ INVENTORY ENDPOINTS ============

// Get all inventory
app.get('/api/inventory', async (req, res) => {
  try {
    const inventory = await InventoryModel.findAll();
    res.json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// Get inventory item by ID
app.get('/api/inventory/:itemId', async (req, res) => {
  try {
    const item = await InventoryModel.findById(req.params.itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error('Error fetching inventory item:', error);
    res.status(500).json({ error: 'Failed to fetch inventory item' });
  }
});

// Create inventory item
app.post('/api/inventory', async (req, res) => {
  try {
    const newItem = await InventoryModel.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating inventory item:', error);
    res.status(500).json({ error: 'Failed to create inventory item' });
  }
});

// Update inventory item
app.patch('/api/inventory/:itemId', async (req, res) => {
  try {
    const updatedItem = await InventoryModel.update(req.params.itemId, req.body);
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ error: 'Failed to update inventory' });
  }
});

// ============ OFFERS ENDPOINTS ============

// Get all offers
app.get('/api/offers', async (req, res) => {
  try {
    const offers = await OfferModel.findAll();
    res.json(offers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ error: 'Failed to fetch offers' });
  }
});

// Get active offers
app.get('/api/offers/active', async (req, res) => {
  try {
    const offers = await OfferModel.findActive();
    res.json(offers);
  } catch (error) {
    console.error('Error fetching active offers:', error);
    res.status(500).json({ error: 'Failed to fetch active offers' });
  }
});

// Create offer
app.post('/api/offers', async (req, res) => {
  try {
    const newOffer = await OfferModel.create(req.body);
    res.status(201).json(newOffer);
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json({ error: 'Failed to create offer' });
  }
});

// Update offer
app.patch('/api/offers/:offerId', async (req, res) => {
  try {
    const updatedOffer = await OfferModel.update(req.params.offerId, req.body);
    if (!updatedOffer) {
      return res.status(404).json({ error: 'Offer not found' });
    }
    res.json(updatedOffer);
  } catch (error) {
    console.error('Error updating offer:', error);
    res.status(500).json({ error: 'Failed to update offer' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Restaurant API is running' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n� Shutrting down gracefully...');
  await closeDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await closeDB();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Restaurant API server running on http://localhost:${PORT}`);
  console.log(`🔗 MongoDB connection established`);
  console.log(`📡 API endpoints available at /api/*`);
});
