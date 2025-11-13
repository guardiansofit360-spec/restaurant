-- ============================================
-- Restaurant Database - Sample Data
-- ============================================
-- For FRESH database (no existing data)
-- Use this if tables are newly created
-- ============================================

-- ============================================
-- INSERT USERS
-- ============================================
-- Note: Admin user (id=1) already created by schema
-- Adding customer users only
INSERT INTO users (id, name, email, password, phone, address, role) VALUES
(2, 'John Doe', 'john@example.com', 'password123', '+1234567891', '456 Customer Avenue, Town, State 67890', 'customer'),
(3, 'Jane Smith', 'jane@example.com', 'password123', '+1234567892', '789 Oak Road, Village, State 11111', 'customer'),
(4, 'Mike Johnson', 'mike@example.com', 'password123', '+1234567893', '321 Pine Street, City, State 22222', 'customer'),
(5, 'Sarah Williams', 'sarah@example.com', 'password123', '+1234567894', '654 Maple Avenue, Town, State 33333', 'customer');

-- ============================================
-- INSERT CATEGORIES
-- ============================================
INSERT INTO categories (id, name, color, icon) VALUES
(1, 'All', '#FF6B35', '🍽️'),
(2, 'Pizzas', '#EF4444', '🍕'),
(3, 'Kebabs & Grill', '#5A6C7D', '🍢'),
(4, 'Burgers & Wrap', '#F59E0B', '🍔'),
(5, 'Sides & Snacks', '#10B981', '🍟'),
(6, 'Beverages', '#3B82F6', '🥤');

-- ============================================
-- INSERT MENU ITEMS
-- ============================================

-- Pizzas
INSERT INTO menu_items (id, name, description, price, category_id, image, bg_color, available) VALUES
(1, 'Margherita Pizza', 'Classic tomato, mozzarella & basil', 299.00, 2, '🍕', '#FEF3C7', TRUE),
(2, 'Pepperoni Pizza', 'Loaded with pepperoni & cheese', 349.00, 2, '🍕', '#FECACA', TRUE),
(3, 'BBQ Chicken Pizza', 'BBQ sauce, chicken & onions', 399.00, 2, '🍕', '#FED7AA', TRUE),
(4, 'Vegetarian Pizza', 'Fresh vegetables & cheese', 329.00, 2, '🍕', '#D1FAE5', TRUE),
(5, 'Hawaiian Pizza', 'Ham, pineapple & cheese', 359.00, 2, '🍕', '#FEF3C7', TRUE);

-- Kebabs & Grill
INSERT INTO menu_items (id, name, description, price, category_id, image, bg_color, available) VALUES
(6, 'Döner Kebab', 'Traditional Turkish döner', 329.00, 3, '🍗', '#FEF3C7', TRUE),
(7, 'Adana Kebab', 'Spicy minced meat kebab', 349.00, 3, '🍢', '#D1FAE5', TRUE),
(8, 'Lamb Shish Kebab', 'Grilled lamb with vegetables', 399.00, 3, '🥙', '#FED7AA', TRUE),
(9, 'Chicken Wings', 'Spicy grilled chicken wings', 249.00, 3, '🍗', '#FECACA', TRUE),
(10, 'Mixed Grill Platter', 'Assorted grilled meats', 599.00, 3, '🍖', '#FEF3C7', TRUE),
(11, 'Chicken Shish Kebab', 'Marinated grilled chicken', 329.00, 3, '🍢', '#D1FAE5', TRUE);

-- Burgers & Wraps
INSERT INTO menu_items (id, name, description, price, category_id, image, bg_color, available) VALUES
(12, 'Classic Burger', 'Beef patty, lettuce, tomato & cheese', 279.00, 4, '🍔', '#FEF3C7', TRUE),
(13, 'Chicken Burger', 'Crispy chicken with special sauce', 259.00, 4, '🍔', '#D1FAE5', TRUE),
(14, 'Chicken Shawarma Wrap', 'Marinated chicken wrap', 249.00, 4, '🌯', '#FED7AA', TRUE),
(15, 'Falafel Wrap', 'Crispy falafel with tahini', 199.00, 4, '🌯', '#D1FAE5', TRUE),
(16, 'Double Cheese Burger', 'Two beef patties with extra cheese', 349.00, 4, '🍔', '#FECACA', TRUE),
(17, 'Veggie Burger', 'Plant-based patty with fresh veggies', 239.00, 4, '🍔', '#D1FAE5', TRUE);

