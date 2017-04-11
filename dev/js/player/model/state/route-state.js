define([
	// Models
	'model/base/base-model'
], function (
	// Models
	BaseModel
) {

	'use strict';

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
		},


		/** @constructor */
		initialize: function () {
			this._super();
		}
	});

	return new RouteState();
});