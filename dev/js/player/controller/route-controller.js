define([
	// Vendors
	'backbone',
	// Controllers
	'controller/socket-controller', // Singleton
	// Models
	'model/state/route-state', 		// Singleton
	'model/player-model'			// Singleton
], function (
	// Vendors
	Backbone,
	// Controllers
	SocketController,
	// Models
	RouteState,
	PlayerModel
) {

	'use strict';

	/** @constructor */
	const RouteController = Backbone.Router.extend({

		// Vars
		// ----
		routes: {
			'': 				'routeIndex',
			'!join': 			'routeJoin',
			'!stats': 			'routeStats',
			'!stats/:player': 	'routeStatsPlayer'
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

		routeJoin: function(){
			RouteState.set({route: RouteState.ROUTE.JOIN});
		},

		routeStats: function(){
			RouteState.set({route: RouteState.ROUTE.STATS});
		},

		routeStatsPlayer: function(playerName){
			if(!PlayerModel.id && !PlayerModel.code){
				PlayerModel.set({name: playerName});
				SocketController.requestPlayerData();
			}

			RouteState.set({route: RouteState.ROUTE.STATS});
		},
	});

	return new RouteController();
});