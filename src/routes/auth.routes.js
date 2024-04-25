const express = require('express');
const { getAllLogin, PostRegister, createLogin, forgotPassword, resetPassword  }= require('../apps/auth/auth.controller');
const router = express.Router();

router.get('/signup', getAllLogin);
// router.post('/login', PostLogin );
router.post('/signup', PostRegister );

router.post('/login', createLogin );

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


module.exports = router;