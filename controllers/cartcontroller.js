const Cart = require("../models/cartModel");
const Product = require("../models/productmodel");
const User = require("../models/usermodel");
exports.additemtocart = async (req, res) => {
  try {
    console.log(req.user);
    const product = await Product.findOne({ _id: req.params.id });
    const cartitem = {
      product: req.params.id,
      quantity: 1,
    };
    let cart = await Cart.findOne({ user: req.user }).populate({
      path: "cartItems.product",
      // Get friends of friends - populate the 'friends' array for every friend
    });
    if (cart) {
      if (cart?.cartItems.length) {
        for (let index = 0; index < cart.cartItems.length; index++) {
          const element = cart.cartItems[index];
          if (req.params.id == element.product._id) {
            element.quantity += 1;
            cart.carttotal += element.product.price;
            const mcart = await cart.save();
            return res.status(200).json({ cart: mcart });
          }
        }
        cart.cartItems.push(cartitem);
        cart.carttotal += product.price;
        const mcart = await cart.save();
        cart = await Cart.findOne({ user: req.user }).populate({
          path: "cartItems.product",
          // Get friends of friends - populate the 'friends' array for every friend
        });
        return res.status(200).json({ cart });
      }
    }
    const cart_ = new Cart({ user: req.user });
    const cartu = await cart_.save();
    const cartn = await Cart.findOneAndUpdate(
      { user: req.user },
      { $push: { cartItems: cartitem } },
      { new: true }
    ).populate({
      path: "cartItems.product",
      // Get friends of friends - populate the 'friends' array for every friend
    });
    return res.status(200).json({ cart: cartn });
    // if (!cart) {
    //   const ucart = cart_.save();
    //   return res.status(200).json({ cart: ucart, product, cartitem });
    // }
    // if (cart.cartItems?.length) {
    //   return res.status(200).json({ cart, product, cartitem });
    // }
    // cart = await Cart.findByIdAndUpdate(
    //   { user: req.user },
    //   { $push: { cartItems: cartitem } },
    //   { new: true }
    // );
    // return res.status(200).json({ cart, product, cartitem });
  } catch (error) {
    console.log(error);
  }
};
exports.getusercart = async (req, res) => {
  try {
    console.log(req.user);
    // let total = 0;
    let ucart = await Cart.findOne({ user: req.user }).populate({
      path: "cartItems.product",
      // Get friends of friends - populate the 'friends' array for every friend
    });
    if (ucart) {
      return res.status(200).json({ cart: ucart });
    } else {
      let ucart_ = new Cart({ user: req.user })
      const cart = await ucart_.save();
      return res.status(200).json({ cart });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.cartitemincreament = async (req, res) => {
  // console.log(req.body);
  try {
    let quantitytosend = 0;
    const ucart = await Cart.findOne({
      user: req.user._id,
    }).populate({
      path: "cartItems.product",
      // Get friends of friends - populate the 'friends' array for every friend
    });
    // console.log(ucart.cartItems);
    for (let index = 0; index < ucart.cartItems.length; index++) {
      const element = ucart.cartItems[index];
      if (element.product._id == req.params.id) {
        quantitytosend = element.quantity += 1;
        ucart.carttotal += element.product.price;
      }
    }
    const cart = await ucart.save();
    return res.status(200).json({
      cart,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.cartitemdescreament = async (req, res) => {
  try {
    let quantitytosend = 0;
    const ucart = await Cart.findOne({
      user: req.user._id,
    }).populate({
      path: "cartItems.product",
      // Get friends of friends - populate the 'friends' array for every friend
    });
    for (let index = 0; index < ucart.cartItems.length; index++) {
      const element = ucart.cartItems[index];
      if (element.product._id == req.params.id) {
        quantitytosend = element.quantity -= 1;
        ucart.carttotal -= element.product.price;
      }
    }
    const cart = await ucart.save();
    return res.status(200).json({
      cart,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.removeitemfromcart = async (req, res) => {
  console.log(req.body);
  try {
    const ucart = await Cart.findOne({
      user: req.user._id,
    }).populate("cartItems.product");
console.log("derlete",ucart)
    if (ucart) {
      for (let index = 0; index < ucart.cartItems.length; index++) {
        const element = ucart.cartItems[index];
        console.log("element",element)
        if (element.product._id == req.params.id) {
          // console.log('null')
          ucart.cartItems.pop(element);
          ucart.carttotal -= element.product.price * element.quantity;
        }
      }
      const cart = await ucart.save();
      return res
        .status(200)
        .json({ data: ucart, message: "Item Removed From Cart" });
    }
  } catch (error) {
    console.log(error);
  }
};
