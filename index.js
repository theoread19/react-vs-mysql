const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const route = require("../backend/router/route.js");
const users = require("../backend/models/users.js");
var cors = require('cors');
app.use(cors());
// parse application/json
app.use(bodyParser.json());



// creat a new User
app.post("/api/create", route.post_user);

// show all Users
app.get("/api/view", route.get_user);

// show a single User
app.get("/api/view/:id", route.get_id_user);

// delete the User
app.delete("/api/delete/:id",route.delete_user);

// update the User
app.put("/api/update/", route.update_user);
// call api
app.listen(8000, () => {
	console.log("server started on port 8000...");
});
