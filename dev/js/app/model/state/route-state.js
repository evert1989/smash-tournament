define([
	// Models
	'model/base/base-model'
], function (
	// Models
	BaseModel
) {

	'use strict';

	/** @constructor */
	const RouteState = BaseModel.extend({

		// Vars
		// ----
		defaults: {
			route: null
		},

		// Routes
		ROUTE: {
			INTRO: '',
			LOBBY: '!lobby',
			ROUND: '!round',
			KNOCKOUT: '!knockout',
			WINNER: '!winner'
		}
	});

	return new RouteState(); // Singleton
});