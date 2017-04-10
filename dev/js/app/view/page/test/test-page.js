define([
	// Views
	'view/base/page-view',
	// Templates
	'text!template/page/test/test-page.hbs'
], function (
	// Views
	PageView,
	// Templates
	template
) {

	'use strict';

	return PageView.extend({

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