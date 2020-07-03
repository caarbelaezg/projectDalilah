//Imports
const ENV = process.env.NODE_ENV || "development";
const config = require("../environments/" + ENV).config;

//Packages
const jwt = require("jsonwebtoken");

const authMidd = (req, res, next) => {
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

const isAdmin = (req, res, next) => {
  const jwtToken = req.headers["authorization"];
  if (!jwtToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const jwtClient = jwtToken.split(" ")[1];
  jwt.verify(jwtClient, config.JwtSecretKey, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Token Expired" });
    } else {
      const { admin } = decoded;
      if (admin != 1) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
    next();
  });
};

module.exports = {
  authMidd,
  isAdmin,
};
