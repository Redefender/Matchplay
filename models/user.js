class User {
    constructor(userID, firstName, lastName, emailAddress){
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
    }

    get userID(){
        return this._userID;
    }
    set userID(id){
        this._userID = userID;
    }
    get firstName(){
        return this._firstName;
    }
    set firstName(name){
        this._firstName = name;
    }
    get lastName(){
        return this._lastName;
    }
    set lastName(lastName){
        this._lastName = lastName;
    }
    get emailAddress(){
        return this._emailAddress;
    }
    set emailAddress(emailAddress){
        this._emailAddress = emailAddress;
    }

    toString(){
        return 'id: ' + this.id + ' name ' + this.name + 
        ' type: ' + this.type + ' details: ' + this.details
        + ' dateTime: ' + this.dateTime;
    }
}

module.exports = User;