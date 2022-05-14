const jwt = require('jsonwebtoken');
const config = require('../config');
const env = require('../env-loader');

exports.getToken = async (data) => {
    let token = await jwt.sign(data, env.SECRET, { expiresIn: config.expireTime })
    return token
}
