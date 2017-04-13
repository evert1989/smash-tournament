define([
	// Vendors
	'backbone'
], function (
	// Vendors
	Backbone
) {

	'use strict';

	/** @constructor */
	const PlayerModel = Backbone.Model.extend({

		defaults: {
			id: null,
			name: null,
			code: null,
			points: 0,
			ranking: 0,
			eliminated: false
		},


		// Create
		// ------
		/**
		 * @desc Updates this model with a name and the game code.
		 * @param {string} name
		 * @param {string} code
		 */
		createPlayer: function(name, code){
			this.set({
				id: this.getUniqueId(),
				name: name.toLowerCase(),
				code: code
			});
		},


		// Get
		// ---
		getUniqueId: function(){
			let date = new Date();
			let components = [
				date.getYear(),
				date.getMonth(),
				date.getDate(),
				date.getHours(),
				date.getMinutes(),
				date.getSeconds(),
				date.getMilliseconds()
			];

			return components.join('');
		}
	});

	return new PlayerModel();
});