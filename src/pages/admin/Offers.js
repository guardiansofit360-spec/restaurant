import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import offersDataJson from '../../data/offersData.json';
import AvatarPopup from '../../components/AvatarPopup';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const [newOffer, setNewOffer] = useState({
    title: '',
    code: '',
    discount: ''
  });

  // Load offers from localStorage on mount
  React.useEffect(() => {
    const storedOffers = localStorage.getItem('restaurant_offers');
    const loadedOffers = storedOffers ? JSON.parse(storedOffers) : offersDataJson;
    setOffers(loadedOffers);
  }, []);

  const handleAddOffer = (e) => {
    e.preventDefault();
    const offer = {
      id: Date.now(),
      ...newOffer,
      discount: parseInt(newOffer.discount),
      active: true
    };
    const updatedOffers = [...offers, offer];
    setOffers(updatedOffers);
    // Save to localStorage
    localStorage.setItem('restaurant_offers', JSON.stringify(updatedOffers));
    setNewOffer({ title: '', code: '', discount: '' });
  };

  const toggleOffer = (offerId) => {
    const updatedOffers = offers.map(offer =>
      offer.id === offerId ? { ...offer, active: !offer.active } : offer
    );
    setOffers(updatedOffers);
    // Save to localStorage
    localStorage.setItem('restaurant_offers', JSON.stringify(updatedOffers));
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
            <span>ðŸ‘¤</span>
          </div>
        </div>
      </div>

      <div className="admin-header-section">
        <h1>Offers Management</h1>
        <p className="admin-subtitle">Create and manage promotional offers</p>
      </div>

      <div className="form-section">
        <h2>Create New Offer</h2>
        <form onSubmit={handleAddOffer}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Offer Title"
              value={newOffer.title}
              onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Promo Code"
              value={newOffer.code}
              onChange={(e) => setNewOffer({ ...newOffer, code: e.target.value.toUpperCase() })}
              required
            />
            <input
              type="number"
              placeholder="Discount %"
              value={newOffer.discount}
              onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Create Offer</button>
        </form>
      </div>

      <div className="inventory-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Code</th>
              <th>Discount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map(offer => (
              <tr key={offer.id}>
                <td>{offer.id}</td>
                <td>{offer.title}</td>
                <td><strong>{offer.code}</strong></td>
                <td>{offer.discount}%</td>
                <td>
                  <span className={`status €{offer.active ? 'in-stock' : 'low-stock'}`}>
                    {offer.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button
                    className={offer.active ? 'btn-danger' : 'btn-secondary'}
                    onClick={() => toggleOffer(offer.id)}
                  >
                    {offer.active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
            const storedOrders = localStorage.getItem('restaurant_orders');
            const allOrders = storedOrders ? JSON.parse(storedOrders) : [];
            const activeOrders = allOrders.filter(order => 
              order.status.toLowerCase() !== 'delivered' && order.status.toLowerCase() !== 'completed'
            );
            return activeOrders.length > 0 ? <span className="orders-count-badge">{activeOrders.length}</span> : null;
          })()}
          <span className="nav-label">Orders</span>
        </Link>
        <Link to="/admin/inventory" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-label">Inventory</span>
        </Link>
        <Link to="/admin/offers" className="nav-item active">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 7H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-label">Offers</span>
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

export default Offers;
