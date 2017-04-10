define([
	// Controller
	'controller/socket-controller',
	// Views
	'view/base/base-view',
], function (
	// Controller
	SocketController,
	// Views
	BaseView
) {

	'use strict';

	return BaseView.extend({

		// Vars
		// ----
		events: {
			'submit .pin-code': 'onSubmit'
		},

		// DOM
		el: '.app',
		$form: {},
		$code: {},
		$name: {},


		/** @constructor */
		initialize: function () {
			this._super();

			this.$form = this.$('.pin-code');
			this.$code = this.$('.code-js');
			this.$name = this.$('.name-js');
		},


		// Toggle
		// ------
		start: function () {
			if(this._super()) { return; }
		},

		stop: function () {
			if(this._super()) { return; }
		},


		// Events
		// ------
		onSubmit: function(e){
			e.preventDefault();

			// todo: refactor to player model
			let obj = {
				code: this.$code.val(),
				name: this.$name.val()
			};

			SocketController.joinGame(obj);
		},
	});
});