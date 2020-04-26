// class User {
//     constructor(userID, firstName, lastName, emailAddress){
//         this._userID = userID;
//         this._firstName = firstName;
//         this._lastName = lastName;
//         this._emailAddress = emailAddress;
//     }

//     get userID(){
//         return this._userID;
//     }
//     set userID(id){
//         this._userID = id;
//     }
//     get firstName(){
//         return this._firstName;
//     }
//     set firstName(name){
//         this._firstName = name;
//     }
//     get lastName(){
//         return this._lastName;
//     }
//     set lastName(lastName){
//         this._lastName = lastName;
//     }
//     get emailAddress(){
//         return this._emailAddress;
//     }
//     set emailAddress(emailAddress){
//         this._emailAddress = emailAddress;
//     }
// }

let mongoose = require('mongoose');
var Schema = mongoose.Schema;

let UserSchema = new Schema({
    userID: String,
    firstName: String,
    lastName: String,
    emailAddress: String
});

module.exports = mongoose.model('user', UserSchema, 'users');