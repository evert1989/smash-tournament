define([
	// Vendors
	'backbone',
	'underscore',
	// Collection
	'collection/player-collection', // Singleton
	// Models
	'model/state/app-state',		// Singleton
	'model/state/socket-state',		// Singleton
	'model/state/roster-state'		// Singleton
], function (
	// Vendors
	Backbone,
	_,
	// Collection
	PlayerCollection,
	// Models
	AppState,
	SocketState,
	RosterState
) {

	'use strict';

	/** @constructor */
	const SessionController = function () {
		this.initialize.apply(this);
	};

	_.extend(SessionController.prototype, Backbone.Events, {

		// Vars
		// ----
		TRIGGER: {
			RESET:	'reset'
		},

		// Init
		// ----
		initialize: function () {
			this.addListeners();
		},


		// Checks
		// ------
		checkIfRefresh: function(){
			if(!AppState.get('activePage') && !!sessionStorage.activePage) {
				this.resetStats();
			}
		},

		resetStats: function(){
			if(sessionStorage.playerCollection){
				PlayerCollection.set(JSON.parse(sessionStorage.playerCollection));
			}

			if(sessionStorage.socketState){
				SocketState.set(JSON.parse(sessionStorage.socketState));
			}

			if(sessionStorage.rosterState){
				RosterState.set(JSON.parse(sessionStorage.rosterState));
			}
		},

		clearSession: function(){
			sessionStorage.clear();
		},


		// Events
		// ------
		onChangeActivePage: function(){
			sessionStorage.activePage = AppState.get('activePage');
		},

		onChangeSocketState: function(){
			sessionStorage.socketState = JSON.stringify(SocketState.toJSON());
		},

		onChangeRosterState: function(){
			sessionStorage.rosterState = JSON.stringify(RosterState.toJSON());
		},

		onChangePlayerCollection: function(){
			sessionStorage.playerCollection = JSON.stringify(PlayerCollection.toJSON());
		},


		// Listeners
		// ---------
		addListeners: function(){
			this.listenTo(AppState, 'change:activePage', this.onChangeActivePage);
			this.listenTo(SocketState, 'change', this.onChangeSocketState);
			this.listenTo(RosterState, 'change', this.onChangeRosterState);

			this.listenTo(PlayerCollection, 'add remove change', this.onChangePlayerCollection);
		}
	});

	return new SessionController();
});