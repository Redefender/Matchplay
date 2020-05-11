
let mongoose = require('mongoose');
var Schema = mongoose.Schema;

let UserSchema = new Schema({
    userID: String,
    firstName: String,
    lastName: String,
    emailAddress: String,
    password: {type: String, select:false}
});

module.exports = mongoose.model('user', UserSchema, 'users');