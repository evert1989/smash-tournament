define([
	// Component
	'component/button',
	// Views
	'view/base/base-view',
	// Templates
	'text!template/app/page/knockout/knockout-player.hbs'
], function (
	// Component
	Button,
	// Views
	BaseView,
	// Template
	template
) {

	'use strict';

	/** @constructor */
	return BaseView.extend({

		// Vars
		// ----
		model: {},
		button: {},


		// Template
		// --------
		/**
		 * @desc Renders the page and adds it to the given $parent.
		 * @param {object} $parent
		 */
		render: function($parent){
			this._super(template, $parent, this.model.toJSON());

			this.button = new Button();
			this.button.render(this.$el);

			this.addListeners();
		},

		/**
		 * @desc Remove from DOM and memory.
		 * @param {*} options
		 */
		remove: function(options){
			this.button.remove();
			this.removeListeners();

			this._super(options);
		},


		// Events
		// ------
		onClick: function(){
			this.trigger('click', this.model);
		},


		// Listeners
		// ---------
		addListeners: function(){
			this.listenTo(this.button, 'click', this.onClick);
		},

		removeListeners: function(){
			this.stopListening(this.button, 'click', this.onClick);
		}
	});
});