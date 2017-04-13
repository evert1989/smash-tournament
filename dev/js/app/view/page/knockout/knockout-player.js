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

	return BaseView.extend({

		// Vars
		// ----
		model: {},
		button: {},


		/** @constructor */
		initialize: function (options) {
			this._super(options);
		},


		// Template
		// --------
		render: function($parent){
			this._super(template, $parent, this.model.toJSON());

			this.button = new Button();
			this.button.render(this.$el);

			this.addListeners();
		},

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
		},
	});
});