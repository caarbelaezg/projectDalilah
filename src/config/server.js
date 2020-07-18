//Imports
const ENV = process.env.NODE_ENV || "development";
const config = require("./environments/" + ENV).config;
const { authMidd, isAdmin } = require("./middlewares/auth-midd");
const { existProduct } = require("./middlewares/product-midd")

//Packages
const express = require("express");
const bodyParser = require("body-parser");

//Controlers
const controllerUsers = require("../controllers/cotroller-users")
const controllerProducts = require("../controllers/controller-products")
const controllerOrders = require("../controllers/controller-orders")



const app = express();

app.use(bodyParser.json()); //global

//----------------------- User routes -----------------------//

app.post("/api/v1/dalilah_resto/users/login", controllerUsers.login);

app.get("/api/v1/dalilah_resto/users/listusers", authMidd, isAdmin, controllerUsers.listUsers);

app.post("/api/v1/dalilah_resto/users/registerUser", authMidd, controllerUsers.createUser);



//----------------------- Products routes -----------------------//

app.get("/api/v1/dalilah_resto/products/listProducts", authMidd, controllerProducts.listProducts);

app.delete ("/api/v1/dalilah_resto/products/removeProducts", authMidd, isAdmin, controllerProducts.deleteProducts);

app.post("/api/v1/dalilah_resto/products/addProducts", authMidd, isAdmin, controllerProducts.addProducts);

app.put("/api/v1/dalilah_resto/products/updateProducts", authMidd, isAdmin, controllerProducts.updateProducts);


//----------------------- Orders routes -----------------------//

app.post("/api/v1/dalilah_resto/orders/generateOrder", authMidd, existProduct, controllerOrders.generateOrder);

app.patch("/api/v1/dalilah_resto/orders/updateOrder", authMidd, isAdmin, controllerOrders.updateOrder);

app.get("/api/v1/dalilah_resto/orders/myOrders", authMidd, controllerOrders.getMyOrders);

app.get("/api/v1/dalilah_resto/orders/allOrders", authMidd, isAdmin, controllerOrders.getAllOrders);



app.listen(config.Port, () => {
  console.log(`Servidor iniciado en el puerto ${config.Port}`);
});
