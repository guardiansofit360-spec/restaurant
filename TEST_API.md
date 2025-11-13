# Test API Connection

Quick tests to verify your API is working.

## Step 1: Is the API Server Running?

Check your terminal where you ran `npm start` in the `/api` folder.

You should see:
```
✅ MySQL Database connected successfully
🚀 Server running on http://localhost:3001
📡 API endpoints available at /api/*
```

If you don't see this, the API is NOT running. Start it:
```bash
cd api
npm start
```

## Step 2: Test API Health Endpoint

Open a new terminal and run:

```bash
curl http://localhost:3001/api/health
```

**Expected response:**
```json
{"status":"OK","message":"Restaurant API with MySQL is running"}
```

**If you get an error:**
- API server is not running
- Wrong port
- Firewall blocking

## Step 3: Test User Creation Directly

```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@test.com\",\"password\":\"test123\",\"phone\":\"+1234567890\",\"address\":\"Test Address\",\"role\":\"customer\"}"
```

**Expected response:**
```json
{
  "id": 6,
  "name": "Test User",
  "email": "test@test.com",
  ...
}
```

## Step 4: Check Browser Console

1. Open your React app: http://localhost:3000/register
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Try to register
5. Look for error messages

Common errors:
- `Failed to fetch` → API server not running
- `CORS error` → CORS not configured (should be fixed)
- `404 Not Found` → Wrong API URL
- `500 Internal Server Error` → Database connection issue

## Step 5: Check Network Tab

1. In Developer Tools, go to Network tab
2. Try to register
3. Look for the request to `localhost:3001/api/users`
4. Click on it to see:
   - Request headers
   - Request payload
   - Response

## Common Issues

### "Failed to fetch"
**Problem**: API server not running
**Solution**: 
```bash
cd api
npm start
```

### "ECONNREFUSED"
**Problem**: API server not accessible
**Solution**: Check API is running on port 3001

### "Database connection failed"
**Problem**: MySQL credentials wrong
**Solution**: Check `api/.env` has correct credentials

### "Duplicate entry"
**Problem**: Email already exists
**Solution**: Use a different email or check database

## Quick Checklist

- [ ] API server running (`cd api && npm start`)
- [ ] See "MySQL Database connected successfully"
- [ ] `curl http://localhost:3001/api/health` works
- [ ] Frontend `.env` has `REACT_APP_API_URL=http://localhost:3001/api`
- [ ] Frontend restarted after changing `.env`
- [ ] Browser console shows no CORS errors
- [ ] Network tab shows request to correct URL

## Debug Steps

1. **Check API server terminal** - Any errors?
2. **Test health endpoint** - Does it respond?
3. **Check browser console** - What's the exact error?
4. **Check network tab** - Is request being sent?
5. **Check database** - Can you connect via phpMyAdmin?

---

After running these tests, you'll know exactly what's wrong!
