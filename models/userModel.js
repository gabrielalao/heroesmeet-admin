'use strict';
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    full_name: {
        type: String,
        required: 'Kindly enter your full name.'
    },
    dob: {
        type: String,
        required: 'Kindly select your dob.'
    },
    gender: {
        type: String,
        required: 'Please provide your gender.'
    },
    category: {
        type: String,
        required: 'Please provide category.'
    },
    email: {
        type: String
    },
    social_id: {
        type: String
    },
    password: {
        type: String,
        required: 'Please enter your password.'
    },
    phoneNum: {
        type: String,
        required: 'Please enter your phone number.',
        unique: true
    },
    otp: {
        type: Number,
        default: 0
    },
    verified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Users', UserSchema);