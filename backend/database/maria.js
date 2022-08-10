const mysql = require("mysql");
const pool = mysql.createConnection({
  host: process.env.MARIA_HOSTNAME,
  user: process.env.MARIA_USER,
  password: process.env.MARIA_PASSWORD,
  database: process.env.MARIA_DATABASE,
  port: process.env.MARIA_PORT,
});

module.exports = pool;
