/**
 * New node file
 */

 var bodyParser = require("body-parser");
 // create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var data = [{item:"get milk"},{item:"Work Out"}, {item:"Wake up early"}];

module.exports = function (app) {


	//GET

	app.get("/todo",function(req,res) {
		res.render("todo",{todos:data});
	});

	//Delete
	app.delete("/todo/:item",function(req,res) {
		data = data.filter(function(todo) {

			return todo.item.replace(/ /g,'-') !== req.params.item;
		});
		console.log(data);
res.render("todo",{todos:data});
	});

//POST
	app.post("/todo",urlencodedParser,function(req,res) {
		data.push(req.body);
		res.render("todo",{todos:data});

	});

};
