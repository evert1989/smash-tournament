define([
	// Controllers
	'controller/route-controller', // Singleton
	// Models
	'model/state/route-state', // Singleton
	// Components
	'component/button',
	// Views
	'view/base/page-view',
	// Templates
	'text!template/player/page/intro/intro-page.hbs'
], function (
	// Controllers
	RouteController,
	// Models
	RouteState,
	// Components
	Button,
	// Views
	PageView,
	// Templates
	template
) {

	'use strict';

	return PageView.extend({

		// Vars
		// ----
		btnJoin: {},

		/** @constructor */
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
			if (this._super(template, $parent, null)) {
				return;
			}

			this.createButtons();
			this.addListeners();
		},

		stop: function () {
			if (this._super()) {
				return;
			}

			this.removeListeners();
			this.$el.remove();
		},


		// Buttons
		// -------
		createButtons: function(){
			this.btnJoin = new Button();
			this.btnJoin.render(this.$('.btn-join-js'));
		},


		// Events
		// ------
		onClickStart: function(){
			RouteController.navigate(RouteState.ROUTE.JOIN, {trigger: true});
		},


		// Listeners
		// ---------
		addListeners: function(){
			this.listenTo(this.btnJoin, 'click', this.onClickStart);
		},

		removeListeners: function(){
			this.stopListening(this.btnJoin, 'click', this.onClickStart);
		}
	});
});