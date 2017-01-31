var express = require("express");
var toDoController = require("./controllers/toDoController");

var app = express();

app.set("view engine", "ejs");

app.use(express.static("./public"));

toDoController(app);

app.listen(3000);

console.log("Listening at port 3000");
