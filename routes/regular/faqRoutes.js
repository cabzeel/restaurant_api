const express = require('express');
const router = express.Router();
const getFaqData = require('../../controllers/faqData');

router.route('/').get(getFaqData);


module.exports = router;