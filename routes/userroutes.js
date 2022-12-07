const express = require("express");

const router = express.Router();
const {
  signup,
  login,
  loaduser,
  passwordchange,
} = require("../controllers/usercontrollers");
const { auth } = require("../middlewares/auth");
// const {auth} = require('../middleware/auth')

router.post("/register", signup);
router.post("/login", login);
router.get("/", auth, loaduser);
router.get("/password-change", auth, passwordchange);

module.exports = router;
