# Setup Checklist - MySQL Backend

Follow this checklist to get your restaurant app running with MySQL.

## ✅ Prerequisites

- [ ] Node.js installed (v14 or higher)
- [ ] MySQL Server installed and running
- [ ] Git (optional, for version control)

## ✅ Installation Steps

### 1. Frontend Setup
- [ ] Navigate to `restaurant-website` folder
- [ ] Run `npm install`
- [ ] Verify `.env` file exists with `REACT_APP_API_URL=http://localhost:3001/api`

### 2. Backend Setup
- [ ] Navigate to `restaurant-website/api` folder
- [ ] Run `npm install`
- [ ] Update `api/.env` with your MySQL credentials:
  ```env
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=your_mysql_password
  DB_NAME=restaurant_db
  ```

### 3. Database Setup
- [ ] Ensure MySQL server is running
- [ ] Run migration: `node scripts/migrate.js`
- [ ] Verify success message appears
- [ ] Check database created: Login to MySQL and run `SHOW DATABASES;`

### 4. Start Application
- [ ] **Terminal 1**: Start backend
  ```bash
  cd api
  npm start
  ```
  - [ ] Verify: "✅ MySQL Database connected successfully"
  - [ ] Verify: "🚀 Server running on http://localhost:3001"

- [ ] **Terminal 2**: Start frontend
  ```bash
  npm start
  ```
  - [ ] App opens at http://localhost:3000

### 5. Test Application
- [ ] Open http://localhost:3000
- [ ] Login with admin@admin.com / admin123
- [ ] Browse menu items
- [ ] Add items to cart
- [ ] Place an order
- [ ] Check admin panel for orders

### 6. Verify Backend
- [ ] Test health endpoint: http://localhost:3001/api/health
- [ ] Test menu endpoint: http://localhost:3001/api/menu
- [ ] Test categories: http://localhost:3001/api/categories

## ✅ File Structure Verification

Check these files exist:

### Backend Files
- [ ] `api/server.js`
- [ ] `api/package.json`
- [ ] `api/.env`
- [ ] `api/config/database.js`
- [ ] `api/config/schema.sql`
- [ ] `api/models/User.js`
- [ ] `api/models/Order.js`
- [ ] `api/models/MenuItem.js`
- [ ] `api/models/Category.js`
- [ ] `api/models/Offer.js`
- [ ] `api/scripts/migrate.js`

### Frontend Files
- [ ] `src/services/apiService.js`
- [ ] `.env` (with REACT_APP_API_URL)
- [ ] `.env.example`

### Documentation
- [ ] `QUICKSTART.md`
- [ ] `MYSQL_SETUP.md`
- [ ] `MYSQL_INTEGRATION.md`
- [ ] `api/README.md`

## ✅ Common Issues

### MySQL Connection Failed
- [ ] Check MySQL is running: `mysql --version`
- [ ] Verify credentials in `api/.env`
- [ ] Test MySQL login: `mysql -u root -p`

### Port Already in Use
- [ ] Change PORT in `api/.env` to different port
- [ ] Or stop process using port 3001

### Migration Failed
- [ ] Ensure MySQL is running
- [ ] Check user has CREATE DATABASE permission
- [ ] Verify JSON data files exist in `src/data/`

### Frontend Can't Connect to Backend
- [ ] Verify backend is running on port 3001
- [ ] Check `REACT_APP_API_URL` in `.env`
- [ ] Restart frontend after changing `.env`

## ✅ Success Indicators

You're ready when you see:

### Backend Terminal
```
✅ MySQL Database connected successfully
🚀 Server running on http://localhost:3001
📡 API endpoints available at /api/*
```

### Frontend Terminal
```
Compiled successfully!
You can now view restaurant-website in the browser.
Local: http://localhost:3000
```

### Browser
- [ ] App loads without errors
- [ ] Can login successfully
- [ ] Menu items display
- [ ] Can add to cart
- [ ] Can place orders
- [ ] Admin panel shows orders

## ✅ Next Steps

After successful setup:

- [ ] Customize menu items in MySQL
- [ ] Add your own categories
- [ ] Update branding and colors
- [ ] Configure for production deployment
- [ ] Set up automated database backups
- [ ] Add payment gateway integration

## 📚 Documentation

- **Quick Start**: [QUICKSTART.md](./QUICKSTART.md)
- **MySQL Setup**: [MYSQL_SETUP.md](./MYSQL_SETUP.md)
- **Integration Guide**: [MYSQL_INTEGRATION.md](./MYSQL_INTEGRATION.md)
- **API Docs**: [api/README.md](./api/README.md)

## 🎉 Congratulations!

If all checkboxes are checked, your restaurant app with MySQL backend is ready!

Need help? Check the documentation files above or review error messages carefully.
