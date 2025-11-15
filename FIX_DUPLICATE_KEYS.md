# Fix Duplicate Key Warnings

## The Problem
You're seeing warnings like:
```
Encountered two children with the same key, `1`. Keys should be unique...
```

This happens because you have **old orders** in Firestore with numeric IDs (1, 2, 3, etc.) that are duplicates.

## The Solution

### Option 1: Delete All Old Orders (Recommended)

1. Go to [Firestore Console → orders](https://console.firebase.google.com/project/restaurant-9114a/firestore/data/orders)
2. Select all documents
3. Click Delete
4. Confirm deletion

**Why this works:** New orders will use Firestore's auto-generated unique IDs (like `xaUqEP2rohg7oB8aW1KT`)

### Option 2: Delete Old Menu Items (If warnings persist)

1. Go to [Firestore Console → menuItems](https://console.firebase.google.com/project/restaurant-9114a/firestore/data/menuItems)
2. Delete all documents
3. Refresh your app - menu will reinitialize with unique IDs

## After Cleanup

1. **Refresh your app**
2. **Place a new order** using the checkout form
3. **Check admin panel** - order will have unique ID and all customer details
4. **No more warnings!**

## Why This Happened

- Old orders were created with numeric IDs (1, 2, 3...)
- Firestore auto-generates unique IDs (like `abc123xyz`)
- When both exist, React sees duplicate keys
- Deleting old data fixes this

## Prevention

Going forward, all new data will use Firestore's auto-generated IDs, so this won't happen again!

---

**Quick Fix:** Just delete all orders from Firestore Console and place new orders. Problem solved! ✅
