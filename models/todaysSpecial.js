const mongoose = require('mongoose');

const TodaysSpecialSchema = new mongoose.Schema({
    image : {
        type : String,
        required : [true, 'image must be provided']
    },
     name : String,
     description : String,
     price : String,
     category : String
});

module.exports = mongoose.model('todays Special', TodaysSpecialSchema)