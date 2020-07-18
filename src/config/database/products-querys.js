const productQuerys = {
  listProducts: "SELECt product_name FROM dalila_restoh_carlos.products",
  findProducts: "SELECT product_id FROM dalila_restoh_carlos.products WHERE product_name = :product_name",
  deleteProducts: "DELETE FROM dalila_restoh_carlos.products WHERE product_name = :product_name",
  addProducts:"INSERT INTO dalila_restoh_carlos.products (product_name, product_price, product_stock) VALUES (:product_name, :product_price, :product_stock)",
  updateProducts:`UPDATE dalila_restoh_carlos.products
  SET product_name = :product_name, product_price = :product_price, product_stock= :product_stock
  WHERE product_id = :product_id`
};

module.exports = { productQuerys };

