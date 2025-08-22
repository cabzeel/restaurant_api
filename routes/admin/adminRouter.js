const express = require('express');
const { createAdmin, adminLogin, getMe, protectedTest } = require('../../controllers/adminController');
const adminAuth = require('../../middleware/adminAuth');

const router = express.Router();

router.post('/create', createAdmin);
router.post('/login', adminLogin);
router.get('/me', adminAuth, getMe);
router.get('/protected', adminAuth, protectedTest)

module.exports = router
