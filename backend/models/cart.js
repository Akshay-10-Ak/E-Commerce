const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});

module.exports = mongoose.model('Cart', cartSchema);
