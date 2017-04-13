define([
	// Vendors
	'backbone',
	// Models
	'model/state/route-state' // Singleton
], function (
	// Vendors
	Backbone,
	// Models
	RouteState
) {

	'use strict';

	/** @constructor */
	const RouteController = Backbone.Router.extend({

		// Vars
		// ----
		routes: {
			'': 		 'routeIndex',
			'!lobby': 	 'routeLobby',
			'!round':	 'routeRound',
			'!knockout': 'routeKnockout',
			'!winner':	 'routeWinner'
		},

		// States
		isStarted: false,


		// Toggle
		// ------
		start: function(){
			if(this.isStarted) { return; }

			Backbone.history.start();
			this.isStarted = true;
		},

		stop: function(){
			if(!this.isStarted) { return; }

			Backbone.history.stop();
			this.isStarted = false;
		},


		// Routes
		// ------
		routeIndex: function(){
			RouteState.set({route: RouteState.ROUTE.INTRO});
		},

		routeLobby: function(){
			RouteState.set({route: RouteState.ROUTE.LOBBY});
		},

		routeRound: function(){
			RouteState.set({route: RouteState.ROUTE.ROUND});
		},

		routeKnockout: function(){
			RouteState.set({route: RouteState.ROUTE.KNOCKOUT});
		},

		routeWinner: function(){
			RouteState.set({route: RouteState.ROUTE.WINNER});
		}
	});

	return new RouteController();
});