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

	const PlayerCollection = Backbone.Collection.extend({

		// Vars
		// ----
		model: PlayerModel,

		rankedPoints: [],


		/** @constructor */
		initialize: function () {
			this.addListeners();
		},


		// Sorting
		// -------
		sortPlayer: function (playerModel, index) {
			let isInRankedPoints = _.findWhere(this.rankedPoints, {points: playerModel.get('points')});

			let ranking = index + 1;

			if (!isInRankedPoints) {
				this.rankedPoints.push({points: playerModel.get('points'), ranking: ranking});

			} else {
				ranking = isInRankedPoints.ranking;
			}

			playerModel.set({ranking: ranking});
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