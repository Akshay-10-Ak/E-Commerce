import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import './product.css';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      alert("Error fetching categories");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error('Failed to delete category:', err);
      alert("Failed to delete category");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-category/${id}`);
  };

  const handleRedirectToAddCategory = () => {
    navigate('/admin/add-category');
  };

  return (
    <div className="product-page-container">
      <Sidebar />
      <div className="product-page">
        <h2>Manage Categories</h2>
        <div className="admin-top-bar">
          <input
            type="text"
            placeholder="Search categories..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-btn" onClick={handleRedirectToAddCategory}>Add Category</button>
        </div>
        <div className="product-table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Image</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Product</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr><td colSpan="7" className="no-data">No categories found</td></tr>
              ) : (
                categories
                  .filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((cat, index) => (
                    <tr key={cat._id}>
                      <td>{index + 1}</td>
                      <td>
                        {cat.image ? (
                          <img
                            src={`http://localhost:5000/uploads/${cat.image}`}
                            alt="Category"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          />
                        ) : 'No Image'}
                      </td>
                      <td>{cat.name}</td>
                      <td>{cat.description}</td>
                      <td>₹{cat.price}</td>
                      <td>{cat.product?.name || 'N/A'}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(cat._id)}>Edit</button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(cat._id)}
                          disabled={isDeleting}
                        >
                          {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
