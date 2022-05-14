const Sequelize = require("sequelize");
const env = require("../env-loader");

const dbcon = new Sequelize({
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    dialect: env.DB_DIALECT,
    logging: false,
});

dbcon
    .query("select 1+1 as val")
    .then((result) => { console.log('db is connected') })
    .catch((err) => {
        console.log(`postgre database connection error`);
        console.log(err);
    });

module.exports = dbcon;
