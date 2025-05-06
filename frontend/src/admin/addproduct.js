import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './admin.css';
import Sidebar from '../admin/sidebar';
import './addproduct.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }

    console.log('Submitting Product:', product); // Debugging log

    try {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ Product added successfully!');
      navigate('/admin'); // Redirect after successful submission
    } catch (err) {
      console.error('❌ Error:', err);
      alert('❌ Error adding product');
    }
  };

  const handleSearch = () => {
    alert(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-main-content">
        <div className="admin-top-bar">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-btn" onClick={handleSearch}>Search</button>
        </div>
        <div className="form-wrapper">
          <h2>Add Product</h2>
          <form className="admin-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
            />
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Description"
              required
            />
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Category"
              required
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
            />
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
