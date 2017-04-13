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
			JOIN: '!join',
			STATS: '!stats'
		}
	});

	return new RouteState();
});