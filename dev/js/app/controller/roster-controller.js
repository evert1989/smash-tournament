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

	/** @constructor */
	const RosterController = function () {
		this.initialize.apply(this);
	};

	_.extend(RosterController.prototype, Backbone.Events, {

		// Vars
		// ----
		usedPlayers: [], // Array of players that have been used already.


		// Init
		// ----
		initialize: function(){},


		// Roster
		// ------
		createRoster: function () {
			RosterState.set({rounds: []}); // Reset rounds

			// Get all player names
			let playerNames = PlayerCollection.pluck('name');

			// Calculate how many rounds are needed to make everyone play the same amount of rounds
			this.calculateRounds(playerNames);

			// Create rounds
			for (let i = 0; i < RosterState.get('totalRounds'); i += 1) {
				let round = this.createSingleRound(playerNames);
				RosterState.get('rounds').push(round);
			}
		},

		/**
		 * @desc Create a single round for the set playersPerRound in RosterState.
		 * @param {array} playerNames
		 * @returns {Array} players
		 */
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

		/**
		 * @desc Calculate and set the amount of rounds needed.
		 * @param {array} players
		 */
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
			// Sort players by ranking
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
		/**
		 * @desc Get random number between min and max value.
		 * @param {int} max
		 * @param {int} min
		 * @returns {int} randomNumber
		 */
		getRandomNumber: function (max, min) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		/**
		 * @desc Check if value is in array.
		 * @param {array} array
		 * @param {*} value
		 * @returns {boolean} isInArray
		 */
		isInArray: function (array, value) {
			return array.indexOf(value) !== -1;
		},

		/**
		 * @desc Check if all player names are used. If so, reset this.usedPlayers.
		 * @param {array} playerNames
		 */
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