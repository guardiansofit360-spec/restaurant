const { getDB, COLLECTIONS } = require('../config/database');

class InventoryModel {
  static async getCollection() {
    const db = await getDB();
    return db.collection(COLLECTIONS.INVENTORY);
  }

  static async findAll() {
    const collection = await this.getCollection();
    return await collection.find({}).toArray();
  }

  static async findById(itemId) {
    const collection = await this.getCollection();
    return await collection.findOne({ id: parseInt(itemId) });
  }

  static async create(itemData) {
    const collection = await this.getCollection();
    const newItem = {
      ...itemData,
      id: itemData.id || Date.now(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await collection.insertOne(newItem);
    return newItem;
  }

  static async update(itemId, updateData) {
    const collection = await this.getCollection();
    const result = await collection.findOneAndUpdate(
      { id: parseInt(itemId) },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return result;
  }

  static async delete(itemId) {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ id: parseInt(itemId) });
    return result.deletedCount > 0;
  }

  static async updateStock(itemId, quantity) {
    const collection = await this.getCollection();
    const result = await collection.findOneAndUpdate(
      { id: parseInt(itemId) },
      { 
        $set: { stock: quantity, updatedAt: new Date() }
      },
      { returnDocument: 'after' }
    );
    return result;
  }
}

module.exports = InventoryModel;
