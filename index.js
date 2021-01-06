const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const users = require("../backend/users.js");
var cors = require('cors');
app.use(cors());
// parse application/json
app.use(bodyParser.json());

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

// creat a new User
app.post("/api/create", (req, res) => {
	let data = { name: req.body.name, location: req.body.location, phone: req.body.phone, gender: req.body.gender, position: req.body.position};
	let sql = "INSERT INTO users SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Create Complete" }));
	});
});

// show all Users
app.get("/api/view", (req, res) => {
	let sql = "SELECT * FROM users";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

// show a single User
app.get("/api/view/:id", (req, res) => {
	let sql = "SELECT * FROM users WHERE id= ?";
	let query = conn.query(sql, req.params.id, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

// delete the User
app.delete("/api/delete/:id", (req, res) => {
	let sql = "DELETE FROM users WHERE id= ?";
	let query = conn.query(sql, + req.params.id ,(err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Delete Complete" }));
	});
});

// update the User
app.put("/api/update/", (req, res) => {
	let sql = "UPDATE users SET name= ?, location= ?, phone = ?, gender = ?, position = ? WHERE id= ?";
	const newUsers = new users({
		name: req.body.name,
		id: req.body.id,
		location: req.body.location,
		phone: req.body.phone,
		gender: req.body.gender,
		position: req.body.position
	})

	let query = conn.query(sql, newUsers.send(), (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Update Complete" }));
	});
});
// call api
app.listen(8000, () => {
	console.log("server started on port 8000...");
});
