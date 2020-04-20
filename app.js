var express = require('express');
var connection = require('./controllers/connection.js')
var connectionDB = require('./utility/connectionDB.js')
var user = require('./controllers/user.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require("cookie-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false}));

app.set('view engine', 'ejs');
app.use(express.static('assets'));
// app.use(cookieParser());
app.use(session({httpOnly: false, cookieName: 'myCookie', secret: 'mysecret'}));
// app.use(session({
//     secret: 'cookie_secret',
//     resave: false,
//     saveUninitialized: false
// }));

app.get('/', function(req,res){
    console.log('within the hit');
    
    res.render('index', {session: req.session});
});

// app.use((req, res, next) => {
//     const oldRedirect = res.redirect;
//     res.redirect = function (...args) {
//         if (req.session) {
//         // redirecting after saving...
//         req.session.save(() => Reflect.apply(oldRedirect, this, args))
//         } else {
//         Reflect.apply(oldRedirect, this, args);
//         }
//     }
// })
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

app.listen(3000, "127.0.0.1");