let mongoose = require('mongoose');
let userProfileModel = require('../models/userProfile.js');


let addUserConnection = async function(userConnection, userID){

    let userProfile = await userProfileModel.findOne({'userID': userID}).exec();
    let userConnections = userProfile.userConnections;

    // Make sure userConnection is unique
    for(var i =0; i< userConnections.length; i++){
        if(userConnections[i].connectionID == userConnection.connectionID)
            return;
    }

    userProfile.userConnections.push(userConnection);
    await userProfile.save();
}

let getUserProfile = function (userID){

    return userProfileModel.findOne({'userID': userID}).exec();
}


getUserConnections = async function (userID){

    let userProfile = await userProfileModel.findOne({'userID': userID}).exec();
    return userProfile.userConnections;
}

let updateConnection = function(userConnectionIndex, conn){
    this._userConnections[userConnectionIndex]._rsvp = conn._rsvp;
}

let deleteConnection = async function(userID, connectionID){
    let userProfile = await userProfileModel.findOne({ 'userID': userID }).exec();
    let userConnections = userProfile.userConnections;
    for(var i = 0; i < userConnections.length; i++){
        if(userConnections[i].connectionID == connectionID)
            userConnections.splice(i, 1);
    }

    await userProfile.save();
}
        
let saveUserConnection = function(conn){
    let userID = req.session.theUser.userID;
    userProfileModel.findOne({'userID': userID}, function(err, userProfile){
        userProfile.userConnections.push(conn);
    });
}


    
module.exports = {
    addUserConnection: addUserConnection,
    getUserProfile: getUserProfile,
    getUserConnections: getUserConnections,
    updateConnection: updateConnection,
    deleteConnection: deleteConnection,
    saveUserConnection: saveUserConnection

}