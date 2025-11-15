# Update Old Orders in Firestore

## Issue
Old orders in Firestore don't have the `customerName` field, so they show "Customer" in the admin panel.

## Solution Options

### Option 1: Delete Old Test Orders (Recommended for Testing)
1. Go to [Firestore Console](https://console.firebase.google.com/project/restaurant-9114a/firestore/data/orders)
2. Click on the `orders` collection
3. Delete all old test orders
4. Place new orders - they will have customer names

### Option 2: Keep Old Orders (Show Email Instead)
The code now shows:
- `customerName` (if available)
- OR `customerEmail` (if available)
- OR `customer` (if available)
- OR "Customer" (fallback)

So old orders will show the email address if available.

### Option 3: Manually Update Old Orders
1. Go to [Firestore Console](https://console.firebase.google.com/project/restaurant-9114a/firestore/data/orders)
2. Click on each order document
3. Add a new field:
   - Field name: `customerName`
   - Field value: The customer's name (e.g., "John Doe")
4. Click "Update"

## For New Orders
All new orders created from now on will automatically include:
- `customerName` - Full name of the customer
- `customerEmail` - Email address
- `userId` - User ID
- All other order details

## Testing
1. Login as a customer
2. Add items to cart
3. Place an order
4. Go to admin panel → Orders
5. You should see the customer name displayed correctly

---

**Note:** This is only an issue with orders created before the `customerName` field was added to the order creation code.
