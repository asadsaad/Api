const express = require("express");

const router = express.Router();
const { signup, login, loaduser } = require("../controllers/usercontrollers");
const { auth } = require("../middlewares/auth");
// const {auth} = require('../middleware/auth')

router.post("/register", signup);
router.post("/login", login);
router.get("/", auth, loaduser);

module.exports = router;
