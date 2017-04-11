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
			'': 		'routeIndex',
			'!join': 	'routeJoin',
			'!stats': 	'routeStats'
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

		routeJoin: function(){
			RouteState.set({route: RouteState.ROUTE.JOIN});
		},

		routeStats: function(){
			RouteState.set({route: RouteState.ROUTE.STATS});
		},
	});

	return new RouteController();
});