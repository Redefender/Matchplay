var express = require('express');
var router = express.Router();
var connectionDB = require('../utility/connectionDB.js');

router.get('/', function(req,res){
    
    connectionDB.getConnections().then((connections)=>{

        let id = req.query.id;
        let connectionTypes = connectionDB.getConnectionTypes(connections);
    
        if(id){
            // Grab connection from DB
            connectionDB.getConnection(id)
                .then((conn)=>{
                    if(conn !== undefined){
                        res.render('connection', {connection: conn, session: req.session})
                    }
            });
            
        } else{
            
            res.render('connections', {
                connections: connections, connectionTypes: connectionTypes, 
                session: req.session});
        }
    });

});

router.get('/newConnection', function(req,res) {
    res.render('newConnection', {session: req.session});
});

module.exports = router;