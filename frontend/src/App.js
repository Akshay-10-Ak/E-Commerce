import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useLocation as useReactRouterLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

// Components & Pages
import Navbar from "./components/navbar";
import Category from "./components/category";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Wishlist from "./pages/wishlist";
import Login from "./pages/login";
import Register from "./pages/register";
import Contact from "./pages/contact";
import About from "./pages/about";
import Footer from "./components/footer";
import Shirt from "./pages/shirt";
import Jeans from "./pages/jeans";
import Tshirt from "./pages/tshirt";
import Trouser from "./pages/trouser";
import Accessories from "./pages/accessories";
import Jacket from "./pages/jacket";
import Ethnic from "./pages/ethnic";
import Footwear from "./pages/footwear";
import Buy from "./pages/buy";

// Admin Pages
import Dashboard from "./admin/dashboard";
import AddProduct from './admin/addproduct';
import EditProduct from "./admin/editproduct";
import ProductPage from "./admin/product";
import LoginPage from './admin/loginpage';
import AddCategory from './admin/addcategory'; // Adjust path accordingly
import EditCategory from './admin/editcategory';
// import CategoryTwo from './components/category2';
// import ProductsByCategory from "./components/productsbycategory";
import CategoryPage from './admin/categorypage';
// import ProductsPage from "./components/productspage";
// import CategoryProducts from "./components/categoryproduct";





const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  const location = useReactRouterLocation();

  const isAdminRoute = location.pathname.startsWith("/admin") ||
                       location.pathname.startsWith("/products") ||
                       location.pathname.startsWith("/edit");

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("user"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/cat_two" element={<CategoryTwo />} /> */}

        {/* Protected E-Commerce Routes */}
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/wishlist" element={isLoggedIn ? <Wishlist /> : <Navigate to="/login" />} />
        <Route path="/category" element={isLoggedIn ? <Category /> : <Navigate to="/login" />} />
        <Route path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to="/login" />} />
        <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to="/login" />} />
        <Route path="/buy" element={isLoggedIn ? <Buy /> : <Navigate to="/login" />} />

        {/* Category Routes */}
        <Route path="/category/shirt" element={<Shirt />} />
        <Route path="/category/jeans" element={<Jeans />} />
       <Route path="/category/t-shirt" element={<Tshirt />} />
        <Route path="/category/ethnic" element={<Ethnic />} />
        <Route path="/category/trouser" element={<Trouser />} />
        <Route path="/category/accessories" element={<Accessories />} />
        <Route path="/category/jacket" element={<Jacket />} />
        <Route path="/category/footwear" element={<Footwear />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/admin/categories" element={<CategoryPage />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/add-category" element={<AddCategory />} />
        <Route path="/admin/edit-category/:id" element={<EditCategory />} />
        {/* <Route path="/products/category/:id" element={<ProductsByCategory />} /> */}


        {/* <Route path="/products" element={<ProductsPage />} /> */}
        {/* <Route path="/products/:categoryName" element={<CategoryProducts />} /> */}

        </Routes>
      {!isAdminRoute && <Footer />} 
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
