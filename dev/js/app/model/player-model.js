define([
	// Vendors
	'backbone'
], function (
	// Vendors
	Backbone
) {

	'use strict';

	/** @constructor */
	return Backbone.Model.extend({

		defaults: {
			id: null,
			name: null,
			code: null,
			points: 0,
			ranking: 0,
			eliminated: false
		}
	});
});