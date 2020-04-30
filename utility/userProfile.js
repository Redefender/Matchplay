let mongoose = require('mongoose');
let userProfileModel = require('./userProfileModel.js');
let userConnection = require('../models/userConnection.js');
let connectionModel = require('./connectionModel.js');

class UserProfile {
    constructor(userID){
        this._userID = userID;
        this._userConnections = [];
    }
    get userID(){
        return this._userID;
    }
    set userID(newuserID){
        this._userID = newuserID;
    }
    
    get userConnections(){
        
        return this._userConnections;
    }

    set userConnections(newuserConnections){
        this._userConnections = newuserConnections;
    }

    // add userConnection
    // get user connections
    //save into session, return view
    async addUserConnection(userConnection, userID){
        try{
            let userProfile = await userProfileModel.findOne({'userID': userID}).exec();

            userProfile.userConnections.push(userConnection);
            await userProfile.save();

        } catch(err){
            console.error(err);
        }

        // Make Sure they're not duplicatess
    }
    
    getUserConnections(userID){
        try{
            return userProfileModel.findOne({'userID': userID}, { 'userConnections': 1, '_id': 0}).exec();

        } catch(err){
            console.error(err);
        }
    }
    
    updateConnection(userConnectionIndex, conn){
        this._userConnections[userConnectionIndex]._rsvp = conn._rsvp;
    }

    deleteConnection(id){
        for(var i =0; i< this._userConnections.length; i++){
            if(this._userConnections[i]._connection._id == id){
                this._userConnections.splice(i);
            }
        }
    }
        
    saveUserConnection(conn){
        let userID = req.session.theUser.userID;
        userProfileModel.findOne({'userID': userID}, function(err, userProfile){
            userProfile.userConnections.push(conn);
        });
    }

}

module.exports = UserProfile;