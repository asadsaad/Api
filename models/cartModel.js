const mongoose = require("mongoose");

const cartModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
  cartItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number, default: 1 },
    },
  ],
  carttotal: {
    type: Number,
    default: 0,
  },
});

const Cart = mongoose.model("Cart", cartModel);

module.exports = Cart;
