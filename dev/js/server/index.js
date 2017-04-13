'use strict';

// Libraries
// ---------
const express = require('express');
const http = require('http');
const path = require('path');


// Initialize modules
// ------------------
const app = express();
const server = http.Server(app);


// Global vars
// -----------
global.rootPath = path.resolve(__dirname + '/../..');
global.port = process.env.PORT || 5000;
global.io = require('socket.io')(server);
global.activeServers = [];


// Modules
// -------
const router = require('./module/router')();
const sockets = require('./module/socket');


// Start router
// ------------
app.set('port', global.port);
app.use('/', router);


// Socket.io
// ---------
global.io.on('connection', function(socket){

	socket.on('app:request', sockets.application.onRequest);
	socket.on('app:update', sockets.application.onUpdate);
	socket.on('disconnect', sockets.application.disconnected);

	socket.on('player:join', sockets.player.joinGame);
});


// Listeners
// ---------
server.listen(global.port, function () {
	console.log('Express started on port *:' + global.port);
});