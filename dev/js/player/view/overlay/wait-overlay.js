define([
	// Vendors
	'jquery',
	// Views
	'view/base/base-view',
	// Models
	'model/state/app-state', // Singleton
	// Templates
	'text!template/player/overlay/wait-overlay.hbs'
], function (
	// Vendors
	$,
	// Views
	BaseView,
	// Models
	AppState,
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
			this.onChangeIsGameStarted();
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
		onChangeIsGameStarted: function () {
			AppState.get('isGameStarted') ? this.stop() : this.start();
		},


		// Listeners
		// ---------
		addListeners: function () {
			this.listenTo(AppState, 'change:isGameStarted', this.onChangeIsGameStarted);
		}
	});
});