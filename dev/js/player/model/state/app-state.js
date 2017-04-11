define([
	// Models
	'model/base/base-model'
], function (
	// Models
	BaseModel
) {

	'use strict';

	const AppState = BaseModel.extend({

		// Vars
		// ----
		defaults: {
			isIdle: true,
			activePage: null
		},

		// Pages
		PAGE: {
			INTRO: 'page:intro',
			JOIN: 'page:join',
			STATS: 'page:stats'
		},


		/** @constructor */
		initialize: function () {
			this._super();
		}
	});

	return new AppState();
});