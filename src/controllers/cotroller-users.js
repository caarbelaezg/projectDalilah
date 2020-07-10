//Packages
const jwt = require("jsonwebtoken");

//Environment
const ENV = process.env.NODE_ENV || "development";
const config = require("../config/environments/" + ENV).config;

//Database imports
const { QueryTypes } = require("sequelize");
const { mySqlSequelize } = require("../config/database/mysql-db");
const { userQuerys } = require("../config/database/user-querys");

// ----------- Controlers related to users ----------- //

const login = async (req, res) => {
  const { user, pass } = req.body;

  try {
    const result = await mySqlSequelize.query(userQuerys.login, {
      replacements: [user],
      type: QueryTypes.SELECT,
    });

    if (pass !== result[0].user_password) {
      return res.status(401).json({ message: "Invalid user or pass" });
    }

    const admin = result[0].user_rol;
    const user_id = result[0].user_id;

    const payload = { user_id, user, pass, admin };
    const jwtToken = jwt.sign(payload, config.JwtSecretKey, {
      expiresIn: config.JwtExpiresToken,
    });

    return res.status(200).json({ token: jwtToken });
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

const listUsers = async (req, res) => {
  try {
    const result = await mySqlSequelize.query(userQuerys.listUsers, {
      type: QueryTypes.SELECT,
    });
    return res
      .status(200)
      .json({ users: result.map((data) => data.user_name) });
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

const createUser = async (req, res) => {
  //Data to insert
  const {
    user_name,
    user_email,
    user_full_name,
    user_phone,
    user_address,
    user_password,
    user_rol,
  } = req.body;

  try {
    await mySqlSequelize.query(userQuerys.createUser, {
      replacements: {
        user_name: user_name,
        user_email: user_email,
        user_full_name: user_full_name,
        user_phone: user_phone,
        user_address: user_address,
        user_password: user_password,
        user_rol: user_rol,
      },
      type: QueryTypes.INSERT,
    });
    return res.status(200).json();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { login, listUsers, createUser };
