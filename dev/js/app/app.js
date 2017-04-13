define([
	// Models
	'model/state/app-state', 			// Singleton
	// Controllers
	'controller/view-controller',
	'controller/route-controller', 		// Singleton
	'controller/session-controller', 	// Singleton
	// Views
	'view/base/base-view',
	'view/overlay/loader-overlay'
], function (
	// Models
	AppState,
	// Controllers
	ViewController,
	RouteController,
	SessionController,
	// Views
	BaseView,
	LoaderOverlay
) {

	'use strict';

	/** @constructor */
	return BaseView.extend({

		// Vars
		// ----
		// DOM
		el: '.app',
		$pages: {},
		$overlays: {},

		// Controllers
		viewController: {},

		// Views
		loaderOverlay: {},


		initialize: function () {
			// Set elements
			this.$pages = this.$('.pages');
			this.$overlays = this.$('.overlays');

			// Create controllers
			this.viewController = new ViewController();
			this.viewController.setAppElement(this.$pages);

			// Create overlays
			this.loaderOverlay = new LoaderOverlay();

			SessionController.checkIfRefresh();
		},


		// Toggle
		// ------
		start: function () {
			if(this._super()) { return; }

			// Start controllers
			this.viewController.start();
			RouteController.start();

			AppState.set({isIdle: false});

		},

		stop: function () {
			if(this._super()) { return; }

			// Stop controllers
			this.viewController.stop();
			RouteController.stop();

			AppState.set({isIdle: true});
			this.remove();
		}
	});
});