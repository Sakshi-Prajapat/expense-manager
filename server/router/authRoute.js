const express = require('express');
const router = express.Router();
const {postUserValidation,loginUserValidation} = require('../validation/validation')
const { handlePostUser,handleSignIn } = require('../controller/authController');

router.post('/signup', postUserValidation, handlePostUser);
router.post('/signin', loginUserValidation ,handleSignIn);

module.exports = router;
