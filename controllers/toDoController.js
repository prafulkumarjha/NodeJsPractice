/**
 * New node file
 */

 var bodyParser = require("body-parser");
 var replaceall = require("replaceall");
 var mongoose = require("mongoose");
 mongoose.connect("mongodb://test:test@ds139969.mlab.com:39969/todoap");
 var todoSchema = new mongoose.Schema({
	 item : String
 });

var Todo =  mongoose.model("Todo",todoSchema);
/*var itemOne = TodoAp({
	item : "Buy Flowers"
}).save(function(err) {
	if(err)
	throw err;
	console.log("item saved");
});
*/

 // create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//var data = [{item:"get milk"},{item:"Work Out"}, {item:"Wake up early"}];

module.exports = function (app) {
//GET
	app.get("/todo",function(req,res) {
	  Todo.find({}, function(err,data) {
			if(err)	throw err;
			console.log("Got all the Items");
			res.render("todo",{todos:data});
		});
	});

	//Delete
	app.delete("/todo/:item",function(req,res) {
		var reqItem = replaceall("-"," ",req.params.item);
		reqItem = reqItem.trim();
		Todo.find({item: reqItem}).remove(function(err,data) {
			if(err) throw err;
			console.log("Item Removed");
			res.json(data);
		})

	});

//POST
	app.post("/todo",urlencodedParser,function(req,res) {
    var newTodo = Todo(req.body).save(function(err,data) {
			if(err)	throw err;
			console.log("New Item Added");
			res.json(data);
		})
	});

};
