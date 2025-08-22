const mongoose = require('mongoose');
const { doHash } = require('../utils/hashing.js');

const AdminSchema = new mongoose.Schema({
  username : {
    type : String,
    required : [true, 'please input your user name']
  },

  password : {
    type : String,
    required : [true, 'dummy, what kinda admin does not have a password']
  },

  email : {
    type : String,

    required : [true, 'dear admin, why tf will you think you can create an account without an email?']
  }
});

AdminSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next();

  this.password = await doHash(this.password, 10);
  next()
});

module.exports = mongoose.model('Admin', AdminSchema)