var express = require('express');
var router = express.Router();
var connection = require('../models/connection.js');
var savedConnection = require('../models/userConnection');
var connectionDB = require('../utility/connectionDB.js');

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })
router.get('/', function(req,res){
    
    let connections = connectionDB.getConnections();
    let id = req.query.id;
    let connectionTypes = connectionDB.getConnectionTypes();

    if(id){
        let connection = connectionDB.getConnection(id);
        if(connection !== undefined){
            res.render('connection', {connection: connection})
        }
    } else{
        // get the different connection categories
        console.log(connections);
        
        // for(var i =0;i<connections.length;i++){
        //     connectionTypes.push(connection[i].type);
        // }
        for(let type of connectionTypes){
            console.log(type);
            
        }
        
        res.render('connections', {connections: connections, connectionTypes: connectionTypes});
    }

});

router.post('/savedConnections/:going', function(req,res){
    let id = req.body.connectionID;
    let going = req.params.going;
    let saved = null;

    saved = new savedConnection(id, going);
    connectionDB.addSavedConnection(saved);
    let savedConnectionsView = connectionDB.getSavedConnectionsView();
    
    res.render('savedConnections', { savedConnections: savedConnectionsView });
});

router.get('/newConnection', function(req,res) {
    res.render('newConnection');
});

module.exports = router;