const productQuerys = {
  listProducts: "SELECt product_name FROM dalila_restoh_carlos.products",
  findProducts: "SELECT product_id FROM dalila_restoh_carlos.products WHERE product_name = :product_name"
};

module.exports = { productQuerys };
