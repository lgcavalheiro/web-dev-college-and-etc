module.exports.authenticate = function(id, password) {
    let users = require('./db.json')["users"];
    users = users.find(user => { return user.id === id && user.senha === password});

    if(users) return true;
    else return false;
}