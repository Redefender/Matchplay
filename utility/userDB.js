const user = require('../models/user.js');

let getUser = async function(userID){
    return await user.findOne({'userID': userID}).exec();
}

let isValidUser = async function(username, password){
    return user.exists({'userID': username, 'password': password});
}

let isDuplicateUser = async function(username){
    return await user.exists({'userID': username});
}

let registerUser = async function(user){
    return user.save();
}

module.exports = {
    getUser: getUser,
    isValidUser: isValidUser,
    isDuplicateUser: isDuplicateUser,
    registerUser: registerUser
}