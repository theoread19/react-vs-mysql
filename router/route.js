const users = require("../models/users.js");
const conn = require("../controller/connection.js");
module.exports = {

	index: function (req, res) {
		res.render('users/index', {
			users: users
		});
	},

	post_user: function (req, res) {
		let data = { name: req.body.name, location: req.body.location, phone: req.body.phone, gender: req.body.gender, position: req.body.position };
		let sql = "INSERT INTO users SET ?";
		let query = conn.query(sql, data, (err, result) => {
			if (err) throw err;
			res.send(JSON.stringify({ status: 200, error: null, response: "Create Complete" }));
		});
	},

	get_user: function (req, res) {
		let sql = "SELECT * FROM users";
		let query = conn.query(sql, (err, result) => {
			if (err) throw err;
			res.send(JSON.stringify({ status: 200, error: null, response: result }));
		});
	},

	get_id_user: function (req, res) {
		let sql = "SELECT * FROM users WHERE id= ?";
		let query = conn.query(sql, req.params.id, (err, result) => {
			if (err) throw err;
			res.send(JSON.stringify({ status: 200, error: null, response: result }));
		});
	},

	delete_user: function (req, res) {
		let sql = "DELETE FROM users WHERE id= ?";
		let query = conn.query(sql, + req.params.id, (err, result) => {
			if (err) throw err;
			res.send(JSON.stringify({ status: 200, error: null, response: "Delete Complete" }));
		});
	},

	update_user: function (req, res) {
		let sql = "UPDATE users SET name= ?, location= ?, phone = ?, gender = ?, position = ? WHERE id= ?";
		const newUsers = new users({
			id: req.body.id,
			name: req.body.name,
			location: req.body.location,
			phone: req.body.phone,
			gender: req.body.gender,
			position: req.body.position
		});

		let query = conn.query(sql, newUsers.send(), (err, result) => {
			if (err) throw err;
			res.send(JSON.stringify({ status: 200, error: null, response: "Update Complete" }));
		});
	}

};
