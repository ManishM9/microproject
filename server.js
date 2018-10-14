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


var table



app.get("/", (req, res) => {
	res.send("Hello World!!!!");
});





app.listen(process.env.PORT || 8888, process.env.IP, () => {
	console.log("Server Started");
});