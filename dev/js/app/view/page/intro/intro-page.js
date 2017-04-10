define([
	// Controllers
	'controller/route-controller', // Singleton
	'controller/audio-controller', // Singleton
	// Models
	'model/state/route-state', // Singleton
	// Components
	'component/button',
	// Views
	'view/base/page-view',
	// Templates
	'text!template/page/intro/intro-page.hbs'
], function (
	// Controllers
	RouteController,
	AudioController,
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
		btnStart: {},

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

			// Audio
			AudioController.playSound(AudioController.AUDIO.INTRO, true);

			this.createButtons();
			this.addListeners();
		},

		stop: function () {
			if (this._super()) {
				return;
			}

			// Audio
			AudioController.pauseSound();

			this.removeListeners();
			this.$el.remove();
		},


		// Buttons
		// -------
		createButtons: function(){
			this.btnStart = new Button();
			this.btnStart.render(this.$('.btn-start-js'));
		},


		// Events
		// ------
		onClickStart: function(){
			RouteController.navigate(RouteState.ROUTE.LOBBY, {trigger: true});
		},


		// Listeners
		// ---------
		addListeners: function(){
			this.listenTo(this.btnStart, 'click', this.onClickStart);
		},

		removeListeners: function(){
			this.stopListening(this.btnStart, 'click', this.onClickStart);
		}
	});
});