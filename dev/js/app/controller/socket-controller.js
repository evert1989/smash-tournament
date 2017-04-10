define([
	// Vendors
	'backbone',
	'underscore',
	'socket.io',
	// Models
	'model/state/socket-state' // Singleton
], function (
	// Vendors
	Backbone,
	_,
	io,
	// Models
	SocketState
) {

	'use strict';

	const SocketController = function () {
		this.initialize.apply(this);
	};

	_.extend(SocketController.prototype, Backbone.Events, {

		// Vars
		// ----
		socket: {},


		MESSAGE: {
			REQUEST: 'app:request'
		},

		REQUEST: {
			CODE: 'pin-code'
		},

		RESPONSE: {
			CODE: 'server:response-code'
		},


		// Constructor
		// -----------
		initialize: function () {
			_.bindAll(this,
				'onResponseCode'
			);

			this.socket = io();
		},


		// Requests
		// --------
		requestFourNumberCode: function(){
			this.socket.on(this.RESPONSE.CODE, this.onResponseCode);
			this.socket.emit(this.MESSAGE.REQUEST, this.REQUEST.CODE);
		},


		// Responses
		// ---------
		onResponseCode: function(message){
			SocketState.set({pinCode: message});

			this.addListeners();
		},


		// Events
		// ------
		onPlayerJoin: function(obj){
			// todo: create collection for players and receive model from callback
			console.log('socket-controller -> onPlayerJoin', obj.name);
		},


		// Listeners
		// ---------
		addListeners: function(){
			this.socket.on('application-' + SocketState.get('pinCode') + ':join', this.onPlayerJoin);
		}
	});

	return new SocketController();
});