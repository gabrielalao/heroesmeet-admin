const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const {Validator} = require('node-input-validator');
const bcrypt = require('bcrypt');
var User = require('../../models/userModel.js');
var Image = require('../../models/imageModel.js');
var moment = require('moment');


const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const updateSocialId = (res, formData) => {
    User.findOneAndUpdate({email: formData.email}, {social_id: formData.social_id}, {upsert: true, new : true}, function (errr, updated_doc) {
        if (errr) {
            res.status(200).json({statusCode: 400, message: errr.message, data: ""});
        } else {
            res.status(200).json({statusCode: 200, message: "User created successfully.", data: updated_doc});
        }
    });
};


const saveMultipleImage = (req, res, user_id) => {
    var files = req.files.profile_img;
    for (let i = 0; i < Object.keys(req.files.profile_img).length; i++) {
        const full_name = "_" + moment().valueOf() + "_" + files[i].name;
        console.log(appRoot + '/public/images/profile/' + full_name);
        files[i].mv(appRoot + '/public/images/profile/' + full_name, function (err) {
            if (err) {
                console.log('upload err', err);
            } else {
                files[i].path = process.env.PROFILE_IMG_URL + "_" + full_name;
                files[i].user_id = user_id;
                console.log(files[i]);
                Image.create(files[i], async function (err, img) {
                   console.log('err ----', err);
                   console.log('img ----', img);
                }); 
            }
        });
    }
};

const signup = async(req, res) => {
    const formData = req.body;
    const validate = new Validator(formData, {
        full_name: 'required|string',
        dob: 'required',
        phoneNum: 'required|integer',
        password: 'required|string',
        verified: 'required|integer|between:0,1',
        gender: 'required|string',
        category: 'required|integer',
        email: 'email',
        social_id: 'string'
    });
    await validate.check().then((matched) => {
        if (!matched) {
            res.status(200).json({statusCode: 400, message: validate.errors});
        } else {
            try {
                var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
                formData.otp = otp;
                formData.password = createHash(formData.password);
                User.create(formData, async function (err, user) {
                    if (err) {
                        res.status(200).json({statusCode: 400, message: err.message, data: ""});
                    } else {
                        if (formData.social_id && formData.email) {
                            await updateSocialId(res, formData);
                        } else {
                            res.status(200).json({statusCode: 200, message: "User created successfully.", data: user});
                        }

                        //upload code for profile images
                        if (!req.files || Object.keys(req.files).length === 0) {
                            res.status(200).json({statusCode: 400, message: "No files were uploaded.", data: ""});
                        } else {
                            await saveMultipleImage(req, res, user._id);
                        }
                    }
                });
            } catch (mysql_error) {
                res.status(200).json(mysql_error);
            }
        }
    });
};

const sendOTP = async(req, res) => {
  const formData = req.body;
  const validate = new Validator(formData, {
      phoneNum: 'required|integer'
  });
  await validate.check().then((matched) => {
      if (!matched) {
          res.status(200).json({statusCode: 400, message: validate.errors});
      } else {
        try {
          var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
          formData.otp = otp;
          TwilioEvents.sendOtp(formData.phoneNum,otp)
          res.status(200).json({statusCode:200, message: "Otp has been sent to your mobile number.", data:{otp:otp} });

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
                        bcrypt.compare(formData.password, user.password).then(function (match) {
                            if (match === true) {
                                const payload = {user: user.full_name};
                                const options = {expiresIn: '24h', issuer: 'heros meet'};
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
    login,
    sendOTP
};
