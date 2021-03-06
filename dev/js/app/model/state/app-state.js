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
			activePage: null
		},

		// Pages
		PAGE: {
			INTRO: 'page:intro',
			LOBBY: 'page:lobby',
			ROUND: 'page:round',
			KNOCKOUT: 'page:knockout',
			WINNER: 'page:winner'
		}
	});

	return new AppState();
});