import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productcard";
import "./home.css";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Banner images
import bannerImage from "../images/tem1.jpeg";
import bannerImage1 from "../images/banner1.jpg";
import bannerImage2 from "../images/banner2.jpg";
import bannerImage3 from "../images/banner3.jpg";
import bannerImage4 from "../images/banner4.jpg";
import bannerImage5 from "../images/banner5.jpg";

// Featured product images
import featured1 from "../images/jacket1.webp";
import featured2 from "../images/footwear3.webp";
import featured3 from "../images/acc27.webp";
import featured4 from "../images/jean4.webp";
import featured5 from "../images/tshirt13.webp";
import featured6 from "../images/shirt16.webp";
import featured7 from "../images/trouser14.webp";
import featured8 from "../images/acc24.avif";
import featured9 from "../images/tshirt2.webp";
import featured10 from "../images/jacket16.webp";
import featured11 from "../images/shirt10.webp";
import featured12 from "../images/acc26.webp";

// Latest product images
import latest1 from "../images/jean1.webp";
import latest2 from "../images/shirt15.webp";
import latest3 from "../images/tshirt3.webp";
import latest4 from "../images/jacket3.jpg";
import latest5 from "../images/footwear9.webp";
import latest6 from "../images/acc30.webp";

const Home = () => {
  const [products, setProducts] = useState([]);

  const featuredProducts = [
    { _id: "f1", name: "Black Jean Jacket", price: 2499, image: featured1 },
    { _id: "f2", name: "Running Shoes", price: 2499, image: featured2 },
    { _id: "f3", name: "Yves Saint Laurent Perfume", price: 5299, image: featured3 },
    { _id: "f4", name: "Straight Fit Blue Jeans", price: 1099, image: featured4 },
    { _id: "f5", name: "Grey 5 Sleeve T-shirt", price: 599, image: featured5 },
    { _id: "f6", name: "Blue Checked Shirt", price: 799, image: featured6 },
    { _id: "f7", name: "Cargo Straight Baggy Trouser", price: 899, image: featured7 },
    { _id: "f8", name: "Rounded Coolers", price: 1299, image: featured8 },
    { _id: "f9", name: "Black Sweat Shirt", price: 789, image: featured9 },
    { _id: "f10", name: "Short Sized Jacket ", price: 1899, image: featured10 },
    { _id: "f11", name: "Black & White Checked Shirt", price: 599, image: featured11 },
    { _id: "f12", name: "Tom Ford perfume", price: 1299, image: featured12 },
  ];

  const latestStatic = [
    { _id: "l1", name: "Black Jean Jacket", price: 2499, image: latest1 },
    { _id: "l2", name: "White 7-Sleeve Shirt", price: 799, image: latest2 },
    { _id: "l3", name: "5-Sleeve T-Shirt", price: 499, image: latest3 },
    { _id: "l4", name: "Blue Denim Jacket", price: 1799, image: latest4 },
    { _id: "l5", name: "Jordan Shoes", price: 1599, image: latest5 },
    { _id: "l6", name: "Creed Oudh Perfume", price: 3199, image: latest6 },
  ];

  useEffect(() => {
    axios
      .get("mongodb://localhost:27017/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const bannerImages = [bannerImage, bannerImage1, bannerImage2,bannerImage3,bannerImage4,bannerImage5];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="home">
      {/* Banner Carousel */}
      <div className="banner-container">
        <Slider {...sliderSettings}>
          {bannerImages.map((img, index) => (
            <div key={index} className="banner-slide">
              <img src={img} alt={`Banner ${index}`} className="home-banner" />
              <div className="banner-content">
                <h1>New Arrivals For Men</h1>
                <p>The Best Men Fashion Arrivals</p>
                <button className="shop-button">Shop Now</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Featured Products */}
      <div className="featured-section">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>

      {/* Latest Products */}
      <div className="latest-section">
        <h2 className="section-title">Latest Products</h2>
        <div className="product-grid">
          {latestStatic.map((product) => (
            <ProductCard
              key={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}

          {products.map((product) => (
            <ProductCard
              key={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
