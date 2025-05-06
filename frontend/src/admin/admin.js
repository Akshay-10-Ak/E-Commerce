import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Remove the product list state and fetch functionality
  useEffect(() => {
    // You can fetch products here if necessary for other functionality
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-top-bar">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="add-btn" onClick={() => navigate('/admin/add-product')}>
          Add Product
        </button>
      </div>
      
      {/* Removed Product Table */}
    </div>
  );
};

export default Admin;
