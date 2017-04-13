define([
	// Controller
	'controller/audio-controller',		// Singleton
	'controller/session-controller', 	// Singleton
	// Models
	'model/state/roster-state',			// Singleton
	// Views
	'view/base/page-view',
	// Templates
	'text!template/app/page/winner/winner-page.hbs'
], function (
	// Controller
	AudioController,
	SessionController,
	// Models
	RosterState,
	// Views
	PageView,
	// Templates
	template
) {

	'use strict';

	/** @constructor */
	return PageView.extend({

		// Init
		// ----
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

			AudioController.playSound(AudioController.AUDIO.THE_WINNER_IS, false);
			SessionController.clearSession();
		},

		stop: function () {
			if (this._super()) { return; }

			this.$el.remove();
		}
	});
});