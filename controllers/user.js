var express = require('express');
var router = express.Router();
var userDB = require('../utility/userDB.js');
const connectionDB = require('../utility/connectionDB.js');
var userProfileDB = require('../utility/userProfileDB.js');
var userConnectionModel = require('../models/userConnection.js').model;

router.get('/login', function(req,res){
    
    res.render('login', {session: req.session});

});
router.post('/login', function(req,res){

    // Grab the hardcoded user
    userDB.getUser('testuser').then((user)=>{

        req.session.theUser = user;
        let userID = user.userID;

        // Grab User Profile
        userProfileDB.getUserProfile(userID).then((profile)=>{

            // save userProfile into session
            req.session.userProfile = profile;
            console.log('fromDB: ' + JSON.stringify(profile));
            
            req.session.save(function(err){
                if(err){
                    
                }
                res.redirect('savedConnections');
            });
        });
    }, (err)=>{
        return console.error(err);
    });

});

router.post('/savedConnections/:rsvp', function(req,res){

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

        (async ()=>{
            try{

                await userProfileDB.addUserConnection(userConnection, userID);
                let userConnections = await userProfileDB.getUserConnections(userID);
                req.session.userProfile.userConnections = userConnections;
                res.render('savedConnections', { session: req.session, userConnections: userConnections});

            } catch(err){

                console.error(err);
            }
      
        })();
    }

});

router.post('/createConnection',function(req,res){
    if(!req.session.theUser){
        res.redirect('login');
    } else{
        // When RSVPing to Connection
        let userID = req.session.userProfile.userID;

        (async()=>{

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
            
        })();

    }
});

router.post('')

router.get('/savedConnections', function(req,res){

    if(!req.session.theUser){
        res.redirect('login');
    } else{

        let userConnections = req.session.userProfile.userConnections;
        res.render('savedConnections', {session: req.session, userConnections: userConnections});
    }

});

router.get('/update/:updateID', function(req,res){
    let updateID = req.params.updateID;
    console.log('updateID: ' + req.params.updateID);
    
    res.redirect('/connections?id=' + updateID);
    
});

router.post('/delete/:id', function(req, res){

    let id = req.params.id;
    let userID = req.session.theUser.userID;

    (async ()=>{
        try {
            await userProfileDB.deleteUserConnection(userID, id);
            req.session.userProfile = await userProfileDB.getUserProfile(userID);
            res.redirect('/user/savedConnections'); 
        } catch(err) {console.error(err);}
    })();
});

router.get('/signout', function(req,res){
    req.session.destroy();
    res.redirect('index');
});

module.exports = router;