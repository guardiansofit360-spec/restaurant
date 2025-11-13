const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

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

// Data storage paths
const dataDir = path.join(__dirname, '../src/data');
const usersFile = path.join(dataDir, 'usersData.json');
const ordersFile = path.join(dataDir, 'ordersData.json');
const menuFile = path.join(dataDir, 'menuData.json');
const categoriesFile = path.join(dataDir, 'categoriesData.json');
const offersFile = path.join(dataDir, 'offersData.json');

// Helper functions
const readJSON = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    return [];
  }
};

const writeJSON = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// ============ USER ROUTES ============
app.get('/api/users', (req, res) => {
  const users = readJSON(usersFile);
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const users = readJSON(usersFile);
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const users = readJSON(usersFile);
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  writeJSON(usersFile, users);
  res.status(201).json(newUser);
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const users = readJSON(usersFile);
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json(user);
});

app.patch('/api/users/:id', (req, res) => {
  const users = readJSON(usersFile);
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  
  users[index] = { ...users[index], ...req.body };
  writeJSON(usersFile, users);
  res.json(users[index]);
});

// ============ ORDER ROUTES ============
app.get('/api/orders', (req, res) => {
  const orders = readJSON(ordersFile);
  res.json(orders);
});

app.get('/api/orders/user/:userId', (req, res) => {
  const orders = readJSON(ordersFile);
  const userOrders = orders.filter(o => o.userId === parseInt(req.params.userId));
  res.json(userOrders);
});

app.get('/api/orders/stats/active', (req, res) => {
  const orders = readJSON(ordersFile);
  const activeOrders = orders.filter(o => 
    o.status === 'pending' || o.status === 'preparing' || o.status === 'ready'
  );
  res.json({ count: activeOrders.length });
});

app.post('/api/orders', (req, res) => {
  const orders = readJSON(ordersFile);
  const newOrder = {
    id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  orders.push(newOrder);
  writeJSON(ordersFile, orders);
  res.status(201).json(newOrder);
});

app.patch('/api/orders/:id', (req, res) => {
  const orders = readJSON(ordersFile);
  const index = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Order not found' });
  
  orders[index] = { ...orders[index], ...req.body };
  writeJSON(ordersFile, orders);
  res.json(orders[index]);
});

// ============ MENU ITEM ROUTES ============
app.get('/api/menu', (req, res) => {
  const menu = readJSON(menuFile);
  res.json(menu);
});

app.get('/api/menu/:id', (req, res) => {
  const menu = readJSON(menuFile);
  const item = menu.find(m => m.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

app.post('/api/menu', (req, res) => {
  const menu = readJSON(menuFile);
  const newItem = {
    id: menu.length > 0 ? Math.max(...menu.map(m => m.id)) + 1 : 1,
    ...req.body
  };
  menu.push(newItem);
  writeJSON(menuFile, menu);
  res.status(201).json(newItem);
});

app.patch('/api/menu/:id', (req, res) => {
  const menu = readJSON(menuFile);
  const index = menu.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  
  menu[index] = { ...menu[index], ...req.body };
  writeJSON(menuFile, menu);
  res.json(menu[index]);
});

app.delete('/api/menu/:id', (req, res) => {
  const menu = readJSON(menuFile);
  const filtered = menu.filter(m => m.id !== parseInt(req.params.id));
  writeJSON(menuFile, filtered);
  res.json({ message: 'Item deleted successfully' });
});

// ============ CATEGORY ROUTES ============
app.get('/api/categories', (req, res) => {
  const categories = readJSON(categoriesFile);
  res.json(categories);
});

app.post('/api/categories', (req, res) => {
  const categories = readJSON(categoriesFile);
  const newCategory = {
    id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
    ...req.body
  };
  categories.push(newCategory);
  writeJSON(categoriesFile, categories);
  res.status(201).json(newCategory);
});

// ============ OFFER ROUTES ============
app.get('/api/offers', (req, res) => {
  const offers = readJSON(offersFile);
  res.json(offers);
});

app.get('/api/offers/active', (req, res) => {
  const offers = readJSON(offersFile);
  const now = new Date();
  const activeOffers = offers.filter(o => {
    const start = new Date(o.startDate);
    const end = new Date(o.endDate);
    return o.isActive && start <= now && now <= end;
  });
  res.json(activeOffers);
});

app.post('/api/offers', (req, res) => {
  const offers = readJSON(offersFile);
  const newOffer = {
    id: offers.length > 0 ? Math.max(...offers.map(o => o.id)) + 1 : 1,
    ...req.body
  };
  offers.push(newOffer);
  writeJSON(offersFile, offers);
  res.status(201).json(newOffer);
});

app.patch('/api/offers/:id', (req, res) => {
  const offers = readJSON(offersFile);
  const index = offers.findIndex(o => o.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Offer not found' });
  
  offers[index] = { ...offers[index], ...req.body };
  writeJSON(offersFile, offers);
  res.json(offers[index]);
});

app.delete('/api/offers/:id', (req, res) => {
  const offers = readJSON(offersFile);
  const filtered = offers.filter(o => o.id !== parseInt(req.params.id));
  writeJSON(offersFile, filtered);
  res.json({ message: 'Offer deleted successfully' });
});

// ============ HEALTH CHECK ============
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Restaurant API is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at /api/*`);
});
