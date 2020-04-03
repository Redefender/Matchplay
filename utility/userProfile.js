class UserProfile {
    constructor(userID, userConnections){
        this.userID = userID;
        this.userConnections = userConnections;
    }
    get userID(){
        return this._userID;
    }
    set userID(userID){
        this._userID = userID;
    }
    
    get userConnections(){
        return this._userConnections;
    }
    set userConnections(userConnections){
        this._userConnections = userConnections;
    }

    addConnection(userID){
            
    }
}

module.exports = UserProfile;