let mongoose = require('mongoose');
let connection = require('../models/connection');
let connectionModel = require('../models/connectionModel.js');
var ObjectId = require('mongodb').ObjectID;
let connections = [
    
    // new connection("aa11", "Learn with me","lesson", 
    // "I am also a low level player looking to grow with other newbies",
    // "3/7/2020 12:00"),
    // new connection("aa12", "lesson on groundstrokes","lesson", 
    // "Learn the fundamentals of the groundstrokes",
    // "3/9/2020 13:00"),
    // new connection("aa13", "increase forehand power","lesson", 
    // "Looking to add at least 10mph to your forehand? Sign up now!",
    // "3/10/2020 13:00"),
    // new connection("aa14", "Competitive match","match", 
    // "4.0 rated player looking for strong competition",
    // "3/9/2020 9:00"),
    // new connection("aa15", "casual match","match", 
    // "looking for an easygoing match with a casual player",
    // "3/9/2020 14:00"),
    // new connection("aa16", "left handed players only","match", 
    // "Looking to play a lefty",
    // "3/10/2020 8:00"),
    // new connection("aa17", "TEST NEW CONNECTION","lesson", 
    // "TEST NEW CONNECTION",
    // "3/10/2020 8:00"),
]

const savedConnections = [

];

async function getConnections(){

    let connections = await connectionModel.find({})
    return connections;
    
}

async function getConnection(id){
    // for(var i = 0; i< connections.length; i++){
    //     if(connections[i].id == id){
    //         return connections[i];
    //     }
    // }

    // Grab Particular connection from DB
    let connectionData = await connectionModel.findOne({_id: ObjectId("5ea5cd1068be4d1da1c4d7ff")})

    return connectionData;
}

async function getConnectionsByID(connections){

    // Grab Connection IDs
    let connectionIDs = [];
    for(var i =0; i< connections.length; i++){
        connectionIDs.push(ObjectId(connections[i].connectionID));
    }

    try{
        let connectionsData = await 
            connectionModel.find({'_id': {
                $in: [
                    connectionIDs
                ]}
            }).exec();
    
        return connectionsData;
    } catch(err){
        return console.error(err);
    }
}

function getConnectionTypes(connections){
    let connectionTypes = new Set();

    for(var i = 0; i< connections.length; i++){

            connectionTypes.add(connections[i].type);
    }

    return connectionTypes;
}

module.exports = {
    getConnections: getConnections,
    getConnection: getConnection,
    getConnectionTypes: getConnectionTypes,
    getConnectionsByID: getConnectionsByID
};