var express = require('express');
var router = express.Router();
let middleware = require('../middlewares/middleware');
const userCtrl = require('../controllers/api/users.controller.js');


router.post('/signup',userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/sendOtp', userCtrl.sendOTP);

module.exports = router;
