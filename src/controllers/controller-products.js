//Environment
const ENV = process.env.NODE_ENV || "development";
const config = require("../config/environments/" + ENV).config;

//Database imports
const { QueryTypes } = require("sequelize");
const { mySqlSequelize } = require("../config/database/mysql-db");
const { userQuerys } = require("../config/database/user-querys");

// ----------- Controlers related to products ----------- //

const listProducts = async (req, res) => {
  try {
    const result = await mySqlSequelize.query(userQuerys.listProducts, {
      type: QueryTypes.SELECT,
    });
    return res
      .status(200)
      .json({ products: result.map((data) => data.product_name) });
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

module.exports = { listProducts };
