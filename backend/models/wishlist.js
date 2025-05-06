const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
