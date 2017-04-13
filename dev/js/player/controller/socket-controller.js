define([
	// Vendors
	'backbone',
	'underscore',
	'socket.io',
	// Models
	'model/player-model', 	// Singleton
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

	/** @constructor */
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

		// Init
		// ----
		initialize: function () {
			_.bindAll(this, 'onJoinSuccess', 'onJoinNotFound');
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

		onUpdatePoints: function(points){
			PlayerModel.set({points: points});
		},

		onUpdateRanking: function(ranking){
			PlayerModel.set({ranking: ranking});
		},

		onUpdateEliminated: function (eliminated) {
			PlayerModel.set({eliminated: eliminated});
		},

		onUpdateKnockout: function(){
			PlayerModel.trigger('knockout-candidate');
		},

		onUpdateWinner: function(){
			PlayerModel.trigger('winner');
		},


		// Events
		// ------
		// Join events
		onJoinSuccess: function(){
			this.socket.off(PlayerModel.id + this.RESPONSE.JOIN_NOT_FOUND, this.onJoinNotFound);
			this.trigger(this.RESPONSE.JOIN_SUCCESS);

			let playerListener = 'player-' + PlayerModel.id; // Set listener id.

			this.socket.on('players-' + PlayerModel.get('code') + ':lock', this.onGameLocked);
			this.socket.on(playerListener + ':update-points', this.onUpdatePoints);
			this.socket.on(playerListener + ':update-ranking', this.onUpdateRanking);
			this.socket.on(playerListener + ':update-eliminated', this.onUpdateEliminated);
			this.socket.on(playerListener + ':update-knockout', this.onUpdateKnockout);
			this.socket.on(playerListener + ':update-winner', this.onUpdateWinner);
		},

		onJoinNotFound: function(){
			this.socket.off(PlayerModel.id + this.RESPONSE.JOIN_SUCCESS, this.onJoinSuccess);
			this.trigger(this.RESPONSE.JOIN_NOT_FOUND);
		}
	});

	return new SocketController();
});