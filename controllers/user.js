const express = require('express');
const router = express.Router();
const userDB = require('../utility/userDB.js');
const user = require('../models/user.js')
const userProfile =require('../models/userProfile.js');
const connectionDB = require('../utility/connectionDB.js');
const userProfileDB = require('../utility/userProfileDB.js');
const userConnectionModel = require('../models/userConnection.js').model;
const { check, validationResult } = require('express-validator');

router.get('/login', function(req,res){
    res.render('login', {session: req.session});
    
}); router.post('/login',[ 
    check('username').isLength({min: 5})
    .withMessage("Must be at least 5 characters")
    .trim()
    // Validate / Sanitize
    .escape(), check('password').isLength({min:7})
    .withMessage("must be at least 7 characters")
    .trim()
    .escape()
], async function(req,res){

    // Check Validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){

        req.session.loginErrors = errors.array();
        return res.redirect('login');
    }

    try{
        // grab user credentials
        let username = req.body.username;
        let password = req.body.password;

        // Check if existing user
        let isUser = await userDB.isValidUser(username, password);

        // if not return error
        if(!isUser){
            res.render('login', {unregisteredUser: true});
            return;
        }

        // continue, grab user
        req.session.theUser = await userDB.getUser(username);

        // Grab User Profile
        req.session.userProfile = await userProfileDB.getUserProfile(username)
    
        req.session.save(function(err){
            if(err){
                
            }
            res.redirect('savedConnections');
        });

    } catch(err){

        return console.error(err);
    }

});

router.post('/savedConnections/:rsvp', async function(req,res){

    if(!req.session.theUser){
        console.log('in here');
        
        res.redirect('/user/login');
    } else{
        // When RSVPing to Connection
        let id = req.body.connectionID;
        let rsvp = req.params.rsvp;
        let userID = req.session.userProfile.userID;
        let name = req.body.name;
        let type = req.body.type;
        let dateTime = req.body.dateTime;
        let details = req.body.details;
        
        //save userConnection to DB
        let userConnection = new userConnectionModel({
            'connectionID': id,
            'rsvp': rsvp,
            'name': name,
            'type': type,
            'details': details,
            'date:': dateTime
        });


        try{
            await userProfileDB.addUserConnection(userConnection, userID);
            let userConnections = await userProfileDB.getUserConnections(userID);
            req.session.userProfile.userConnections = userConnections;
            res.render('savedConnections', { session: req.session, userConnections: userConnections});

        } catch(err){

            console.error(err);
        }
      
    }

});

router.post('/createConnection',async function(req,res){
    if(!req.session.theUser){
        res.redirect('login');
    } else{
        // When RSVPing to Connection
        let userID = req.session.userProfile.userID;

        try{

            //save userConnection to DB
            let connection = await connectionDB.createConnection(req.body)

            // create userConnection for userProfile
            let userConnection = new userConnectionModel({
                'connectionID': connection._id,
                'name': connection.name,
                'type': connection.type,
                'details': connection.details,
                'date:': connection.dateTime
            });

            // save user connection, with rsvp 'yes'
            await userProfileDB.createUserConnection(userConnection, userID);

            // grab userConnections
            let userConnections = await userProfileDB.getUserConnections(userID);
            
            // save to session
            req.session.userProfile.userConnections = userConnections;

            res.redirect('/user/savedConnections');

        } catch(err){
            console.error(err);
        }
            
    }
});

router.get('/savedConnections', function(req,res){ 

    if (!req.session.theUser) {
        res.redirect('login');
    } else {

        let userConnections = req.session.userProfile.userConnections;
        res.render('savedConnections', { session: req.session, userConnections: userConnections });
    }

});

router.get('/update/:updateID', function(req,res){
    let updateID = req.params.updateID;
    console.log('updateID: ' + req.params.updateID);
    
    res.redirect('/connections?id=' + updateID);
    
});

router.post('/delete/:id', async function(req, res){

    let id = req.params.id;
    let userID = req.session.theUser.userID;


    try {
        await userProfileDB.deleteUserConnection(userID, id);
        req.session.userProfile = await userProfileDB.getUserProfile(userID);
        res.redirect('/user/savedConnections'); 
    } catch(err) {console.error(err);}

});

router.get('/signout', function(req,res){
    req.session.destroy();
    res.redirect('index');
});

router.get('/signup', function(req,res){
    res.render('signup', {session: req.session});
})
router.post('/signup', [
    // Validate / Sanitize
    check('username').isLength({min: 5})
    .withMessage("Must be at least 5 characters")
    .trim()
    .escape(),
    check('password').isLength({min:7})
    .withMessage("must be at least 7 characters")
    .trim()
    .escape()
], async function(req,res){

    // Check Validation
    const errors = validationResult(req)
    if(!errors.isEmpty()){

        return res.render('signup', {signupErrors: errors.array()});
    }

    try{
        // grab user credentials
        const { username, password, firstname, lastname, email } = req.body;

        // Check duplicity
        let isDuplicate = await userDB.isDuplicateUser(username);

        // if duplicate return error
        if(isDuplicate){
            req.session.signupErrors = errors.array();
            return res.render('signup', {invalidUser: true});
        }

        // Create User Model
        let registerUser = new user({
            userID: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        });


        // continue, Register User
        req.session.theUser = await userDB.registerUser(registerUser);

        // Create User Profile Model
        let registeredUserProfile = new userProfile({
            userID: username,
            userConnections: []
            
        })
        // Grab User Profile
        req.session.userProfile = await userProfileDB
            .registerUserProfile(registeredUserProfile)
            
        req.session.save(function(err){
            if(err){
                
            }
            res.redirect('savedConnections');
        });
        
    } catch(err){

        return console.error(err);

    }
});


module.exports = router;