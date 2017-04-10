define([
	// Vendors
	'backbone',
	'socket.io'
], function (
	// Vendors
	Backbone,
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


		// Constructor
		// -----------
		initialize: function () {
			this.socket = io();
		}
	});

	return new SocketController();
});