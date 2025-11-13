const { getDB, COLLECTIONS } = require('../config/database');

class UserModel {
  static async getCollection() {
    const db = await getDB();
    return db.collection(COLLECTIONS.USERS);
  }

  static async findAll() {
    const collection = await this.getCollection();
    return await collection.find({}).toArray();
  }

  static async findById(userId) {
    const collection = await this.getCollection();
    return await collection.findOne({ id: userId });
  }

  static async findByEmail(email) {
    const collection = await this.getCollection();
    return await collection.findOne({ email });
  }

  static async create(userData) {
    const collection = await this.getCollection();
    const newUser = {
      ...userData,
      id: userData.id || Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await collection.insertOne(newUser);
    return newUser;
  }

  static async update(userId, updateData) {
    const collection = await this.getCollection();
    const result = await collection.findOneAndUpdate(
      { id: userId },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return result;
  }

  static async delete(userId) {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ id: userId });
    return result.deletedCount > 0;
  }
}

module.exports = UserModel;
