const user = require('../models/user.js');

let getUser = async function(userID){
    return await user.findOne({'userID': userID}).exec();
}

module.exports = {
    getUser: getUser
}