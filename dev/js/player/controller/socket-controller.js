define([
	// Vendors
	'backbone',
	'underscore',
	'socket.io',
	// Models
	'model/player-model', // Singleton
	'model/state/app-state' // Singleton
], function (
	// Vendors
	Backbone,
	_,
	io,
	// Models
	PlayerModel,
	AppState
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

		RESPONSE: {
			JOIN_SUCCESS: '-join:success',
			JOIN_NOT_FOUND: '-join:not-found'
		},

		// Constructor
		// -----------
		initialize: function () {
			_.bindAll(this,
				'onJoinSuccess',
				'onJoinNotFound'
			);

			this.socket = io();
		},


		// Join
		// ----
		joinGame: function(){
			this.socket.once(PlayerModel.id + this.RESPONSE.JOIN_SUCCESS, this.onJoinSuccess);
			this.socket.once(PlayerModel.id + this.RESPONSE.JOIN_NOT_FOUND, this.onJoinNotFound);

			this.socket.emit(this.MESSAGE.JOIN, PlayerModel.toJSON());
		},


		// Stats
		// -----
		onGameLocked: function(){
			AppState.set({isGameStarted: true});
		},


		// Events
		// ------
		// Join events
		onJoinSuccess: function(){
			this.socket.off(PlayerModel.id + this.RESPONSE.JOIN_NOT_FOUND, this.onJoinNotFound);
			this.trigger(this.RESPONSE.JOIN_SUCCESS);

			this.socket.on('players-' + PlayerModel.get('code') + ':lock', this.onGameLocked);
		},

		onJoinNotFound: function(){
			this.socket.off(PlayerModel.id + this.RESPONSE.JOIN_SUCCESS, this.onJoinSuccess);
			this.trigger(this.RESPONSE.JOIN_NOT_FOUND);
		}
	});

	return new SocketController();
});