let connectionModel = require('../models/connection.js');
var ObjectId = require('mongodb').ObjectID;


async function getConnections(){

    let connections = await connectionModel.find({})
    return connections;
    
}

async function getConnection(id){

    // Grab Particular connection from DB
    let connectionData = await connectionModel.findOne({_id: ObjectId(id)})

    return connectionData;
}

function getConnectionTypes(connections){
    let connectionTypes = new Set();

    for(var i = 0; i< connections.length; i++){

            connectionTypes.add(connections[i].type);
    }

    return connectionTypes;
}

async function createConnection(connection){
    let newConnection = new connectionModel(connection);
    let saved = await newConnection.save();
    return saved;
}

module.exports = {
    getConnections: getConnections,
    getConnection: getConnection,
    getConnectionTypes: getConnectionTypes,
    createConnection: createConnection
};