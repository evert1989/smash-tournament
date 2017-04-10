define([
	// Vendors
	'backbone',
	'backbone-super'
], function (
	// Vendors
	Backbone
) {

	'use strict';

	return Backbone.View.extend({

		// Vars
		// ----
		// States
		isStarted: false,


		/** @constructor */
		initialize: function () {},


		// Toggle Class
		// ------------
		/**
		 * @desc Starts function and returns true if already started.
		 * @returns {boolean}
		 */
		start: function () {
			if (this.isStarted) { return true; }

			this.addListeners();
			this.isStarted = true;

			return false;
		},

		/**
		 * @desc Stops function and returns true if already stops.
		 * @returns {boolean}
		 */
		stop: function () {
			if (!this.isStarted) { return true; }

			this.removeListeners();
			this.isStarted = false;

			return false;
		},


		// Events
		// ------


		// Listeners
		// ---------
		addListeners: function () {

		},

		removeListeners: function () {

		}
	});
});