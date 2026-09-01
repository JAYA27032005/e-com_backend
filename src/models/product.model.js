const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 140
  },

  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  description: {
    type: String,
    maxlength: 4000
  },

  price: {
    type: Number,
    required: true,
    min: 1
  }, 
  // selling price

  mrp: {
    type: Number,
    required: true,
    min: 1
  },

  images: [
    {
      url: String,
      publicId: String
    }
  ],

  video: {
    url: String,
    publicId: String
  }, // optional, seller upload

  category: {
    type: ObjectId,
    ref: 'Category',
    required: true,
    index: true
  },

  subCategory: {
    type: ObjectId,
    ref: 'Category',
    index: true
  },

  brand: {
    type: ObjectId,
    ref: 'Brand',
    index: true
  },

  seller: {
    type: ObjectId,
    ref: 'User',
    required: true,
    index: true
  }, // ABAC owner

  stockQty: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }, // seller-managed, no ledger

  tags: [
    {
      type: String,
      enum: ['trending', 'top-selling', 'new']
    }
  ], // seller-selected

  ratingAvg: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },

  ratingCount: {
    type: Number,
    default: 0
  },

  soldCount: {
    type: Number,
    default: 0
  }, // incremented at order placement, drives "top selling"

  isActive: {
    type: Boolean,
    default: true
  } ,// seller unpublish / admin takedown


// Virtual: discountPercent
// = Math.round(((mrp - price) / mrp) * 100)
// Never store a derived value.

// Virtual: inStock
// = stockQty > 0

// pre('validate'):
// slug = slugify(title) + '-' + nanoid(6)

// pre('validate'):
// if (price > mrp) {
//   throw new ValidationError('Price cannot exceed MRP');
// }
});
const productModel = mongoose.model('Product', categorySchema);
module.exports = productModel;
