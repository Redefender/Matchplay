var express = require('express');
var connection = require('./controllers/connection.js');
var user = require('./controllers/user.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

// Env Variables for dev environment, but will 
// fail silently in production
require('dotenv').config()

mongoose.connect(process.env.DB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'), {useNewUrlParser: true})

var app = express();
app.use(bodyParser.urlencoded({ extended: false}));

app.set('view engine', 'ejs');
app.use(express.static('assets'));

app.use(session({httpOnly: false, cookieName: 'myCookie', secret: 'mysecret'}));

app.get('/', function(req,res){
    
    res.render('index', {session: req.session});
});

app.use('/connections', connection);
app.use('/user', user);
app.get('/about', function(req, res){
    res.render('about', {session: req.session});
});

app.get('/contact', function(req, res){

    res.render('contact', {session: req.session});
});

app.get('/*', function(req,res){

    res.render('index', {session: session});

});

app.listen(process.env.PORT || 3000);