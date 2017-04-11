define([
	// Controllers
	'controller/route-controller', // Singleton
	'controller/socket-controller', // Singleton
	// Models
	'model/player-model', // Singleton
	'model/state/route-state', // Singleton
	// Views
	'view/base/page-view',
	// Components
	'component/button',
	// Templates
	'text!template/player/page/join/join-page.hbs'
], function (
	// Controllers
	RouteController,
	SocketController,
	// Models
	PlayerModel,
	RouteState,
	// Views
	PageView,
	// Components
	Button,
	// Templates
	template
) {

	'use strict';

	return PageView.extend({

		// Vars
		// ----
		events: {
			'submit .join': 'onSubmitCode'
		},

		// DOM
		$name: {},
		$code: {},


		/** @constructor */
		initialize: function (options) {
			this._super(options);
		},


		// Toggle Class
		// ------------
		/**
		 * @desc Starts view and add view to DOM. $parent is set in view-controller.
		 * @param {object} $parent
		 */
		start: function ($parent) {
			if (this._super(template, $parent, null)) {
				return;
			}

			this.$name = this.$('.name-js');
			this.$code = this.$('.code-js');

			this.createButtons();
		},

		stop: function () {
			if(this._super()){
				return;
			}

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
		onSubmitCode: function(e){
			e.preventDefault();

			if(!this.$name.val() || !this.$code.val()) {
				return;
			}

			PlayerModel.createPlayer(this.$name.val(), this.$code.val());
			SocketController.joinGame();
		}
	});
});