-- Sides & Snacks
INSERT INTO menu_items (id, name, description, price, category_id, image, bg_color, available) VALUES
(18, 'French Fries', 'Crispy golden fries', 99.00, 5, '🍟', '#FEF3C7', TRUE),
(19, 'Onion Rings', 'Crispy fried onion rings', 119.00, 5, '🧅', '#FED7AA', TRUE),
(20, 'Hummus Platter', 'Chickpea dip with pita bread', 129.00, 5, '🫘', '#D1FAE5', TRUE),
(21, 'Mozzarella Sticks', 'Fried cheese sticks', 149.00, 5, '🧀', '#FEF3C7', TRUE),
(22, 'Garlic Bread', 'Toasted bread with garlic butter', 89.00, 5, '🥖', '#FED7AA', TRUE),
(23, 'Chicken Nuggets', 'Crispy chicken nuggets (8 pcs)', 159.00, 5, '🍗', '#FEF3C7', TRUE);

-- Beverages
INSERT INTO menu_items (id, name, description, price, category_id, image, bg_color, available) VALUES
(24, 'Coca Cola', 'Chilled soft drink', 49.00, 6, '🥤', '#FECACA', TRUE),
(25, 'Fresh Orange Juice', 'Freshly squeezed orange juice', 79.00, 6, '🍊', '#FED7AA', TRUE),
(26, 'Turkish Tea', 'Hot black tea', 29.00, 6, '🍵', '#D1FAE5', TRUE),
(27, 'Ayran', 'Traditional yogurt drink', 39.00, 6, '🥛', '#E0E7FF', TRUE),
(28, 'Iced Coffee', 'Cold brew coffee with ice', 89.00, 6, '☕', '#FEF3C7', TRUE),
(29, 'Lemonade', 'Fresh homemade lemonade', 69.00, 6, '🍋', '#FEF3C7', TRUE),
(30, 'Mineral Water', 'Still or sparkling', 39.00, 6, '💧', '#E0E7FF', TRUE);

-- ============================================
-- INSERT OFFERS
-- ============================================
INSERT INTO offers (id, title, description, discount_percentage, code, valid_from, valid_until, active) VALUES
(1, '20% Off on Kebabs', 'Get 20% discount on all kebab items', 20, 'KEBAB20', '2024-01-01', '2024-12-31', TRUE),
(2, 'Free Delivery', 'Free delivery on orders above ₹500', 5, 'FREEDEL', '2024-01-01', '2024-12-31', TRUE),
(3, 'Buy 2 Get 1 Free', 'Buy 2 pizzas and get 1 free', 33, 'B2G1', '2024-01-01', '2024-06-30', FALSE),
(4, 'Weekend Special', '15% off on all orders during weekends', 15, 'WEEKEND15', '2024-01-01', '2024-12-31', TRUE),
(5, 'First Order Discount', '25% off on your first order', 25, 'FIRST25', '2024-01-01', '2024-12-31', TRUE),
(6, 'Student Discount', '10% off for students with valid ID', 10, 'STUDENT10', '2024-01-01', '2024-12-31', TRUE);

-- ============================================
-- INSERT INVENTORY
-- ============================================
INSERT INTO inventory (menu_item_id, stock_quantity, low_stock_threshold) VALUES
(1, 50, 10), (2, 45, 10), (3, 40, 10), (4, 35, 10), (5, 30, 10),
(6, 60, 15), (7, 55, 15), (8, 50, 15), (9, 70, 20), (10, 25, 8), (11, 45, 15),
(12, 80, 20), (13, 75, 20), (14, 65, 15), (15, 55, 15), (16, 40, 10), (17, 35, 10),
(18, 100, 30), (19, 60, 20), (20, 40, 15), (21, 50, 15), (22, 70, 20), (23, 80, 25),
(24, 200, 50), (25, 150, 40), (26, 180, 50), (27, 160, 40), (28, 120, 30), (29, 100, 30), (30, 250, 60);

