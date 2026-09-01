const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    
  name: {
    type: String,
    required: true,
    trim: true
  },

  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },

  image: {
    url: String,
    publicId: String
  },

  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
    index: true
  }, 

  position: {
    type: Number,
    default: 0
  },

  isActive: {
    type: Boolean,
    default: true
  }

});
const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;