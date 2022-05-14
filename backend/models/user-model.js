const Sequelize = require('sequelize');
const db = require('./db-con');

const User = db.define('User', {
    email: Sequelize.DataTypes.STRING,
    password: Sequelize.DataTypes.STRING
}, { freezeTableName: true })

//User.sync({ force: true })
module.exports = User