// import React from "react";
// import { Link } from "react-router-dom";
// import "./categorycard.css";

// const CategoryCard = ({ name, image, link }) => {
//   return (
//     <Link to={link} className="category-card">
//       <img src={image} alt={name} />
//       <div className="category-name">{name}</div>
//     </Link>
//   );
// };

// export default CategoryCard;


import React from "react";
import { Link } from "react-router-dom";
import "./categorycard.css";

const CategoryCard = ({ name, image }) => {
  return (
    <Link to={`/category/${name.toLowerCase()}`} className="category-card">
      <img src={image} alt={name} />
      <div className="category-name">{name}</div>
    </Link>
  );
};

export default CategoryCard;
