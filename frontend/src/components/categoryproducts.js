import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./categoryproduct.css"; // Create if needed

const CategoryProducts = () => {
  const { categoryName } = useParams(); // 👈 Get category name from URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products?category=${categoryName}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products by category:", err);
      }
    };

    fetchProductsByCategory();
  }, [categoryName]);

  return (
    <div className="products-page">
      <h2>{categoryName.toUpperCase()} Collection</h2>
      <div className="products-grid">
        {products.length === 0 ? (
          <p>No products found in this category</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
