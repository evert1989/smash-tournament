define([
	// Vendors
	'backbone',
	'underscore',
	// Collection
	'collection/player-collection', // Singleton
	// Models
	'model/state/roster-state' // Singleton
], function (
	// Vendors
	Backbone,
	_,
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


		// Knockout
		// --------
		createKnockout: function () {
			PlayerCollection.updateEliminatedPlayers();
			RosterState.set({knockoutPlayers: PlayerCollection.getKnockoutPlayers()});

			this.createKnockoutRounds();
		},

		createKnockoutRounds: function () {
			let players = RosterState.get('knockoutPlayers').sort(function (a, b) {
				return a.get('ranking') - b.get('ranking');
			});

			let arrayIndex = 0;
			let ranking = 1;
			let nextRanking = 2;
			let rounds = [];

			// Finale
			if (players.length === 2) {
				RosterState.set({
					knockoutRounds: [[players[0].get('name'), players[1].get('name')]],
					activeKnockout: 0
				});
				return;

			// Winner
			} else if (players.length === 1) {
				// WINNER
				RosterState.set({winner: players[0]});
				return;
			}

			// Create rounds
			while (arrayIndex < players.length) {
				if (players[arrayIndex].get('ranking') === ranking && arrayIndex + 1 < players.length ||
					(arrayIndex + 1 < players.length &&
					(players[arrayIndex].get('ranking') === players[arrayIndex + 1].get('ranking') ||
					players[arrayIndex + 1].get('ranking') === nextRanking))
				) {
					rounds.push([players[arrayIndex].get('name'), players[arrayIndex + 1].get('name')]);
					arrayIndex += 2;

				} else if (players[arrayIndex].get('ranking') === nextRanking) {
					arrayIndex += 1;

					if (nextRanking === RosterState.get('totalKnockoutPlayers')) {
						ranking = nextRanking;
					}

				} else if (nextRanking < RosterState.get('totalKnockoutPlayers')) {
					ranking += 2;
					nextRanking += 2;

				} else {
					arrayIndex = players.length;
				}
			}

			RosterState.set({knockoutRounds: rounds, activeKnockout: 0});
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