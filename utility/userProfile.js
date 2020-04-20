let userConnection = require('../models/userConnection.js');


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
        console.log('hit the getter');
        
        return this._userConnections;
    }

    set userConnections(newuserConnections){
        this._userConnections = newuserConnections;
    }

    addConnection(conn){
        console.log('within addConnection ' + JSON.stringify(conn));
        // check if there is another with same id
        let duplicate = false;
        for(let i =0; i< this._userConnections.length; i++){
            if(this._userConnections[i]._connection._id === conn._connection._id){
                this._userConnections[i]._rsvp = conn._rsvp;
                duplicate = true;
                break;
            }
        }
        if(!duplicate){
            this._userConnections.push(new userConnection(conn._connection, conn._rsvp));
        }
    }

    deleteConnection(id){
        for(var i =0; i< this._userConnections.length; i++){
            if(this._userConnections[i]._connection._id == id){
                this._userConnections.splice(i);
            }
        }
    }
        

    getUserConnections(){

    }
}

module.exports = UserProfile;