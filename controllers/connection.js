var express = require('express');
var router = express.Router();
var connection = require('../models/connection.js');
var connectionDB = require('../utility/connectionDB.js');

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

router.get('/', function(req,res){
    
    connectionDB.getConnections().then((connections)=>{

        let id = req.query.id;
        let connectionTypes = connectionDB.getConnectionTypes(connections);
    
        if(id){
            // Grab connection from DB
            connectionDB.getConnection(id)
                .then((conn)=>{
                    if(connection !== undefined){
                        res.render('connection', {connection: conn, session: req.session})
                    }
            });
            
        } else{
            // get the different connection categories
            console.log(connections);
            
            for(let type of connectionTypes){
                console.log(type);
                
            }   
            
            res.render('connections', {
                connections: connections, connectionTypes: connectionTypes, 
                session: req.session});
        }
    });

});

router.get('/newConnection', function(req,res) {
    res.render('newConnection', {session: req.session});
});

function containsEncodedComponents(x) {
    // ie ?,=,&,/ etc
    return (decodeURI(x) !== decodeURIComponent(x));
  }

module.exports = router;