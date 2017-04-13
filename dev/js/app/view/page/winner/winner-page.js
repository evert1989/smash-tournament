define([
	// Models
	'model/state/roster-state',
	// Views
	'view/base/page-view',
	// Templates
	'text!template/app/page/winner/winner-page.hbs'
], function (
	// Models
	RosterState,
	// Views
	PageView,
	// Templates
	template
) {

	'use strict';

	return PageView.extend({

		// Vars
		// ----

		/** @constructor */
		initialize: function (options) {
			this._super(options);
		},


		// Toggle
		// ------
		/**
		 * @desc Starts view and add view to DOM. $parent is set in view-controller.
		 * @param {object} $parent
		 */
		start: function ($parent) {
			if (this._super(template, $parent, RosterState.get('winner').toJSON())) {
				return;
			}
		},

		stop: function () {
			if (this._super()) {
				return;
			}
		}
	});
});