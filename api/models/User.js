const { pool } = require('../config/database');

class User {
  static async findAll() {
    const [rows] = await pool.query('SELECT id, name, email, phone, address, role, created_at FROM users');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      'SELECT id, name, email, phone, address, role, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async create(userData) {
    const { name, email, password, phone, address, role } = userData;
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, password, phone || '', address || '', role || 'customer']
    );
    return this.findById(result.insertId);
  }

  static async update(id, userData) {
    const { name, email, phone, address } = userData;
    await pool.query(
      'UPDATE users SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
      [name, email, phone, address, id]
    );
    return this.findById(id);
  }

  static async login(email, password) {
    const [rows] = await pool.query(
      'SELECT id, name, email, phone, address, role FROM users WHERE email = ? AND password = ?',
      [email, password]
    );
    return rows[0];
  }
}

module.exports = User;
