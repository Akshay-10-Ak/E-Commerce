import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.css'; // style as you like

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li onClick={() => navigate('/admin/categories')}>Categories</li>
        

        {/* You can add more links here (e.g., Orders, Users) */}
      </ul>
    </div>
  );
};

export default Sidebar;
