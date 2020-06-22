const config = {
    Port: 5500,
    ApiBaseUrl: "/api/v1/",
    JwtSecretKey: "856ED746F97360B36E4BA820EB5A848206D5B40EA5D2D5BE0A5392E8BBD2A16C",
    JwtExpiresToken: 3600, // seconds
    MysqlConfig: {
        Db: "dalila_restoh_carlos",
        User: "nombre_usuario",
        Password: "tu_contrasena",
        Host: "localhost",
        Dialect: 'mysql'
    },
};

module.exports = { config };