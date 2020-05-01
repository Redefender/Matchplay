let mongoose = require('mongoose');
let userConnectionModel = require('./userConnection.js');

var Schema = mongoose.Schema;

let UserProfileSchema = new Schema({
    userID: String,
    userConnections: [userConnectionModel.schema]
});

module.exports = mongoose.model('userProfile', UserProfileSchema, 'userProfiles');