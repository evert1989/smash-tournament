define([
	// Vendors
	'underscore',
	// Controller
	'controller/socket-controller', // Singleton
	// Models
	'model/state/socket-state', // Singleton
	// Views
	'view/base/page-view',
	// Templates
	'text!template/app/page/lobby/lobby-page.hbs'
], function (
	// Vendors
	_,
	// Controller
	SocketController,
	// Models
	SocketState,
	// Views
	PageView,
	// Templates
	template
) {

	'use strict';

	return PageView.extend({

		// Vars
		// ----
		// DOM
		$codeItems: {},
		$playerContainer: {},


		/** @constructor */
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
			if (this._super(template, $parent, null)) {
				return;
			}

			this.$codeItems = this.$('.item-js');
			this.$playerContainer = this.$('.player-container');

			this.checkForPinCode();
		},

		stop: function () {
			if (this._super()) {
				return;
			}

			this.$el.remove();
		},


		// Socket
		// ------
		checkForPinCode: function(){
			if(SocketState.get('pinCode')) {
				this.onChangePinCode();
				return;
			}

			this.listenToOnce(SocketState, 'change:pinCode', this.onChangePinCode);
			SocketController.requestFourNumberCode();
		},


		// Pin Code
		// --------
		updateNumberByIndex: function(number, index){
			this.$codeItems[index].innerHTML = number;
		},


		// Events
		// ------
		onChangePinCode: function(){
			_.each(SocketState.get('pinCode'), this.updateNumberByIndex, this);
		},
	});
});