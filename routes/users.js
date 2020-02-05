var express = require('express');
var router = express.Router();

const userCtrl = require('../controllers/api/users.controller.js');

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.post('/signup',userCtrl.signup);

module.exports = router;
