import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './sidebar';
import Admin from './admin';
import './dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Routes>
          {/* Redirect from root to product page */}
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<Admin />} />
          <Route path="/categorypage" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
