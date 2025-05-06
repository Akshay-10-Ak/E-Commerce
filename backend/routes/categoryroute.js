const express = require('express');
const multer = require('multer');
const path = require('path');
const Category = require('../models/category');
const Product = require('../models/products');
const Cart = require('../models/cart');
const Wishlist = require('../models/wishlist');
const Buy = require('../models/buy');
const { deleteWishlistItem } = require('../controllers/categorycontroller');
const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().populate('product');
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
});

// Get category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('product');
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching category', error: err.message });
  }
});

// Create category
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, productId } = req.body;

    const newCategory = new Category({
      name,
      description,
      price,
      product: productId,
      image: req.file?.filename || '',
    });

    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error adding category', error: err.message });
  }
});

// Update category
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, productId } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateData = {
      name,
      description,
      price,
      product: productId,
    };
    if (image) updateData.image = image;

    const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) return res.status(404).json({ message: 'Category not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating category', error: err.message });
  }
});

// Delete category
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Category not found' });

    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting category', error: err.message });
  }
});


router.get('/by-category/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('product');
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const products = await Product.find({ category: req.params.id });
    res.json({ products, categoryName: category.name });
  } catch (err) {
    console.error('Error fetching category products:', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Example: /api/products/by-category/:categoryId
router.get('/by-category/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const products = await Product.find({ category: category._id });
    res.json({ products, categoryName: category.name });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to Cart
router.post('/api/cart', async (req, res) => {
  try {
    const cartItem = new Cart(req.body);
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});


// Buy Now
router.post('/api/buy', async (req, res) => {
  try {
    const buyItem = new Buy(req.body);
    await buyItem.save();
    res.status(201).json(buyItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to proceed to buy' });
  }
});

// DELETE route to remove an item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await BuyModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ error: 'Failed to delete item' });
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

// Get categories, optionally filtered by type
router.get('/categories', async (req, res) => {
  const { type } = req.query;
  try {
    let query = {}; // Default to an empty query (fetch all)
    if (type) {
      query.type = type; // If 'type' query exists, filter by it
    }
    const categories = await Category.find(query);
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Error fetching categories' });
  }
});





module.exports = router;
