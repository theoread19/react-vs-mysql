const mysql = require("mysql");

//Create Database Connection
const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "crud",
});

// connect to database
conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});

module.exports = conn;
