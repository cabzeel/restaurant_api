const { required } = require('joi');
const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    image : {
        type : String,
        required : [true, 'please provide image'],
        trim : true,
        unique : [true, 'image must be unique'],
        minLength : [5, 'image must have at least 5 characters'],
        lowercase : true
    },

    name : {
        type : String,
        required : [true, 'user must have a name']
    },

    password : {
        type : String,
        required : [true, 'password is a must man'],
        trim : true,
        select : false
    },

    email : {
        type : String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/,
            'Please provide a valid email address'
        ]
    },

    verified : {
        type : Boolean,
        default : false
    },

    verificationCode : {
        type : String,
        select : false
    },

    verificationCodeValidation : {
        type : Number,
        select : false
    },

    forgottenPasswordCode : {
        type : String,
        select : false
    },

    forgottenPasswordCodeValidation : {
        type : Number,
        select : false
    },
}, {
    timestamps : true
})


module.exports = mongoose.model('User', usersSchema)
