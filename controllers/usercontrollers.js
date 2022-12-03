const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    // console.log(req.body)
    const { username, email, password } = req.body;
    const fuser = await User.findOne({ email: email });
    if (fuser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered please login to continue",
      });
    }
    if (!username) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Username" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Email" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Password" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password must have 8 characters" });
    }
    const p = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: p });

    const userdata = await user.save();
    return res.status(200).json({
      success: true,
      message: "Account Created Successfully. Please Login To Continue",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Email" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Password" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        const token = jwt.sign({ _id: user._id }, "JWT_SECRET");
        return res
          .status(200)
          .json({ success: true, message: "Login Success", token });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Crediantials" });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Email is no Register",
      });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
exports.loaduser = async (req, res) => {
  try {
    const user = req.user;
    const token = req.token;
    if (user) {
      return res.status(200).json({ success: true, data: user, token });
    }
    return res.status(400).json({ success: false, message: "Invalid Attempt" });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};
