define([
	// Views
	'view/base/page-view',
	// Templates
	'text!template/player/page/stats/stats-page.hbs'
], function (
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


		// Toggle Class
		// ------------
		start: function ($parent) {
			if (this._super(template, $parent, null)) {
				return;
			}
		},

		stop: function () {
			if(this._super()){
				return;
			}

			this.$el.remove();
		}
	});
});