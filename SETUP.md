# 🚀 Restaurant Website - Quick Setup

## 📦 Installation

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd api
npm install
cd ..
```

## ⚙️ Configuration

### 1. Frontend Environment (.env)

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
```

### 2. Backend Environment (api/.env)

```env
PORT=3001
FRONTEND_URL=http://localhost:3000
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
```

## 🔐 Google OAuth Setup (Optional)

See [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) for detailed instructions.

Quick steps:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth Client ID
3. Add `http://localhost:3000` to authorized origins
4. Copy Client ID to both `.env` files

## 🏃 Running the App

### Start Both Servers

**Terminal 1 - API Server:**
```bash
cd api
npm start
```

**Terminal 2 - Frontend:**
```bash
npm start
```

The app will open at **http://localhost:3000**

## 👤 Demo Login

**Admin:**
- Email: `admin@admin.com`
- Password: `admin123`

**Customer:**
- Any email/password works
- Or use Google Sign-In

## 📱 Features

- ✅ User authentication (email/password + Google OAuth)
- ✅ Browse menu with categories
- ✅ Shopping cart
- ✅ Place orders
- ✅ Admin dashboard
- ✅ Order management
- ✅ Inventory management
- ✅ Offers management
- ✅ Cross-device sync

## 🗄️ Database

Currently using **in-memory database**:
- Fast and simple
- Data resets on server restart
- Perfect for development

## 📚 Documentation

- [README.md](./README.md) - Full documentation
- [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) - Google OAuth setup

## 🐛 Troubleshooting

### API not connecting
- Check if API server is running on port 3001
- Verify `REACT_APP_API_URL` in `.env`

### Google login not working
- Ensure `REACT_APP_GOOGLE_CLIENT_ID` is set
- Check authorized origins in Google Cloud Console
- Restart both servers after changing `.env`

## 🚀 Next Steps

1. ✅ Set up Google OAuth (optional)
2. 📝 Customize menu items
3. 🎨 Update branding/colors
4. 🌐 Deploy to production

---

**Happy coding! 🍽️**
