define([
	// Vendors
	'backbone',
	// Models
	'model/player-model'
], function (
	// Vendors
	Backbone,
	// Models
	PlayerModel
) {

	'use strict';

	const PlayerCollection = Backbone.Collection.extend({

		model: PlayerModel,


		// Constructor
		// -----------
		initialize: function () {}
	});

	return new PlayerCollection();
});