const express = require('express');
const { signup, signin, signout, sendVerificationCode, verifyVerificationCode, changePassword, sendForgottenPasswordCode, verifyForgottenPasswordCode } = require('../../controllers/authController');
const identifier = require('../../middleware/identifier');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', identifier, signout);

router.patch('/send-verification-code', identifier, sendVerificationCode);
router.patch('/verify-verification-code', identifier, verifyVerificationCode);
router.patch('/send-forgotten-password-code', sendForgottenPasswordCode);
router.patch('/verify-forgotten-password-code', verifyForgottenPasswordCode);
router.patch('/change-password', identifier, changePassword);

module.exports = router