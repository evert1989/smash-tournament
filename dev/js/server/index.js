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
	// General
	socket.on('disconnect', sockets.general.disconnected);

	// Application
	socket.on('app:request', sockets.application.onRequest);
	socket.on('app:update', sockets.application.onUpdate);
	socket.on('player-found', sockets.application.onPlayerFound);

	// Player
	socket.on('player:join', sockets.player.joinGame);
	socket.on('player:request-data', sockets.player.requestData);
});


// Listeners
// ---------
server.listen(app.get('port'), function () {
	console.log('Express started on port *:' + app.get('port'));
});