define([
	// Views
	'view/base/page-view',
	// Template
	'text!template/app/page/round/round-page.hbs'
], function (
	// Views
	PageView,
	// Template
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
			if (this._super(template, $parent, null)) {
				return;
			}
		},

		stop: function () {
			if (this._super()) {
				return;
			}

			this.$el.remove();
		}
	});
});