//Packages
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

//Modules
const { mySqlSequelize } = require("./mysql-db");



const validateJwtMiddleware = (req, res, next) => {
    const jwtToken = req.headers["authorization"];
    if (!jwtToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const jwtClient = jwtToken.split(" ")[1];
    jwt.verify(jwtClient, config.JwtSecretKey, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Token Expired" });
        }
        next();
    });
};

module.exports = {
    validateJwtMiddleware
}