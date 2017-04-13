define([
	// Vendors
	'jquery',
	// Views
	'view/base/base-view',
	// Models
	'model/player-model', // Singleton
	// Templates
	'text!template/player/overlay/eliminated-overlay.hbs'
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

	return BaseView.extend({

		// Vars
		// ----
		// DOM

		// States
		isStarted: false,


		/** @constructor */
		initialize: function () {
			this._super();

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
		onChangeEliminated: function () {
			PlayerModel.get('eliminated') ? this.start() : this.stop();
		},


		// Listeners
		// ---------
		addListeners: function () {
			this.listenTo(PlayerModel, 'change:eliminated', this.onChangeEliminated);
		}
	});
});