//Packages
const moment = require("moment");

//Database imports
const { QueryTypes } = require("sequelize");
const { mySqlSequelize } = require("../config/database/mysql-db");
const { orderQuerys } = require("../config/database/orders-querys");

//Util imports
const { formatOrder } = require("../util/util-order");
const ordersQuerys = require("../config/database/orders-querys");

// ----------- Controlers related to orders ----------- //
const generateOrder = async (req, res) => {
  //Get values to insert
  const { order_pay_method } = req.body;
  const user_id = res.decoded.user_id;
  const user_name = res.decoded.user;
  const order_description = res.order_description;
  const hour = moment().format("h:mm a");
  const { formatedOrder, totalPrice } = formatOrder(order_description);

  let respInsOrder;
  //First insert into orders
  try {
    respInsOrder = await mySqlSequelize.query(orderQuerys.generateOrder, {
      replacements: {
        order_date: hour,
        order_description: formatedOrder,
        order_pay_method: order_pay_method,
        order_price: totalPrice,
        user_id: user_id,
        user_name: user_name,
      },
      type: QueryTypes.INSERT,
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }

  //Insert into aux Table
  const order_id = respInsOrder[0];
  try {
    order_description.forEach(async (elem) => {
      await mySqlSequelize.query(orderQuerys.insertAuxTable, {
        replacements: {
          order_id: order_id,
          product_id: elem.product_id,
          product_quantity: elem.quantity,
        },
        type: QueryTypes.INSERT,
      });
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
  return res.status(200).json();
};

const updateOrder = async (req, res) => {
  const { order_id, status } = req.body;

  try {
    await mySqlSequelize.query(orderQuerys.updateOrder, {
      replacements: {
        order_id: order_id,
        order_status: status,
      },
      type: QueryTypes.UPDATE,
    });
    return res.status(200).json();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  const user_name = res.decoded.user;
  try {
    const result = await mySqlSequelize.query(orderQuerys.getMyOrders, {
      replacements: {
        user_name: user_name,
      },
      type: QueryTypes.SELECT,
    });
    return res.status(200).json({ orders: result });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const result = await mySqlSequelize.query(orderQuerys.getAllOrders, {
      type: QueryTypes.SELECT,
    });
    return res.status(200).json({ orders: result });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { order_id } = req.body;
  try {
    await mySqlSequelize.query(orderQuerys.deleteOrder, {
      replacements: {
        order_id: order_id,
      },
      type: QueryTypes.DELETE,
    });

    await mySqlSequelize.query(orderQuerys.deleteOrder_Products, {
      replacements: {
        order_id: order_id,
      },
      type: QueryTypes.DELETE,
    });

    return res.status(200).json({code:"000",message: "Orden eliminada correctamente"});
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
module.exports = {
  generateOrder,
  updateOrder,
  getMyOrders,
  getAllOrders,
  deleteOrder,
};
