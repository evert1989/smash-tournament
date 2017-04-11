define([
	// Vendors
	'backbone',
	'underscore',
	'socket.io',
	// Models
	'model/player-model'
], function (
	// Vendors
	Backbone,
	_,
	io,
	// Models
	PlayerModel
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
		joinGame: function(){
			this.socket.emit(this.MESSAGE.JOIN, PlayerModel.toJSON());
		}
	});

	return new SocketController();
});