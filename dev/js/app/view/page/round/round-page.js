define([
	// Vendors
	'underscore',
	// Collection
	'collection/player-collection', 	// Singleton
	// Controllers
	'controller/route-controller', 		// Singleton
	'controller/roster-controller', 	// Singleton
	'controller/session-controller', 	// Singleton
	// Component
	'component/button',
	// Models
	'model/state/route-state', 			// Singleton
	'model/state/roster-state', 		// Singleton
	// Views
	'view/base/page-view',
	'view/page/round/round-player',
	// Template
	'text!template/app/page/round/round-page.hbs'
], function (
	// Vendors
	_,
	// Collection
	PlayerCollection,
	// Controllers
	RouteController,
	RosterController,
	SessionController,
	// Component
	Button,
	// Models
	RouteState,
	RosterState,
	// Views
	PageView,
	RoundPlayer,
	// Template
	template
) {

	'use strict';

	/** @constructor */
	return PageView.extend({

		// Vars
		// ----
		// DOM
		$playerContainer: {},
		$number: {},

		// Views
		roundPlayers: [],

		// Buttons
		btnEndRound: {},

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
			if (this._super(template, $parent, {round: RosterState.get('activeRound') + 1})) { return; }

			this.$playerContainer = this.$('.player-container');
			this.$number = this.$('.round-number-js');

			this.createButtons();
			this.onChangeActiveRound();
			this.addListeners();
		},

		stop: function () {
			if (this._super()) { return; }

			this.removeListeners();
			this.$el.remove();
		},


		// Buttons
		// -------
		createButtons: function(){
			this.btnEndRound = new Button();
			this.btnEndRound.render(this.$('.btn-end-round-js'));
		},


		// Populating
		// ----------
		populateRound: function(){
			this.clearRound();
			_.each(RosterState.get('rounds')[RosterState.get('activeRound')], this.createSinglePlayer, this);
		},

		clearRound: function(){
			_.invoke(this.roundPlayers, 'remove');
			this.roundPlayers = [];
		},


		// Player
		// ------
		/**
		 * @desc Create playerView for each player that is in the current round.
		 * @param {string} playerName
		 */
		createSinglePlayer: function(playerName){
			let targetPlayer = PlayerCollection.findWhere({name: playerName});
			let player = new RoundPlayer({model: targetPlayer});
			player.render(this.$playerContainer);

			this.roundPlayers.push(player);
		},


		// Helpers
		// -------
		allValuesAreSet: function(){
			let isValueSet = true;

			_.each(this.players, function(playerView){
				if(!isValueSet) { return; }
				isValueSet = playerView.$score.val().length > 0;
			}, this);

			return isValueSet;
		},


		// Events
		// ------
		onChangeActiveRound: function(){
			this.$number.text(RosterState.get('activeRound') + 1);
			this.populateRound();
		},

		onClickEndRound: function(){
			if(!this.allValuesAreSet()) {
				return;
			}

			_.invoke(this.roundPlayers, 'updateScore');

			let activeRound = RosterState.get('activeRound');
			activeRound += 1;

			if(activeRound >= RosterState.get('totalRounds')){
				RouteController.navigate(RouteState.ROUTE.KNOCKOUT, {trigger: true});

			} else {
				RosterState.set({activeRound: activeRound});
			}
		},


		// Listeners
		// ---------
		addListeners: function(){
			this.listenTo(RosterState, 'change:activeRound', this.onChangeActiveRound);
			this.listenTo(this.btnEndRound, 'click', this.onClickEndRound);
		},

		removeListeners: function(){
			this.stopListening(RosterState, 'change:activeRound', this.onChangeActiveRound);
			this.stopListening(this.btnEndRound, 'click', this.onClickEndRound);
		}
	});
});