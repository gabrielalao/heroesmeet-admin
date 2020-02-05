const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { Validator } = require('node-input-validator');
var User = require('../../models/userModel.js');

const signup = async(req, res) => {
    const formData = req.body;
    const validate = new Validator(formData, {
        full_name: 'required|string',
        dob: 'required|datetime',
        phoneNum: 'required|integer',
        password: 'required|string',
        verified: 'required|integer|between:0,1',
        //otp: 'required|integer',
        gender: 'required|string',
        category: 'required|integer',
        email: 'required|email'
    });
    await validate.check().then(async (matched) => {
        if (!matched) {
            res.status(200).json({status: 404, message: validate.errors});
        } else {
            try {
              var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
              formData.otp = otp;
              User.create(formData, function(err, user){
                console.log('err ****** ',err);
                console.log('new user data ****** ',user);
                if(err){
                  res.status(200).json(err);
                }else{
                  res.status(200).json({statusCode:200, data:user});
                }
              });
            } catch (mysql_error) {
                res.status(200).json(mysql_error);
            }
        }
    });
};


module.exports = {
    signup

};
