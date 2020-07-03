//Define databsase name
const dbName = "dalila_restoh_carlos";

//Use database
const useDb = () => {
    return `USE ${dbName}`;
}

//Crete table users
const createTableUsers = () => {
    return `CREATE TABLE IF NOT EXISTS users (
        user_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        user_name VARCHAR(50) UNIQUE NOT NULL,
        user_email VARCHAR(30) UNIQUE NOT NULL,
        user_full_name VARCHAR(70) NOT NULL,
        user_phone VARCHAR(15) NOT NULL,
        user_address VARCHAR(60) NOT NULL,
        user_password VARCHAR(10) NOT NULL,
        user_rol BOOLEAN NOT NULL    
    );`
}

const createTableOrders = () => {
    return `CREATE TABLE IF NOT EXISTS orders (
        order_status ENUM('new','confirmed','making','sending','cancelled','sent') DEFAULT( 'new'),
        order_date VARCHAR(15) NOT NULL,    
        order_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        order_description VARCHAR(120) NOT NULL,
        order_pay_method VARCHAR(15) NOT NULL,
        order_price INT NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT FK_user_order FOREIGN KEY (user_id)
        REFERENCES users(user_id)   
    );`
}

const createTableProducts = () => {
    return `CREATE TABLE IF NOT EXISTS products (
        product_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        product_name VARCHAR(60) NOT NULL,    
        product_price INTEGER NOT NULL,
        product_stock INTEGER NOT NULL   
    );`
}

const createTableOrderProducts = () => {
    return `CREATE TABLE IF NOT EXISTS orders_products(
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        product_quantity INT NOT NULL,
        CONSTRAINT FK_op_orders FOREIGN KEY(order_id)
        REFERENCES orders(order_id),
        CONSTRAINT FK_op_products FOREIGN KEY(product_id)
        REFERENCES products(product_id)
    );`
}


module.exports = {
    useDb,
    createTableUsers,
    createTableOrders,
    createTableProducts,
    createTableOrderProducts
}