define([
	// Vendors
	'backbone',
	'underscore',
	// Models
	'model/player-model'
], function (
	// Vendors
	Backbone,
	_,
	// Models
	PlayerModel
) {

	'use strict';

	/** @constructor */
	const PlayerCollection = Backbone.Collection.extend({

		// Vars
		// ----
		model: PlayerModel,

		// Arrays
		rankedPoints: [], // Array of points that have a rank linked to it.


		// Init
		// ----
		initialize: function () {
			this.addListeners();
		},


		// Sorting
		// -------
		/**
		 * @desc Update the ranking of the player by his points.
		 * @param {object} playerModel
		 */
		sortPlayer: function (playerModel) {
			// Check if points already have a rank and set ranking accordingly.
			let isInRankedPoints = _.findWhere(this.rankedPoints, {points: playerModel.get('points')});
			let ranking = this.rankedPoints.length ? this.rankedPoints[this.rankedPoints.length - 1].ranking + 1 : 1;

			// If the points are not in the rankingPoints array, add them. Otherwise use the existing ranking.
			if (!isInRankedPoints) {
				this.rankedPoints.push({points: playerModel.get('points'), ranking: ranking});

			} else {
				ranking = isInRankedPoints.ranking;
			}

			// Update ranking for player.
			playerModel.set({ranking: ranking});
		},


		// Knockout
		// --------
		updateEliminatedPlayers: function(){
			this.each(this.isPlayerEliminated);
		},

		/**
		 * @desc Check if player is eliminated or not.
		 * @param {object} playerModel
		 */
		isPlayerEliminated: function(playerModel){
			if(playerModel.get('eliminated')) { return; }
			playerModel.set({eliminated: playerModel.get('ranking') > 4});
		},

		getKnockoutPlayers: function(){
			return this.where({eliminated: false});
		},


		// Events
		// ------
		onChangePoints: function () {
			this.rankedPoints = [];
			let sortedModels = this.sortBy('points').reverse();

			_.each(sortedModels, this.sortPlayer, this);
		},


		// Listeners
		// ---------
		addListeners: function () {
			this.listenTo(this, 'change:points', this.onChangePoints);
		}
	});

	return new PlayerCollection();
});