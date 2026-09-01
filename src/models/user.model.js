const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
     label: String,
    fullName: String,
    phone: {
      type: String,
      trim: true,
      maxlength: 256,
    },
    line1: {
      type: String,
      trim: true,
    },
    line2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    pinCode: {
      type: String,
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },

},{_id:true});
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 128,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 10,
  },

  role: {
    type: String,
    enum: ["user", "seller", "admin"],
    default: "user",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dxj0gqv1f/image/upload/v1690911685/avatar/default-avatar_ow7z6r.png",
  },
  shopName: {
    type: String,
    trim: true,
    maxlength: 128,
  },
  address: [addressSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
