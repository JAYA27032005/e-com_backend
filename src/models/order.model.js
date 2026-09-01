const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  }, // ORD-20260817-8FQ2K, human-readable for support

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },

      seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
      }, // multi-vendor split

      title: String,

      image: String, // SNAPSHOT

      price: {
        type: Number,
        required: true
      }, // SNAPSHOT of price at purchase

      qty: {
        type: Number,
        required: true,
        min: 1
      },

      status: {
        type: String,
        enum: [
          'placed',
          'confirmed',
          'shipped',
          'delivered',
          'cancelled',
          'returned'
        ],
        default: 'placed'
      },

      deliveredAt: Date, // starts the 2-day return clock

      returnRequested: {
        type: Boolean,
        default: false
      }
    }
  ],

  shippingAddress: {
    fullName: String,
    phone: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String
  }, 

  amount: {
    itemsTotal: Number,
    shipping: Number,
    total: Number
  }, 

  payment: {
    method: {
      type: String,
      enum: ['cod', 'razorpay'],
      required: true
    },

    status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    },

    razorpayOrderId: String,

    razorpayPaymentId: String,

    razorpaySignature: String,

    paidAt: Date
  },

  orderStatus: {
    type: String,
    enum: [
      'pending_payment',
      'confirmed',
      'completed',
      'cancelled'
    ],
    default: 'confirmed',
    index: true
  },

  placedAt: {
    type: Date,
    default: Date.now
  }
})
const orderModel = mongoose.model('Order', categorySchema);
module.exports = orderModel;