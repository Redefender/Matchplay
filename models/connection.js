class Connection {
    constructor(id, name, type, details, dateTime){
        this.id = id;
        this.name = name;
        this.type = type;
        this.details = details;
        this.dateTime = dateTime;
    }

    get id(){
        return this._id;
    }
    set id(id){
        this._id = id;
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

    toString(){
        return 'id: ' + this.id + ' name ' + this.name + 
        ' type: ' + this.type + ' details: ' + this.details
        + ' dateTime: ' + this.dateTime;
    }
}

module.exports = Connection;