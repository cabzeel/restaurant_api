const mongoose = require('mongoose');

const FaqDataSchema = mongoose.Schema({
    question : String,
    answer : String
})

module.exports = mongoose.model('faqData', FaqDataSchema)