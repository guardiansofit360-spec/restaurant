import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import inventoryDataJson from '../../data/inventoryData.json';
import categoriesDataJson from '../../data/categoriesData.json';
import AvatarPopup from '../../components/AvatarPopup';
import { orderManager } from '../../utils/dataManager';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: '',
    offerPrice: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load inventory and categories on mount
  React.useEffect(() => {
    // Load from localStorage first, fallback to JSON
    const storedInventory = localStorage.getItem('restaurant_inventory');
    if (storedInventory) {
      setItems(JSON.parse(storedInventory));
    } else {
      setItems(inventoryDataJson);
      localStorage.setItem('restaurant_inventory', JSON.stringify(inventoryDataJson));
    }

    // Load categories
    const storedCategories = localStorage.getItem('restaurant_categories');
    const loadedCategories = storedCategories ? JSON.parse(storedCategories) : categoriesDataJson;
    // Filter out "All" category for the dropdown
    const filteredCategories = loadedCategories.filter(cat => cat.name !== 'All');
    setCategories(filteredCategories);
    
    // Set default category if available
    if (filteredCategories.length > 0 && !newItem.category) {
      setNewItem(prev => ({ ...prev, category: filteredCategories[0].name }));
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setNewItem({ ...newItem, image: base64String });
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    category: '',
    price: '',
    offerPrice: '',
    image: ''
  });
  const [editImagePreview, setEditImagePreview] = useState(null);

  const handleEditItem = (item) => {
    setEditingItem(item.id);
    setEditForm({
      name: item.name,
      category: item.category,
      price: item.price,
      offerPrice: item.offerPrice || '',
      image: item.image
    });
    setEditImagePreview(item.image && item.image.startsWith('data:image') ? item.image : null);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditForm({ name: '', category: '', price: '', offerPrice: '', image: '' });
    setEditImagePreview(null);
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setEditForm({ ...editForm, image: base64String });
        setEditImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = (itemId) => {
    const updatedItems = items.map(item => 
      item.id === itemId 
        ? {
            ...item,
            name: editForm.name,
            category: editForm.category,
            price: parseFloat(editForm.price),
            offerPrice: editForm.offerPrice ? parseFloat(editForm.offerPrice) : null,
            image: editForm.image,
            bgColor: categories.find(cat => cat.name === editForm.category)?.color || item.bgColor
          }
        : item
    );
    setItems(updatedItems);
    localStorage.setItem('restaurant_inventory', JSON.stringify(updatedItems));
    handleCancelEdit();
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedItems = items.filter(item => item.id !== itemId);
      setItems(updatedItems);
      localStorage.setItem('restaurant_inventory', JSON.stringify(updatedItems));
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    
    if (!newItem.image) {
      alert('Please upload a product image');
      return;
    }

    const item = {
      id: Date.now(),
      name: newItem.name,
      category: newItem.category,
      price: parseFloat(newItem.price),
      offerPrice: newItem.offerPrice ? parseFloat(newItem.offerPrice) : null,
      image: newItem.image,
      bgColor: categories.find(cat => cat.name === newItem.category)?.color || '#FF6B35'
    };
    const updatedItems = [...items, item];
    setItems(updatedItems);
    // Save to localStorage
    localStorage.setItem('restaurant_inventory', JSON.stringify(updatedItems));
    setNewItem({ name: '', category: categories[0]?.name || '', price: '', offerPrice: '', image: '' });
    setImagePreview(null);
  };

  return (
    <div className="admin-page">
      {/* User Header */}
      <div className="user-header">
        <div className="user-info">
          <h1>Hi, {user.name || 'Admin'}</h1>
          <p>Administrator</p>
        </div>
        <div className="user-actions">
          <div className="user-avatar" onClick={() => setShowAvatarPopup(true)}>
            <span>👤</span>
          </div>
        </div>
      </div>

      <div className="admin-header-section">
        <h1>Inventory Management</h1>
        <p className="admin-subtitle">Manage menu items and stock levels</p>
      </div>

      <div className="form-section">
        <h2>Add New Item</h2>
        <form onSubmit={handleAddItem}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
            />
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              required
            >
              {categories.length === 0 ? (
                <option value="">Loading categories...</option>
              ) : (
                categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))
              )}
            </select>
            <input
              type="number"
              step="0.01"
              placeholder="Price (€)"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Offer Price (Optional)"
              value={newItem.offerPrice}
              onChange={(e) => setNewItem({ ...newItem, offerPrice: e.target.value })}
            />
          </div>
          
          <div className="image-upload-section">
            <label className="image-upload-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <div className="upload-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{imagePreview ? 'Change Image' : 'Upload Product Image'}</span>
              </div>
            </label>
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <button type="submit" className="btn-primary">Add Item</button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="search-bar-container">
        <div className="search-bar">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Product Cards */}
      <div className="inventory-cards">
        {items
          .filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(item => (
          <div key={item.id} className="inventory-card-wrapper">
            <div className="inventory-card">
              <div className="card-image">
                {item.image && item.image.startsWith('data:image') ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <span className="card-emoji">{item.image || '🍽️'}</span>
                )}
              </div>
              <div className="card-content">
                <h3 className="card-title">{item.name}</h3>
                <span className="card-category">
                  {(() => {
                    const categoryWithEmoji = {
                      'Pizzas': '🍕 Pizzas',
                      'Kebabs & Grill': '🍢 Kebabs & Grill',
                      'Burgers & Wrap': '🍔 Burgers & Wrap',
                      'Sides & Snacks': '🍟 Sides & Snacks',
                      'Beverages': '🥤 Beverages'
                    };
                    return categoryWithEmoji[item.category] || item.category;
                  })()}
                </span>
                <div className="card-price">
                  {item.offerPrice ? (
                    <>
                      <span className="original-price">€{typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</span>
                      <span className="offer-price">€{typeof item.offerPrice === 'number' ? item.offerPrice.toFixed(2) : item.offerPrice}</span>
                    </>
                  ) : (
                    <span className="regular-price">€{typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</span>
                  )}
                </div>
              </div>
              <button className="card-edit-btn" onClick={() => handleEditItem(item)} title="Edit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Edit Form */}
            {editingItem === item.id && (
              <div className="edit-form-container">
                <h4>Edit Product</h4>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    required
                  />
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price (€)"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    required
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Offer Price (Optional)"
                    value={editForm.offerPrice}
                    onChange={(e) => setEditForm({ ...editForm, offerPrice: e.target.value })}
                  />
                </div>
                <div className="image-upload-section">
                  <label className="image-upload-label">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditImageUpload}
                      style={{ display: 'none' }}
                    />
                    <div className="upload-button">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Change Image</span>
                    </div>
                  </label>
                  {editImagePreview && (
                    <div className="image-preview">
                      <img src={editImagePreview} alt="Preview" />
                    </div>
                  )}
                </div>
                <div className="edit-form-actions">
                  <button className="btn-delete" onClick={() => handleDeleteItem(item.id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Delete
                  </button>
                  <button className="btn-cancel" onClick={handleCancelEdit}>Cancel</button>
                  <button className="btn-save" onClick={() => handleSaveEdit(item.id)}>Save</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <Link to="/admin" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-label">Home</span>
        </Link>
        <Link to="/admin/orders" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {(() => {
            const activeCount = orderManager.getActiveOrdersCount();
            return activeCount > 0 ? <span className="orders-count-badge">{activeCount}</span> : null;
          })()}
          <span className="nav-label">Orders</span>
        </Link>
        <Link to="/admin/inventory" className="nav-item active">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-label">Inventory</span>
        </Link>
      </nav>

      {/* Avatar Popup */}
      {user && (
        <AvatarPopup 
          user={user} 
          isOpen={showAvatarPopup} 
          onClose={() => setShowAvatarPopup(false)} 
        />
      )}
    </div>
  );
};

export default Inventory;
