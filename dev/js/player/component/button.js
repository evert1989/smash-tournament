define([
	// Vendors
	'backbone'
], function (
	// Vendors
	Backbone
) {

	'use strict';

	/** @constructor */
	return Backbone.View.extend({

		// Vars
		// ----
		events: {
			'mousedown': 'onButtonDown',
			'mouseup': 'onButtonUp',
			'mouseout': 'clearButtonStyling'
		},

		// Styling classes
		activeClass: 'button__down',

		// States
		isValidClick: false,


		/**
		 * @desc Sets element of button. Does not create an element from a template.
		 * @param $el
		 */
		render: function ($el) {
			this.setElement($el);
		},

		// Reset
		// -----
		clearButtonStyling: function(){
			this.isValidClick = false;
			this.$el.toggleClass(this.activeClass, false);
		},


		// Events
		// ------
		onButtonDown: function () {
			this.isValidClick = true;
			this.$el.toggleClass(this.activeClass, true);
		},

		onButtonUp: function () {
			if(this.isValidClick){
				this.trigger('click');
			}

			this.clearButtonStyling();
		}
	});
});