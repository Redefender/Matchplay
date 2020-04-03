class SavedConnectionView {
    constructor(connectionID, going, name, type, details, dateTime){
        this.connectionID = connectionID;
        this.going = going;
        this.name = name;
        this.type = type;
        this.details = details;
        this.dateTime = dateTime;
    }

    get connectionID(){
        return this._connectionID;
    }
    
    set connectionID(connectionID){
        this._connectionID = connectionID;
    }
    get going(){
        return this._going;
    }
    
    set going(going){
        this._going = going;
    }
    get name(){
        return this._name;
    }
    
    set name(name){
        this._name = name;
    }
    get type(){
        return this._type;
    }
    
    set type(type){
        this._type = type;
    }
    get details(){
        return this._details;
    }
    
    set details(details){
        this._details = details;
    }
    get dateTime(){
        return this._dateTime;
    }
    
    set dateTime(dateTime){
        this._dateTime = dateTime;
    }
}

module.exports = SavedConnectionView;