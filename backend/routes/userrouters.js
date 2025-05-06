const express = require('express');
const router = express.Router();
const Product = require('../models/products'); // Adjust path to your model
const multer = require('multer');
const path = require('path');

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


router.post('/products', upload.single('image'), async (req, res) => {
  const { name, description, price, category } = req.body;
  const image = req.file?.filename;

  if (!name || !description || !price || !category || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newProduct = new Product({ name, description, price, category, image });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product', error: err.message });
  }
});


router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});


router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error getting product' });
  }
});


router.put('/products/:id', upload.single('image'), async (req, res) => {
  const { name, description, price, category } = req.body;
  const updateData = { name, description, price, category };

  if (req.file) {
    updateData.image = req.file.filename;
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
});


router.delete('/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log('Products fetched:', products);  // Log fetched products
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log('Deleting product with ID:', productId);  // Log product ID being deleted

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log('Product deleted:', deletedProduct);  // Log deleted product
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Error deleting product' });
  }
};
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});


// Fetch products by category
router.get('/by-category/:categoryName', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryName });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete('/api/buy/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await BuyModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting buy item:", error);
    res.status(500).json({ message: "Failed to delete item" });
  }
});



module.exports = router;
