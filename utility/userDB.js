const user = require('../models/user.js');

let getUser = async function(userID){
    return await user.findOne({'userID': userID}).exec();
}

let isValidUser = async function(username, password){
    return await user.exists({'userID': username, 'password': password});
}

module.exports = {
    getUser: getUser,
    isValidUser: isValidUser
}