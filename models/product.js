const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'name cannot be empty'],
        trim : true
    },

    tag : {
        type : String,
        required : true
    },

    price : {
        type : String,
        required : [true, 'please input the price']
    },

    category : String,
    image: String
});

module.exports = mongoose.model('Products', ProductSchema)