const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { Validator } = require('node-input-validator');
const bcrypt = require('bcrypt');
var User = require('../../models/userModel.js');

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

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
    await validate.check().then((matched) => {
        if (!matched) {
            res.status(200).json({statusCode: 400, message: validate.errors});
        } else {
            try {
              var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
              formData.otp = otp;
              formData.password = createHash(formData.password);
              User.create(formData, function(err, user){
                if(err){
                  res.status(200).json({statusCode:400, message: err.message, data:""});
                }else{
                  res.status(200).json({statusCode:200, message: "User created successfully.", data:user, });
                }
              });
            } catch (mysql_error) {
                res.status(200).json(mysql_error);
            }
        }
    });
};


const login = async(req, res) => {
    const formData = req.body;
    const validate = new Validator(formData, {
        phoneNum: 'required|string',
        password: 'required|string'
    });
    await validate.check().then((matched) => {
        if (!matched) {
            res.status(200).json({statusCode: 400, message: validate.errors});
        } else {
            try {
               var tt = User.findOne({phoneNum: formData.phoneNum}, (err, user) => {
                  if (!err && user) {
                    var result = {};
                    bcrypt.compare(formData.password, user.password).then(function(match) {
                         if (match === true) {
                          const payload = { user: user.full_name };
                          const options = { expiresIn: '24h', issuer: 'heros meet' };
                          const secret = process.env.JWT_SECRET;
                          var token = jwt.sign(payload, secret, options);
                          res.status(200).json({token: token, statusCode: 200, message: "logged in successfully.", data: user});
                      } else {
                          res.status(200).json({statusCode: 401, message: "Password incorrect.", error: 'Authentication error'});
                      }
                    });                   
                  } else {
                    res.status(200).json({statusCode: 404, message: "Phone number not registered.", error: err});
                  }
              });
               console.log('user ----', tt);
              //User.findByIdAndUpdate(id, { $set: { name: 'jason bourne' }}, options, callback)
 
            } catch (mysql_error) {
                res.status(200).json(mysql_error);
            }
        }
    });
};



module.exports = {
    signup,
    login 

};
