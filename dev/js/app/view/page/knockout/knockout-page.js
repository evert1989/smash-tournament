define([
	// Controllers
	'controller/route-controller', // Singleton
	'controller/roster-controller', // Singleton
	// Models
	'model/state/route-state', // Singleton
	// Components
	'component/button',
	// Views
	'view/base/page-view',
	// Templates
	'text!template/app/page/knockout/knockout-page.hbs'
], function (
	// Controllers
	RouteController,
	RosterController,
	// Models
	RouteState,
	// Components
	Button,
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
			console.log('knockout-page -> initialize');
		},


		// Toggle
		// ------
		/**
		 * @desc Starts view and add view to DOM. $parent is set in view-controller.
		 * @param {object} $parent
		 */
		start: function ($parent) {
			if (this._super(template, $parent, null)) {
				return;
			}

			RosterController.createKnockout();
		},

		stop: function () {
			if (this._super()) {
				return;
			}

			this.$el.remove();
		}
	});
});