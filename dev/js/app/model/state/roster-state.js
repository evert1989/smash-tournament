define([
	// Models
	'model/base/base-model'
], function (
	// Models
	BaseModel
) {

	'use strict';

	const RosterState = BaseModel.extend({

		defaults: {
			minimumPlayers: 4,
			playersPerRound: 4,
			totalRounds: 0,
			rounds: []
		},


		// Constructor
		// -----------
		initialize: function () {}
	});

	return new RosterState();
});