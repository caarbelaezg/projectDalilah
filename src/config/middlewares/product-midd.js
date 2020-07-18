//Database imports
const { QueryTypes } = require("sequelize");
const { mySqlSequelize } = require("../database/mysql-db");
const { productQuerys } = require("../database/products-querys");

const existProduct = async (req, res, next) => {
  let { order_description } = req.body;
  try {
    let ids = {};
    let resp;
    for (let i = 0; i < order_description.length; i++) {
      let actualProduct = order_description[i].product;
      resp = await mySqlSequelize.query(productQuerys.findProducts, {
        replacements: {
          product_name: actualProduct,
        },
        type: QueryTypes.SELECT,
      });
      if (typeof resp[0] !== "object") {
        return res.status(401).json({
          message: `El producto ${actualProduct} no existe`,
        });
      } else {
        order_description[i].product_id = resp[0].product_id.toString();
      }
    }
    res.order_description = order_description;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { existProduct };
