var express = require('express');
var router = express.Router();
var connection = require('../models/connection.js');
var connectionDB = require('../utility/connectionDB.js');

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

router.get('/', function(req,res){
    
    let connections = connectionDB.getConnections();
    let id = req.query.id;
    // if(containsEncodedComponents(id)){
    //     id = decodeURIComponent(id);
    // }


    let connectionTypes = connectionDB.getConnectionTypes();

    if(id){
        let connection = connectionDB.getConnection(id);
        if(connection !== undefined){
            res.render('connection', {connection: connection, session: req.session})
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
        
        res.render('connections', {
            connections: connections, connectionTypes: connectionTypes, 
            session: req.session});
    }

});



router.get('/newConnection', function(req,res) {
    res.render('newConnection', {session: req.session});
});

function containsEncodedComponents(x) {
    // ie ?,=,&,/ etc
    return (decodeURI(x) !== decodeURIComponent(x));
  }

module.exports = router;