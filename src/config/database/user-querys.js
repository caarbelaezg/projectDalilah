const userQuerys = {
  login:
    "SELECT user_id, user_password, user_rol FROM dalila_restoh_carlos.users WHERE user_name = ?",
  listUsers: "SELECT user_name FROM dalila_restoh_carlos.users",
  createUser: `INSERT INTO dalila_restoh_carlos.users (user_name,user_email,user_full_name, user_phone,user_address, user_password,user_rol) 
  VALUES (:user_name, :user_email, :user_full_name, :user_phone, :user_address, :user_password, :user_rol )`
};

module.exports = { userQuerys };
