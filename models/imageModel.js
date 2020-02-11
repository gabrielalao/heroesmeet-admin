'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ImageSchema = new Schema({
    user_id:{
       type: mongoose.ObjectId,
       required: 'user id required.'
    },
    path: {
        type: String,
        required: 'Kindly enter image path.'
    },
    image_type: {
        type: String // profile image, avtaar, background
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


module.exports = mongoose.model('Images', ImageSchema);