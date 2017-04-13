define([
	// Vendors
	'backbone',
	// Models
	'model/state/app-state' // Singleton
], function (
	// Vendors
	Backbone,
	// Models
	AppState
) {

	'use strict';

	/** @constructor */
	return Backbone.View.extend({

		// Vars
		// ----
		// DOM
		el: '.loader-overlay',

		// States
		isStarted: true,


		// Init
		// ----
		initialize: function () {
			this._super();
			this.addListeners();
		},


		// Toggle
		// ------
		start: function () {
			if (this.isStarted) { return; }

			this.$el.toggleClass('is-hidden', false);
			this.isStarted = true;
		},

		stop: function () {
			if (!this.isStarted) { return; }

			this.$el.toggleClass('is-hidden', true);
			this.isStarted = false;
		},


		// Events
		// ------
		onChangeIsIdle: function () {
			AppState.get('isIdle') ? this.start() : this.stop();
		},


		// Listeners
		// ---------
		addListeners: function () {
			this.listenTo(AppState, 'change:isIdle', this.onChangeIsIdle);
		}
	});
});