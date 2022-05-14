const Sequelize = require('sequelize');
const db = require('./db-con');

const LoginInfo = db.define('login_info', {
    userId: Sequelize.DataTypes.INTEGER,
    browserAgent: Sequelize.DataTypes.STRING,
    updatedAt: Sequelize.DataTypes.DATE
}, { freezeTableName: true })
// LoginInfo.sync({ force: true })
module.exports = LoginInfo