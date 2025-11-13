const { pool } = require('../config/database');

class Order {
  static async findAll() {
    const [orders] = await pool.query(`
      SELECT o.*, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', oi.menu_item_id,
            'name', oi.item_name,
            'price', oi.item_price,
            'quantity', oi.quantity,
            'image', oi.image
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `);
    
    return orders.map(order => ({
      ...order,
      items: JSON.parse(order.items)
    }));
  }

  static async findByUserId(userId) {
    const [orders] = await pool.query(`
      SELECT o.*, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', oi.menu_item_id,
            'name', oi.item_name,
            'price', oi.item_price,
            'quantity', oi.quantity,
            'image', oi.image
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = ?
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [userId]);
    
    return orders.map(order => ({
      ...order,
      items: JSON.parse(order.items)
    }));
  }

  static async create(orderData) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      const { userId, customerName, customerEmail, items, subtotal, deliveryFee, total, address } = orderData;
      
      // Insert order
      const [orderResult] = await connection.query(
        `INSERT INTO orders (user_id, customer_name, customer_email, subtotal, delivery_fee, total, address, order_date, order_time)
         VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE(), CURTIME())`,
        [userId, customerName, customerEmail, subtotal, deliveryFee || 5.00, total, address || '']
      );
      
      const orderId = orderResult.insertId;
      
      // Insert order items
      for (const item of items) {
        await connection.query(
          'INSERT INTO order_items (order_id, menu_item_id, item_name, item_price, quantity, image) VALUES (?, ?, ?, ?, ?, ?)',
          [orderId, item.id, item.name, item.price, item.quantity, item.image || '']
        );
      }
      
      await connection.commit();
      
      return this.findById(orderId);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async findById(id) {
    const [orders] = await pool.query(`
      SELECT o.*, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', oi.menu_item_id,
            'name', oi.item_name,
            'price', oi.item_price,
            'quantity', oi.quantity,
            'image', oi.image
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.id = ?
      GROUP BY o.id
    `, [id]);
    
    if (orders.length === 0) return null;
    
    return {
      ...orders[0],
      items: JSON.parse(orders[0].items)
    };
  }

  static async updateStatus(id, status) {
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    return this.findById(id);
  }

  static async getActiveCount() {
    const [result] = await pool.query(
      "SELECT COUNT(*) as count FROM orders WHERE status NOT IN ('Delivered', 'Completed')"
    );
    return result[0].count;
  }
}

module.exports = Order;
