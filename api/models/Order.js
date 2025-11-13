const { getDB, COLLECTIONS } = require('../config/database');

class OrderModel {
  static async getCollection() {
    const db = await getDB();
    return db.collection(COLLECTIONS.ORDERS);
  }

  static async findAll() {
    const collection = await this.getCollection();
    return await collection.find({}).sort({ timestamp: -1 }).toArray();
  }

  static async findByUserId(userId) {
    const collection = await this.getCollection();
    return await collection.find({ userId }).sort({ timestamp: -1 }).toArray();
  }

  static async findById(orderId) {
    const collection = await this.getCollection();
    return await collection.findOne({ id: parseInt(orderId) });
  }

  static async create(orderData) {
    const collection = await this.getCollection();
    const newOrder = {
      ...orderData,
      id: orderData.id || Date.now(),
      timestamp: orderData.timestamp || new Date().toISOString(),
      createdAt: new Date()
    };
    
    await collection.insertOne(newOrder);
    return newOrder;
  }

  static async update(orderId, updateData) {
    const collection = await this.getCollection();
    const result = await collection.findOneAndUpdate(
      { id: parseInt(orderId) },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return result;
  }

  static async delete(orderId) {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ id: parseInt(orderId) });
    return result.deletedCount > 0;
  }

  static async getActiveOrdersCount() {
    const collection = await this.getCollection();
    return await collection.countDocuments({
      status: { $nin: ['delivered', 'completed', 'Delivered', 'Completed'] }
    });
  }
}

module.exports = OrderModel;
