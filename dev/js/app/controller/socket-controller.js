define([
	// Vendors
	'backbone',
	'underscore',
	'socket.io',
	// Collections
	'collection/player-collection', // Singleton
	// Models
	'model/state/socket-state', // Singleton
	'model/state/roster-state' // Singleton
], function (
	// Vendors
	Backbone,
	_,
	io,
	// Collections
	PlayerCollection,
	// Models
	SocketState,
	RosterState
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
			REQUEST: 'app:request',
			UPDATE: 'app:update'
		},

		REQUEST: {
			CODE: 'pin-code',
			LOCK_DOWN: 'lock-down'
		},

		UPDATE: {
			PLAYER_POINTS: 'player-points',
			PLAYER_RANKING: 'player-ranking',
			PLAYER_ELIMINATED: 'player-eliminated',
			PLAYER_KNOCKOUT: 'player-knockout',
			PLAYER_WINNER: 'player-winner'
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
		requestFourNumberCode: function () {
			this.socket.once(this.RESPONSE.CODE, this.onResponseCode);
			this.socket.emit(this.MESSAGE.REQUEST, {message: this.REQUEST.CODE});
		},

		requestLockPlayers: function () {
			SocketState.set({isLocked: true});
			this.socket.off('application-' + SocketState.get('pinCode') + ':join', this.onPlayerJoin);
			this.listenTo(PlayerCollection, 'change:points', this.updatePlayerPoints);
			this.listenTo(PlayerCollection, 'change:ranking', this.updatePlayerRanking);
			this.listenTo(PlayerCollection, 'change:eliminated', this.updatePlayerEliminated);
			this.listenTo(RosterState, 'change:winner', this.onWinner);

			this.socket.emit(this.MESSAGE.REQUEST, {message: this.REQUEST.LOCK_DOWN, code: SocketState.get('pinCode')});
		},


		// Updates
		// -------
		updatePlayerPoints: function (model, points) {
			this.socket.emit(this.MESSAGE.UPDATE, {
				message: this.UPDATE.PLAYER_POINTS,
				id: model.id,
				points: points
			});
		},

		updatePlayerRanking: function (model, ranking) {
			this.socket.emit(this.MESSAGE.UPDATE, {
				message: this.UPDATE.PLAYER_RANKING,
				id: model.id,
				ranking: ranking
			});
		},

		updatePlayerEliminated: function(model, eliminated){
			this.socket.emit(this.MESSAGE.UPDATE, {
				message: this.UPDATE.PLAYER_ELIMINATED,
				id: model.id,
				eliminated: eliminated
			});
		},

		updateKnockoutStarted: function(){
			PlayerCollection.each(this.updatePlayerKnockout, this);
		},

		updatePlayerKnockout: function(model){
			if(model.get('eliminated')) {return;}

			this.socket.emit(this.MESSAGE.UPDATE, {
				message: this.UPDATE.PLAYER_KNOCKOUT,
				id: model.id
			});
		},

		onWinner: function(){
			this.socket.emit(this.MESSAGE.UPDATE, {
				message: this.UPDATE.PLAYER_WINNER,
				id: RosterState.get('winner').id
			});
		},


		// Responses
		// ---------
		onResponseCode: function (pinCode) {
			SocketState.set({pinCode: pinCode});

			this.socket.on('application-' + SocketState.get('pinCode') + ':join', this.onPlayerJoin);
		},


		// Events
		// ------
		onPlayerJoin: function (player) {
			if (SocketState.get('isLocked')) {
				return;
			}

			PlayerCollection.add(player);
		}
	});

	return new SocketController();
});