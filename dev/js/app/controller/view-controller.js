define([
	// Vendors
	'backbone',
	'underscore',
	// Models
	'model/state/route-state', // Singleton
	'model/state/app-state', // Singleton
	// Views
	'view/page/intro/intro-page',
	'view/page/lobby/lobby-page',
	'view/page/round/round-page',
	'view/page/knockout/knockout-page',
	'view/page/winner/winner-page'
], function (
	// Vendors
	Backbone,
	_,
	// Models
	RouteState,
	AppState,
	// Views
	IntroPage,
	LobbyPage,
	RoundPage,
	KnockoutPage,
	WinnerPage
) {

	'use strict';

	/** @constructor */
	const ViewController = function () {
		this.initialize.apply(this);
	};

	_.extend(ViewController.prototype, Backbone.Events, {

		// Vars
		// ----
		// DOM
		$appElement: {},

		// States
		isStarted: false,

		// Views
		currentView: null,
		pageViews: [],


		// Init
		// ----
		initialize: function () {
			this.pageViews = [
				new IntroPage({TYPE: AppState.PAGE.INTRO}),
				new LobbyPage({TYPE: AppState.PAGE.LOBBY}),
				new RoundPage({TYPE: AppState.PAGE.ROUND}),
				new KnockoutPage({TYPE: AppState.PAGE.KNOCKOUT}),
				new WinnerPage({TYPE: AppState.PAGE.WINNER})
			];
		},


		// Toggle
		// ------
		start: function () {
			if(this.isStarted) { return; }

			this.addListeners();
			this.isStarted = true;
		},

		stop: function () {
			if(!this.isStarted) { return; }

			this.removeListeners();
			this.isStarted = false;
		},


		// Toggle views
		// ------------
		startCurrentView: function(){
			if(!this.currentView) { return; }

			this.currentView.start(this.$appElement);
		},

		stopCurrentView: function(){
			if(!this.currentView) { return; }

			this.currentView.stop();
			this.currentView = null;
		},


		// App Element
		// -----------
		/**
		 * @desc Sets the base element of the app.
		 * @param {object} $element
		 */
		setAppElement: function($element){
			this.$appElement = $element;
		},


		// Events
		// ------
		// RouteState
		onChangeRoute: function(){
			let activePage;

			switch(RouteState.get('route')) {
				case RouteState.ROUTE.INTRO:
					activePage = AppState.PAGE.INTRO;
					break;

				case RouteState.ROUTE.LOBBY:
					activePage = AppState.PAGE.LOBBY;
					break;

				case RouteState.ROUTE.ROUND:
					activePage = AppState.PAGE.ROUND;
					break;

				case RouteState.ROUTE.KNOCKOUT:
					activePage = AppState.PAGE.KNOCKOUT;
					break;

				case RouteState.ROUTE.WINNER:
					activePage = AppState.PAGE.WINNER;
					break;

				default:
					activePage = null;
					break;
			}

			AppState.set({activePage: activePage});
		},

		// AppState
		onChangeActivePage: function(){
			this.stopCurrentView();
			this.currentView = _.findWhere(this.pageViews, {TYPE: AppState.get('activePage')}) || null;
			this.startCurrentView();
		},


		// Listeners
		// ---------
		addListeners: function(){
			this.listenTo(RouteState, 'change:route', this.onChangeRoute);
			this.listenTo(AppState, 'change:activePage', this.onChangeActivePage);
		},

		removeListeners: function(){
			this.stopListening(RouteState, 'change:route', this.onChangeRoute);
			this.stopListening(AppState, 'change:activePage', this.onChangeActivePage);
		}
	});

	return ViewController;
});