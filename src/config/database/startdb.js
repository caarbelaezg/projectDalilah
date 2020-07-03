const { mySqlSequelize } = require("./mysql-db");
const {
    useDb,
    createTableUsers,
    createTableOrders,
    createTableProducts,
    createTableOrderProducts
} = require("./conf-querys");

const createTables = (...params) => {
    for (let i = 0; i < params.length; i++) {
        mySqlSequelize.query(params[i](), { raw: true });
    }
}

const startDB = () => {
    createTables(useDb,
        createTableUsers,
        createTableOrders,
        createTableProducts,
        createTableOrderProducts);
}


startDB();