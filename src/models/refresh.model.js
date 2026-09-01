const mongoose = require("mongoose");
const refreshSchema = new mongoose.Schema({
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  tokenHash: {
    type: String,
    required: true
  },

  userAgent: String,

  ip: String,

  expiresAt: {
    type: Date,
    required: true,
    index: {
      expires: 0
    }},
  


});
const RefreshModel = mongoose.model("refreshToken",refreshSchema);
module.exports = RefreshModel