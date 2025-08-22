const asyncWrapper = require('../middleware/async');
const FaqData = require('../models/faqData');


const getFaqData = asyncWrapper(async (req, res) => {
    const faqData = await FaqData.find();

    res.status(200).json({success : true, faqData, nbHits : faqData.length})
})

module.exports = getFaqData