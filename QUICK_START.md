# ⚡ Quick Start Guide

Get your restaurant website running in 5 minutes!

## 📦 Step 1: Install Dependencies (2 min)

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd api
npm install
cd ..
```

## 🚀 Step 2: Start the Servers (1 min)

### Terminal 1 - Start API Server
```bash
cd api
npm start
```

You should see:
```
✅ Server running on http://localhost:3001
📡 API endpoints: /api/*
💾 Database: In-Memory
```

### Terminal 2 - Start Frontend
```bash
npm start
```

Browser will open automatically at **http://localhost:3000**

## 👤 Step 3: Login and Test (2 min)

### Admin Login:
- Email: `admin@admin.com`
- Password: `admin123`
- Access: Admin dashboard, order management

### Customer Login:
- Email: Any email (e.g., `customer@test.com`)
- Password: Any password
- Access: Menu, cart, orders

## ✅ You're Done!

Your restaurant website is now running with:
- ✅ Full menu browsing
- ✅ Shopping cart
- ✅ Order placement
- ✅ Admin dashboard
- ✅ Cross-device order sync

## 🧪 Test Cross-Device Orders

### Same Computer:
1. **Chrome**: Login as customer, create order
2. **Firefox**: Login as admin, view orders
3. ✅ Orders sync!

### Different Devices:
1. Find your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac)
2. On phone: Open `http://YOUR-IP:3000`
3. ✅ Orders sync across devices!

## 📚 Next Steps

- **Customize Menu**: Edit `src/data/menuData.json`
- **Change Colors**: Edit CSS files
- **Add Features**: Check `SIMPLIFIED_SETUP.md` for details

## 🆘 Troubleshooting

**API not working?**
```bash
cd api
npm start
```

**Frontend not loading?**
```bash
npm start
```

**Port already in use?**
- Stop other servers or change port in `api/.env`

---

**Total Time**: 5 minutes ⏱️

**Result**: Fully functional restaurant website! 🎉

For detailed documentation, see [SIMPLIFIED_SETUP.md](./SIMPLIFIED_SETUP.md)
