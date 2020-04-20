let connection = require('../models/connection');
const connections = [
    
    new connection("aa11", "Learn with me","lesson", 
    "I am also a low level player looking to grow with other newbies",
    "3/7/2020 12:00"),
    new connection("aa12", "lesson on groundstrokes","lesson", 
    "Learn the fundamentals of the groundstrokes",
    "3/9/2020 13:00"),
    new connection("aa13", "increase forehand power","lesson", 
    "Looking to add at least 10mph to your forehand? Sign up now!",
    "3/10/2020 13:00"),
    new connection("aa14", "Competitive match","match", 
    "4.0 rated player looking for strong competition",
    "3/9/2020 9:00"),
    new connection("aa15", "casual match","match", 
    "looking for an easygoing match with a casual player",
    "3/9/2020 14:00"),
    new connection("aa16", "left handed players only","match", 
    "Looking to play a lefty",
    "3/10/2020 8:00"),
    new connection("aa17", "TEST NEW CONNECTION","lesson", 
    "TEST NEW CONNECTION",
    "3/10/2020 8:00"),
]

const savedConnections = [

];

function getConnections(){
    return connections;
}

function getConnection(id){
    for(var i = 0; i< connections.length; i++){
        if(connections[i].id == id){
            return connections[i];
        }
    }
}

function getConnectionTypes(){
    let connectionTypes = new Set();
    for(var i = 0; i< connections.length; i++){

            connectionTypes.add(connections[i].type);
    }
    return connectionTypes;
}

// function addSavedConnection(savedConn){
//     savedConnections.push(new savedConnection(savedConn.connectionID, 
//         savedConn.going)); 
// }

// function getSavedConnections(){
//     return savedConnections;
// }

// function getSavedConnectionsView(){
//     let savedConnectionViews = [];
//     for(var i =0; i< savedConnections.length; i++){
//         let connectionInfo = getConnection(savedConnections[i].connectionID);
//         let savedConnView = new savedConnectionView(
//             savedConnections[i].connectionID,
//             savedConnections[i].going,
//             connectionInfo.name,
//             connectionInfo.type,
//             connectionInfo.details,
//             connectionInfo.dateTime
//         )
//         console.log('savedConnView ' + savedConnView.connectionID);
        

//         savedConnectionViews.push(savedConnView);
//     }
//     return savedConnectionViews;
// }

module.exports = {
    getConnections: getConnections,
    getConnection: getConnection,
    // addSavedConnection: addSavedConnection,
    // getSavedConnections: getSavedConnections,
    // getSavedConnectionsView: getSavedConnectionsView,
    getConnectionTypes: getConnectionTypes
};