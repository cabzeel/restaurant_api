const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title : {
        type : String,
        required : [true, 'title is required']
    },

    description : {
        type : String,
        required : [true, 'description is required']
    },

    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        
    }
},

{
    timestamps : true
})

module.exports = mongoose.model('Post', PostSchema)