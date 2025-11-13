const { pool } = require('../config/database');

class Category {
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY name');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(categoryData) {
    const { name, color, icon } = categoryData;
    const [result] = await pool.query(
      'INSERT INTO categories (name, color, icon) VALUES (?, ?, ?)',
      [name, color || '#3B82F6', icon || '🍽️']
    );
    return this.findById(result.insertId);
  }
}

module.exports = Category;
