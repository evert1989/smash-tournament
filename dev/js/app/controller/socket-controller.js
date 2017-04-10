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


		// Constructor
		// -----------
		initialize: function () {
			this.socket = io();
		}
	});

	return new SocketController();
});