define([
	// Vendors
	'jquery',
	// Views
	'view/base/base-view',
	// Models
	'model/player-model', // Singleton
	// Templates
	'text!template/player/overlay/winner-overlay.hbs'
], function (
	// Vendors
	$,
	// Views
	BaseView,
	// Models
	PlayerModel,
	// Templates
	template
) {

	'use strict';

	/** @constructor */
	return BaseView.extend({

		// Vars
		// ----
		// States
		isStarted: false,


		// Init
		// ----
		initialize: function () {
			this.addListeners();
		},

		render: function(){
			this._super(template, $('.overlays'), null);
		},


		// Toggle
		// ------
		start: function () {
			if (this.isStarted) { return; }

			this.render();
			this.isStarted = true;
		},

		stop: function () {
			if (!this.isStarted) { return; }

			// todo: animateOut
			this.$el.remove();
			this.isStarted = false;
		},


		// Events
		// ------
		onWinner: function () {
			this.start();
		},


		// Listeners
		// ---------
		addListeners: function () {
			this.listenTo(PlayerModel, 'winner', this.onWinner);
		}
	});
});