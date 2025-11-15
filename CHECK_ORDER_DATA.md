# Order Data Diagnostic

## Issue
Customer name and phone not showing in admin order panel, but address is showing.

## What We Fixed
1. Added debug logging to Cart.js to see what data is being sent when creating orders
2. Added logging to see user object and checkout form data

## How to Test
1. Make sure you're logged in as a customer
2. Add items to cart
3. Go to cart and click "Proceed to Checkout"
4. Fill in the form (it should auto-fill from your profile)
5. Click "Confirm & Place Order"
6. Check the browser console for these logs:
   - "Auto-filling checkout form with user data:" - shows what user data is available
   - "=== ORDER DEBUG ===" - shows the complete order data being sent

## Expected Behavior
The console should show:
```
User object: { id: '3', name: 'Adi', email: '...', phone: '8418886111', address: 'Agra' }
Checkout form data: { name: 'Adi', phone: '8418886111', address: 'Agra' }
Creating order with data: { customerName: 'Adi', customerPhone: '8418886111', address: 'Agra', ... }
```

## If Data is Correct
If the console shows the correct data but admin panel doesn't show it:
- The issue is with OLD orders that don't have this data
- New orders should display correctly
- We can create a migration script to update old orders

## If Data is Missing
If the console shows empty name/phone:
- Check if user profile has name and phone saved
- Go to Profile page and update your information
- Try ordering again
