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
const io = require('socket.io')(server);


// Modules
// -------
const router = require('./module/router')();
const sockets = require('./module/socket');


// Start router
// ------------
app.use('/', router);


// Socket.io
// ---------
io.on('connection', function(socket){

	console.log('SOCKET - application connected.');

	socket.on('app:request', sockets.application.onRequest);
	socket.on('disconnect', sockets.application.disconnected);
});


// Listeners
// ---------
server.listen(global.port, function () {
	console.log('Express started on port *:' + global.port);
});