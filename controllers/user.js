var express = require('express');
var router = express.Router();
var user = require('../models/user.js');
var userProfileModel = require('../utility/userProfile.js');
var connectionDB = require('../utility/connectionDB.js');
var userConn = require('../models/userConnection.js');
var connectionModel = require('../models/connection.js');
var userConnection = require('../models/userConnection');
// var connectionDB = require('../utility/connectionDB.js');


router.get('/login', function(req,res){
    console.log('within reouter.get');
    
    res.render('login', {session: req.session});

});
router.post('/login', function(req,res){

    //hardcoded user
    let loggedInUser = new user('userid', 'Bob', 'Smith', 'emailAddress');
    req.session.theUser = loggedInUser;


    // Grab all currently saved connections, but in this case hardcoded for now so just saying empty
    let profile = new userProfileModel(loggedInUser.userID);
    profile.addConnection(new userConn(new connectionModel('id', 'name', 'type', 'details','dateTime'),'yes'));

    req.session.userProfile = profile;



    req.session.save(function(err){
        if(err){
            console.log('err: ' + err);
            
            console.log('play ball: ' + req.session.userProfile.userConnections);
            
            console.log('session dets before: ' + req.session.theUser.userID);
            console.log('session dets before: ' + req.session.theUser.userID);

            

        }
        res.redirect('savedConnections');
    });

});

router.post('/savedConnections/:rsvp', function(req,res){

    if(!req.session.theUser){
        console.log('in here');
        
        res.redirect('/user/login');
    } else{

        let id = req.body.connectionID;
        let rsvp = req.params.rsvp;
        let saved = null;
        let conn = connectionDB.getConnection(id);
    
        let userConn = new userConnection(new connectionModel(conn._id, conn._name, conn._type,
            conn._details,conn._dateTime), rsvp);
    
        // profile.addConnection(new userConn(new connectionModel('id', 'name', 'type', 'details','dateTime'),'yes'));
        console.log('saved userconnection ' +  JSON.stringify(userConn));
        
        // grab session profile, because session profile doesn't have prototype methods
        let updateUserProfile = new userProfileModel(req.session.userProfile._userID);
        updateUserProfile._userConnections = req.session.userProfile._userConnections;
    
        // perform prototype methods on updatedUserProfile
        updateUserProfile.addConnection(userConn);
    
        // update session profile
        req.session.userProfile = updateUserProfile;
        console.log('before render  ' + JSON.stringify(req.session.userProfile));
        
        res.render('savedConnections', { session: req.session, userConnections: req.session.userProfile._userConnections });
    }

});

router.get('/savedConnections', function(req,res){

    if(!req.session.theUser){
        res.redirect('login');
    } else{

        // console.log('Request after redirect: ' + req.session.userProfile._userConnections[0].rsvp);
        console.log('userprofile: ' + JSON.stringify( req.session.userProfile));


        res.render('savedConnections', {
            userConnections: req.session.userProfile._userConnections, 
            session: req.session
        });
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