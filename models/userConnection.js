class UserConnection {
    constructor(connection, rsvp){
        this.connection = connection;
        this.rsvp = rsvp;
    }

    get rsvp(){
        return this._rsvp;
    }

    set rsvp(rsvp){
        this._rsvp = rsvp;
    }
    
    get connection(){
        return this._connection;
    }

    set connection(connection){
        this._connection = connection;
    }

}

module.exports = UserConnection;