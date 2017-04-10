// Vars
// ----
// Server
const express = require('express');
const app = express();
const http = require('http').Server(app);
// Socket
const io = require('socket.io')(http);

// Vendors
const path = require('path');

// Properties
const port = 5000;


// Static files
// ------------
app.use(express.static('dev'));


// Routes
// ------
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../../', 'index.html'));
});


// Socket.io
// ---------
io.on('connection', function(socket){
	console.log('server -> a user connected.');

	socket.on('disconnect', function(){
		console.log('server -> a user disconnected');
	});
});


// Listeners
// ---------
http.listen(port, function(){
	console.log('server -> listening on *:' + port);
});