-- ============================================
-- INSERT SAMPLE ORDERS
-- ============================================

-- Order 1
INSERT INTO orders (id, user_id, customer_name, customer_email, subtotal, delivery_fee, total, status, address, order_date, order_time) VALUES
(1, 2, 'John Doe', 'john@example.com', 648.00, 5.00, 653.00, 'Delivered', '456 Customer Avenue', '2024-01-15', '14:30:00');

INSERT INTO order_items (order_id, menu_item_id, item_name, item_price, quantity, image) VALUES
(1, 2, 'Pepperoni Pizza', 349.00, 1, '🍕'),
(1, 6, 'Döner Kebab', 329.00, 1, '🍗'),
(1, 18, 'French Fries', 99.00, 2, '🍟'),
(1, 24, 'Coca Cola', 49.00, 2, '🥤');

-- Order 2
INSERT INTO orders (id, user_id, customer_name, customer_email, subtotal, delivery_fee, total, status, address, order_date, order_time) VALUES
(2, 3, 'Jane Smith', 'jane@example.com', 927.00, 5.00, 932.00, 'Processing', '789 Oak Road', '2024-01-16', '18:45:00');

INSERT INTO order_items (order_id, menu_item_id, item_name, item_price, quantity, image) VALUES
(2, 3, 'BBQ Chicken Pizza', 399.00, 1, '🍕'),
(2, 8, 'Lamb Shish Kebab', 399.00, 1, '🥙'),
(2, 20, 'Hummus Platter', 129.00, 1, '🫘'),
(2, 25, 'Fresh Orange Juice', 79.00, 2, '🍊');

-- Order 3
INSERT INTO orders (id, user_id, customer_name, customer_email, subtotal, delivery_fee, total, status, address, order_date, order_time) VALUES
(3, 4, 'Mike Johnson', 'mike@example.com', 1197.00, 5.00, 1202.00, 'Shipped', '321 Pine Street', '2024-01-16', '19:15:00');

INSERT INTO order_items (order_id, menu_item_id, item_name, item_price, quantity, image) VALUES
(3, 10, 'Mixed Grill Platter', 599.00, 1, '🍖'),
(3, 12, 'Classic Burger', 279.00, 2, '🍔'),
(3, 19, 'Onion Rings', 119.00, 1, '🧅'),
(3, 27, 'Ayran', 39.00, 3, '🥛');

-- Order 4
INSERT INTO orders (id, user_id, customer_name, customer_email, subtotal, delivery_fee, total, status, address, order_date, order_time) VALUES
(4, 5, 'Sarah Williams', 'sarah@example.com', 537.00, 5.00, 542.00, 'Pending', '654 Maple Avenue', CURDATE(), CURTIME());

INSERT INTO order_items (order_id, menu_item_id, item_name, item_price, quantity, image) VALUES
(4, 1, 'Margherita Pizza', 299.00, 1, '🍕'),
(4, 15, 'Falafel Wrap', 199.00, 1, '🌯'),
(4, 26, 'Turkish Tea', 29.00, 2, '🍵'),
(4, 28, 'Iced Coffee', 89.00, 1, '☕');

-- Order 5
INSERT INTO orders (id, user_id, customer_name, customer_email, subtotal, delivery_fee, total, status, address, order_date, order_time) VALUES
(5, 2, 'John Doe', 'john@example.com', 806.00, 5.00, 811.00, 'Processing', '456 Customer Avenue', CURDATE(), CURTIME());

INSERT INTO order_items (order_id, menu_item_id, item_name, item_price, quantity, image) VALUES
(5, 7, 'Adana Kebab', 349.00, 2, '🍢'),
(5, 21, 'Mozzarella Sticks', 149.00, 1, '🧀'),
(5, 24, 'Coca Cola', 49.00, 3, '🥤');

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
SELECT 'Sample data imported successfully!' as Status,
       '5 users, 6 categories, 30 menu items, 6 offers, 5 orders' as Summary;
