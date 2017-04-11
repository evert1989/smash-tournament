define([
	// Models
	'model/state/app-state', // Singleton
	// Controllers
	'controller/view-controller',
	'controller/route-controller', // Singleton
	// Views
	'view/base/base-view',
	'view/overlay/loader-overlay'
], function (
	// Models
	AppState,
	// Controllers
	ViewController,
	RouteController,
	// Views
	BaseView,
	LoaderOverlay
) {

	'use strict';

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


		/** @constructor */
		initialize: function () {
			this._super();

			// Set elements
			this.$pages = this.$('.pages');
			this.$overlays = this.$('.overlays');

			// Create controllers
			this.viewController = new ViewController();

			this.viewController.setAppElement(this.$pages);

			// Create overlays
			this.loaderOverlay = new LoaderOverlay();
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

			this.remove();

			AppState.set({isIdle: true});
		}
	});
});