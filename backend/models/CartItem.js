const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  name: String,
  color: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model("CartItem", cartItemSchema);
