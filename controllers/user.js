var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var userModel = require('../models/user.js');
var userProfileModel = require('../utility/userProfile.js');
var userProfileModelDB = require('../utility/userProfileModel.js');
var connectionDB = require('../utility/connectionDB.js');
var userConn = require('../models/userConnection.js');
var connectionModel = require('../models/connection.js');
var userConnection = require('../models/userConnection');
var userConnectionModel = require('../utility/userConnectionModel.js').model;

router.get('/login', function(req,res){
    
    res.render('login', {session: req.session});

});
router.post('/login', function(req,res){

    // Grab the User
    userModel.findOne({'userID':'testuser'}, function(err, user){
        if(err) return console.error(err);

        req.session.theUser = user;
        let id = user.userID;

        userProfileModelDB.findOne({'userID': id}, function(err, profile){
            if(err) return console.error(err);

            // save userProfile into session
            req.session.userProfile = profile;
            console.log('fromDB: ' + JSON.stringify(profile));
            
            req.session.save(function(err){
                if(err){
                    
                }
                res.redirect('savedConnections');
            });
        });
        
    }); // Find  test user initialized in DB

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
        
        // grab session profile, because session profile doesn't have prototype methods
        let userProfile = new userProfileModel(userID);

        (async ()=>{
            try{

                await userProfile.addUserConnection(userConnection, userID);
                let userConnections = await userProfile.getUserConnections(userID);
                req.session.userProfile.userConnections = userConnections;
                res.render('savedConnections', { session: req.session, userConnections: userConnections.userConnections});

            } catch(err){

                console.error(err);
            }
      
        })();
    }

});

router.get('/savedConnections', function(req,res){

    if(!req.session.theUser){
        res.redirect('login');
    } else{

        let userConnections = req.session.userProfile.userConnections

        // Grab Connections Data
        connectionDB.getConnectionsByID(userConnections)
        .then((connectionData)=>{
            console.log(connectionData);

            // assign the connection Data to the connections...

            res.render('savedConnections', {
                userConnections: userConnections, 
                session: req.session
            });
            
        })
   
    }


});

router.get('/update/:updateID', function(req,res){
    let updateID = req.params.updateID;
    console.log('updateID: ' + req.params.updateID);
    
    res.redirect('/connections?id=' + updateID);
    
});

router.post('/delete/:id', function(req, res){
    console.log('hit');
    
    let id = req.params.id;
    let profile = new userProfileModel(req.session.userProfile._userID);
    profile._userConnections = req.session.userProfile._userConnections;
    profile.deleteConnection(id);
    console.log('after delete: ' + JSON.stringify(profile));
    
    req.session.userProfile = profile;
    res.redirect('/user/savedConnections');
    
});

router.get('/signout', function(req,res){
    req.session.destroy();
    res.redirect('index');
});

module.exports = router;