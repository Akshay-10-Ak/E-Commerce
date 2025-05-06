const mongoose = require('mongoose');

const buySchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});

module.exports = mongoose.model('Buy', buySchema);
