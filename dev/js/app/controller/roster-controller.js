define([
	// Vendors
	'backbone',
	// Collection
	'collection/player-collection', // Singleton
	// Models
	'model/state/roster-state' // Singleton
], function (
	// Vendors
	Backbone,
	// Collection
	PlayerCollection,
	// Models
	RosterState
) {

	'use strict';

	const RosterController = function () {
		this.initialize.apply(this);
	};

	_.extend(RosterController.prototype, Backbone.Events, {

		// Vars
		// ----
		usedPlayers: [],


		/** @constructor */
		initialize: function () {},


		// Roster
		// ------
		createRoster: function () {
			RosterState.set({rounds: []});
			let playerNames = PlayerCollection.map(function (model) {
				return model.get('name');
			});

			this.calculateRounds(playerNames);

			for (let i = 0; i < RosterState.get('totalRounds'); i += 1) {
				let round = this.createSingleRound(playerNames);
				RosterState.get('rounds').push(round);
			}
		},

		createSingleRound: function (playerNames) {
			let roundArray = [];
			let isNotUsed = false;
			let isNotInArray = false;
			let player = null;

			for (let i = 0; i < RosterState.get('playersPerRound'); i += 1) {
				isNotUsed = false;

				while (!isNotUsed || !isNotInArray) {
					player = playerNames[this.getRandomNumber(playerNames.length - 1, 0)];

					isNotUsed = !this.isInArray(this.usedPlayers, player);
					isNotInArray = !this.isInArray(roundArray, player);
				}

				this.usedPlayers.push(player);
				this.checkIfAllPlayersAreUsed(playerNames);

				roundArray.push(player);
			}

			return roundArray;
		},

		calculateRounds: function (players) {
			let totalRounds = 0;
			let remainder = -1;
			let counter = 0;

			while (remainder !== 0) {
				counter += 1;
				remainder = (RosterState.get('playersPerRound')) * counter % players.length;
			}

			while (totalRounds < 3) {
				totalRounds += counter;
			}

			RosterState.set({totalRounds: totalRounds});
		},


		// Helpers
		// -------
		getRandomNumber: function (max, min) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		isInArray: function (array, value) {
			return array.indexOf(value) !== -1;
		},

		checkIfAllPlayersAreUsed: function (playerNames) {
			if (this.usedPlayers.length === playerNames.length) {
				this.usedPlayers = [];
			}
		},

		hasReachedMinimumPlayers: function () {
			return PlayerCollection.length >= RosterState.get('minimumPlayers');
		}
	});

	return new RosterController();
});