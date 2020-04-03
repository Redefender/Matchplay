var express = require('express');
var connection = require('./controllers/connection.js')
var connectionDB = require('./utility/connectionDB.js')
var user = require('./controllers/user.js');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false}));

app.set('view engine', 'ejs');
app.use(express.static('assets'));

app.get('/', function(req,res){
    res.render('index');
});


app.use('/connections', connection);
app.use('/user', user);
app.get('/about', function(req, res){
    res.render('about');
});

app.get('/contact', function(req, res){
    res.render('contact');
});


app.get('/profile/:name', function(req,res){
    var data = { age:29, job:'ninja', hobbies: ['eating', 'fighting', 'fishing']};
    res.render('profile', {person: req.params.name, data: data});

});

app.get('/*', function(req,res){
    res.render('index');
});

app.listen(3000);