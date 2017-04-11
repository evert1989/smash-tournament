define([
	// Models
	'model/player-model', // Singleton
	// Views
	'view/base/page-view',
	// Overlays
	'view/overlay/wait-overlay',
	// Templates
	'text!template/player/page/stats/stats-page.hbs'
], function (
	// Models
	PlayerModel,
	// Views
	PageView,
	// Overlays
	WaitOverLay,
	// Templates
	template
) {

	'use strict';

	return PageView.extend({

		// Vars
		// ----
		waitOverlay: null,


		/** @constructor */
		initialize: function (options) {
			this._super(options);
		},


		// Toggle Class
		// ------------
		start: function ($parent) {
			if (this._super(template, $parent, PlayerModel.toJSON())) {
				return;
			}

			this.waitOverlay = new WaitOverLay();
		},

		stop: function () {
			if(this._super()){
				return;
			}

			this.waitOverlay.stop();
			this.waitOverlay = null;

			this.$el.remove();
		}
	});
});