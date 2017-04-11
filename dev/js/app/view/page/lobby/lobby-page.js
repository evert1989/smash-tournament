define([
	// Vendors
	'underscore',
	// Collection
	'collection/player-collection', // Singleton
	// Controller
	'controller/socket-controller', // Singleton
	// Models
	'model/state/socket-state', // Singleton
	// Views
	'view/base/page-view',
	'view/page/lobby/lobby-player',
	// Templates
	'text!template/app/page/lobby/lobby-page.hbs'
], function (
	// Vendors
	_,
	// Collection
	PlayerCollection,
	// Controller
	SocketController,
	// Models
	SocketState,
	// Views
	PageView,
	LobbyPlayer,
	// Templates
	template
) {

	'use strict';

	return PageView.extend({

		// Vars
		// ----
		// DOM
		$codeItems: {},
		$playerContainer: {},

		players: [], // array of player views


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

			this.$codeItems = this.$('.item-js');
			this.$playerContainer = this.$('.player-container');

			this.checkForPinCode();
		},

		stop: function () {
			if (this._super()) {
				return;
			}

			this.removeListeners();
			this.$el.remove();
		},


		// Socket
		// ------
		checkForPinCode: function(){
			if(SocketState.get('pinCode')) {
				this.onChangePinCode();
				return;
			}

			this.listenToOnce(SocketState, 'change:pinCode', this.onChangePinCode);
			SocketController.requestFourNumberCode();
		},


		// Pin Code
		// --------
		updateNumberByIndex: function(number, index){
			this.$codeItems[index].innerHTML = number;
		},


		// Events
		// ------
		onChangePinCode: function(){
			_.each(SocketState.get('pinCode'), this.updateNumberByIndex, this);

			this.addListeners();
		},

		// Player
		onPlayerAdded: function(model){
			if(!!_.findWhere(this.players, {model: model})) {
				return;
			}

			let playerView = new LobbyPlayer({model: model});
			playerView.render(this.$playerContainer);

			this.players.push(playerView);
		},

		onPlayerRemoved: function(model){
			let targetView = _.findWhere(this.players, {model: model});
			let targetIndex = _.indexOf(this.players, targetView);

			targetView.stop();
			this.players.slice(targetIndex, 1);
		},


		// Listeners
		addListeners: function(){
			this.listenTo(PlayerCollection, 'add', this.onPlayerAdded);
			this.listenTo(PlayerCollection, 'remove', this.onPlayerRemoved);
		},

		removeListeners: function(){
			this.stopListening(PlayerCollection, 'add', this.onPlayerAdded);
			this.stopListening(PlayerCollection, 'remove', this.onPlayerRemoved);
		}
	});
});