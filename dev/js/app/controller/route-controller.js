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

	let RouteController = Backbone.Router.extend({

		// Vars
		// ----
		routes: {
			'': 		'routeIndex',
			'!test': 	'routeTest'
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

		routeTest: function(){
			RouteState.set({route: RouteState.ROUTE.TEST});
		}
	});

	return new RouteController();
});