//Imports
const ENV = process.env.NODE_ENV || "development";
const { MysqlConfig } = require("../environments/" + ENV).config;
const { Sequelize } = require("sequelize");

//Conection object
const mySqlSequelize = new Sequelize(
    MysqlConfig.Db,
    MysqlConfig.User,
    MysqlConfig.Password, {
        host: MysqlConfig.Host,
        dialect: MysqlConfig.Dialect
    }
);

//Sicronization
mySqlSequelize.sync({ force: false })
    .then(() => { console.log(`Base de datos y tablas sincronizadas!`) })
    .catch((error) => {
        console.log(`No se ha podido sincronizar, error: ${error}`)
    });

module.exports = {
    mySqlSequelize
}