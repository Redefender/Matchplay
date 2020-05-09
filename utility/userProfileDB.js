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


// Creates a new UserConnection that user made
let createUserConnection = async function(userConnection, userID){
    
    // make rsvp 'yes' since user created it
    userConnection.rsvp = 'yes';

    // add to userConnections list
    return await addUserConnection(userConnection, userID);
}

let getUserProfile = async function (userID){

    return await userProfileModel.findOne({'userID': userID}).exec();
}


let getUserConnections = async function (userID){

    let userProfile = await userProfileModel.findOne({'userID': userID}).exec();
    return userProfile.userConnections;
}

let deleteUserConnection = async function(userID, connectionID){
    let userProfile = await userProfileModel.findOne({ 'userID': userID }).exec();
    let userConnections = userProfile.userConnections;
    for(var i = 0; i < userConnections.length; i++){
        if(userConnections[i].connectionID == connectionID)
            userConnections.splice(i, 1);
    }

    await userProfile.save();
}
    

module.exports = {
    addUserConnection: addUserConnection,
    getUserProfile: getUserProfile,
    getUserConnections: getUserConnections,
    deleteUserConnection: deleteUserConnection,
    createUserConnection: createUserConnection
}