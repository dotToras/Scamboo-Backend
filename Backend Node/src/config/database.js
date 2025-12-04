const mysql = require("mysql2/promise");

//conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_NAME || "dbScamboo",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;