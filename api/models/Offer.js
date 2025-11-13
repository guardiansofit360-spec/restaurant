const { getDB, COLLECTIONS } = require('../config/database');

class OfferModel {
  static async getCollection() {
    const db = await getDB();
    return db.collection(COLLECTIONS.OFFERS);
  }

  static async findAll() {
    const collection = await this.getCollection();
    return await collection.find({}).toArray();
  }

  static async findActive() {
    const collection = await this.getCollection();
    return await collection.find({ active: true }).toArray();
  }

  static async findById(offerId) {
    const collection = await this.getCollection();
    return await collection.findOne({ id: parseInt(offerId) });
  }

  static async create(offerData) {
    const collection = await this.getCollection();
    const newOffer = {
      ...offerData,
      id: offerData.id || Date.now(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await collection.insertOne(newOffer);
    return newOffer;
  }

  static async update(offerId, updateData) {
    const collection = await this.getCollection();
    const result = await collection.findOneAndUpdate(
      { id: parseInt(offerId) },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return result;
  }

  static async delete(offerId) {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ id: parseInt(offerId) });
    return result.deletedCount > 0;
  }
}

module.exports = OfferModel;
