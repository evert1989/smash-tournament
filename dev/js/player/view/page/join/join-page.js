define([
	// Controllers
	'controller/route-controller', 	// Singleton
	'controller/socket-controller', // Singleton
	// Models
	'model/player-model', 			// Singleton
	'model/state/route-state', 		// Singleton
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

	/** @constructor */
	return PageView.extend({

		// Vars
		// ----
		events: {
			'submit .join': 'onSubmitCode'
		},

		// DOM
		$name: {},
		$code: {},


		// Init
		// ----
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

			this.listenToOnce(SocketController, SocketController.RESPONSE.JOIN_SUCCESS, this.onJoinSuccess);
			this.listenToOnce(SocketController, SocketController.RESPONSE.JOIN_NOT_FOUND, this.onJoinNotFound);
			SocketController.joinGame();
		},

		onJoinSuccess: function(){
			this.stopListening(SocketController, SocketController.RESPONSE.JOIN_NOT_FOUND, this.onJoinNotFound);

			this.$el.toggleClass('error', false);

			RouteController.navigate(RouteState.ROUTE.STATS + '/' + PlayerModel.get('name'), {trigger: true});
		},

		onJoinNotFound: function(){
			this.stopListening(SocketController, SocketController.RESPONSE.JOIN_SUCCESS, this.onJoinSuccess);

			this.$el.toggleClass('error', true);
		}
	});
});