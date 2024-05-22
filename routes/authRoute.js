const express = require('express')
const router = express.Router();

const {register,login,me, logout} = require('../controller/authController');
const verifyToken = require('../middleware/verifyToken');


router.post('/register',register);
router.post('/login',login);
router.get('/getMe',verifyToken,me);
router.post('/logout',verifyToken,logout)


// api/auth/register

module.exports = router;

