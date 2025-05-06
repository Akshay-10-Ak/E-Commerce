import React from "react";
import { Link } from "react-router-dom";
import "./category.css";

import shirtsImg from "../images/shirts.webp";
import tshirtsImg from "../images/tshirt.webp";
import jeansImg from "../images/phants.webp";
import trousersImg from "../images/Trouser.webp";
import jacketsImg from "../images/jacket.jpg";
import ethnicImg from "../images/ethnic.webp";
import footwearImg from "../images/footwear.webp";
import accessoriesImg from "../images/accessories.jpg";

const categories = [
  { name: "Shirts", image: shirtsImg, route: "/category/shirt" },
  { name: "T-Shirts", image: tshirtsImg, route: "/category/tshirt" },
  { name: "Jeans", image: jeansImg, route: "/category/jeans" },
  { name: "Trousers", image: trousersImg, route: "/category/trouser" },
  { name: "Jackets", image: jacketsImg, route: "/category/jacket" },
  { name: "Ethnic Wear", image: ethnicImg, route: "/category/ethnic" },
  { name: "Footwear", image: footwearImg, route: "/category/footwear" },
  { name: "Accessories", image: accessoriesImg, route: "/category/accessories" },
];

const Category = () => {
  return (
    <div className="category-page">
      <h2>Shop by Category</h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <Link to={cat.route} key={index} className="category-card">
            <img src={cat.image} alt={cat.name} />
            <h3>{cat.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
