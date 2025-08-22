const mongoose = require('mongoose');

const SignatureDishesSchema = new mongoose.Schema({
    image : {
        type : String,
        required : [true, 'image must be provided']
    },
     name : String,
     description : String,
     price : String,
     category : String
});

module.exports = mongoose.model('signature Dishes', SignatureDishesSchema)