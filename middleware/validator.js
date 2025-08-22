const joi = require('joi');

exports.signupSchema = joi.object({
    email : joi.string().min(6).max(60).required().email({
        tlds : {
            allow : ['com', 'net']
        }
    }),
    password : joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9]+$/))
})

exports.signinSchema = joi.object({
    email : joi.string().min(6).max(60).required().email({
        tlds : {
            allow : ['com', 'net']
        }
    }),
    password : joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9]+$/))
})

exports.acceptCodeSchema = joi.object({
    email : joi.string().min(6).max(60).required().email({
        tlds : {
            allow : ['com', 'net']
        }
    }),
    providedCode : joi.number().required()
})

exports.changePasswordSchema = joi.object({
    newPassword : joi.string().
    required().
    pattern(new RegExp(/^[a-zA-Z0-9]+$/)),

    oldPassword : joi.string().
    required().
    pattern(new RegExp(/^[a-zA-Z0-9]+$/)),
});

exports.acceptFPCodeSchema = joi.object({
    email : joi.string().min(6).max(60).required().email({
        tlds : {
            allow : ['com', 'net']
        }
    }),
    providedCode : joi.number().required(),
    newPassword : joi.string().
    required().
    pattern(new RegExp(/^[a-zA-Z0-9]+$/))
})

exports.createPostSchema = joi.object({
    title : joi.string().required().min(5).max(60),
    description : joi.string().required().min(20).max(600),
    userId : joi.string().required()
});

exports.createAdminSchema = joi.object({
    email : joi.string().min(6).max(60).required().email({
        tlds : {
            allow : ['com', 'net']
        }
    }),

    username : joi.string().required().min(5).max(60),
    password : joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9]+$/))



})

