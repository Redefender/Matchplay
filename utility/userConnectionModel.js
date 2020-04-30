let mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

let UserConnectionSchema = new Schema({
    connectionID: String,
    rsvp: String,
    name: String,
    type: String,
    details: String,
    date: Date
});

module.exports = {
    model: mongoose.model('userConnection', UserConnectionSchema, 'userConnections'),
    schema: UserConnectionSchema
}