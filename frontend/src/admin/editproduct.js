import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import './admin.css';
import './editproduct.css';

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL params
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null, // Initialize with no image
  });

  const [existingImage, setExistingImage] = useState(null); // State for storing the current image URL

  useEffect(() => {
    // Fetch product data when the component mounts
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        const data = res.data;
        console.log("Fetched product:", data);
        
        // Update the state with the fetched product data
        setProduct({
          name: data.name || '',
          description: data.description || '',
          price: data.price ? data.price.toString() : '',
          category: data.category || '',
          image: null, // Image will be handled separately
        });

        // Set the existing image URL for preview
        setExistingImage(data.image);
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
        alert('Failed to fetch product data');
      });
  }, [id]); // Run this effect only when the `id` changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });

    // Show the image preview if a new file is selected
    if (file) {
      setExistingImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    // formData.append('price', product.price);
    // formData.append('category', product.category);
    
    // If a new image is selected, append it to the form data
    if (product.image) {
      formData.append('image', product.image);
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('✅ Product updated successfully');
      navigate('/admin'); // Redirect to admin page after successful update
    } catch (err) {
      console.error('❌ Error updating product:', err);
      alert('❌ Failed to update product');
    }
  };

  return (
    <div className="product-page-container">
      <Sidebar />
      <div className="product-page">
        <div className="admin-top-bar">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            // You can handle the search functionality here if needed
          />
          <button className="add-btn" onClick={() => navigate('/admin/add-product')}>
            Add Product
          </button>
        </div>

        <div className="admin-content">
          <h2>Edit Product</h2>
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
            {/* <input
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
            /> */}

            {existingImage && (
              <div className="image-preview">
                <label>Image Preview:</label><br />
                <img
                  src={`http://localhost:5000/uploads/${existingImage}`}
                  alt="Product Preview"
                  height="100"
                />
              </div>
            )}

            <input
              type="file"
              name="image"
              onChange={handleImageChange}
            />

            <button type="submit" className="submit-btn">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
