define([
	// Vendors
	'underscore',
	// Collection
	'collection/player-collection', 	// Singleton
	// Controllers
	'controller/route-controller', 		// Singleton
	'controller/roster-controller', 	// Singleton
	'controller/socket-controller', 	// Singleton
	'controller/audio-controller', 		// Singleton
	// Models
	'model/state/route-state', 			// Singleton
	'model/state/roster-state', 		// Singleton
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
	AudioController,
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

	/** @constructor */
	return PageView.extend({

		// Vars
		// ----
		knockoutPlayers: [],

		$title: {},
		$playerContainer: {},

		// Init
		// ----
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
			if (this._super(template, $parent, null)) { return; }

			this.$title = this.$('.title');
			this.$playerContainer = this.$('.player-container');

			AudioController.playSound(AudioController.AUDIO.ONE_ON_ONE, false);
			SocketController.updateKnockoutStarted();
			RosterController.createKnockout();

			this.populateKnockout();
			this.addListeners();
		},

		stop: function () {
			if (this._super()) { return; }

			this.removeListeners();
			this.$el.remove();
		},


		// Populating
		// ----------
		populateKnockout: function(){
			let copy;

			// Update the copy for the knockout rounds.
			if(PlayerCollection.getKnockoutPlayers().length > 2 && PlayerCollection.getKnockoutPlayers().length <= 4){
				copy = 'SEMI FINALS';

			} else if (PlayerCollection.getKnockoutPlayers().length === 2) {
				copy = 'FINALE';
				AudioController.playSound(AudioController.AUDIO.FINAL_BATTLE, false);

			} else {
				copy = 'KNOCKOUT PHASE';
			}

			this.$title.text(copy);

			// Clear previous round
			this.clearRound();

			// Create players for current knockout round
			_.each(RosterState.get('knockoutRounds')[RosterState.get('activeKnockout')], this.createSinglePlayer, this);
		},

		clearRound: function(){
			_.invoke(this.knockoutPlayers, 'remove');
			this.knockoutPlayers = [];
		},


		// Player
		// ------
		/**
		 * @desc Create playerView for each player that is in the current knockout round.
		 * @param {string} playerName
		 */
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

		/**
		 * @desc When there's a click on one of the players. Update the players that are eliminated
		 * @param model
		 */
		onClickWinner: function(model){
			// Check which player won and which one was eliminated.
			_.each(this.knockoutPlayers, function(player){
				this.stopListening(player, 'click', this.onClickWinner);
				player.model.set({eliminated: player.model !== model});
			}, this);

			// Update the knockout round.
			let activeKnockout = RosterState.get('activeKnockout');
			activeKnockout += 1;

			// If all rounds are played, create new knockout rounds, else go to next round.
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