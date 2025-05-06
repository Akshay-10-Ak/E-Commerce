const Category = require('../models/category');
const Product = require('../models/products');

// ✅ Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('product');
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
};

// ✅ Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('product');
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching category', error: err.message });
  }
};

// ✅ Create a new category with validation
const createCategory = async (req, res) => {
  try {
    const { name, description, price, productId } = req.body;

    // ⚠️ Ensure required fields are present
    if (!name || !productId) {
      return res.status(400).json({ message: 'Name and Product are required' });
    }

    const image = req.file ? req.file.filename : null;

    const newCategory = new Category({
      name,
      description,
      price,
      product: productId,
      image,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    console.error('Create Category Error:', err);
    res.status(500).json({ message: 'Error creating category', error: err.message });
  }
};

// ✅ Update a category
const updateCategory = async (req, res) => {
  try {
    const { name, description, price, productId } = req.body;

    if (!name || !productId) {
      return res.status(400).json({ message: 'Name and Product are required' });
    }

    const updatedData = {
      name,
      description,
      price,
      product: productId,
    };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error('Update Category Error:', err);
    res.status(500).json({ message: 'Error updating category', error: err.message });
  }
};

// ✅ Delete a category
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting category', error: err.message });
  }
};

const deleteWishlistItem = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the item from the wishlist collection by ID
    const deletedItem = await Wishlist.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item removed from wishlist.' });
  } catch (err) {
    console.error('Error removing item from wishlist:', err);
    res.status(500).json({ message: 'Failed to remove item from wishlist.' });
  }
};

Category.find().populate('product')




module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteWishlistItem
};
