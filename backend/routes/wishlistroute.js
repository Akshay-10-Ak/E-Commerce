const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist');

// POST - Add to wishlist
router.post('/wishlist', async (req, res) => {
  const newItem = new Wishlist(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

// GET - Fetch wishlist
router.get('/wishlist', async (req, res) => {
  const items = await Wishlist.find();
  res.json(items);
});

// DELETE - Remove wishlist item
// Assuming you have a Wishlist model
// Backend route for removing an item from the wishlist
router.delete('/wishlist/:id', async (req, res) => {
    try {
      const deletedItem = await Wishlist.findByIdAndDelete(req.params.id);
      
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found in wishlist' });
      }
  
      res.json({ message: 'Item removed from wishlist' });
    } catch (err) {
      console.error('Error removing item from wishlist:', err);
      res.status(500).json({ message: 'Failed to remove item', error: err.message });
    }
  });
  
  

module.exports = router;
