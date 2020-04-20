var connection = require('./connection.js');
class UserConnection {
    constructor(conn, rsvp){
        this._connection = new connection(conn.id, conn.name,
            conn.type, conn.details, conn.dateTime);
        this._rsvp = rsvp;
    }

    get rsvp(){
        return this._rsvp;
    }

    set rsvp(newrsvp){
        this._rsvp = newrsvp;
    }
    
    get connection(){
        return this._connection;
    }

    set connection(newconnection){
        this._connection = newconnection;
    }

}

module.exports = UserConnection;