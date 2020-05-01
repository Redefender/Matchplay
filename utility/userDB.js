const user = require('../models/user.js');

let getUser = function(userID){
    return user.findOne({'userID': userID}).exec();
}

module.exports = {
    getUser: getUser
}