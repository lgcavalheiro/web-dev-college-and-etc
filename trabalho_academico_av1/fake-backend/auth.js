module.exports.authenticate = function(id, password) {
    let users = require('./db.json')["users"];
    let user = users.find(user => { return user.id === id && user.senha === password});

    if(user) return user;
    else return false;
}