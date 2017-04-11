define([
	// Vendors
	'backbone',
	'underscore',
	'socket.io',
	// Collections
	'collection/player-collection', // Singleton
	// Models
	'model/state/socket-state' // Singleton
], function (
	// Vendors
	Backbone,
	_,
	io,
	// Collections
	PlayerCollection,
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
			CODE: 'pin-code',
			LOCK_DOWN: 'lock-down'
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
			this.socket.once(this.RESPONSE.CODE, this.onResponseCode);
			this.socket.emit(this.MESSAGE.REQUEST, {message: this.REQUEST.CODE});
		},

		requestLockPlayers: function(){
			SocketState.set({isLocked: true});
			this.socket.off('application-' + SocketState.get('pinCode') + ':join', this.onPlayerJoin);

			this.socket.emit(this.MESSAGE.REQUEST, {message: this.REQUEST.LOCK_DOWN, code: SocketState.get('pinCode')});
		},


		// Responses
		// ---------
		onResponseCode: function(pinCode){
			SocketState.set({pinCode: pinCode});

			this.socket.on('application-' + SocketState.get('pinCode') + ':join', this.onPlayerJoin);
		},


		// Events
		// ------
		onPlayerJoin: function(player){
			if(SocketState.get('isLocked')) { return; }

			PlayerCollection.add(player);
		}
	});

	return new SocketController();
});