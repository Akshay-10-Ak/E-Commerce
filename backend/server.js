const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Product = require('./models/products');
const categoryRoutes = require('./routes/categoryroute');
const productRoutes = require('./routes/userrouters');
const Cart = require('./models/cart');
const Wishlist = require('./models/wishlist');
const Buy = require('./models/buy');
const wishlistRoutes = require('./routes/wishlistroute');


const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', require('./routes/userrouters'));
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// POST - Add Product
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new Product({
      name,
      description,
      price: parseFloat(price), // ensure price is stored as number
      category,
      image
    });

    const savedProduct = await newProduct.save();
    console.log('✅ Product saved:', savedProduct);
    res.status(201).json({ message: 'Product added successfully!', product: savedProduct });
  } catch (err) {
    console.error('❌ Error saving product to DB:', err);
    res.status(500).json({ message: 'Error adding product', error: err.message });
  }
});

// GET - Fetch all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


// API for Cart
app.post('/api/cart', async (req, res) => {
  try {
    const newCartItem = new Cart(req.body);
    await newCartItem.save();
    res.status(201).json({ message: 'Added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
});

app.get('/api/cart', async (req, res) => {
  const cartItems = await Cart.find();
  res.json(cartItems);
});

// API for Wishlist
app.post('/api/wishlist', async (req, res) => {
  try {
    const newWishlistItem = new Wishlist(req.body);
    await newWishlistItem.save();
    res.status(201).json({ message: 'Added to wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add to wishlist' });
  }
});

app.get('/api/wishlist', async (req, res) => {
  const wishlistItems = await Wishlist.find();
  res.json(wishlistItems);
});

// API for Buy
app.post('/api/buy', async (req, res) => {
  try {
    const newBuyItem = new Buy(req.body);
    await newBuyItem.save();
    res.status(201).json({ message: 'Proceed to Buy' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add to Buy' });
  }
});

app.get('/api/buy', async (req, res) => {
  const buyItems = await Buy.find();
  res.json(buyItems);
});


// Example using Express and Mongoose
app.delete('/api/cart/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const result = await Cart.deleteOne({ name: name }); // Assuming your Cart model has a 'name' field

    if (result.deletedCount > 0) {
      res.status(200).send({ message: 'Item removed from cart' });
    } else {
      res.status(404).send({ message: 'Item not found in cart' }); // Or another appropriate error
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).send({ message: 'Error removing item' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find(); // Ensure 'Product' is your model
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});
app.use('/api/wishlist', wishlistRoutes);
// Assuming you're using Express.js for your backend

// DELETE route to remove an item from the wishlist
app.delete('/api/wishlist/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Assuming you have a Wishlist model
    const deletedItem = await Wishlist.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item removed successfully' });
  } catch (err) {
    console.error('Error removing item:', err);
    res.status(500).json({ message: 'Failed to remove item' });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
