const mysql = require("mysql");

const SabzlearnShopDB = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  // port: '3306',
  database: "sabzlearn_shop",
});

module.exports = SabzlearnShopDB;
