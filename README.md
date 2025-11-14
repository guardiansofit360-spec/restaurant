# 🍽️ Turkish Restaurant Website

A modern, mobile-responsive restaurant website built with React for online food ordering with admin management features.

## ✨ Features

### Customer Features
- 🏠 Beautiful home page with hero banner
- 🍽️ Browse menu with category filters
- 🛒 Shopping cart with quantity management
- 👤 User registration and login
- 📦 Place orders with delivery tracking
- 📱 Fully responsive mobile design

### Admin Features
- 📊 Dashboard with real-time statistics
- 📋 Order management (view and update status)
- 📦 Inventory management (add/edit menu items)
- 🎁 Offers management (create promo codes)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd api
npm install
cd ..
```

### 2. Start the Application

**Terminal 1 - Start API Server:**
```bash
cd api
npm start
```

**Terminal 2 - Start Frontend:**
```bash
npm start
```

The app will open at **http://localhost:3000**

## 👤 Demo Credentials

**Admin Access:**
- Email: `admin@admin.com`
- Password: `admin123`

**Customer Access:**
- Any email and password will work for testing

## 💾 Data Storage

- **Firestore Database**: Persistent, real-time, cross-device sync
- **Automatic Fallback**: Uses in-memory if Firestore not configured
- **Easy Setup**: 5-minute Firestore configuration (see FIRESTORE_SETUP.md)

## 📁 Project Structure

```
restaurant-website/
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   │   ├── Home.js
│   │   ├── Menu.js
│   │   ├── Cart.js
│   │   ├── Login.js
│   │   └── admin/        # Admin pages
│   ├── services/         # API services
│   └── utils/            # Utility functions
├── api/
│   ├── server.js         # Express API server
│   └── memory-db.js      # In-memory database
└── public/               # Static assets
```

## 🛠️ Technologies

### Frontend
- **React 19** - UI framework
- **React Router v7** - Navigation
- **Lottie** - Animations
- **CSS3** - Responsive styling

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **In-Memory DB** - Fast data storage

## 📡 API Endpoints

### Users
- `POST /api/users/login` - User authentication
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user details

### Orders
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/user/:userId` - Get user orders
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id` - Update order status

### Menu
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Add menu item (admin)
- `PATCH /api/menu/:id` - Update menu item (admin)
- `DELETE /api/menu/:id` - Delete menu item (admin)

### Other
- `GET /api/health` - Health check
- `GET /api/categories` - Get categories
- `GET /api/offers` - Get promotional offers

## 🧪 Testing Cross-Device Orders

### Same Computer (Different Browsers):
1. **Chrome**: Login as customer, create order
2. **Firefox**: Login as admin, view orders
3. ✅ Orders sync!

### Different Devices (Same WiFi):
1. **Computer**: Find IP with `ipconfig` (e.g., 192.168.1.100)
2. **Phone**: Open `http://192.168.1.100:3000`
3. ✅ Orders sync across devices!

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - 5-minute quick start
- **[FIRESTORE_SETUP.md](./FIRESTORE_SETUP.md)** - Enable persistent database
- **[SIMPLIFIED_SETUP.md](./SIMPLIFIED_SETUP.md)** - Complete setup guide

## 🎨 Customization

### Update Menu Items
Edit `src/data/menuData.json` or use the admin panel

### Change Colors
Edit CSS files in `src/pages/*.css` and `src/components/*.css`

### Add Features
The codebase is clean and well-organized for easy modifications

## 🔧 Configuration

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3001/api
```

### Backend (api/.env)
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 🚀 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import to Vercel
3. Deploy automatically

### Backend (Any Node.js Hosting)
1. Deploy `api/` folder
2. Set environment variables
3. Start with `npm start`

## 💡 Features to Add

- Payment gateway integration (Stripe/PayPal)
- Email notifications
- SMS notifications
- Real-time order tracking
- Customer reviews and ratings
- Multi-language support
- Mobile app version

## 📝 License

MIT License - feel free to use for your projects!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Made with ❤️ for food lovers**

🔗 **Repository**: https://github.com/guardiansofit360-spec/turkish-restaurant-app
