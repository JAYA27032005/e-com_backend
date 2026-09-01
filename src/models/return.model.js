const mongoose = require("mongoose");
const returnSchema = new mongoose.Schema({
     order: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Order', 
        required: true, 
        index: true },
orderItemId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true },
user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true },
seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true },
product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true },
reason: { 
    type: String, 
    required: true, 
    minlength: 10, 
    maxlength: 500 },
photo: { 
    url: { type: String, required: true }, 
    publicId: String }, // exactly ONE photo
status: { 
    type: String, 
    enum: ['requested','approved','rejected','picked','refunded'],
default: 'requested', 
index: true },
sellerNote: String,
requestedAt: { 
    type: Date, 
    default: Date.now } 
// unique compound index on { order, orderItemId } -> o
});
const ReturnModel = mongoose.model("Return", returnSchema);
module.exports
