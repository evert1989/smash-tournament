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

	const RouteController = Backbone.Router.extend({

		// Vars
		// ----
		routes: {
			'': 		 'routeIndex',
			'!lobby': 	 'routeLobby',
			'!round':	 'routeRound',
			'!knockout': 'routeKnockout',
		},

		// States
		isStarted: false,


		/** @constructor */
		initialize: function () {},


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
			console.log('route-controller -> routeKnockout');
			RouteState.set({route: RouteState.ROUTE.KNOCKOUT});
		}
	});

	return new RouteController();
});