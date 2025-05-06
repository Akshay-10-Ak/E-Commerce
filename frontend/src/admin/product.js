import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './product.css';
import Sidebar from './sidebar';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(false); // For managing delete request status
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get(`http://localhost:5000/api/products`)
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        alert("Error fetching products");
      });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    setIsDeleting(true); // Set deleting status to true when starting the delete process

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(prev => prev.filter(product => product._id !== id)); // Filter out the deleted product from the list
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete product");
    } finally {
      setIsDeleting(false); // Set deleting status back to false when the operation completes
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="product-page-container">
      <Sidebar />
      <div className="product-page">
        <h2>All Products</h2>

        <div className="product-table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                {/* <th>Category</th>
                <th>Price</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan="5" className="no-data">No products found</td></tr>
              ) : (
                products
                  .filter(p =>
                    p.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((product, index) => (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td>
                        {product.image ? (
                          <img
                            src={`http://localhost:5000/uploads/${product.image}`}
                            alt={product.name}
                            width="80"
                            height="80"
                          />
                        ) : (
                          <span>No image</span>
                        )}
                      </td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      {/* <td>{product.category}</td>
                      <td>{product.price}</td> */}
                      <td className="product-actions">
                        <button
                          onClick={() => handleEdit(product._id)}
                          className="edit-btn"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="delete-btn"
                          disabled={isDeleting} // Disable button while deleting
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

        <div className="admin-container">
          <div className="admin-top-bar">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="add-btn"
              onClick={() => navigate('/admin/add-product')}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
