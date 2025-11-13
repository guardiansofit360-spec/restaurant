const { pool } = require('../config/database');

class MenuItem {
  static async findAll() {
    const [rows] = await pool.query(`
      SELECT m.*, c.name as category_name 
      FROM menu_items m
      LEFT JOIN categories c ON m.category_id = c.id
      WHERE m.available = TRUE
      ORDER BY m.name
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM menu_items WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByCategory(categoryId) {
    const [rows] = await pool.query(
      'SELECT * FROM menu_items WHERE category_id = ? AND available = TRUE',
      [categoryId]
    );
    return rows;
  }

  static async create(itemData) {
    const { name, description, price, categoryId, image, bgColor } = itemData;
    const [result] = await pool.query(
      'INSERT INTO menu_items (name, description, price, category_id, image, bg_color) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, categoryId, image || '', bgColor || '#FEF3C7']
    );
    return this.findById(result.insertId);
  }

  static async update(id, itemData) {
    const { name, description, price, categoryId, image, bgColor, available } = itemData;
    await pool.query(
      'UPDATE menu_items SET name = ?, description = ?, price = ?, category_id = ?, image = ?, bg_color = ?, available = ? WHERE id = ?',
      [name, description, price, categoryId, image, bgColor, available, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    await pool.query('DELETE FROM menu_items WHERE id = ?', [id]);
    return true;
  }
}

module.exports = MenuItem;
