const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file paths
const DATA_DIR = path.join(__dirname, '../src/data');
const ORDERS_FILE = path.join(DATA_DIR, 'ordersData.json');
const USERS_FILE = path.join(DATA_DIR, 'usersData.json');
const INVENTORY_FILE = path.join(DATA_DIR, 'inventoryData.json');
const OFFERS_FILE = path.join(DATA_DIR, 'offersData.json');

// Helper function to read JSON file
async function readJSON(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

// Helper function to write JSON file
async function writeJSON(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

// ============ ORDERS ENDPOINTS ============

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await readJSON(ORDERS_FILE);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get orders by user ID
app.get('/api/orders/user/:userId', async (req, res) => {
  try {
    const orders = await readJSON(ORDERS_FILE);
    const userOrders = orders.filter(order => order.userId === req.params.userId);
    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user orders' });
  }
});

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const orders = await readJSON(ORDERS_FILE);
    const newOrder = {
      ...req.body,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    orders.unshift(newOrder);
    await writeJSON(ORDERS_FILE, orders);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update order status
app.patch('/api/orders/:orderId', async (req, res) => {
  try {
    const orders = await readJSON(ORDERS_FILE);
    const index = orders.findIndex(o => o.id === parseInt(req.params.orderId));
    
    if (index === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    orders[index] = { ...orders[index], ...req.body };
    await writeJSON(ORDERS_FILE, orders);
    res.json(orders[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// ============ USERS ENDPOINTS ============

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await readJSON(USERS_FILE);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create new user
app.post('/api/users', async (req, res) => {
  try {
    const users = await readJSON(USERS_FILE);
    const newUser = {
      ...req.body,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    await writeJSON(USERS_FILE, users);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// ============ INVENTORY ENDPOINTS ============

// Get all inventory
app.get('/api/inventory', async (req, res) => {
  try {
    const inventory = await readJSON(INVENTORY_FILE);
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// Update inventory item
app.patch('/api/inventory/:itemId', async (req, res) => {
  try {
    const inventory = await readJSON(INVENTORY_FILE);
    const index = inventory.findIndex(i => i.id === parseInt(req.params.itemId));
    
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    inventory[index] = { ...inventory[index], ...req.body };
    await writeJSON(INVENTORY_FILE, inventory);
    res.json(inventory[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update inventory' });
  }
});

// ============ OFFERS ENDPOINTS ============

// Get all offers
app.get('/api/offers', async (req, res) => {
  try {
    const offers = await readJSON(OFFERS_FILE);
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch offers' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Restaurant API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Restaurant API server running on http://localhost:${PORT}`);
  console.log(`📁 Data directory: ${DATA_DIR}`);
});
