const express = require("express");
const app = express();
const session = require("express-session");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(session({
	secret: "jbjh76879809poiojvghbj",
	resave: false,
	saveUninitialized: true,
	username: undefined,
	
}));


var url = "mongodb://admin:admin69@ds131743.mlab.com:31743/micro";
mongoose.connect(url, {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('error', () => {
	console.log("Error Connecting to mlab");
});
conn.on('open', () => {
	console.log("Connetion established to mlab");
});


var table = new mongoose.Schema({
	tableno: Number,
	item: Number,
	itemName: String,
});

var Table1 = mongoose.model("Table1", table);

var Table2 = mongoose.model("Table2", table);

var tablechecked = new mongoose.Schema({
	tableno: Number,
	items: String,
	price: Number,
});

var Table1checked = mongoose.model("Table1checked", tablechecked);

var Table2checked = mongoose.model("Table2checked", tablechecked);



app.get("/", (req, res) => {
	res.send("Hello World!!!!");
});


app.get("/table1/:item", (req, res) => {
	var item = Number(req.params.item);
	if(item === 1){
		Table1.create({ tableno: 1, item: 1, itemName: "Pizza" }, (err, doc) => {
			if(err){
				console.log(err);
				throw err;
			} else {
				console.log(doc);
				res.send("Added Pizza!");
			}
		});
	} else if(item === 2){
		Table1.create({ tableno: 1, item: 2, itemName: "Burger" }, (err, doc) => {
			if(err){
				console.log(err);
				throw err;
			} else {
				console.log(doc);
				res.send("Added Burger!");
			}
		});
	} else if(item === 3){
		Table1.create({ tableno: 1, item: 3, itemName: "Soft Drink" }, (err, doc) => {
			if(err){
				console.log(err);
				throw err;
			} else {
				console.log(doc);
				res.send("Added Soft Drink!");
			}
		});
	} else if(item === 4){
		Table1.create({ tableno: 1, item: 4, itemName: "Desert" }, (err, doc) => {
			if(err){
				console.log(err);
				throw err;
			} else {
				console.log(doc);
				res.send("Added Desert!");
			}
		});
	} else if(item === 5){
		Table1.find({}, (err, docs) => {
			if(err){
				console.log(err);
				throw err;
			} else {
				var response = "Checkout completed: " + docs.length + " items. Please pay at the counter :)";
				Table1.deleteMany({}, (err, info) => {
					if(err){
						console.log(err);
						throw err;
					} else {
						console.log(info);
						var items = "";
						var price = 0;
						docs.forEach(element => {
							items += element.itemName + ",";
							if(element.item == 1){
								price+=100;
							} else if(element.item == 2){
								price+=50;
							} else if(element.item == 3){
								price+=35;
							} else if(element.item == 4){
								price+=60;
							}
						});
						Table1checked.create({tableno: 1, items: items, price: price}, (err, info) => {
							if(err){
								console.log(err);
								throw err;
							} else {
								console.log(info);
								res.send(response+"  Price:"+price);
							}
						});
						// res.send(response);
					}
				});
				// res.send(response);
			}
		});
	} else {
		res.send("INVALID!!!!   ~ SERVER.")
	}
});

app.get("/currorders", (req,res) => {
	Table1.find({}, (err, docs) => {
		if(err){
			console.log(err);
			throw err;
		} else {
			var table1orders = "Table1,Items:";
			docs.forEach(element => {
				table1orders += "," + element.itemName;
			});
			// res.send(table1orders);
			Table2.find({}, (err, docs2) => {
				if(err){
					console.log(err);
					throw err;
				} else {
					var table2orders = "\nTable2,Items: ";
					docs2.forEach(element => {
						table2orders += "," + element.itemName;
					});
					res.send(table1orders+table2orders);
				}
			});
		}
	});
});

app.get("/pastorders", (req, res) => {
	Table1checked.find({}, (err, docs) => {
		if(err){
			console.log(err);
			throw err;
		} else {
			var table1orders = "Table1,\n";
			docs.forEach(element => {
				table1orders += "Orders:" + element.items + ", price:" + element.price +"\n";
			});
			// res.send(table1orders);
			Table2checked.find({}, (err, docs2) => {
				if(err){
					console.log(err);
					throw err;
				} else {
					var table2orders = "\nTable2,\n ";
					docs2.forEach(element => {
						table2orders += "Orders:" + element.items + ", price:" + element.price +"\n";
					});
					res.send(table1orders+table2orders);
				}
			});
		}
	});
});

app.get("/table2/:item", (req, res) => {
	var item = Number(req.params.item);
	if(item === 1){
		Table2.create({ tableno: 2, item: 1, itemName: "Pizza" }, (err, doc) => {
			if(err){
				console.log(err);
				throw err;
			} else {
				console.log(doc);
				res.send("Added Pizza!");
			}
		});
	} else if(item === 2){
		Table2.create({ tableno: 2, item: 2, itemName: "Burger" }, (err, doc) => {
			if(err){
				console.log(err);
				throw err;
			} else {
				console.log(doc);
				res.send("Added Burger!");
			}
		});
	} else if(item === 3){
		Table2.create({ tableno: 2, item: 3, itemName: "Soft Drink" }, (err, doc) => {
			if(err){
				console.log(err);
				throw err;
			} else {
				console.log(doc);
				res.send("Added Soft Drink!");
			}
		});
	} else if(item === 4){
		Table2.create({ tableno: 2, item: 4, itemName: "Desert" }, (err, doc) => {
			if(err){
				console.log(err);
				throw err;
			} else {
				console.log(doc);
				res.send("Added Desert!");
			}
		});
	} else if(item === 5){
		Table2.find({}, (err, docs) => {
			if(err){
				console.log(err);
				throw err;
			} else {
				var response = "Checkout completed: " + docs.length + " items. Please pay at the counter :)";
				Table2.deleteMany({}, (err, info) => {
					if(err){
						console.log(err);
						throw err;
					} else {
						console.log(info);
						var items = "";
						var price = 0;
						docs.forEach(element => {
							items += element.itemName + ",";
							if(element.item == 1){
								price+=100;
							} else if(element.item == 2){
								price+=50;
							} else if(element.item == 3){
								price+=35;
							} else if(element.item == 4){
								price+=60;
							}
						});
						Table2checked.create({tableno: 2, items: items, price: price}, (err, info) => {
							if(err){
								console.log(err);
								throw err;
							} else {
								console.log(info);
								res.send(response+"  Price:"+price);
							}
						});
						// res.send(response);
					}
				});
				// res.send(response);
			}
		});
	} else {
		res.send("INVALID!!!!   ~ SERVER.")
	}
});





app.listen(process.env.PORT || 8888, process.env.IP, () => {
	console.log("Server Started");
});