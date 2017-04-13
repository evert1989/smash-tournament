define([
	// Models
	'model/base/base-model'
], function (
	// Models
	BaseModel
) {

	'use strict';

	/** @constructor */
	const AppState = BaseModel.extend({

		// Vars
		// ----
		defaults: {
			isIdle: true,
			isGameStarted: false,
			activePage: null
		},

		// Pages
		PAGE: {
			INTRO: 'page:intro',
			JOIN: 'page:join',
			STATS: 'page:stats'
		}
	});

	return new AppState();
});