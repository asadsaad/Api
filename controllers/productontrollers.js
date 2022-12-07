const Product = require("../models/productmodel");

exports.getallproducts = async (req, res) => {
  try {
    const products = await Product.find().populate("user");
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
  }
};
exports.getuserproducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user }).populate("user");
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
  }
};
exports.getsingleproduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate(
      "user"
    );
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log(error);
  }
};
exports.addproduct = async (req, res) => {
  try {
    const {
      productTitle,
      productDescription,
      images,
      price,
      catagery,
      instock,
      brand,
      discount,
    } = req.body;
    if (!productTitle) {
      return res
        .status(400)
        .json({ success: false, message: "Product Name is Required" });
    }
    if (!productDescription) {
      return res
        .status(400)
        .json({ success: false, message: "Product Description is Required" });
    }
    if (!catagery) {
      return res
        .status(400)
        .json({ success: false, message: "Catagery is Required" });
    }
    // if (!subcatagery) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Sub Catagery is Required" });
    // }
    if (!price) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Product price" });
    }
    if (!instock) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Stock" });
    }
    if (!brand) {
      return res
        .status(400)
        .json({ success: false, message: "Please Select Product Brand" });
    }
    const product = await new Product({
      user: req.user,
      productTitle: productTitle,
      productDescription: productDescription,
      images,
      price,
      catagery,
      // subcatagery,
      instock,
      brand,
      discount,
    });
    const data = await product.save();
    return res
      .status(200)
      .json({ success: true, data, message: "Product Created Sucessfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
exports.updateproduct = async (req, res) => {
  try {
    const {
      productTitle,
      productDescription,
      images,
      price,
      catagery,
      instock,
      brand,
      discount,
      isActive,
    } = req.body;
    const productp = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        productTitle,
        productDescription,
        images,
        isActive,
        price,
        catagery,
        instock,
        brand,
        isActive,
      },
      { new: true }
    );
    const product = await productp.save();
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log(error);
  }
};
exports.deleteproduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    return res
      .status(200)
      .json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};
