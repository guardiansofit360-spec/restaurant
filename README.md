# Turkish Restaurant Website

A mobile-responsive restaurant website built with React for ordering food online with admin management features.

## Features

### Customer Features
- 🏠 Home page with hero banner and features
- 🍽️ Browse menu with category filters
- 🛒 Shopping cart with quantity management
- 👤 User registration and login
- 📦 Place orders with delivery

### Admin Features
- 📊 Dashboard with statistics
- 📋 Order management (view and update order status)
- 📦 Inventory management (add/edit menu items)
- 🎁 Offers management (create and manage promo codes)

## Data Storage

### Firebase Integration (Recommended)

The app now supports Firebase Firestore for cloud-based data storage:
- Real-time data synchronization
- Automatic backups
- Multi-device support
- Scalable cloud database

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for complete setup instructions.

### Local Storage (Fallback)

All data is stored in JSON files located in `src/data/`:
- `menuData.json` - Menu items with prices, categories, and details
- `ordersData.json` - Customer orders and order history
- `inventoryData.json` - Stock levels and inventory management
- `offersData.json` - Promotional offers and discount codes
- `usersData.json` - User accounts and authentication
- `categoriesData.json` - Food categories with colors

Data can be persisted using localStorage for demo purposes or migrated to Firebase for production.

## Demo Credentials

**Admin Access:**
- Email: admin@admin.com
- Password: admin123

**Customer Access:**
- Email: john@example.com
- Password: password123
- Or any email/password for demo

## Installation

```bash
cd restaurant-website
npm install
```

### Firebase Setup (Optional but Recommended)

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Copy your Firebase configuration
4. Update `src/firebase/config.js` with your credentials
5. Run the app and use the migration dialog to migrate data

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed instructions.

## Running the App

```bash
npm start
```

The app will open at http://localhost:3000

## Docker Deployment

To run in a container:

```bash
# Build
docker build -t restaurant-website .

# Run
docker run -p 80:80 restaurant-website
```

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header
│   └── Header.css
├── data/                  # JSON data files
│   ├── menuData.json
│   ├── ordersData.json
│   ├── inventoryData.json
│   ├── offersData.json
│   ├── usersData.json
│   └── categoriesData.json
├── pages/
│   ├── Home.js            # Landing page
│   ├── Menu.js            # Menu with categories
│   ├── Cart.js            # Shopping cart
│   ├── Login.js           # Login page
│   ├── Register.js        # Registration page
│   └── admin/
│       ├── Dashboard.js   # Admin dashboard
│       ├── Orders.js      # Order management
│       ├── Inventory.js   # Menu inventory
│       └── Offers.js      # Promo offers
├── firebase/
│   ├── config.js          # Firebase configuration
│   └── firebaseService.js # Firebase operations
├── utils/
│   ├── dataManager.js     # LocalStorage utilities
│   ├── firebaseDataManager.js  # Firebase data managers
│   └── firebaseMigration.js    # Migration utility
├── App.js                 # Main app with routing
└── index.js               # Entry point
```

## Technologies

- React 18
- React Router v6
- CSS3 (Mobile-first responsive design)
- JSON data storage
- No external UI libraries (lightweight)

## Data Management

The app uses JSON files for data storage. To modify data:

1. Edit JSON files in `src/data/`
2. Data is loaded on component mount
3. Changes are managed in component state
4. Can be persisted to localStorage or backend API

## Firebase Features

The app includes:
- ✅ Firebase Firestore integration
- ✅ Automatic data migration from localStorage
- ✅ Real-time data synchronization
- ✅ Cloud-based storage
- ✅ Offline support

## Next Steps

To enhance the app:
- ✅ Firebase Firestore integration (completed)
- Add Firebase Authentication (replace custom auth)
- Add payment gateway integration
- Real-time order tracking with Firebase
- Push notifications with Firebase Cloud Messaging
- Image uploads with Firebase Storage
- Export/Import data functionality
