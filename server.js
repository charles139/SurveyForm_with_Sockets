// require express and path
var express = require("express");

var path = require("path");
// create the express app
var app = express();
// static content 
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
// tell the express app to listen on port 8000
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})

var io = require('socket.io').listen(server)  // notice we pass the server object<br>

// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function (socket) {
	console.log("WE ARE USING SOCKETS!");
	console.log("socket id is " + socket.id);

	socket.on('posting_form', function(data){
		var rand_numb = Math.floor(Math.random()*1000) + 1;
		console.log(rand_numb);
		socket.emit('updated_message', {response: data});
		socket.emit('rand_numb', {response: rand_numb});
	});
})