const express = require('express');
const router = express.Router();

const productRoutes = require('./product');
const faqRoutes = require('./faqRoutes');
const specialsRoutes = require('./todaysSpecial');
const signatureDishRoutes = require('./signatureDishes');


router.use('/products', productRoutes);
router.use('/faqData', faqRoutes);
router.use('/specials', specialsRoutes);
router.use('/signature', signatureDishRoutes);


module.exports = router;
