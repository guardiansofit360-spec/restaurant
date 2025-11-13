const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./db');
const initializeDatabase = require('./init-db');

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

// Initialize database on startup
initializeDatabase().catch(console.error);

// ============ USER ROUTES ============
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password, phone, address, role, avatar } = req.body;
    const result = await pool.query(
      'INSERT INTO users (name, email, password, phone, address, role, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, email, password, phone, address, role || 'customer', avatar]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/users/:id', async (req, res) => {
  try {
    const { name, email, phone, address, avatar } = req.body;
    const result = await pool.query(
      'UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), phone = COALESCE($3, phone), address = COALESCE($4, address), avatar = COALESCE($5, avatar) WHERE id = $6 RETURNING *',
      [name, email, phone, address, avatar, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ ORDER ROUTES ============
app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/user/:userId', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [req.params.userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/stats/active', async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM orders WHERE status IN ('pending', 'preparing', 'ready')");
    res.json({ count: parseInt(result.rows[0].count) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { userId, items, total, deliveryAddress, paymentMethod } = req.body;
    const result = await pool.query(
      'INSERT INTO orders (user_id, items, total, delivery_address, payment_method, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, JSON.stringify(items), total, deliveryAddress, paymentMethod, 'pending']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Order not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ MENU ITEM ROUTES ============
app.get('/api/menu', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu_items ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/menu/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu_items WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/menu', async (req, res) => {
  try {
    const { name, category, price, image, description, time, difficulty, bgColor } = req.body;
    const result = await pool.query(
      'INSERT INTO menu_items (name, category, price, image, description, time, difficulty, bg_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, category, price, image, description, time, difficulty, bgColor]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/menu/:id', async (req, res) => {
  try {
    const { name, category, price, image, description, time, difficulty, bgColor, available } = req.body;
    const result = await pool.query(
      'UPDATE menu_items SET name = COALESCE($1, name), category = COALESCE($2, category), price = COALESCE($3, price), image = COALESCE($4, image), description = COALESCE($5, description), time = COALESCE($6, time), difficulty = COALESCE($7, difficulty), bg_color = COALESCE($8, bg_color), available = COALESCE($9, available) WHERE id = $10 RETURNING *',
      [name, category, price, image, description, time, difficulty, bgColor, available, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/menu/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM menu_items WHERE id = $1', [req.params.id]);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ CATEGORY ROUTES ============
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { name, icon } = req.body;
    const result = await pool.query(
      'INSERT INTO categories (name, icon) VALUES ($1, $2) RETURNING *',
      [name, icon]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ OFFER ROUTES ============
app.get('/api/offers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM offers ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/offers/active', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM offers WHERE is_active = true AND start_date <= CURRENT_DATE AND end_date >= CURRENT_DATE ORDER BY id'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/offers', async (req, res) => {
  try {
    const { title, description, discount, code, startDate, endDate, isActive, image } = req.body;
    const result = await pool.query(
      'INSERT INTO offers (title, description, discount, code, start_date, end_date, is_active, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [title, description, discount, code, startDate, endDate, isActive, image]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/offers/:id', async (req, res) => {
  try {
    const { title, description, discount, code, startDate, endDate, isActive, image } = req.body;
    const result = await pool.query(
      'UPDATE offers SET title = COALESCE($1, title), description = COALESCE($2, description), discount = COALESCE($3, discount), code = COALESCE($4, code), start_date = COALESCE($5, start_date), end_date = COALESCE($6, end_date), is_active = COALESCE($7, is_active), image = COALESCE($8, image) WHERE id = $9 RETURNING *',
      [title, description, discount, code, startDate, endDate, isActive, image, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Offer not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/offers/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM offers WHERE id = $1', [req.params.id]);
    res.json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ HEALTH CHECK ============
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ 
      status: 'OK', 
      message: 'Restaurant API is running',
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Database connection failed',
      error: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at /api/*`);
});
