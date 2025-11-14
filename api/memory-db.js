// In-memory database for testing without PostgreSQL
// This stores data in memory - it will be lost when server restarts
// Use this for testing, then deploy to Render for production

let users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@admin.com',
    password: 'admin123',
    phone: '',
    address: '',
    role: 'admin',
    avatar: null
  }
];

let orders = [];
let menuItems = [];
let categories = [];
let offers = [];

let nextUserId = 2;
let nextOrderId = 1;
let nextMenuItemId = 1;
let nextCategoryId = 1;
let nextOfferId = 1;

const memoryDb = {
  // Users
  async getUsers() {
    return users;
  },

  async getUserById(id) {
    return users.find(u => u.id === parseInt(id));
  },

  async createUser(userData) {
    const newUser = {
      id: nextUserId++,
      ...userData,
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
  },

  async loginUser(email, password) {
    return users.find(u => u.email === email && u.password === password);
  },

  async updateUser(id, userData) {
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return null;
    users[index] = { ...users[index], ...userData };
    return users[index];
  },

  // Orders
  async getAllOrders() {
    return orders.map(order => ({
      ...order,
      items: typeof order.items === 'string' ? order.items : JSON.stringify(order.items)
    }));
  },

  async getUserOrders(userId) {
    return orders
      .filter(o => o.user_id === parseInt(userId))
      .map(order => ({
        ...order,
        items: typeof order.items === 'string' ? order.items : JSON.stringify(order.items)
      }));
  },

  async getActiveOrdersCount() {
    return orders.filter(o => 
      ['pending', 'preparing', 'ready'].includes(o.status.toLowerCase())
    ).length;
  },

  async createOrder(orderData) {
    const newOrder = {
      id: nextOrderId++,
      user_id: orderData.userId,
      items: typeof orderData.items === 'string' ? orderData.items : JSON.stringify(orderData.items),
      total: orderData.total,
      delivery_address: orderData.deliveryAddress,
      payment_method: orderData.paymentMethod,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    orders.push(newOrder);
    console.log('✅ Order created:', newOrder.id);
    return newOrder;
  },

  async updateOrderStatus(id, status) {
    const index = orders.findIndex(o => o.id === parseInt(id));
    if (index === -1) return null;
    orders[index].status = status;
    orders[index].updated_at = new Date().toISOString();
    console.log('✅ Order updated:', orders[index].id, '→', status);
    return orders[index];
  },

  // Menu Items
  async getMenuItems() {
    return menuItems;
  },

  async getMenuItem(id) {
    return menuItems.find(m => m.id === parseInt(id));
  },

  async createMenuItem(itemData) {
    const newItem = {
      id: nextMenuItemId++,
      ...itemData,
      created_at: new Date().toISOString()
    };
    menuItems.push(newItem);
    return newItem;
  },

  async updateMenuItem(id, itemData) {
    const index = menuItems.findIndex(m => m.id === parseInt(id));
    if (index === -1) return null;
    menuItems[index] = { ...menuItems[index], ...itemData };
    return menuItems[index];
  },

  async deleteMenuItem(id) {
    const index = menuItems.findIndex(m => m.id === parseInt(id));
    if (index === -1) return false;
    menuItems.splice(index, 1);
    return true;
  },

  // Categories
  async getCategories() {
    return categories;
  },

  async createCategory(categoryData) {
    const newCategory = {
      id: nextCategoryId++,
      ...categoryData
    };
    categories.push(newCategory);
    return newCategory;
  },

  // Offers
  async getOffers() {
    return offers;
  },

  async getActiveOffers() {
    const today = new Date();
    return offers.filter(o => 
      o.is_active && 
      new Date(o.start_date) <= today && 
      new Date(o.end_date) >= today
    );
  },

  async createOffer(offerData) {
    const newOffer = {
      id: nextOfferId++,
      ...offerData,
      created_at: new Date().toISOString()
    };
    offers.push(newOffer);
    return newOffer;
  },

  async updateOffer(id, offerData) {
    const index = offers.findIndex(o => o.id === parseInt(id));
    if (index === -1) return null;
    offers[index] = { ...offers[index], ...offerData };
    return offers[index];
  },

  async deleteOffer(id) {
    const index = offers.findIndex(o => o.id === parseInt(id));
    if (index === -1) return false;
    offers.splice(index, 1);
    return true;
  },

  // Health check
  async healthCheck() {
    return { status: 'OK', database: 'In-Memory' };
  }
};

module.exports = memoryDb;
