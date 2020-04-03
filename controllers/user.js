var express = require('express');
var router = express.Router();
var user = require('../models/user.js');
// var savedConnection = require('../models/savedConnection');
// var connectionDB = require('../utility/connectionDB.js');


router.get('/login', function(req,res){
    res.render('login');

});
router.post('/login', function(req,res){
    // req.body.username, req.body.password
    
    res.render('login');

});

module.exports = router;