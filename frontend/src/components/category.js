// import React from "react";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./category.css";
// import axios from "axios";

// import shirtsImg from "../images/shirts.webp";
// import tshirtsImg from "../images/tshirt.webp";
// import jeansImg from "../images/phants.webp";
// import trousersImg from "../images/Trouser.webp";
// import jacketsImg from "../images/jacket.jpg";
// import ethnicImg from "../images/ethnic.webp";
// import footwearImg from "../images/footwear.webp";
// import accessoriesImg from "../images/accessories.jpg";

// const categories = [
//   { name: "Shirts", image: shirtsImg, route: "/category/shirt" },
//   { name: "T-Shirts", image: tshirtsImg, route: "/category/tshirt" },
//   { name: "Jeans", image: jeansImg, route: "/category/jeans" },
//   { name: "Trousers", image: trousersImg, route: "/category/trouser" },
//   { name: "Jackets", image: jacketsImg, route: "/category/jacket" },
//   { name: "Ethnic Wear", image: ethnicImg, route: "/category/ethnic" },
//   { name: "Footwear", image: footwearImg, route: "/category/footwear" },
//   { name: "Accessories", image: accessoriesImg, route: "/category/accessories" },
// ];





// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./category.css";
// import axios from "axios";

// const Category = () => {

//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/products");
//         setCategories(res.data);
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//       }
//     };

//     fetchCategories();
//   }, []); 
//   return (
//     <div className="category-page">
//       <h2>Shop by Products</h2>
//       <div className="category-grid">
//         {categories.map((cat, index) => (
//           <Link to={cat.route} key={index} className="category-card">
//             <img src={`http://localhost:5000/uploads/${cat.image}`} alt={cat.name} />
//             <h3>{cat.name}</h3>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Category;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./category.css";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="category-page">
      <h2>Shop by Products</h2>
      <div className="category-grid">
        {categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          categories.map((cat) => (
            <Link
              to={`/category/${cat.name?.toLowerCase() || ''}`}
              key={cat._id}
              className="category-card"
            >
              {cat.image ? (
                <img
                  src={`http://localhost:5000/uploads/${cat.image}`}
                  alt={cat.name}
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
              <h3>{cat.name}</h3>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;
