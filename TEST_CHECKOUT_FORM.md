# Test Checkout Form & Admin Display

## Steps to Test

### 1. Place a New Order with Checkout Form

1. **Login** as a customer (not admin)
2. **Add items** to cart
3. **Go to Cart** page
4. **Click** "Proceed to Checkout"
5. **Fill in the form:**
   - Name: "John Doe"
   - Phone: "+1234567890"
   - Address: "123 Main Street, City"
6. **Click** "Confirm & Place Order"

### 2. Check Browser Console

Open browser console (F12) and look for:
```
Checkout form data: { name: "John Doe", phone: "+1234567890", address: "123 Main Street, City" }
Creating order with data: { customerName: "John Doe", customerPhone: "+1234567890", ... }
```

### 3. Check Firestore Console

1. Go to [Firestore Console → orders](https://console.firebase.google.com/project/restaurant-9114a/firestore/data/orders)
2. Click on the latest order
3. Verify these fields exist:
   - `customerName`: "John Doe"
   - `customerPhone`: "+1234567890"
   - `address`: "123 Main Street, City"

### 4. Check Admin Panel

1. **Login** as admin (admin@admin.com / admin123)
2. **Go to** Orders page
3. **Check** the latest order shows:
   ```
   👤 Customer: John Doe
   📞 Phone: +1234567890
   📍 Address: 123 Main Street, City
   ```

## Common Issues

### Issue 1: Form Not Showing
- **Symptom:** Clicking "Proceed to Checkout" does nothing
- **Solution:** Check browser console for errors

### Issue 2: Fields Empty in Admin
- **Symptom:** Shows "Customer" instead of name
- **Cause:** Old orders don't have these fields
- **Solution:** Place a NEW order using the checkout form

### Issue 3: Phone Not Showing
- **Symptom:** Name and address show, but no phone
- **Cause:** `customerPhone` field is empty
- **Solution:** Make sure you filled the phone field in checkout form

### Issue 4: Auto-fill Not Working
- **Symptom:** Form fields are empty
- **Cause:** User profile doesn't have name/phone/address
- **Solution:** 
  1. Go to Profile page
  2. Click Edit
  3. Fill in name, phone, address
  4. Save
  5. Try checkout again - fields should auto-fill

## Expected Result

**In Admin Panel:**
```
Order #6
Customer
November 15, 2025 • 05:19 PM

[Order Items]

👤 Customer: John Doe
📞 Phone: +1234567890
📍 Address: 123 Main Street, City

€655.00
[Mark as Processing]
```

## Important Notes

1. **Old orders** created before the checkout form won't have customer name and phone
2. **Only new orders** placed through the checkout form will have complete details
3. **Delete old test orders** from Firestore if you want a clean slate
4. **Update your profile** first for auto-fill to work

## Quick Fix for Testing

1. Delete all old orders from Firestore Console
2. Update your profile with name, phone, address
3. Place a new order using the checkout form
4. Check admin panel - all details should be there!
