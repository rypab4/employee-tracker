//need mysql2
const mysql = require("mysql2");

//connection to mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employees"
});

//if error
connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;