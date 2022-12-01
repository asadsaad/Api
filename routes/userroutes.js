const express = require('express')

const router = express.Router()
const {signup, login,} = require("../controllers/usercontrollers")
// const {auth} = require('../middleware/auth')

router.post('/register',signup)
router.post('/login',login)









module.exports = router
