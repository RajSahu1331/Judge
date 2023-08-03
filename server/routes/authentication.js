const express = require('express')

const { handleUserSignUp, handleUserLogin, UserLogin }  = require("../controllers/authController")


const router = express.Router()

router.post('/signup', handleUserSignUp)

// router.post('/login', handleUserLogin)

router.get('/login', UserLogin)


module.exports = router;
