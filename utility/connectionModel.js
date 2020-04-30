let mongoose = require('mongoose');
var Schema = mongoose.Schema;

let ConnectionSchema = new Schema({
    name: String,
    type: String,
    details: String,
    date: Date
});

module.exports = mongoose.model('connection', ConnectionSchema,);