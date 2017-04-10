// Libraries
// ---------
const express = require('express');
const http = require('http');
const path = require('path');


// Global vars
// -----------
global.rootPath = path.resolve(__dirname + '/../..');
global.port = 4240;


// Initialize modules
// ------------------
const app = express();
const server = http.Server(app);
const router = require('./module/router')();
const io = require('socket.io')(server);

// start Router
app.use('/', router);


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
server.listen(global.port, function () {
	console.log('Express started on port *:' + global.port);
});