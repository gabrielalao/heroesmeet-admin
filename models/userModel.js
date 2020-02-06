'use strict';
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  phoneNum: {
    type: String,
    required: 'Please enter your phone number',
    unique: true
  },
  password: {
    type: String,
    required: 'Please enter your password'
  },
  token: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false
  },
  otp: {
    type: Number,
    default: 0
  },
  full_name: {
    type: String,
    //required: 'Kindly enter your full name'
  },
  dob: {
    type: String,
    //required: 'Kindly select your dob'
  },
  gender: {
    type: String,
    required:'Please provide your gender'
  },
  category: {
    type: String,
    required: 'Please provide category'
  },
//   email: {
//     type: String,
//     //required: 'Kindly enter your email'
//   },
  updated_at: {
    type: Date,
    default: Date.now
  },
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Users', UserSchema);