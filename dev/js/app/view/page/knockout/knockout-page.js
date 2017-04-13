define([
	// Vendors
	'underscore',
	// Collection
	'collection/player-collection', // Singleton
	// Controllers
	'controller/route-controller', // Singleton
	'controller/roster-controller', // Singleton
	'controller/socket-controller', // Singleton
	// Models
	'model/state/route-state', // Singleton
	'model/state/roster-state', // Singleton
	// Views
	'view/base/page-view',
	'view/page/knockout/knockout-player',
	// Templates
	'text!template/app/page/knockout/knockout-page.hbs'
], function (
	// Vendors
	_,
	// Collection
	PlayerCollection,
	// Controllers
	RouteController,
	RosterController,
	SocketController,
	// Models
	RouteState,
	RosterState,
	// Views
	PageView,
	KnockoutPlayer,
	// Templates
	template
) {

	'use strict';

	return PageView.extend({

		// Vars
		// ----
		knockoutPlayers: [],

		$playerContainer: {},


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

			this.$playerContainer = this.$('.player-container');

			SocketController.updateKnockoutStarted();
			RosterController.createKnockout();

			this.populateKnockout();
			this.addListeners();
		},

		stop: function () {
			if (this._super()) {
				return;
			}

			this.removeListeners();
			this.$el.remove();
		},


		// Populating
		// ----------
		populateKnockout: function(){
			this.clearRound();
			_.each(RosterState.get('knockoutRounds')[RosterState.get('activeKnockout')], this.createSinglePlayer, this);
		},

		clearRound: function(){
			_.invoke(this.knockoutPlayers, 'remove');
			this.knockoutPlayers = [];
		},


		// Player
		// ------
		createSinglePlayer: function(playerName){
			// Create Player
			let targetPlayer = PlayerCollection.findWhere({name: playerName});
			let player = new KnockoutPlayer({model: targetPlayer});
			player.render(this.$playerContainer);

			this.listenToOnce(player, 'click', this.onClickWinner);

			this.knockoutPlayers.push(player);
		},


		// Events
		// ------
		onChangeActiveKnockout: function(){
			this.populateKnockout();
		},

		onClickWinner: function(model){
			_.each(this.knockoutPlayers, function(player){
				this.stopListening(player, 'click', this.onClickWinner);
				player.model.set({eliminated: player.model !== model});
			}, this);

			let activeKnockout = RosterState.get('activeKnockout');
			activeKnockout += 1;

			if(activeKnockout >= RosterState.get('knockoutRounds').length){
				RosterController.createKnockout();
				this.populateKnockout();

			} else {
				RosterState.set({activeKnockout: activeKnockout});
			}
		},

		onChangeWinner: function(){
			RouteController.navigate(RouteState.ROUTE.WINNER, {trigger: true});
		},



		// Listeners
		// ---------
		addListeners: function(){
			this.listenTo(RosterState, 'change:activeKnockout', this.onChangeActiveKnockout);
			this.listenTo(RosterState, 'change:winner', this.onChangeWinner);
		},

		removeListeners: function(){
			this.stopListening(RosterState, 'change:activeKnockout', this.onChangeActiveKnockout);
			this.stopListening(RosterState, 'change:winner', this.onChangeWinner);
		}
	});
});