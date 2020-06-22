//Imports
const ENV = process.env.NODE_ENV || "development";
const config = require("./environments/" + ENV).config;
const dataBase = require("./database/startdb");
//const { validateJwtMiddleware } = require("./middlewares/autorizationMiddleware")

//Packages
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");


//Server definition and middlewares
const app = express();
app.use(bodyParser.json()); //global

//Start Data base
dataBase.startDB();



app.listen(config.Port, () => {
    console.log(`Servidor iniciado en el puerto ${config.Port}`);
});