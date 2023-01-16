const User = require("../models/usermodel");

const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    let token = req.header("x_auth");
    if (!token) {
      return res
        .status(404)
        .json({ error: "You are not eligible to perform this action!" });
    }
    const verify = await jwt.verify(token, process.env.JWT_SECRET);
    if (verify) {
      const user = await User.findOne({ _id: verify, token: token });
      req.token = token;
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ succes: false, error: error.message });
  }
};

module.exports = { auth };
