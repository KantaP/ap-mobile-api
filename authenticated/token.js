var jwt = require('jsonwebtoken');

const createWebToken = (data) => {
    return jwt.sign(data , 'test_ap');
}

const decodeWebToken = (jsonwebtoken) => {
    return jwt.verify(jsonwebtoken, 'test_ap');
}

module.exports = {
    createWebToken ,
    decodeWebToken
}