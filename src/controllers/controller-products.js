//Environment
const ENV = process.env.NODE_ENV || "development";
const config = require("../config/environments/" + ENV).config;

//Database imports
const { QueryTypes } = require("sequelize");
const { mySqlSequelize } = require("../config/database/mysql-db");
const { productQuerys } = require("../config/database/products-querys");

// ----------- Controlers related to products ----------- //

const listProducts = async (req, res) => {
  try {
    const result = await mySqlSequelize.query(productQuerys.listProducts, {
      type: QueryTypes.SELECT,
    });
    return res
      .status(200)
      .json({ products: result.map((data) => data.product_name) });
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

const deleteProducts = async (req, res) => {
  const products = req.body.products;
  try {
    products.forEach(async (elem) => {
      await mySqlSequelize.query(productQuerys.deleteProducts, {
        replacements: {
          product_name: elem,
        },
        type: QueryTypes.DELETE,
      });
    });
    return res.status(200).json();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const addProducts = async (req, res) => {
  const products = req.body.products;
  try {
    products.forEach(async (elem) => {
      await mySqlSequelize.query(productQuerys.addProducts, {
        replacements: {
          product_name: elem.product_name,
          product_price: elem.product_price,
          product_stock: elem.product_stock,
        },
        type: QueryTypes.INSERT,
      });
    });
    return res.status(200).json();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const updateProducts = async (req, res) => {
  const products = req.body.products;
  try {
    products.forEach(async (elem) => {
      await mySqlSequelize.query(productQuerys.updateProducts, {
        replacements: {
          product_id: elem.product_id,
          product_name: elem.product_name,
          product_price: elem.product_price,
          product_stock: elem.product_stock,
        },
        type: QueryTypes.UPDATE,
      });
    });
    return res.status(200).json();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { listProducts, deleteProducts, addProducts, updateProducts };
