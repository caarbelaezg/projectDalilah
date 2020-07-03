//Imports
const ENV = process.env.NODE_ENV || "development";
const config = require("./environments/" + ENV).config;
const { mySqlSequelize } = require("../config/database/mysql-db");
const { QueryTypes } = require("sequelize");
const { authMidd, isAdmin } = require("./middlewares/auth-midd")

//Packages
const express = require("express");
const bodyParser = require("body-parser");
const controllerUsers = require("../controllers/cotroller-users")



//Server definition and middlewares
const app = express();
app.use(bodyParser.json()); //global

//---- Routes ----//

//Login
app.post("/api/v1/dalilah_resto/login", controllerUsers.login);

//List users -- only admins
app.get("/api/v1/dalilah_resto/users", authMidd, isAdmin, controllerUsers.listUsers)

//Register user
app.post("/api/v1/dalilah_resto/registerUser", authMidd, controllerUsers.createUser)

//List products
app.get("/api/v1/dalilah_resto/products", authMidd, controllerUsers.listProducts)

app.listen(config.Port, () => {
  console.log(`Servidor iniciado en el puerto ${config.Port}`);
});
