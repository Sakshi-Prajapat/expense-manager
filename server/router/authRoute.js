const express = require('express');
const router = express.Router();
const { handlePostUser,handleSignIn } = require('../controller/authController');

router.post('/signup', handlePostUser);
router.post('/signin', handleSignIn);

module.exports = router;
