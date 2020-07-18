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



//Server definition and middlewares
const app = express();
app.use(bodyParser.json()); //global

//----------------------- User routes -----------------------//

//Login -- all
app.post("/api/v1/dalilah_resto/users/login", controllerUsers.login);

//List users -- only admins
app.get("/api/v1/dalilah_resto/users/listusers", authMidd, isAdmin, controllerUsers.listUsers);

//Register user -- all
app.post("/api/v1/dalilah_resto/users/registerUser", authMidd, controllerUsers.createUser);



//----------------------- Products routes -----------------------//

//List products -- all
app.get("/api/v1/dalilah_resto/products/listProducts", authMidd, controllerProducts.listProducts);

app.delete ("/api/v1/dalilah_resto/products/removeProducts", authMidd, isAdmin, controllerProducts.deleteProducts);

app.post("/api/v1/dalilah_resto/products/addProducts", authMidd, isAdmin, controllerProducts.addProducts);

app.put("/api/v1/dalilah_resto/products/updateProducts", authMidd, isAdmin, controllerProducts.updateProducts);


//----------------------- Orders routes -----------------------//

//New orders -- all
app.post("/api/v1/dalilah_resto/orders/generateOrder", authMidd, existProduct, controllerOrders.generateOrder);

//Update order state orders -- only admin
app.patch("/api/v1/dalilah_resto/orders/updateOrder", authMidd, isAdmin, controllerOrders.updateOrder);

app.get("/api/v1/dalilah_resto/orders/myOrders", authMidd, controllerOrders.getMyOrders);



app.listen(config.Port, () => {
  console.log(`Servidor iniciado en el puerto ${config.Port}`);
});
