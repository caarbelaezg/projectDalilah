const orderQuerys = {
  generateOrder: `INSERT INTO dalila_restoh_carlos.orders (order_date, order_description, order_pay_method, order_price, user_id, user_name)
  VALUES(:order_date, :order_description, :order_pay_method, :order_price, :user_id, :user_name)`,
  insertAuxTable: `INSERT INTO dalila_restoh_carlos.orders_products (order_id, product_id, product_quantity)
  VALUES (:order_id, :product_id, :product_quantity)`,
  updateOrder: "UPDATE dalila_restoh_carlos.orders SET order_status = :order_status WHERE order_id = :order_id",
  getMyOrders:"SELECT * FROM dalila_restoh_carlos.orders WHERE user_name = :user_name",
  getAllOrders:"SELECT * FROM dalila_restoh_carlos.orders"
};

module.exports = { orderQuerys };
