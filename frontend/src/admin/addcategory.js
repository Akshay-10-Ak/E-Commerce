import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './admin.css';
import Sidebar from '../admin/sidebar';
import './addcategory.css'; 

const AddCategoryPage = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState([]); // Store products list
  const [selectedProduct, setSelectedProduct] = useState(''); // Store selected product ID
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  // Fetch products for the dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data); // Set products data from backend
      } catch (err) {
        console.error('Failed to fetch products:', err);
        alert('Error fetching products');
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName) {
      alert('Category name is required!');
      return;
    }

    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('productId', selectedProduct);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/categories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ Category added successfully!');
      navigate('/admin/categories'); // Redirect to categories list page after successful submission
    } catch (err) {
      console.error('❌ Error:', err);
      alert('❌ Error adding category');
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-main-content">
        <div className="admin-top-bar">
          <div className="left-section">
            <input
              type="text"
              className="search-input"
              placeholder="Search categories..."
            />
            {/* <button className="search-btn">Search</button> */}
            <div className="right-section">
             {/* <button 
               className="add-category-btn" 
               onClick={() => navigate('/admin/add-category')}>
               Add Category
             </button> */}
           </div>
          </div>
          <div className="right-section">
            <button className="add-category-btn" onClick={() => navigate('/admin/add-category')}>Add Category</button>
          </div>
        </div>
        <div className="form-wrapper">
          <h2>Add New Category</h2>
          <form className="admin-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              type="text"
              name="categoryName"
              value={categoryName}
              onChange={handleChange}
              placeholder="Category Name"
              required
            />
            
            <select
              name="productName"
              value={selectedProduct}
              onChange={handleProductChange}
              required
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Description"
              required
            />
            <input
              type="number"
              name="price"
              value={price}
              onChange={handlePriceChange}
              placeholder="Price"
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

export default AddCategoryPage;
