const { pool } = require('../config/database');

class Offer {
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM offers ORDER BY created_at DESC');
    return rows;
  }

  static async findActive() {
    const [rows] = await pool.query(`
      SELECT * FROM offers 
      WHERE active = TRUE 
      AND (valid_from IS NULL OR valid_from <= CURDATE())
      AND (valid_until IS NULL OR valid_until >= CURDATE())
      ORDER BY created_at DESC
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM offers WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(offerData) {
    const { title, description, discountPercentage, code, validFrom, validUntil } = offerData;
    const [result] = await pool.query(
      'INSERT INTO offers (title, description, discount_percentage, code, valid_from, valid_until) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, discountPercentage, code, validFrom, validUntil]
    );
    return this.findById(result.insertId);
  }

  static async update(id, offerData) {
    const { title, description, discountPercentage, code, validFrom, validUntil, active } = offerData;
    await pool.query(
      'UPDATE offers SET title = ?, description = ?, discount_percentage = ?, code = ?, valid_from = ?, valid_until = ?, active = ? WHERE id = ?',
      [title, description, discountPercentage, code, validFrom, validUntil, active, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    await pool.query('DELETE FROM offers WHERE id = ?', [id]);
    return true;
  }
}

module.exports = Offer;
