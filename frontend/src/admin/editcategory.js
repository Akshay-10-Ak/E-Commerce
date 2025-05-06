import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './editcategory.css';
import './sidebar';
import Sidebar from './sidebar';

const EditCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    productId: '',
    image: null,
  });

  const [previewImage, setPreviewImage] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch category data
        const categoryResponse = await axios.get(`http://localhost:5000/api/categories/${id}`);
        const { name, description, price, product, image } = categoryResponse.data;

        // Set form data with fetched category data, including the product ID and image URL
        setFormData({
          name,
          description,
          price,
          productId: product?._id || '', // Set product ID if available
          image: null,
        });

        // Set preview image if available
        setPreviewImage(image ? `http://localhost:5000/uploads/${image}` : '');

        // Fetch all products to display in the dropdown
        const productResponse = await axios.get('http://localhost:5000/api/products');
        if (productResponse.data) {
          setProducts(productResponse.data);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching category or products:', err);
        alert('Error fetching category or products');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('productId', formData.productId);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await axios.put(`http://localhost:5000/api/categories/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Category updated successfully');
      navigate('/admin/categories');
    } catch (err) {
      console.error('Error updating category:', err);
      alert('Error updating category');
    }
  };

  return (
    <div className="edit-page-wrapper">
      <Sidebar />
      
      {/* Top Header with Search and Add Button */}
      <div className="edit-page-header">
        <div className="edit-page-actions">
          <input
            type="text"
            placeholder="Search categories..."
            className="category-search"
          />
          <button
            className="add-category-btn"
            onClick={() => navigate('/admin/add-category')}
          >
            + Add Category
          </button>
        </div>
      </div>

      <div className="edit-category-container">
        <h2>Edit Category</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Category Name"
              required
            />
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              placeholder="Price"
            />

            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
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
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />

            {previewImage && (
              <div className="preview-image">
                <img src={previewImage} alt="Preview" width="150" />
              </div>
            )}

            <button type="submit">Update Category</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditCategoryPage;
