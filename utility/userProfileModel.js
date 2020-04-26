let mongoose = require('mongoose');
var Schema = mongoose.Schema;

let UserProfileSchema = new Schema({
    userID: String,
    userConnections: Array
});

module.exports = mongoose.model('userProfile', UserProfileSchema, 'userProfiles');