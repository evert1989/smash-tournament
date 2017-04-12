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
			// players
			minimumPlayers: 4,
			playersPerRound: 4,
			// rounds
			totalRounds: 0,
			activeRound: 0,
			rounds: [],
			// knockout
			knockoutPlayers: [],
			knockoutRounds: [],
			activeKnockout: 0,
			totalKnockoutPlayers: 4,
		},


		// Constructor
		// -----------
		initialize: function () {}
	});

	return new RosterState();
});