define([
	// Vendors
	'backbone',
	'underscore',
	'socket.io'
], function (
	// Vendors
	Backbone,
	_,
	io
) {

	'use strict';

	const SocketController = function () {
		this.initialize.apply(this);
	};

	_.extend(SocketController.prototype, Backbone.Events, {

		// Vars
		// ----
		socket: {},

		// Message
		MESSAGE: {
			JOIN: 'player:join'
		},

		// Constructor
		// -----------
		initialize: function () {
			this.socket = io();
		},


		// Join
		// ----
		joinGame: function(obj){
			console.log('socket-controller -> joinGame');
			this.socket.emit(this.MESSAGE.JOIN, obj);
		}
	});

	return new SocketController();
});