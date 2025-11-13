# Connect Frontend to MySQL Database

Your frontend is now configured to use the MySQL API!

## ✅ What Was Updated

### Files Modified:
1. **`src/pages/Register.js`** - Now calls API to create users
2. **`src/pages/Login.js`** - Now calls API to authenticate users

### Changes Made:
- ✅ Register now saves to MySQL (not localStorage)
- ✅ Login now checks MySQL database
- ✅ Uses `apiService` to communicate with backend

## 🚀 How to Run

### Step 1: Configure API Connection

Update `api/.env` with your database credentials:

```env
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=turkish-313037e008
DB_PORT=3306
PORT=3001
```

### Step 2: Start Backend API

```bash
cd api
npm start
```

You should see:
```
✅ MySQL Database connected successfully
🚀 Server running on http://localhost:3001
```

### Step 3: Start Frontend

Open a NEW terminal:

```bash
# From restaurant-website folder
npm start
```

App opens at http://localhost:3000

## ✅ Test It

### Test Registration:
1. Go to http://localhost:3000/register
2. Fill in the form
3. Click "Create Account"
4. Check phpMyAdmin → users table
5. New user should appear! ✅

### Test Login:
1. Go to http://localhost:3000/login
2. Use: admin@admin.com / admin123
3. Should login successfully ✅

## 🔧 Troubleshooting

### "Failed to fetch" Error
**Problem**: Backend API not running
**Solution**: 
```bash
cd api
npm start
```

### "Login failed" Error
**Problem**: Wrong database credentials
**Solution**: Check `api/.env` has correct credentials

### "CORS Error"
**Problem**: CORS not configured
**Solution**: Already configured in `api/server.js`

### Registration Not Saving
**Problem**: API not connected
**Solution**: 
1. Check backend is running on port 3001
2. Check `.env` has `REACT_APP_API_URL=http://localhost:3001/api`
3. Restart frontend after changing `.env`

## 📊 Verify Database Updates

After registering a new user:

1. Open phpMyAdmin
2. Select your database
3. Click on `users` table
4. Click **Browse**
5. You should see the new user! ✅

## 🎯 What Works Now

✅ **Register** → Saves to MySQL
✅ **Login** → Checks MySQL
✅ **Orders** → Need to update (next step)
✅ **Menu** → Need to update (next step)

## 📝 Next Steps

To fully connect everything to MySQL:

1. Update Menu page to fetch from API
2. Update Cart to save orders to API
3. Update Admin pages to use API
4. Update Profile page to use API

Would you like me to update these pages too?

## 🔑 Current Status

- ✅ MySQL database created
- ✅ Sample data imported
- ✅ Backend API running
- ✅ Register page connected
- ✅ Login page connected
- ⏳ Other pages still use localStorage

## 💡 Quick Test

```bash
# Terminal 1: Start API
cd api
npm start

# Terminal 2: Start Frontend
npm start

# Browser: Test registration
1. Go to /register
2. Create new account
3. Check phpMyAdmin
4. User should be in database!
```

---

**Your app is now connected to MySQL!** 🎉

New registrations will save to the database, and logins will authenticate against MySQL.
