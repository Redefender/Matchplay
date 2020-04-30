let mongoose = require('mongoose');
let userConnectionModel = require('./userConnectionModel.js');

var Schema = mongoose.Schema;

let UserProfileSchema = new Schema({
    userID: String,
    userConnections: [userConnectionModel.schema]
});

module.exports = mongoose.model('userProfile', UserProfileSchema, 'userProfiles');